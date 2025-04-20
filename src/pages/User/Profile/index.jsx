import React from 'react'
import MainLayout from "@/layouts/User/MainLayout/index.jsx";
import InputForm from "@/components/InputForm/index.jsx";
import styles from './styles.module.scss'
import {Button} from "antd";
import Handle from './handle.js'

export default function Profile() {
  const {
    authUser,
    dataInfo, errorDataInfo, loadingInfo,
    dataChangePassword, errorDataChangePassword, loadingChangePassword,
    handleChangeDataInfo, onFocusInputLessonInfo, handleConfirmSaveInfo,
    handleChangePassword, onFocusInputLessonChangePassword, handleConfirmSaveChangePassword,
  } = Handle()

  return (
    <MainLayout>
      <div className={styles.formWrap}>
        <div className={styles.titleWrap}>
          Tài khoản
        </div>

        <div className={styles.form}>
          <InputForm
            label={'Họ và tên'}
            placeholder={'Nhập họ và tên'}
            type={'name'}
            value={dataInfo.name}
            error={errorDataInfo.name}
            handleChangeData={(type, value) => handleChangeDataInfo(type, value)}
            onFocusInputLesson={(type) => onFocusInputLessonInfo(type)}
          />

          <InputForm
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            isDisabled={true}
            value={authUser.email}
          />


          <Button
            className={styles.btnSave}
            onClick={() => handleConfirmSaveInfo()}
            loading={loadingInfo}
          >Cập nhật
          </Button>
        </div>
      </div>

      <div className={styles.formWrap}>
        <div className={styles.titleWrap}>
          Đổi mật khẩu
        </div>

        <div className={styles.form}>
          <InputForm
            isPassword={true}
            label={'Mật khẩu mới'}
            placeholder={'Nhập mật khẩu'}
            type={'password'}
            value={dataChangePassword.password}
            error={errorDataChangePassword.password}
            handleChangeData={(type, value) => handleChangePassword(type, value)}
            onFocusInputLesson={(type) => onFocusInputLessonChangePassword(type)}
          />

          <InputForm
            isPassword={true}
            label={'Nhập lại mật khẩu'}
            placeholder={'Nhập lại mật khẩu'}
            type={'password_confirm'}
            value={dataChangePassword.password_confirm}
            error={errorDataChangePassword.password_confirm}
            handleChangeData={(type, value) => handleChangePassword(type, value)}
            onFocusInputLesson={(type) => onFocusInputLessonChangePassword(type)}
          />
        </div>



        <Button
          className={styles.btnSave}
          onClick={() => handleConfirmSaveChangePassword()}
          loading={loadingChangePassword}
        >Thay đổi mật khẩu
        </Button>
      </div>
    </MainLayout>
  )
}
