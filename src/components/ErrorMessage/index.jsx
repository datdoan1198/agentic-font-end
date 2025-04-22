import React from "react"
import InlineSVG from "react-inlinesvg"
import IconWarning from "../../assets/images/icons/light/warning.svg"

const ErrorMessage = ({ message }) => {
  return message ? (
    <div className="input-wrap">
      <span className="error">
        <div className="icon">
          <InlineSVG src={IconWarning} width={14} height="auto" />
        </div>
        {message}
      </span>
    </div>
  ) : (
    ""
  )
}

export default ErrorMessage
