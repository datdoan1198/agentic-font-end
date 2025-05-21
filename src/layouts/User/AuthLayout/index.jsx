import React from "react"
import "./styles.scss"
import styles from "./styles.module.scss"
import { Col, Row } from "antd"
// import Banner from "@/assets/images/banners/banner1.webp";
import Logo from "@/assets/images/logos/logo_dark.png"

function AuthLayout({ children }) {
  return (
    <Row className={styles.authLoginWrap}>
      <Col span={12} className={styles.bannerWrap}>
        <div className={styles.textWrap}>
          <img src={Logo} alt="AI CSKH" />
          <div className={styles.titleWrap}>AI CSKH</div>
          <div>Tiết kiệm thời gian và chi phí tạo chatbot với AI CSKH.</div>
          <div>
            Chỉ với 5 phút, bạn có thể tạo chatbot thông minh hỗ trợ khách hàng 24/7, tạo chuyển đổi trực tiếp ngay tại
            khung chat.
          </div>
        </div>
        {/* <img src={Banner} alt="" /> */}
      </Col>
      <Col span={12}>{children}</Col>
    </Row>
  )
}

export default AuthLayout
