import React from 'react'
import MainLayout from '@/layouts/User/MainLayout/index.jsx'
import styles from './styles.module.scss'
import { Col, Row, Steps } from 'antd'
import Handle from '@/pages/User/Bot/handle.js'
import BotInfo from './components/Info'
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
            <Col md={24} xs={24}>
              <Steps
                direction="vertical"
                current={currentStep}
                className={styles.steps}
                items={[
                  {
                    title: 'Thông tin bot',
                    description:
                      currentStep === 0 ? (
                        <BotInfo
                          dataForm={dataForm}
                          errorDataForm={errorDataForm}
                          handleChangeData={handleChangeData}
                          onFocusInputLesson={onFocusInputLesson}
                          handleNextStep={handleNextStep}
                        />
                      ) : null,
                  },
                  {
                    title: 'Thông tin tri thức',
                    description:
                      currentStep === 1 ? (
                        <BotKnowledge
                          dataForm={dataForm}
                          errorDataForm={errorDataForm}
                          handleChangeData={handleChangeData}
                          onFocusInputLesson={onFocusInputLesson}
                          handlePrevStep={handlePrevStep}
                          handleNextStep={handleNextStep}
                        />
                      ) : null,
                  },
                  {
                    title: 'Thông tin doanh nghiệp',
                    description:
                      currentStep === 2 ? (
                        <BotBussiness
                          dataForm={dataForm}
                          errorDataForm={errorDataForm}
                          handleChangeData={handleChangeData}
                          onFocusInputLesson={onFocusInputLesson}
                          handlePrevStep={handlePrevStep}
                          handleConfirmCreateBot={handleConfirmCreateBot}
                          loadingBtnCreateBot={loadingBtnCreateBot}
                        />
                      ) : null,
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateBot
