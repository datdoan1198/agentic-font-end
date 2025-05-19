import React from 'react'
import styles from '../../styles.module.scss'
import InlineSVG from 'react-inlinesvg'
import Business from '@/assets/images/icons/solid/building.svg'
import InputForm from '@/components/InputForm/index.jsx'
import InputUpload from '@/components/InputUpload/index.jsx'

const BotBussiness = ({ dataForm, errorDataForm, handleChangeData, onFocusInputLesson }) => {
  return (
    <div className={styles.groupSubForm}>
      <div className={styles.titleWrap}>
        <div className={styles.icon}>
          <InlineSVG src={Business} width={17} />
        </div>
        <div>Thông tin doanh nghiệp</div>
      </div>

      <InputForm
        label="Tên doanh nghiệp"
        placeholder={'Nhập tên doanh nghiệp'}
        type={'name_business'}
        value={dataForm.name_business}
        error={errorDataForm.name_business}
        handleChangeData={(type, value) => handleChangeData(type, value)}
        onFocusInputLesson={(type) => onFocusInputLesson(type)}
      />

      <InputUpload
        label="Logo doanh nghiệp"
        type="logo"
        formData={dataForm}
        error={errorDataForm.logo}
        handleChangeData={handleChangeData}
        onFocusInputLesson={onFocusInputLesson}
      />
    </div>
  )
}

export default BotBussiness
