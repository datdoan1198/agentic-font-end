import React from "react"
import { Modal } from "antd"

import InputForm from "../../../../../../components/InputForm"

const ModalDetail = ({ open, onClose, link, linkContent }) => {
  if (!link) return null

  return (
    <>
      <Modal
        open={open}
        centered
        width={800}
        onCancel={onClose}
        footer={null}
        getContainer={false}
        mousePosition={null}
        closeIcon={false}
      >
        <>
          <InputForm label="Tiêu đề" required={false} value={link?.title || ""} disabled />
          <InputForm label="Đường dẫn" required={false} value={link?.url || ""} disabled />
          <InputForm label="Mô tả" required={false} value={link?.description || ""} disabled />
          <InputForm
            isTextArea={true}
            label="Nội dung"
            required={false}
            value={linkContent?.content || ""}
            disabled
            type="textarea"
            rows={8}
          />
        </>
      </Modal>
    </>
  )
}
export default ModalDetail
