import React from 'react'
import styles from './styles.module.scss'
import InlineSVG from "react-inlinesvg";
import Robot from "@/assets/images/icons/solid/robot.svg";
import {useNavigate} from "react-router-dom";
import Logo from "@/assets/images/logos/zent_logo_dark.png";

export default function SideBar({isShowSideBar}) {
  const navigate = useNavigate();

    return (
        <div className={`${styles.boxSideBar} ${!isShowSideBar && styles.closeBoxSideBar}`}>
            <div className={styles.logoWrap}>
              <img onClick={() => navigate('/')} src={Logo} alt=""/>
            </div>
            <div className={styles.mainSidebar}>
                <div
                    className={`${styles.boxChatBot} ${styles.itemActive}`}
                    onClick={() => navigate('/bot-chats')}
                >
                    <div className={styles.icon}><InlineSVG src={Robot} width={24}/></div> Bot Chats
                </div>
                <div className={styles.groupItemWrap}>
                    {/*<div>Chung</div>*/}
                </div>
            </div>
        </div>
    )
}
