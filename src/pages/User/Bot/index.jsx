import React from "react"
import MainLayout from "@/layouts/User/MainLayout/index.jsx"
import styles from "./styles.module.scss"
import './styles.scss';
import {Button, Col, Empty, Popover, Row, Steps, Switch} from "antd"
import InlineSVG from "react-inlinesvg"
import Robot from "@/assets/images/icons/solid/robot.svg"
import Ellipsis from "@/assets/images/icons/solid/ellipsis-vertical.svg"
import Trash from "@/assets/images/icons/solid/trash.svg"
import InputForm from "@/components/InputForm/index.jsx"
import Handle from "@/pages/User/Bot/handle.js"
import Loading from "@/components/Loading/index.jsx"
import ModalDeleteDefault from "@/components/ModalDelete";
import {STATUS_BOT} from "@/utils/constants.js";

export default function Bot() {
  const {
      dataForm, loadingStep, errorDataForm, itemStep, botChats, loadingListBot, loadingBtnSubmitUrl,
      visibleDeleteBot, setVisibleDeleteBot, loadingBtnDelete,
      handleChangeData, onFocusInputLesson, handleConfirmSubmitLink, handleRedirectDetailBot,
      handleOpenModelDelete, handleConfirmDelete, handleChangeStatus
  } = Handle()

  return (
    <MainLayout>
      <div className={styles.boxBotChats}>
        <div className={styles.boxFilterWrap}>
          <Popover
            placement="leftBottom"
            content={
              <div className={styles.boxFormSubmitLink}>
                <div className={styles.formSubmitLink}>
                  <InputForm
                    placeholder={"Nhập địa chỉ Website"}
                    type={"url"}
                    value={dataForm.url}
                    error={errorDataForm.url}
                    handleChangeData={(type, value) => handleChangeData(type, value)}
                    onFocusInputLesson={(type) => onFocusInputLesson(type)}
                  />

                  <Button onClick={() => handleConfirmSubmitLink()} className={styles.btnConfirm}>
                    <InlineSVG src={Robot} width={24} />
                    Tạo Bot
                  </Button>
                </div>

                <Steps current={loadingStep} direction="vertical" items={itemStep} />
              </div>
            }
            trigger="click"
          >
            <Button className={styles.btnAddBot} loading={loadingBtnSubmitUrl}>
              <InlineSVG src={Robot} width={24} />
              Thêm Bot
            </Button>
          </Popover>
        </div>

        <div>
          {!loadingListBot ? (
            <>
              {botChats && botChats.length > 0 ? (
                <Row gutter={15}>
                  {botChats.map((bot) => {
                    return (
                      <Col
                        key={bot._id} xl={6} lg={8} md={12} xs={24}
                        className={styles.itemBotWrap}
                      >
                        <div className={styles.itemBot}>
                          <Row
                            gutter={10}
                            className={styles.mainWrap}
                          >
                            <Col
                              span={4}
                              onClick={() => handleRedirectDetailBot(bot._id)}
                            >
                              <img className={styles.imgWrap} src={bot.favicon} alt=""/>
                            </Col>

                            <Col span={18}>
                              <div
                                className="font-medium mb-[1px] cursor-pointer"
                                onClick={() => handleRedirectDetailBot(bot._id)}
                              >
                                {bot.name}
                              </div>
                              <div className={styles.boxStatus}>
                                <div className={'switch-bot'}>
                                  <Switch
                                    onChange={(value) => handleChangeStatus(value, bot._id)}
                                    value={bot?.status === STATUS_BOT.ACTIVE}
                                  />
                                </div>
                              </div>
                            </Col>

                            <Col span={2} className={styles.boxBtnAction}>
                              <div className={styles.iconAction}>
                                <Popover
                                  className={`popover-info-wrap`}
                                  placement="bottom"
                                  content={
                                    <div className={styles.menuAction}>
                                      <div
                                          className={`${styles.itemBtn}`}
                                          onClick={() => handleOpenModelDelete(bot)}
                                      >
                                        <div className={'w-[25px] flex justify-center'}>
                                          <InlineSVG src={Trash} width={12}/>
                                        </div>
                                        Xóa bot
                                      </div>
                                    </div>
                                  }
                                  trigger="click"
                                >
                                  <InlineSVG src={Ellipsis} width={6} />
                                </Popover>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
              ) : (
                <Empty />
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>

      <ModalDeleteDefault
        content={<span>Bạn có chắc chắn muốn xóa bot không?</span>}
        contentBtn={'Xóa Bot'}
        isModalOpen={visibleDeleteBot}
        handleOk={() => setVisibleDeleteBot(!visibleDeleteBot)}
        handleCancel={() => setVisibleDeleteBot(!visibleDeleteBot)}
        handleConfirm={() => handleConfirmDelete()}
        loading={loadingBtnDelete}
      />
    </MainLayout>
  )
}
