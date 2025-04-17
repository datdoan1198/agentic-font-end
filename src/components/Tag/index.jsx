import { Tag } from "antd";
import React from "react";
import styles from "./styles.module.scss";

export default function TagCustom(props) {
  const { color = "default", children, ...others } = props;
  return (
    <Tag className={styles.Tag} color={color} {...others}>
      {children}
    </Tag>
  );
}
