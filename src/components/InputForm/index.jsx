import React from "react"
import { Input } from "antd"
import ErrorMessage from "@/components/ErrorMessage/index.jsx"
import _ from "lodash"

const InputForm = (props) => {
  const {
    label,
    value,
    type,
    error,
    placeholder,
    rows,
    required = true,
    isPassword = false,
    isTextArea = false,
    handleChangeData,
    onFocusInputLesson,
  } = props

  return (
    <div className={`input-wrap`}>
      {!_.isEmpty(label) && (
        <div className={"label-wrap"}>
          {label}
          {required && <span className={"required"}>*</span>}
        </div>
      )}

      {isPassword ? (
        <Input.Password
          className="main-input"
          size={"large"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChangeData(type, e.target.value)}
          onFocus={() => onFocusInputLesson(type)}
        />
      ) : isTextArea ? (
        <Input.TextArea
          rows={rows}
          maxLength={6}
          className="main-input"
          size={"large"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChangeData(type, e.target.value)}
          onFocus={() => onFocusInputLesson(type)}
        />
      ) : (
        <Input
          className="main-input"
          size={"large"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChangeData(type, e.target.value)}
          onFocus={() => onFocusInputLesson(type)}
        />
      )}

      {error && error.length > 0 ? <ErrorMessage message={error} /> : ""}
    </div>
  )
}

export default InputForm
