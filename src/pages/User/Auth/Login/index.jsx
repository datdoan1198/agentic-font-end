import React from "react"
import AuthLayout from "@/layouts/User/AuthLayout"
import styles from "./styles.module.scss"
import { Button } from "antd"
import InputForm from "@/components/InputForm/index.jsx"
import Handle from "./handle.js"

function Login() {
  const {
    formData,
    errorFormData,
    loadingLogin,
    messageErrorLogin,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmLogin,
    handleRedirectRoute,
  } = Handle()

  return (
    <AuthLayout>
      <div className={styles.boxLogin}>
        <div className={styles.formLoginWrap}>
          <div className={styles.headerForm}>
            <div className={styles.title}>Đăng nhập</div>
            <div className={styles.description}>Đăng nhập để trải nghiệm ngay bây giờ</div>
            {messageErrorLogin && messageErrorLogin.length > 0 && (
              <div className={styles.messageError}>{messageErrorLogin}</div>
            )}
          </div>

          <div className={styles.formLogin}>
            <InputForm
              placeholder={"Email"}
              type={"email"}
              value={formData.email}
              error={errorFormData.email}
              handleChangeData={(type, value) => handleChangeData(type, value)}
              onFocusInputLesson={(type) => onFocusInputLesson(type)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirmLogin()
              }}
            />

            <InputForm
              placeholder={"Mật khẩu"}
              type={"password"}
              isPassword={true}
              value={formData.password}
              error={errorFormData.password}
              handleChangeData={(type, value) => handleChangeData(type, value)}
              onFocusInputLesson={(type) => onFocusInputLesson(type)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirmLogin()
              }}
            />

            <Button className={styles.btnLogin} onClick={() => handleConfirmLogin()} loading={loadingLogin}>
              Đăng nhập
            </Button>
          </div>

          <div className={styles.tooltipWrap}>
            {/*<div className={styles.btnForgotPassword}>Quên mật khẩu?</div>*/}
            <div className={styles.policyWrap}>
              Bằng cách{" "}
              <span onClick={() => handleRedirectRoute("/register")} className={styles.textActive}>
                Tạo tài khoản
              </span>{" "}
              hoặc Đăng nhập, tôi đồng ý với <span className={styles.textActive}>Thỏa thuận sử dụng Dịch vụ</span> và
              Chính sách Quyền riêng tư của AI CSKH.
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
