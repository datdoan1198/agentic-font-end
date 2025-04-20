import React from 'react'
import styles from './styles.module.scss'
import InlineSVG from "react-inlinesvg";
import Robot from "@/assets/images/icons/solid/robot.svg";
import {useNavigate} from "react-router-dom";

export default function SideBar({isShowSideBar}) {
  const navigate = useNavigate();

    return (
        <div className={`${styles.boxSideBar} ${!isShowSideBar && styles.closeBoxSideBar}`}>
            <div className={styles.logoWrap}></div>
            <div className={styles.mainSidebar}>
                <div
                    className={`${styles.boxChatBot} ${styles.itemActive}`}
                    onClick={() => navigate('/bot-chats')}
                >
                    <div><InlineSVG src={Robot} width={24}/></div> Bot Chats
                </div>
                <div className={styles.groupItemWrap}>
                    {/*<div>Chung</div>*/}
                </div>
            </div>
        </div>
    )
}
