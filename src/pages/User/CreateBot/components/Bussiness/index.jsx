import React from 'react'
import styles from '../../styles.module.scss'
import InlineSVG from 'react-inlinesvg'
import Business from '@/assets/images/icons/solid/building.svg'
import InputForm from '@/components/InputForm/index.jsx'
import InputUpload from '@/components/InputUpload/index.jsx'
import {Button} from 'antd'
import Previous from '@/assets/images/icons/solid/previous.svg'
import Robot from '@/assets/images/icons/solid/robot.svg'

const BotBussiness = ({
  dataForm,
  errorDataForm,
  handleChangeData,
  onFocusInputLesson,
  handlePrevStep,
  handleConfirmCreateBot,
  loadingBtnCreateBot,
}) => {
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
      <div className={styles.btnWrap}>
        <Button onClick={handlePrevStep}>
          <InlineSVG src={Previous} width={20} />
          Trở lại
        </Button>
        <Button loading={loadingBtnCreateBot} onClick={handleConfirmCreateBot} className={styles.btnConfirm}>
          Tạo Bot
          <InlineSVG src={Robot} width={20} />
        </Button>
      </div>
    </div>
  );
};

export default BotBussiness;
