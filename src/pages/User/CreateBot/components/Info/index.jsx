import React from 'react'
import styles from '../../styles.module.scss'
import InlineSVG from 'react-inlinesvg'
import Robot from '@/assets/images/icons/solid/robot.svg'
import Continue from '@/assets/images/icons/solid/continue.svg'
import InputForm from '@/components/InputForm/index.jsx'
import InputUpload from '@/components/InputUpload/index.jsx'
import InputColor from '@/components/InputColor/index.jsx'
import {Button, Select} from 'antd'
import ErrorMessage from "@/components/ErrorMessage/index.jsx";

const BotInfo = ({dataForm, errorDataForm, handleChangeData, onFocusInputLesson, handleNextStep, descriptionJobs}) => {
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

      <div className={`input-wrap`}>
        <div className={"label-wrap"}>
            Ngành nghề
            <span className={"required"}>*</span>
        </div>

        <Select
            className={`main-select`}
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn ngành nghề"
            value={dataForm.description}
            onChange={(value) => handleChangeData('description', value)}
            options={descriptionJobs ? descriptionJobs.map(item => ({
                value: item.code,
                label: `${item.name}`,
            })) : []}
        />
        {errorDataForm.description && errorDataForm.description > 0 ? <ErrorMessage message={errorDataForm.description} /> : ""}
      </div>

      <InputUpload
          required={false}
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

      <div className={styles.btnWrap}>
        <Button onClick={handleNextStep} className={styles.btnConfirm}>
          Tiếp tục
          <InlineSVG src={Continue} width={20} />
        </Button>
      </div>
    </div>
  );
};

export default BotInfo;
