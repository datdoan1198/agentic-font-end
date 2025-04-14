import styles from "@/layouts/User/BotLayout/styles.module.scss";
import SideBar from "@/layouts/User/BotLayout/components/Sidebar";
import React from "react";
import {useSelector} from "react-redux";

export default function BotLayout({children}) {
    const isShowSideBar = useSelector(state => state.detailBot.isShowSideBar);

    return (
        <div className={`${styles.boxBotLayout}`}>
            <SideBar />

            <div className={`${styles.boxMain} ${!isShowSideBar && styles.closeSideBar}`}>
                {children}
            </div>
        </div>
    );
}
