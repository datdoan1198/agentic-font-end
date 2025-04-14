import React from 'react'
import MainLayout from "@/layouts/User/MainLayout/index.jsx";
import styles from './styles.module.scss'
import {Avatar, Button, Col, Empty, Popover, Row, Steps} from "antd";
import InlineSVG from "react-inlinesvg";
import Robot from "@/assets/images/icons/solid/robot.svg";
import InputForm from "@/components/InputForm/index.jsx";
import Handle from "@/pages/User/Bot/handle.js";
import Loading from "@/components/Loading/index.jsx";

export default function Bot() {
    const {
        dataForm, loadingStep, errorDataForm, itemStep, botChats, loadingListBot, loadingBtnSubmitUrl,
        handleChangeData, onFocusInputLesson, handleConfirmSubmitLink, handleRedirectDetailBot
    } = Handle()

    return(
        <MainLayout>
            <div className={styles.boxBotChats}>
                <div className={styles.boxFilterWrap}>
                    <Popover
                        placement="leftBottom"
                        content={
                            <div className={styles.boxFormSubmitLink}>
                                <div className={styles.formSubmitLink}>
                                    <InputForm
                                        placeholder={'Nhập địa chỉ Website'}
                                        type={'url'}
                                        value={dataForm.url}
                                        error={errorDataForm.url}
                                        handleChangeData={(type, value) => handleChangeData(type, value)}
                                        onFocusInputLesson={(type) => onFocusInputLesson(type)}
                                    />

                                    <Button
                                        onClick={() => handleConfirmSubmitLink()}
                                        className={styles.btnConfirm}
                                    ><InlineSVG src={Robot} width={24}/>Tạo Bot
                                    </Button>
                                </div>

                                <Steps
                                    current={loadingStep}
                                    direction="vertical"
                                    items={itemStep}
                                />
                            </div>
                        }
                        trigger="click"
                    >
                        <Button
                            className={styles.btnAddBot}
                            loading={loadingBtnSubmitUrl}
                        ><InlineSVG src={Robot} width={24}/>Thêm Bot
                        </Button>
                    </Popover>
                </div>

                <div>
                    {
                        !loadingListBot ?
                        <>
                            {
                                botChats && botChats.length > 0 ?
                                <Row gutter={10}>
                                    {
                                        botChats.map((bot) => {
                                            return (
                                                <Col key={bot._id} span={8}>
                                                    <div className={styles.itemBotWrap}>
                                                        <Row
                                                            className={styles.mainWrap}
                                                            onClick={() => handleRedirectDetailBot(bot._id)}
                                                        >
                                                            <Col span={4}>
                                                                <Avatar size={50} src={bot.favicon} />
                                                            </Col>

                                                            <Col span={20}>
                                                                <div className="font-bold mb-[1px]">{bot.name}</div>
                                                            </Col>
                                                        </Row>

                                                        <Row className={styles.btnActionWrap}>
                                                            <Col span={12} className={styles.btnItem}>
                                                                Change Status
                                                            </Col>

                                                            <Col span={12} className={styles.btnItem}>
                                                                <Button>Delete</Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>:
                                <Empty />
                            }
                        </> : <Loading/>
                    }
                </div>
            </div>
        </MainLayout>
    )
}
