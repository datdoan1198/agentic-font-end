import React, { useEffect, useState } from "react"
import { Modal, Form, Input, Select } from "antd"
import { CustomButton } from "../../../../../../components/Button"
import styles from "./styles.module.scss"

const ModalAdd = ({ open, onClose, onAddLink, isLoading }) => {
  const [form] = Form.useForm()
  const [setActiveTab] = useState("1")

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open])

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const { url, scan_type } = values
      await onAddLink(url, scan_type)
    })
  }

  const onChange = (key) => {
    setActiveTab(key)
    form.resetFields()
  }

  const ModalFooter = () => (
    <div className={styles.groupFooter}>
      <CustomButton className={styles.buttonFooter} key={1} variant="secondary" onClick={onClose}>
        Hủy
      </CustomButton>
      <CustomButton
        className={styles.buttonFooter}
        key={2}
        variant="primary"
        onClick={handleSubmit}
        loading={isLoading}
      >
        Quét
      </CustomButton>
    </div>
  )

  const ContentModalAdd = () => (
    <Form form={form} layout="vertical">
      <Form.Item name="url" label="Link" rules={[{ required: true, message: "Vui lòng nhập đường dẫn!" }]}>
        <Input className={styles.inputAdd} placeholder="Nhập đường dẫn" />
      </Form.Item>
      <Form.Item name="scan_type" label="Thể loại" initialValue="ALL">
        <Select
          className={styles.inputAdd}
          options={[
            { value: "ALL", label: "Quét toàn bộ" },
            { value: "ONE", label: "Quét một trang" },
          ]}
        />
      </Form.Item>
    </Form>
  )

  const ContentModalSitemap = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="sitemap"
        label="Sitemap URL"
        rules={[{ required: true, message: "Vui lòng nhập đường dẫn sitemap!" }]}
      >
        <Input placeholder="Nhập đường dẫn sitemap" />
      </Form.Item>
    </Form>
  )

  const ContentModalFile = () => (
    <Form form={form} layout="vertical">
      <Form.Item name="files" label="Upload file">
        <Input type="file" />
      </Form.Item>
    </Form>
  )

  const items = [
    {
      key: "1",
      label: "Link",
      children: <ContentModalAdd />,
    },
    {
      key: "2",
      label: "Sitemap",
      children: <ContentModalSitemap />,
    },
    {
      key: "3",
      label: "File",
      children: <ContentModalFile />,
    },
  ]

  return (
    <>
      <Modal
        closeIcon={false}
        maskClosable={false}
        open={open}
        centered
        width={400}
        onCancel={onClose}
        footer={<ModalFooter />}
        mousePosition={null}
        getContainer={false}
      >
        <ContentModalAdd />
        {/* <Tabs className={styles.tabs} size="middle" centered defaultActiveKey="1" items={items} onChange={onChange} /> */}
      </Modal>
    </>
  )
}
export default ModalAdd
