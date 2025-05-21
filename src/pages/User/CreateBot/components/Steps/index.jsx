import React from "react"
import { Steps } from "antd"
import styles from "../../styles.module.scss"

const description = "This is a description."

const BotSteps = ({ currentStep }) => {
  return (
    <Steps
      direction="vertical"
      current={currentStep}
      className={styles.steps}
      items={[
        {
          title: "Thông tin bot",
          description,
        },
        {
          title: "Thông tin tri thức",
          description,
        },
        {
          title: "Thông tin doanh nghiệp",
          description,
        },
      ]}
    />
  )
}
export default BotSteps
