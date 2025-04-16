import React, { useState } from "react";
import { Modal } from "antd";
import { CustomButton } from "../../../../../../components/Button";
import styles from "./styles.module.scss";
import { OctagonAlert } from "lucide-react";

const ModalFooter = ({ onClose }) => (
  <div className={styles.groupFooter}>
    <CustomButton className={styles.buttonFooter} key={1} variant="secondary" onClick={() => onClose()}>
      Hủy
    </CustomButton>
    <CustomButton className={styles.buttonFooter} key={2} variant="danger">
      Xóa
    </CustomButton>
  </div>
);

const ModalDelete = ({ open, onClose }) => {
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
        maskClosable={false}
        width={400}
        onOk={handleOk}
        cancelText="Hủy"
        okText="Quét"
        confirmLoading={confirmLoading}
        onCancel={() => onClose(false)}
        footer={<ModalFooter onClose={onClose} />}
      >
        <div className={styles.contentWrap}>
          <OctagonAlert className={styles.icon} />
          <span> Bạn có chắc chắn muốn xóa link này không?</span>
        </div>
      </Modal>
    </>
  );
};
export default ModalDelete;
