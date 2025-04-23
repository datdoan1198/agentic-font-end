import React from "react"
import { useSelector } from "react-redux"
import styles from "../styles/QuickChat.module.scss"
import { motion } from "framer-motion"
import { buttonVariants } from "./ChatbotButton"

export default function QuickChat() {
  const { bot } = useSelector((state) => state.detailBot)
  const { quick_prompts } = bot
  return (
    <>
      {quick_prompts.map((prompt, index) => {
        return (
          <motion.button
            initial="initial"
            animate="animate"
            exit="exit"
            variants={buttonVariants(80 + (index + 5))}
            className={styles.buttonOutlined}
          >
            {prompt}
          </motion.button>
        )
      })}
    </>
  )
}
