import React from "react";
import AuthLayout from "@/layouts/User/AuthLayout";
import {Button, Input} from "antd";
import Handle from "./handle.js";

function ForgotPassword() {
  const {
    formData,
    errorFormData,
    loadingForgotPassword,
    messageErrorForgotPassword,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmForgotPassword,
    handleRedirectRoute,
  } = Handle();

  return (
    <AuthLayout>
      <div className="w-full">
        <h2 className="mb-2 text-2xl font-semibold text-mainColor">Quên mật khẩu</h2>
        <p className="mb-6 text-gray-500">Nhập email để đặt lại mật khẩu của bạn</p>

        {messageErrorForgotPassword && messageErrorForgotPassword.length > 0 && (
          <div className="mb-4 text-red-500">{messageErrorForgotPassword}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <Input
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder="Email của bạn"
              value={formData.email}
              onChange={(e) => handleChangeData("email", e.target.value)}
              onFocus={() => onFocusInputLesson("email")}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmForgotPassword()}
            />
            {errorFormData.email && <p className="mt-1 text-xs text-red-500">{errorFormData.email}</p>}
          </div>

          <button
            loading={loadingForgotPassword}
            className="w-full h-10 py-2 text-white transition-opacity rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            onClick={() => handleConfirmForgotPassword()}
          >
            Đặt lại mật khẩu
          </button>

          <div className="mt-4 text-sm text-center text-gray-600">
            Quay lại{" "}
            <span
              onClick={() => handleRedirectRoute("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Đăng nhập
            </span>
          </div>

          <div className="mt-2 text-xs text-center text-gray-500">
            Nếu bạn gặp khó khăn, vui lòng liên hệ{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">Hỗ trợ khách hàng</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
