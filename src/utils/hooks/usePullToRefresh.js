import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPullDownLoading } from "../../states/modules/app";

const usePullToRefresh = ({
  hasPermissions
}) => {
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const pullDownLoading = useSelector(state => state.app.pullDownLoading);
  const dispatch = useDispatch()
  let isApiCalled = false;
  const refreshThreshold = 50
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e) => {
    if (startY && window.scrollY === 0 && !isApiCalled && hasPermissions) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      if (distance > 0) {
        setPullDistance(distance);
        if (distance > refreshThreshold && !pullDownLoading) {
          dispatch(setPullDownLoading(true))
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setStartY(0);
    setPullDistance(0);
    isApiCalled = false;
  };
  
  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startY, pullDownLoading]);

  useEffect(() => { 
    if (!pullDownLoading){
      handleTouchEnd()
    }
    
  }, [pullDownLoading]);

  return { pullDistance };
};

export default usePullToRefresh;
