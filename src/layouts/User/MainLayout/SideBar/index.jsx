import React from 'react'
import styles from './styles.module.scss'
import InlineSVG from "react-inlinesvg";
import Robot from "@/assets/images/icons/solid/robot.svg";
import {useLocation, useNavigate} from "react-router-dom";
import Logo from "@/assets/images/logos/zent_logo_dark.png";
import User from "@/assets/images/icons/solid/user.svg";
import Crow from "@/assets/images/icons/solid/crown.svg";

export default function SideBar({isShowSideBar}) {
  const navigate = useNavigate();
    const location = useLocation()

    return (
        <div className={`${styles.boxSideBar} ${!isShowSideBar && styles.closeBoxSideBar}`}>
            <div className={styles.logoWrap}>
              <img onClick={() => navigate('/bot-chats')} src={Logo} alt=""/>
            </div>
            <div className={styles.mainSidebar}>
                <div
                    className={`${styles.boxChatBot} ${location.pathname === '/bot-chats' && styles.itemActive}`}
                    onClick={() => navigate('/bot-chats')}
                >
                    <div className={styles.icon}><InlineSVG src={Robot} width={24}/></div> Bot Chats
                </div>
                <div className={styles.groupItemWrap}>
                    <div className={styles.title}>CÀI ĐẶT</div>

                    <div
                        className={`${styles.boxChatBot} ${location.pathname === '/profile' && styles.itemActive}`}
                        onClick={() => navigate('/profile')}
                    >
                        <div className={styles.icon}><InlineSVG src={User} width={24}/></div> Tài khoản
                    </div>

                    <div
                        className={`${styles.boxChatBot} ${location.pathname === '/service' && styles.itemActive}`}
                        onClick={() => navigate('/service')}
                    >
                        <div className={styles.icon}><InlineSVG src={Crow} width={24}/></div> Gói dịch vụ
                    </div>
                </div>
            </div>
        </div>
    )
}
