import { Space } from "antd";
import React from "react";
import { CustomButton } from "../../../../../components/Button";
import styles from "../styles.module.scss";
import { Eye, RefreshCcw, Trash2 } from "lucide-react";

const LinkActions = ({ onRefresh, onView, onDelete }) => {
  return (
    <Space size="small">
      <CustomButton
        className={styles.button}
        variant="secondary"
        icon={<RefreshCcw className={styles.icon} />}
        onClick={onRefresh}
      />
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
  );
};

export default LinkActions;
