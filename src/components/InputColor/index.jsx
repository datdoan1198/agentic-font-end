import React from "react"
import { cyan, generate, green, presetPalettes, red } from "@ant-design/colors"
import { Col, ColorPicker, Divider, Row, theme } from "antd"
import _ from "lodash"
import styles from "./styles.module.scss"
function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map(([label, colors]) => ({ label, colors, key: label }))
}
import { ColorMain } from "@/utils/constants.js"

const HorizontalLayoutDemo = ({ type, value, handleChangeData, onFocusInputLesson }) => {
  const { token } = theme.useToken()
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    cyan,
  })
  const customPanelRender = (_, { components: { Picker, Presets } }) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  )
  return (
    <ColorPicker
      className={styles.colorWrap}
      size="large"
      defaultValue={ColorMain}
      value={value}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      format="hex"
      panelRender={customPanelRender}
      onChange={(color) => {
        if (handleChangeData) handleChangeData(type, color.toHexString())
        if (onFocusInputLesson) onFocusInputLesson(type)
      }}
    />
  )
}

export default function InputColor({
  label,
  desc = "Chọn màu có sẵn hoặc nhập mã màu",
  type,
  handleChangeData,
  onFocusInputLesson,
  value,
}) {
  return (
    <>
      <div className="input-wrap">
        {!_.isEmpty(label) && <div className="label-wrap">{label}</div>}
        {!_.isEmpty(desc) && <div className="desc-wrap">{desc}</div>}
        <HorizontalLayoutDemo
          value={value}
          type={type}
          handleChangeData={handleChangeData}
          onFocusInputLesson={onFocusInputLesson}
        />
      </div>
    </>
  )
}
