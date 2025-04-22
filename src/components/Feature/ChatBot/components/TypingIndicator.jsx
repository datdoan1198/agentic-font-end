import { motion } from "framer-motion"
import styles from "./styles.module.scss"

export const TypingIndicator = () => {
  return (
    <motion.div
      className={styles.typingIndicator}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.dotsContainer}>
        <motion.div
          className={`${styles.dot} ${styles.dot1}`}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className={`${styles.dot} ${styles.dot2}`}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        ></motion.div>
        <motion.div
          className={styles.dot}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  )
}
