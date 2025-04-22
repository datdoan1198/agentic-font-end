import { useState, useRef, useEffect } from "react"
import { Send, Bot, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TypingIndicator } from "./TypingIndicator"
import { ChatMessage } from "./ChatMessage"
import openAI from "@/api/callOpenAI"
import styles from "./styles.module.scss"
import { useSelector } from "react-redux"

const ChatbotButton = ({ defaultOpen = false }) => {
  const { bot } = useSelector((state) => state.detailBot)
  const { logo, name } = bot

  const msgDefaultBot = bot.welcome_messages?.map((itemWel) => {
    return {
      text: itemWel,
      isBot: true,
    }
  })

  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [messages, setMessages] = useState(msgDefaultBot)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)
  const [isDesktopView, setIsDesktopView] = useState(true)

  useEffect(() => {
    const checkContainerWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setIsDesktopView(containerWidth > 660)
      }
    }

    checkContainerWidth()

    const resizeObserver = new ResizeObserver(checkContainerWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e) => {
    setInputMessage(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      setMessages((prev) => [...prev, { text: inputMessage, isBot: false }])

      const userMessage = inputMessage
      setInputMessage("")

      const response = await openAI(userMessage)
      if (response) {
        setMessages((prev) => [...prev, { text: response, isBot: true }])
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  const buttonVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 28,
        duration: 0.8,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.4 },
    },
  }

  const chatboxVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 30,
        duration: 0.8,
        when: "beforeChildren",
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className={styles.chatbotWrapper} ref={containerRef}>
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className={styles.chatbotBtn}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={buttonVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
          >
            <Bot className={styles.icon} />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            className={`${styles.chatbotPanelContainer} ${isDesktopView ? styles.desktopContainer : ""}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatboxVariants}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerWrapper}>
                <div className={styles.headerTitle}>
                  <img src={logo} alt="logo" className={styles.headerIcon} />
                  <span className={styles.heading}>{name}</span>
                </div>
                <div className={styles.headerControls}>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className={styles.closeButton}
                    whileHover={{ rotate: 90, scale: 1.1, transition: { duration: 0.4 } }} // Slower animation
                    whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
                  >
                    <X className={styles.icon} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <motion.div
              className={styles.messagesContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} isBot={msg.isBot} index={index} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </motion.div>

            {/* Input area */}
            <motion.div
              className={styles.inputContainer}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className={styles.inputWrapper}>
                <input
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  disabled={isLoading}
                  className={styles.textInput}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className={styles.sendButton}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
                >
                  <Send className={styles.sendIcon} />
                </motion.button>
              </div>
              <div className={styles.poweredBy}>
                Powered by <span>AI Agent</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatbotButton
