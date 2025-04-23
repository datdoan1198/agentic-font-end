import React, { useEffect, useState } from "react"
import styles from "../styles/ChatBubble.module.scss"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useSelector } from "react-redux"
import { buttonVariants } from "./ChatbotButton"
import { X } from "lucide-react"

export default function ChatBubble() {
  const { bot } = useSelector((state) => state.detailBot)
  const { logo, name, welcome_messages } = bot

  const [currentMesssageIndex, setCurrentMessageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % welcome_messages.length)
    }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <>
      <LayoutGroup>
        <motion.div
          layout
          initial="initial"
          animate="animate"
          exit="exit"
          variants={buttonVariants(60)}
          className={styles.chatBubbleContainer}
          transition={{
            layout: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={styles.closeButton}
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
          <div className={styles.topWrap}>
            <img src={logo} alt="logo bot" className={styles.logoBot} />
            <span className={styles.nameBot}>{name}</span>
          </div>
          <div className={styles.contentWrap}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMesssageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -1 }}
                transition={{ duration: 0.3 }}
                className={styles.textMessage}
              >
                {welcome_messages[currentMesssageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </LayoutGroup>
    </>
  )
}
