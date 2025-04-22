import React, { useEffect } from "react"
import styles from "./styles.module.scss"
import { CustomButton } from "@/components/Button"
import InputForm from "@/components/InputForm"
import { Divider } from "antd"
import InputUpload from "../../../../../../components/InputUpload"
import InputSelect from "../../../../../../components/Select"
import InputColor from "../../../../../../components/InputColor"
import useCustomize from "../../useCustomize"
import styleCustomize from "../../styles.module.scss"

const dispayAutoBotOptions = [
  { value: "3", label: "3 giây" },
  { value: "5", label: "5 giây" },
  { value: "10", label: "10 giây" },
  { value: "30", label: "30 giây" },
  { value: "off", label: "Tắt" },
]

export default function LeftPage() {
  const {
    formData,
    errorFormData,
    loadingUpdate,
    messageError,
    handleChangeData,
    onFocusInputLesson,
    handleSaveCustomize,
  } = useCustomize()

  return (
    <>
      <div className={`${styleCustomize.container}`}>
        <div className={styles.headerWrap}>
          <span className={styles.title}>Tùy chỉnh</span>
          <CustomButton onClick={handleSaveCustomize} loading={loadingUpdate}>
            Lưu
          </CustomButton>
        </div>
        {messageError && <div className={styles.errorMessage}>{messageError}</div>}
        <div className={`${styleCustomize.mainWrap} no-scrollbar`}>
          <InputForm
            label="Tên"
            required={false}
            type="name"
            value={formData.name}
            error={errorFormData.name}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
          />
          <InputUpload
            label="Logo"
            type="logo"
            formData={formData}
            error={errorFormData.logo}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
          />
          <Divider />
          <InputUpload
            label="Nút trò chuyện"
            type="favicon"
            formData={formData}
            error={errorFormData.favicon}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
          />
          <Divider />
          <InputColor
            label={"Màu sắc"}
            type="color"
            value={formData.color}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
            error={errorFormData.color}
          />
          <Divider />
          {/* Các trường khác không thay đổi */}
          <InputForm
            label="Mô tả"
            isTextArea={true}
            type="description"
            value={formData.description}
            error={errorFormData.description}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
          />
          {/* <InputForm
          label="Tính cách"
          isTextArea={true}
          type="genitive"
          value={formData.genitive}
          error={errorFormData.genitive}
          handleChangeData={handleChangeData}
          onFocusInputLesson={onFocusInputLesson}
        /> */}
          <InputForm
            label="Tin nhắn chào mừng"
            required={false}
            isTextArea={true}
            type="welcome_messages"
            value={formData.welcome_messages}
            error={errorFormData.welcome_messages}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
          />
          <InputForm
            label="Lời nhắc nhanh"
            required={false}
            isTextArea={true}
            type="quick_prompts"
            value={formData.quick_prompts}
            error={errorFormData.quick_prompts}
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
          />
          {/* <InputForm
          label="Chữ ký"
          desc='Nhập nội dung, ví dụ "Thông tin tham vấn bởi AI"'
          required={false}
          isTextArea={true}
          type="sig"
          value={formData.sig}
          error={errorFormData.sig}
          handleChangeData={handleChangeData}
          onFocusInputLesson={onFocusInputLesson}
        /> */}
          <InputSelect
            label={"Tự động hiển thị khung chat"}
            defaultValue={"off"}
            options={dispayAutoBotOptions}
            type="auto_display_chatbox"
            handleChangeData={handleChangeData}
            onFocusInputLesson={onFocusInputLesson}
            error={errorFormData.auto_display_chatbox}
          />
        </div>
      </div>
    </>
  )
}
