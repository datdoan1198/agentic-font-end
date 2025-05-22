import React from 'react'
import AuthLayout from '@/layouts/User/AuthLayout'
import { Input } from 'antd'
import Handle from './handle.js'

function Register() {
  const {
    formData,
    errorFormData,
    loadingRegister,
    messageErrorRegister,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmRegister,
    handleRedirectRoute,
  } = Handle()

  return (
    <AuthLayout>
      <div className="w-full">
        <h2 className="mb-1 text-2xl font-bold text-mainColor ">Tạo tài khoản</h2>
        <p className="mb-6 text-sm font-semibold text-gray-500">Đăng ký để trải nghiệm ngay bây giờ</p>
        {messageErrorRegister && messageErrorRegister.length > 0 && (
          <div className="mb-4 text-red-500">{messageErrorRegister}</div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Họ và tên</label>
            <Input
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.name
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Họ và tên"
              value={formData.name}
              onChange={(e) => handleChangeData('name', e.target.value)}
              onFocus={() => onFocusInputLesson('name')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmRegister()}
            />
            {errorFormData.name && <p className="mt-1 text-xs text-red-500">{errorFormData.name}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <Input
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Email của bạn"
              value={formData.email}
              onChange={(e) => handleChangeData('email', e.target.value)}
              onFocus={() => onFocusInputLesson('email')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmRegister()}
            />
            {errorFormData.email && <p className="mt-1 text-xs text-red-500">{errorFormData.email}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu</label>
            <Input.Password
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Mật khẩu của bạn"
              value={formData.password}
              onChange={(e) => handleChangeData('password', e.target.value)}
              onFocus={() => onFocusInputLesson('password')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmRegister()}
            />
            {errorFormData.password && <p className="mt-1 text-xs text-red-500">{errorFormData.password}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <Input.Password
              className={`w-full px-3 py-2 border rounded-md ${
                errorFormData.password_confirm
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Xác nhận mật khẩu"
              value={formData.password_confirm}
              onChange={(e) => handleChangeData('password_confirm', e.target.value)}
              onFocus={() => onFocusInputLesson('password_confirm')}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmRegister()}
            />
            {errorFormData.password_confirm && (
              <p className="mt-1 text-xs text-red-500">{errorFormData.password_confirm}</p>
            )}
          </div>

          <button
            loading={loadingRegister}
            className="w-full h-10 py-2 text-white transition-opacity rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            onClick={() => handleConfirmRegister()}
          >
            Đăng ký
          </button>

          <div className="mt-4 text-sm text-center text-gray-600">
            Đã có tài khoản?{' '}
            <span
              onClick={() => handleRedirectRoute('/login')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Đăng nhập
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
