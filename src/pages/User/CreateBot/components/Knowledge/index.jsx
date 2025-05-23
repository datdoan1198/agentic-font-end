import React from 'react'
import styles from '../../styles.module.scss'
import {Button, Upload} from 'antd'
import InlineSVG from 'react-inlinesvg'
import Knowledge from '@/assets/images/icons/solid/head-side-brain.svg'
import InputForm from '@/components/InputForm/index.jsx'
import {InboxOutlined} from '@ant-design/icons'
import Continue from '@/assets/images/icons/solid/continue.svg'
import Previous from '@/assets/images/icons/solid/previous.svg'

const {Dragger} = Upload;

const BotKnowledge = ({
  dataForm,
  errorDataForm,
  handleChangeData,
  onFocusInputLesson,
  handlePrevStep,
  handleNextStep,
}) => {
  const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: '.xls,.xlsx',
    beforeUpload: (file) => {
      const isExcel =
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        message.error('Only Excel files (.xls, .xlsx) are allowed!');
        return Upload.LIST_IGNORE;
      }

      handleChangeData('file', file);
      return false;
    },
    onRemove: () => {
      handleChangeData('file', null);
    },
  };
  return (
    <div className={styles.groupSubForm}>
      <div className={styles.titleWrap}>
        <div className={styles.icon}>
          <InlineSVG src={Knowledge} width={20} />
        </div>
        <div>Thông tin tri thức</div>
      </div>
      <InputForm
        required={false}
        label="Đường dẫn"
        placeholder={'Nhập địa chỉ Website'}
        type={'url'}
        value={dataForm.url}
        error={errorDataForm.url}
        handleChangeData={(type, value) => handleChangeData(type, value)}
        onFocusInputLesson={(type) => onFocusInputLesson(type)}
      />

      <div className={`input-wrap`}>
        <div className={'label-wrap'}>File</div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Vui lòng tải lên tệp định dạng excel (tối đa 10MB/tệp)</p>
        </Dragger>
      </div>
      <div className={styles.btnWrap}>
        <Button onClick={handlePrevStep}>
          <InlineSVG src={Previous} width={20} />
          Trở lại
        </Button>
        <Button onClick={handleNextStep} className={styles.btnConfirm}>
          Tiếp tục
          <InlineSVG src={Continue} width={20} />
        </Button>
      </div>
    </div>
  );
};

export default BotKnowledge;
