import React from "react";
import { Button, Modal } from "antd";
import "./styles.scss";

export default function ModalFeature(props) {
  const { isModalOpen, handleOk, handleCancel, width = 400 } = props;
  return (
    <Modal
      className="modal-feature"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      width={width}
      centered
      closable={false}
    >
      <div className="h-[48px] bg-brandb-100 rounded-t-2xl flex items-center justify-center font-bold text-base">
        Tính năng chưa khả dụng
      </div>
      <div className="text-center mt-4 text-sm px-4">
        Tính năng này vẫn đang trong giai đoạn phát triển. Vui lòng quay lại sau để sử dụng khi đã sẵn sàng.
      </div>
      <div className="flex justify-center mt-4 pb-6">
        <Button className={`main-btn-teacher h-[34px]`} type={"primary"} onClick={handleCancel}>
          <span className="min-w-[90px] font-medium">Đóng</span>
        </Button>
      </div>
    </Modal>
  );
}
