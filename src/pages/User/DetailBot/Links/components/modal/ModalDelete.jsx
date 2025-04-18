import React from "react"
import { Modal } from "antd"
import { CustomButton } from "../../../../../../components/Button"
import styles from "./styles.module.scss"
import { CircleAlert } from "lucide-react"

const ModalDelete = ({ open, onClose, onDeleteLink, link, isLoading }) => {
  const handleDelete = () => {
    if (link) {
      onDeleteLink(link)
      onClose(false)
    }
  }

  const ModalFooter = () => (
    <div className={styles.groupFooter}>
      <CustomButton className={styles.buttonFooter} key={1} variant="secondary" onClick={() => onClose(false)}>
        Hủy
      </CustomButton>
      <CustomButton className={styles.buttonFooter} key={2} variant="danger" onClick={handleDelete} loading={isLoading}>
        Xóa
      </CustomButton>
    </div>
  )

  return (
    <>
      <Modal
        closeIcon={false}
        maskClosable={false}
        open={open}
        centered
        width={360}
        onCancel={() => onClose(false)}
        footer={<ModalFooter />}
        mousePosition={null}
      >
        <div className={styles.contentWrap}>
          <CircleAlert className={styles.icon} />
          <p>Bạn có chắc chắn muốn xóa link này?</p>
        </div>
        {link && (
          <p>
            <strong>URL:</strong> {link.url}
          </p>
        )}
      </Modal>
    </>
  )
}
export default ModalDelete
