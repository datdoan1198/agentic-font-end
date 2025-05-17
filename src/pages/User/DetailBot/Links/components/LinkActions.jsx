import React from "react"
import {Space, Tooltip} from "antd"
import {CustomButton} from "@/components/Button/index.jsx"
import styles from "../styles.module.scss"
import {Eye, RefreshCcw, Trash2} from "lucide-react"

const LinkActions = ({lickSelect, isLoading, onRefresh, onView, onDelete}) => {
    const renderRefreshIcon = () => {
        if (isLoading) {
            return <RefreshCcw className={`${styles.icon} ${styles.loading}`}/>
        } else {
            return <RefreshCcw className={styles.icon}/>
        }
    }

    return (
        <Space size="small">
            {
                lickSelect ?
                    <Tooltip placement="bottom" title="Đang quét">
                        <CustomButton className={styles.button} variant="secondary" icon={renderRefreshIcon()}/>
                    </Tooltip>:
                    <Tooltip placement="bottom" title="Quét">
                        <CustomButton className={styles.button} variant="secondary" icon={renderRefreshIcon()} onClick={onRefresh}/>
                    </Tooltip>
            }

            <Tooltip placement="bottom" title="Xem chi tiết">
                <CustomButton
                    className={styles.button}
                    variant="secondary"
                    icon={<Eye className={styles.icon}/>}
                    onClick={onView}
                />
            </Tooltip>

            <Tooltip placement="bottom" title="Xóa">
                <CustomButton
                    className={styles.button}
                    variant="secondary"
                    icon={<Trash2 className={styles.icon}/>}
                    onClick={onDelete}
                />
            </Tooltip>
        </Space>
    )
}

export default LinkActions
