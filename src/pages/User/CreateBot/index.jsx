import React from 'react'
import MainLayout from '@/layouts/User/MainLayout/index.jsx'
import styles from './styles.module.scss'
import { Button, Col, Row, Upload } from 'antd'
import InlineSVG from 'react-inlinesvg'
import Robot from '@/assets/images/icons/solid/robot.svg'
import Handle from '@/pages/User/Bot/handle.js'
import BotInfo from './components/Info'
import BotSteps from './components/Steps'
import BotKnowledge from './components/Knowledge'
import BotBussiness from './components/Bussiness'

const CreateBot = () => {
  const {
    currentStep,
    loadingBtnCreateBot,
    dataForm,
    errorDataForm,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmCreateBot,
    handleNextStep,
    handlePrevStep,
  } = Handle()

  return (
    <MainLayout>
      <div className={styles.boxFormSubmitLink}>
        <div className={styles.headerForm}>
          <div className={styles.title}>Thiết lập bot</div>
        </div>
        <div className={styles.formSubmitLink}>
          <Row gutter={20}>
            <Col md={12} xs={24}>
              {currentStep === 0 && (
                <BotInfo
                  dataForm={dataForm}
                  errorDataForm={errorDataForm}
                  handleChangeData={handleChangeData}
                  onFocusInputLesson={onFocusInputLesson}
                />
              )}
              {currentStep === 1 && (
                <BotKnowledge
                  dataForm={dataForm}
                  errorDataForm={errorDataForm}
                  handleChangeData={handleChangeData}
                  onFocusInputLesson={onFocusInputLesson}
                />
              )}
              {currentStep === 2 && (
                <BotBussiness
                  dataForm={dataForm}
                  errorDataForm={errorDataForm}
                  handleChangeData={handleChangeData}
                  onFocusInputLesson={onFocusInputLesson}
                />
              )}
            </Col>

            <Col md={12} xs={24}>
              <BotSteps currentStep={currentStep} />
            </Col>
          </Row>

          <div className={styles.btnWrap}>
            {currentStep > 0 && (
              <Button onClick={handlePrevStep}>
                <InlineSVG src={Robot} width={24} />
                Trở lại
              </Button>
            )}
            <Button
              loading={loadingBtnCreateBot}
              onClick={currentStep === 2 ? handleConfirmCreateBot : handleNextStep}
              className={styles.btnConfirm}
            >
              <InlineSVG src={Robot} width={24} />
              {currentStep === 2 ? 'Tạo Bot' : 'Tiếp tục'}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateBot
