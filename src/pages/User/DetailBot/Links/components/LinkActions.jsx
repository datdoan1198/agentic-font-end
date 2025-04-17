import React from "react"
import { Space, Tooltip } from "antd"
import { CustomButton } from "../../../../../components/Button"
import styles from "../styles.module.scss"
import { Eye, RefreshCcw, Trash2 } from "lucide-react"

const LinkActions = ({ isLoading, onRefresh, onView, onDelete }) => {
  const renderRefreshIcon = () => {
    if (isLoading) {
      return <RefreshCcw className={`${styles.icon} ${styles.loading}`} />
    } else {
      return <RefreshCcw className={styles.icon} />
    }
  }

  return (
    <Space size="small">
      <Tooltip placement="left" title="Quét lại">
        <CustomButton className={styles.button} variant="secondary" icon={renderRefreshIcon()} onClick={onRefresh} />
      </Tooltip>
      <CustomButton
        className={styles.button}
        variant="secondary"
        icon={<Eye className={styles.icon} />}
        onClick={onView}
      />
      <CustomButton
        className={styles.button}
        variant="secondary"
        icon={<Trash2 className={styles.icon} />}
        onClick={onDelete}
      />
    </Space>
  )
}

export default LinkActions
