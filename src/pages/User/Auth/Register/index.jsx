import React from "react";
import AuthLayout from "@/layouts/User/AuthLayout";
import styles from "./styles.module.scss";
import InputForm from "@/components/InputForm/index.jsx";
import {Button} from "antd";
import Handle from "./handle.js";

function Register() {
    const {
        formData, errorFormData, loadingRegister, messageErrorRegister,
        handleChangeData, onFocusInputLesson, handleConfirmRegister, handleRedirectRoute
    } = Handle()

    return (
        <AuthLayout>
            <div className={styles.boxRegister}>
                <div className={styles.formRegisterWrap}>
                    <div className={styles.headerForm}>
                        <div className={styles.title}>Tạo tài khoản</div>
                        <div className={styles.description}>Đăng ký để trải nghiệm ngay bây giờ</div>
                    </div>

                    <div className={styles.formRegister}>
                        <InputForm
                            placeholder={'Họ và tên'}
                            type={'name'}
                            value={formData.name}
                            error={errorFormData.name}
                            handleChangeData={(type, value) => handleChangeData(type, value)}
                            onFocusInputLesson={(type) => onFocusInputLesson(type)}
                        />

                        <InputForm
                            placeholder={'Email'}
                            type={'email'}
                            value={formData.email}
                            error={errorFormData.email}
                            handleChangeData={(type, value) => handleChangeData(type, value)}
                            onFocusInputLesson={(type) => onFocusInputLesson(type)}
                        />

                        <InputForm
                            placeholder={'Mật khẩu'}
                            type={'password'}
                            isPassword={true}
                            value={formData.password}
                            error={errorFormData.password}
                            handleChangeData={(type, value) => handleChangeData(type, value)}
                            onFocusInputLesson={(type) => onFocusInputLesson(type)}
                        />

                        <InputForm
                            placeholder={'Xác nhận mật khẩu'}
                            type={'password_confirm'}
                            isPassword={true}
                            value={formData.password_confirm}
                            error={errorFormData.password_confirm}
                            handleChangeData={(type, value) => handleChangeData(type, value)}
                            onFocusInputLesson={(type) => onFocusInputLesson(type)}
                        />

                        <Button
                            className={styles.btnRegister}
                            onClick={() => handleConfirmRegister()}
                            loading={loadingRegister}
                        >Đăng ký
                        </Button>
                    </div>

                    <div className={styles.tooltipWrap}>
                        <div className={styles.policyWrap}>Bằng cách <span onClick={() => handleRedirectRoute('/login')} className={styles.textActive}>Đăng nhập</span> hoặc Đăng ký, tôi đồng ý với <span className={styles.textActive}>Thỏa thuận sử dụng Dịch vụ</span> và Chính sách Quyền riêng tư của AI Chat .</div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Register;
