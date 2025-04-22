import React from "react"
import BotLayout from "@/layouts/User/BotLayout"
import { Splitter } from "antd"
import LeftPage from "./components/LeftPage"
import RightPage from "./components/RightPage"

export default function CustomizeBotPage() {
  return (
    <>
      <BotLayout>
        <Splitter>
          <Splitter.Panel defaultSize="50%" min="30%" max="50%">
            <LeftPage />
          </Splitter.Panel>
          <Splitter.Panel>
            <RightPage />
          </Splitter.Panel>
        </Splitter>
      </BotLayout>
    </>
  )
}
