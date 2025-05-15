import React from "react"
import styles from "./styles.module.scss"
import {CustomButton} from "@/components/Button"
import InputForm from "@/components/InputForm"
import InputUpload from "../../../../../../components/InputUpload"
import InputColor from "../../../../../../components/InputColor"
import useCustomize from "../../useCustomize"
import InlineSVG from "react-inlinesvg";
import Business from "@/assets/images/icons/solid/building.svg";
import Card from "@/assets/images/icons/solid/cart-shopping.svg";
import Robot from "@/assets/images/icons/solid/robot.svg";
import {Select, Switch} from "antd";
import {DEFAULT_FORM_ORDER} from "@/utils/constants.js";
import ErrorMessage from "@/components/ErrorMessage/index.jsx";

export default function LeftPage() {
    const {
        formData,
        errorFormData,
        loadingUpdate,
        messageError,
        handleChangeData,
        onFocusInputLesson,
        handleSaveCustomize,
    } = useCustomize()

    return (
        <>
            <div className={styles.layoutLeftWrap}>
                <div className={styles.headerWrap}>
                    <span className={styles.title}>Tùy chỉnh</span>
                    <CustomButton onClick={handleSaveCustomize} loading={loadingUpdate}>
                        Lưu
                    </CustomButton>
                </div>
                {messageError && <div>{messageError}</div>}
                <div>
                    <div className={styles.sessionWrap}>
                        <div className={styles.headerSessionWrap}>
                            <div className={styles.icon}>
                                <InlineSVG src={Robot} width={24}/>
                            </div>
                            <div>
                                Thông tin bot
                            </div>
                        </div>

                        <InputForm
                            label="Tên Bot"
                            type="name"
                            value={formData.name}
                            error={errorFormData.name}
                            handleChangeData={handleChangeData}
                            onFocusInputLesson={onFocusInputLesson}
                        />
                        <InputForm
                            label="Mô tả công việc"
                            isTextArea={true}
                            type="description"
                            value={formData.description}
                            error={errorFormData.description}
                            handleChangeData={handleChangeData}
                            onFocusInputLesson={onFocusInputLesson}
                        />
                        <InputUpload
                            label="Nút trò chuyện"
                            type="logo_message"
                            formData={formData}
                            error={errorFormData.logo_message}
                            handleChangeData={handleChangeData}
                            onFocusInputLesson={onFocusInputLesson}
                        />
                        <InputColor
                            label={"Màu sắc"}
                            type="color"
                            value={formData.color}
                            handleChangeData={handleChangeData}
                            onFocusInputLesson={onFocusInputLesson}
                            error={errorFormData.color}
                        />

                    </div>

                    <div className={styles.sessionWrap}>
                        <div className={styles.headerSessionWrap}>
                            <div className={styles.icon}>
                                <InlineSVG src={Business} width={17}/>
                            </div>
                            <div>
                                Thông tin doanh nghiệp
                            </div>
                        </div>

                        <InputForm
                            label="Tên doanh nghiệp"
                            type="name_business"
                            value={formData.name_business}
                            error={errorFormData.name_business}
                            handleChangeData={handleChangeData}
                            onFocusInputLesson={onFocusInputLesson}
                        />

                        <InputUpload
                            label="Logo"
                            type="logo"
                            formData={formData}
                            error={errorFormData.logo}
                            handleChangeData={handleChangeData}
                            onFocusInputLesson={onFocusInputLesson}
                        />
                    </div>

                    <div className={styles.sessionWrap}>
                        <div className={styles.headerSessionWrap}>
                            <div className={styles.icon}>
                                <InlineSVG src={Card} width={22}/>
                            </div>
                            <div>
                                Cấu hình đặt hàng
                            </div>
                        </div>

                        <div className={`input-wrap`}>
                            <div className={"label-wrap"}>
                                Trạng thái bán hàng
                            </div>

                            <div className={'switch-bot'}>
                                <Switch
                                    onChange={(value) => handleChangeData('is_order', value)}
                                    value={formData.is_order}
                                />
                            </div>
                        </div>

                        {
                            formData.is_order &&
                            <div className={`input-wrap`}>
                                <div className={"label-wrap"}>
                                    Thông tin đặt hàng
                                    <span className={"required"}>*</span>
                                </div>

                                <Select
                                    className={`main-select`}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Chọn các thông tin đặt hàng"
                                    value={formData.form_order}
                                    onChange={(value) => handleChangeData('form_order', value)}
                                    options={DEFAULT_FORM_ORDER}
                                />
                                {errorFormData.form_order && errorFormData.form_order.length > 0 ? <ErrorMessage message={errorFormData.form_order} /> : ""}
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}
