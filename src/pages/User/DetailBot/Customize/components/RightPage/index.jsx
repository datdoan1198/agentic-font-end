import React from "react"
import ChatBot from "../../../../../../components/Feature/ChatBot"
import { Segmented } from "antd"
import styles from "./styles.module.scss"
import { Monitor, Smartphone } from "lucide-react"
import styleCustomize from "../../styles.module.scss"
export default function RightPage() {
  const options = [
    {
      label: (
        <div className={styles.itemSegmentWrap}>
          <Monitor />
          <span>Desktop</span>
        </div>
      ),
      value: "desktop",
    },
    {
      label: (
        <div className={styles.itemSegmentWrap}>
          <Smartphone />
          <span>Mobile</span>
        </div>
      ),
      value: "mobile",
    },
  ]
  return (
    <>
      <div className={styleCustomize.container}>
        <div className={styleCustomize.headerWrap}>
          <Segmented defaultValue="desktop" size="large" options={options} onChange={(value) => {}} />
        </div>
        <ChatBot />
      </div>
    </>
  )
}
