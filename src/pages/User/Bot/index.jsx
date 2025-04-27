import React from "react"
import MainLayout from "@/layouts/User/MainLayout/index.jsx"
import styles from "./styles.module.scss"
import './styles.scss';
import {Button, Col, Empty, Modal, Popover, Row, Switch, Tooltip, Upload, message} from "antd"
import InlineSVG from "react-inlinesvg"
import Robot from "@/assets/images/icons/solid/robot.svg"
import RoTate from "@/assets/images/icons/solid/right-left.svg"
import Ellipsis from "@/assets/images/icons/solid/ellipsis-vertical.svg"
import Trash from "@/assets/images/icons/solid/trash.svg"
import LogoDefault from "@/assets/images/logos/logo_default.png"
import InputForm from "@/components/InputForm/index.jsx"
import Handle from "@/pages/User/Bot/handle.js"
import Loading from "@/components/Loading/index.jsx"
import ModalDeleteDefault from "@/components/ModalDelete";
import {STATUS_BOT} from "@/utils/constants.js";
import { InboxOutlined } from '@ant-design/icons';
import InputUpload from "@/components/InputUpload/index.jsx";
import InputColor from "@/components/InputColor/index.jsx";

const { Dragger } = Upload;

export default function Bot() {
    const {
        dataForm, errorDataForm, botChats, loadingListBot, loadingBtnSubmitUrl,
        visibleDeleteBot, setVisibleDeleteBot, loadingBtnDelete,
        visibleCreateBot, setVisibleCreateBot, isCreateUrl, setIsCreateUrl,
        handleChangeData, onFocusInputLesson, handleConfirmSubmitLink, handleRedirectDetailBot, handleCreateBotWithFile,
        handleOpenModelDelete, handleConfirmDelete, handleChangeStatus
    } = Handle()

    const props = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.xls,.xlsx',
        beforeUpload: (file) => {
            const isExcel = file.type === 'application/vnd.ms-excel' ||
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isExcel) {
                message.error('Only Excel files (.xls, .xlsx) are allowed!');
                return Upload.LIST_IGNORE;
            }

            handleChangeData('file', file)
            return false;
        },
        onRemove: () => {
            handleChangeData('file', null)
        }
    };

    return (
        <MainLayout>
            <div className={styles.boxBotChats}>
                <div className={styles.boxFilterWrap}>
                    <Button
                        className={styles.btnAddBot}
                        loading={loadingBtnSubmitUrl}
                        onClick={() => setVisibleCreateBot(true)}
                    >
                        <InlineSVG src={Robot} width={24}/>
                        Thêm Bot
                    </Button>
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
                                                            {
                                                                bot.favicon ?
                                                                <img className={styles.imgWrap} src={bot.favicon} alt=""/> :
                                                                <img className={styles.imgWrap} src={LogoDefault} alt=""/>

                                                            }
                                                        </Col>

                                                        <Col span={18}>
                                                            <div
                                                                className="font-medium text-[16px] mb-[1px] cursor-pointer"
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
                                                                                <div
                                                                                    className={'w-[25px] flex justify-center'}>
                                                                                    <InlineSVG src={Trash} width={12}/>
                                                                                </div>
                                                                                Xóa bot
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    trigger="click"
                                                                >
                                                                    <InlineSVG src={Ellipsis} width={6}/>
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
                                <Empty/>
                            )}
                        </>
                    ) : (
                        <Loading/>
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

            <Modal
                className={`general-dialog-wrap`}
                open={visibleCreateBot}
                onOk={() => setVisibleCreateBot(!visibleCreateBot)}
                onCancel={() => setVisibleCreateBot(!visibleCreateBot)}
                footer={false}
                closable={false}
                width={600}
                centered
            >
                <div className={styles.boxFormSubmitLink}>
                    <div className={styles.headerForm}>
                        <div className={styles.title}>
                            Tạo bot bằng {isCreateUrl ? 'đường dẫn' : 'file'}
                        </div>
                        <div className={styles.iconWrap} onClick={() => setIsCreateUrl(!isCreateUrl)}>
                            <Tooltip
                                placement="top"
                                title={`Tạo bằng ${!isCreateUrl ? 'đường dẫn' : 'file'}`}
                            >
                                <InlineSVG src={RoTate} width={16}/>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={styles.formSubmitLink}>
                        {
                            isCreateUrl?
                                <InputForm
                                    placeholder={"Nhập địa chỉ Website"}
                                    type={"url"}
                                    value={dataForm.url}
                                    error={errorDataForm.url}
                                    handleChangeData={(type, value) => handleChangeData(type, value)}
                                    onFocusInputLesson={(type) => onFocusInputLesson(type)}
                                />:
                                <>
                                    <InputForm
                                        label="Tên doanh nghiệp"
                                        placeholder={"Nhập tên doanh nghiệp"}
                                        type={"name"}
                                        value={dataForm.name}
                                        error={errorDataForm.name}
                                        handleChangeData={(type, value) => handleChangeData(type, value)}
                                        onFocusInputLesson={(type) => onFocusInputLesson(type)}
                                    />
                                    <InputUpload
                                        label="Logo"
                                        type="logo"
                                        formData={dataForm}
                                        error={errorDataForm.logo}
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
                                        label={"Màu sắc"}
                                        type="color"
                                        value={dataForm.color}
                                        handleChangeData={handleChangeData}
                                        onFocusInputLesson={onFocusInputLesson}
                                        error={errorDataForm.color}
                                    />

                                    <InputForm
                                        label="Mô tả"
                                        isTextArea={true}
                                        type="description"
                                        placeholder={"Nhập mô tả doanh nghiệp"}
                                        value={dataForm.description}
                                        error={errorDataForm.description}
                                        handleChangeData={handleChangeData}
                                        onFocusInputLesson={onFocusInputLesson}
                                    />

                                    <div className={`input-wrap`}>
                                        <div className={"label-wrap"}>
                                            File <span className={"required"}>*</span>
                                        </div>
                                        <Dragger {...props}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Vui lòng tải lên tệp định dạng excel (tối đa 10MB/tệp)</p>
                                        </Dragger>
                                    </div>
                                </>
                        }

                        <div className={styles.btnWrap}>
                            <Button
                                loading={loadingBtnSubmitUrl}
                                onClick={
                                    isCreateUrl ?
                                    () => handleConfirmSubmitLink():
                                    () => handleCreateBotWithFile()
                                }
                                className={styles.btnConfirm}
                            ><InlineSVG src={Robot} width={24}/>
                                Tạo Bot
                            </Button>

                        </div>
                    </div>
                </div>
            </Modal>
        </MainLayout>
    )
}
