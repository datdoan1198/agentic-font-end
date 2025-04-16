import React, { useState } from "react";
import { Modal, Tabs } from "antd";
import { CustomButton } from "../../../../../../components/Button";
import styles from "./styles.module.scss";
const ModalFooter = ({ onClose }) => (
  <div className={styles.groupFooter}>
    <CustomButton className={styles.buttonFooter} key={1} variant="secondary" onClick={() => onClose()}>
      Hủy
    </CustomButton>
    <CustomButton className={styles.buttonFooter} key={2} variant="primary">
      Quét
    </CustomButton>
  </div>
);

const ModalAdd = ({ open, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
    }, 2000);
  };

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Link",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Sitemap",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "File",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <>
      <Modal
        closable={false}
        open={open}
        centered
        onOk={handleOk}
        cancelText="Hủy"
        okText="Quét"
        width={400}
        confirmLoading={confirmLoading}
        onCancel={() => onClose(false)}
        footer={<ModalFooter onClose={onClose} />}
      >
        <Tabs className={styles.tabs} size="middle" centered defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </>
  );
};
export default ModalAdd;
