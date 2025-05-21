import React from "react"
import { Input } from "antd"
import ErrorMessage from "@/components/ErrorMessage/index.jsx"
import _ from "lodash"
import styles from "./styles.module.scss"

const InputForm = (props) => {
  const {
    label,
    desc = "",
    value,
    type,
    error,
    placeholder,
    rows = 2,
    required = true,
    isPassword = false,
    isTextArea = false,
    isDisabled = false,
    handleChangeData,
    onFocusInputLesson,
    onKeyDown,
  } = props

  return (
    <div className={`input-wrap`}>
      {!_.isEmpty(label) && (
        <>
          <div className={"label-wrap"}>
            {label}
            {required && <span className={"required"}>*</span>}
          </div>
          <span className={styles.desc}>{desc}</span>
        </>
      )}

      {isPassword ? (
        <Input.Password
          className="main-input"
          size={"large"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChangeData(type, e.target.value)}
          onFocus={() => onFocusInputLesson(type)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      ) : isTextArea ? (
        <Input.TextArea
          disabled={isDisabled}
          rows={rows}
          className="main-input"
          size={"large"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChangeData(type, e.target.value)}
          onFocus={() => onFocusInputLesson(type)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      ) : (
        <Input
          className="main-input"
          size={"large"}
          placeholder={placeholder}
          value={value}
          disabled={isDisabled}
          onChange={(e) => handleChangeData(type, e.target.value)}
          onFocus={() => onFocusInputLesson(type)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      )}

      {error && error.length > 0 ? <ErrorMessage message={error} /> : ""}
    </div>
  )
}

export default InputForm
