import React from "react"
import {Input, Tooltip} from "antd"
import ErrorMessage from "@/components/ErrorMessage/index.jsx"
import _ from "lodash"
import styles from "./styles.module.scss"
import Question from "@/assets/images/icons/solid/circle-question.svg";
import InlineSVG from "react-inlinesvg";

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
    isDescription = false,
    description = '',
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
              {
                  isDescription &&
                  <div className={styles.iconQuestion}>
                      <Tooltip placement="top" title={description}>
                          <InlineSVG src={Question} width={16}/>
                      </Tooltip>
                  </div>
              }
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
