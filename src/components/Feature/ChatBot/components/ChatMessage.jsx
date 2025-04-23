import { motion } from "framer-motion"
import styles from "../styles/styles.module.scss"
import { useSelector } from "react-redux"

export const ChatMessage = ({ message, isBot, index }) => {
  const { bot } = useSelector((state) => state.detailBot)
  const messageVariants = {
    hidden: {
      opacity: 0,
      x: isBot ? -20 : 20,
      y: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.15 * (index % 3),
      },
    },
  }

  return (
    <motion.div
      className={`${styles.messageWrapper} ${isBot ? styles.botMessage : styles.userMessage}`}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      {isBot && (
        <div className={`${styles.avatarContainer} ${styles.botAvatar}`}>
          <img src={bot.logo} className={styles.botAvatarIcon} />
        </div>
      )}

      <div className={`${styles.messageBubble} ${isBot ? styles.botBubble : styles.userBubble}`}>
        <p className={styles.messageText}>{message}</p>
      </div>

      {/* {!isBot && (
        <div className={`${styles.avatarContainer} ${styles.userAvatar}`}>
          <User className={styles.userAvatarIcon} />
        </div>
      )} */}
    </motion.div>
  )
}
