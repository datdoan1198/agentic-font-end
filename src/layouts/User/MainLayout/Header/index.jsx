import React from "react"
import styles from "./styles.module.scss"
import { Avatar, Col, Popover, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"
import InlineSVG from "react-inlinesvg"
import Robot from "@/assets/images/icons/solid/robot.svg"
import Slider from "@/assets/images/icons/solid/sliders.svg"
import User from "@/assets/images/icons/solid/user.svg"
import Logout from "@/assets/images/icons/solid/right-from-bracket.svg"
import Crow from "@/assets/images/icons/solid/crown.svg"
import { removeAuthToken } from "@/utils/localStorage.js"
import { getNotification } from "@/utils/helper.js"
import _ from "lodash"
import { logoutForUser } from "@/api/user/auth/index.js"
import { useLocation, useNavigate } from "react-router-dom"

export default function Header({ isShowSideBar, handleToggleShowMenu }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logoutForUser()
      .then(() => {
        removeAuthToken()
        window.location.href = `${window.location.href}`
      })
      .catch((error) => {
        getNotification("error", _.get(error, "response.data.message", "Đã xảy ra lỗi! Vui lòng thử lại sau."))
      })
  }

  return (
    <div className={`${styles.boxHeader} ${!isShowSideBar && styles.closeSideBar}`}>
      <Row className={styles.mainHeader}>
        <Col span={12}>
          <InlineSVG onClick={() => handleToggleShowMenu()} src={Slider} width={24} className="cursor-pointer" />
        </Col>
        <Col span={12} className={styles.mainRight}>
          <Popover
            className={`popover-info-wrap`}
            placement="bottomRight"
            content={
              <div className={styles.menuInfoWrap}>
                <div
                  className={`${styles.itemMenu} ${location.pathname === "/bot-chats" && styles.itemMenuActive}`}
                  onClick={() => navigate("/bot-chats")}
                >
                  <div className={"w-[25px] flex justify-center"}>
                    <InlineSVG src={Robot} width={24} />
                  </div>
                  Chatbots
                </div>
                <div
                  className={`${styles.itemMenu} ${location.pathname === "/profile" && styles.itemMenuActive}`}
                  onClick={() => navigate("/profile")}
                >
                  <div className={"w-[25px] flex justify-center"}>
                    <InlineSVG src={User} width={18} />
                  </div>
                  Tài khoản
                </div>
                <div
                  className={`${styles.itemMenu} ${location.pathname === "/service" && styles.itemMenuActive}`}
                  onClick={() => navigate("/service")}
                >
                  <div className={"w-[25px] flex justify-center"}>
                    <InlineSVG src={Crow} width={18} />
                  </div>
                  Gói dịch vụ
                </div>
                <div className={`${styles.itemMenu} ${styles.btnLogout}`} onClick={() => handleLogout()}>
                  <div className={"w-[25px] flex justify-center"}>
                    <InlineSVG src={Logout} width={18} />
                  </div>
                  Đăng xuất
                </div>
              </div>
            }
            trigger="hover"
          >
            <div>
              <Avatar size={45} icon={<UserOutlined />} />
            </div>
          </Popover>
        </Col>
      </Row>
    </div>
  )
}
