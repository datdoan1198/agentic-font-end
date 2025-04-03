import React from 'react';
import {Modal} from "antd";
import './styles.scss';
import styles from './styles.module.scss'
import Close from "../../assets/images/icons/duotone/times.svg";
import InlineSVG from "react-inlinesvg";

export default function ModalDefault(props) {
  const {isModalOpen, handleOk, handleCancel, children, title, width = 600} = props;
  return(
    <Modal
      className={`general-dialog-wrap`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      width={width}
      centered
      closeIcon={<InlineSVG  src={Close}/>}
    >
      <div className={styles.headerWrap}>
        { title }
      </div>
      <div className={styles.mainWrap}>
        {children}
      </div>
    </Modal>
  );
}
