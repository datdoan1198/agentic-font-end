import React from 'react'
import AuthLayout from '@/layouts/User/AuthLayout'
import { Input } from 'antd'
import Handle from './handle.js'

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
      <div className="w-full">
        <h2 className="mb-1 text-2xl font-bold text-mainColor t">Đăng nhập</h2>
        <p className="mb-6 text-xs font-semibold text-gray-500">
          Truy cập an toàn vào bảng điều khiển AI CSKH của bạn.
        </p>
        {messageErrorLogin && messageErrorLogin.length > 0 && (
          <div className="mb-4 text-red-500">{messageErrorLogin}</div>
        )}
        <div className="space-y-4">
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
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmLogin()}
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
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmLogin()}
            />
            {errorFormData.password && <p className="mt-1 text-xs text-red-500">{errorFormData.password}</p>}
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="mr-2 text-blue-600 rounded focus:ring-blue-500" />
              <label htmlFor="remember-me" className="text-sm text-gray-600">
                Ghi nhớ
              </label>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button
            loading={loadingLogin}
            className="w-full h-10 py-2 text-white transition-opacity rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            onClick={() => handleConfirmLogin()}
          >
            Đăng nhập
          </button>

          <div className="mt-4 text-sm text-center text-gray-600">
            Không có tài khoản?{' '}
            <span
              onClick={() => handleRedirectRoute('/register')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Đăng ký
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
