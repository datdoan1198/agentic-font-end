import React from "react"
import ChatbotButton from "./components/ChatbotButton"
import styles from "./styles/ChatBot.module.scss"

export default function ChatBot() {
  return (
    <div className={styles.chatBotContainer}>
      <ChatbotButton defaultOpen={false} />
    </div>
  )
}
