import React from 'react'
import AuthLayout from '@/layouts/User/AuthLayout'
import { Input } from 'antd'
import Handle from './handle.js'

function ChangePassword() {
  const {
    formData,
    errorFormData,
    loadingChangePassword,
    messageErrorChangePassword,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmChangePassword,
    handleRedirectRoute,
  } = Handle()

  return (
    <AuthLayout>
      <div className="w-full">
        <h2 className="mb-1 text-2xl font-bold text-mainColor">Thay đổi mật khẩu</h2>
        <p className="mb-6 text-xs font-semibold text-gray-500">Cập nhật mật khẩu để bảo vệ tài khoản của bạn.</p>
        {messageErrorChangePassword && messageErrorChangePassword.length > 0 && (
          <div className="mb-4 text-red-500">{messageErrorChangePassword}</div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
            <Input.Password
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.current_password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Mật khẩu hiện tại của bạn"
              value={formData.current_password}
              onChange={(e) => handleChangeData('current_password', e.target.value)}
              onFocus={() => onFocusInputLesson('current_password')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmChangePassword()}
            />
            {errorFormData.current_password && (
              <p className="mt-1 text-xs text-red-500">{errorFormData.current_password}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <Input.Password
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.new_password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Mật khẩu mới của bạn"
              value={formData.new_password}
              onChange={(e) => handleChangeData('new_password', e.target.value)}
              onFocus={() => onFocusInputLesson('new_password')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmChangePassword()}
            />
            {errorFormData.new_password && <p className="mt-1 text-xs text-red-500">{errorFormData.new_password}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
            <Input.Password
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.confirm_new_password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Xác nhận mật khẩu mới"
              value={formData.confirm_new_password}
              onChange={(e) => handleChangeData('confirm_new_password', e.target.value)}
              onFocus={() => onFocusInputLesson('confirm_new_password')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmChangePassword()}
            />
            {errorFormData.confirm_new_password && (
              <p className="mt-1 text-xs text-red-500">{errorFormData.confirm_new_password}</p>
            )}
          </div>

          <button
            loading={loadingChangePassword}
            className="w-full h-10 py-2 text-white transition-opacity rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            onClick={() => handleConfirmChangePassword()}
          >
            Cập nhật mật khẩu
          </button>

          <div className="mt-4 text-sm text-center text-gray-600">
            <span onClick={() => handleRedirectRoute('/')} className="text-blue-600 cursor-pointer hover:underline">
              Quay lại trang chủ
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ChangePassword
