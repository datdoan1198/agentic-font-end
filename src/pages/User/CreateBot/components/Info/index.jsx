import React from 'react'
import styles from '../../styles.module.scss'
import InlineSVG from 'react-inlinesvg'
import Robot from '@/assets/images/icons/solid/robot.svg'
import InputForm from '@/components/InputForm/index.jsx'
import InputUpload from '@/components/InputUpload/index.jsx'
import InputColor from '@/components/InputColor/index.jsx'

const BotInfo = ({ dataForm, errorDataForm, handleChangeData, onFocusInputLesson }) => {
  return (
    <div className={styles.groupSubForm}>
      <div className={styles.titleWrap}>
        <div className={styles.icon}>
          <InlineSVG src={Robot} width={24} />
        </div>
        <div>Thông tin bot</div>
      </div>
      <InputForm
        label="Tên bot"
        placeholder={'Nhập tên bot'}
        type={'name'}
        value={dataForm.name}
        error={errorDataForm.name}
        handleChangeData={(type, value) => handleChangeData(type, value)}
        onFocusInputLesson={(type) => onFocusInputLesson(type)}
      />

      <InputForm
        label="Mô tả công việc của bot"
        isTextArea={true}
        type="description"
        placeholder={'Nhập mô tả công việc của bot'}
        value={dataForm.description}
        error={errorDataForm.description}
        handleChangeData={handleChangeData}
        onFocusInputLesson={onFocusInputLesson}
      />

      <InputUpload
        label="Nút trò chuyện"
        type="logo_message"
        formData={dataForm}
        error={errorDataForm.logo_message}
        handleChangeData={handleChangeData}
        onFocusInputLesson={onFocusInputLesson}
      />

      <InputColor
        label={'Màu sắc'}
        type="color"
        value={dataForm.color}
        handleChangeData={handleChangeData}
        onFocusInputLesson={onFocusInputLesson}
        error={errorDataForm.color}
      />
    </div>
  )
}

export default BotInfo
