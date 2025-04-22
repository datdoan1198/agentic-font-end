import { Select } from "antd"
import React from "react"
import styles from "./styles.module.scss"
import _ from "lodash"
export default function InputSelect({
  label,
  type,
  defaultValue = null,
  options = [],
  handleChangeData,
  onFocusInputLesson,
}) {
  return (
    <>
      <div className="input-wrap">
        {!_.isEmpty(label) && <div className={"label-wrap"}>{label}</div>}

        <Select
          defaultValue={defaultValue}
          className={styles.selectWrap}
          onChange={(value) => {
            if (handleChangeData) handleChangeData(type, value)
            if (onFocusInputLesson) onFocusInputLesson(type)
          }}
          options={options}
        />
      </div>
    </>
  )
}
