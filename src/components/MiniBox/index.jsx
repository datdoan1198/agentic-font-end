import React from "react";
import styles from './styles.module.scss'

function MiniBox(props) {
    const {
        isActive = false,
        onClick = () => { },
        content = "nội dung",
        icon = ""
    } = props
    return (
        <div onClick={onClick} className={`${isActive ? styles.active : ""} ${styles.wrapper}`}>
            <div className={`${isActive ? styles.iconActive : ""} ${styles.icon}`}>{icon}</div>
            <p className={`${isActive ? "text-[#252f4a]" : "text-[#78829d]"} whitespace-nowrap overflow-hidden overflow-ellipsis text-xs font-bold `}>{content}</p>
        </div>
    )
}

export default MiniBox;