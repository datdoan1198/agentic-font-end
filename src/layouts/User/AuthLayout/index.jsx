import React from 'react'
import './styles.scss'
import Logo from '@/assets/images/logos/logo_dark.png'
import BackgroundBot from '@/assets/images/banners/background_bot.png'
import { Col, Row } from 'antd'

function AuthLayout({ children }) {
  return (
    <Row className="relative flex items-center justify-center min-h-screen px-4 py-8 bg-white">
      <Col xs={24} sm={24} md={14} lg={20} xl={16} xxl={11} className="z-10 w-full max-w-5xl">
        <Row className="overflow-hidden bg-white shadow-2xl rounded-2xl min-h-[500px] relative">
          <Col
            xs={0}
            sm={0}
            md={0}
            lg={12}
            xl={12}
            xxl={12}
            className="relative flex flex-col items-center justify-center text-white bg-gradient-to-br from-blue-700 to-purple-400"
          >
            <img src={BackgroundBot} alt="AI.CSKH" className="absolute top-0 left-0 object-cover w-full h-full" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className="relative z-10 py-12 px-14">
            <div className="flex flex-col items-center justify-center mb-10">
              <img src={Logo} alt="AI.CSKH" className="max-w-[200px]" />
              <p className="mb-6 font-semibold text-center text-mainColor text-md">
                Chăm sóc khách hàng với AI thông minh
              </p>
            </div>
            {children}
          </Col>
        </Row>
        <div className="mt-4 text-sm text-center text-gray-500">© 2025 AI CSKH. All rights reserved.</div>
      </Col>
    </Row>
  )
}

export default AuthLayout
