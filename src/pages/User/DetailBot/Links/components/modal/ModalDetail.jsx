import React, { useState } from "react";
import { Modal } from "antd";
import styles from "./styles.module.scss";
import InputForm from "../../../../../../components/InputForm";

const ModalDetail = ({ open, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        closable={false}
        open={open}
        centered
        width={800}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onClose}
        footer={null}
        getContainer={false}
        mousePosition={null}
      >
        <InputForm label="Tiêu đề" required={false} value="oke" />
        <InputForm label="Đường dẫn" required={false} value="oke" />
        <InputForm label="Mô tả" required={false} value="oke" />
        <InputForm label="Nội dung" required={false} value="oke" />
      </Modal>
    </>
  );
};
export default ModalDetail;
