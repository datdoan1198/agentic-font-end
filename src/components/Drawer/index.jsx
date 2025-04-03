import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';

const DraggableDrawer = ({ isOpen, onClose, children }) => {
  const [drawerPosition, setDrawerPosition] = useState(window.innerHeight - 100);
  const [startY, setStartY] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setDrawerPosition(0);
    } else {
      setDrawerPosition(window.innerHeight - 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setDrawerPosition(window.innerHeight - 100);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const newPosition = Math.min(Math.max(drawerPosition + currentY - startY, 0), window.innerHeight - 100);
    setDrawerPosition(newPosition);
    setStartY(currentY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const drawerHeight = drawerRef.current.clientHeight;
    const threshold = drawerHeight / 2;

    if (drawerPosition > threshold) {
      setDrawerPosition(window.innerHeight - drawerHeight);
      setTimeout(() => {
        onClose();
      }, 300); 
    } else {
      setDrawerPosition(0);
    }
  };

  const overlayClass = isOpen ? styles.overlayVisible : '';

  if (!isOpen && drawerPosition === window.innerHeight - 100) return null;

  return (
    <>
      <div className={`${styles.overlay} ${overlayClass}`} onClick={onClose}></div>
      <div
        className={styles.drawer}
        ref={drawerRef}
        style={{ transform: `translate(-50%, ${drawerPosition}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.dragHandle}></div>
        <div className={styles.drawerContent}>
          {children}
        </div>
      </div>
    </>
  );
};

export default DraggableDrawer;
