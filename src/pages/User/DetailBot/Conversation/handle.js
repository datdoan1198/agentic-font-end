import {useEffect, useRef, useState} from "react";
import {getListConversations, getListMessageOfConversation} from "@/api/user/conversation/index.js";
import {useSelector} from "react-redux";

export default function Handle() {
  const bot = useSelector((state) => state.detailBot.bot);
  const options = [
    {label: 'Tất cả tin nhắn', value: 'ALL'},
    {label: 'Website', value: 'WEBSITE'},
    {label: 'Messager', value: 'MESSAGE_FB'}
  ]
  const [typeMessage, setTypeMessage] = useState('ALL');
  const [conversations, setConversations] = useState([])
  const [conversation, setConversation] = useState({})
  const [loadingConversation, setLoadingConversation] = useState(false)
  const [messages, setMessages] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(true)
  const bottomRef = useRef(null);

  useEffect(() => {
    handleGetListConversation()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGetListConversation = () => {
    setLoadingConversation(true)
    getListConversations(bot._id).then((res) => {
      setConversations(res.data.data.conversations)
      if (res.data.data.conversations.length > 0) {
        const conversation = res.data.data.conversations[0]
        setConversation(conversation)
        handleGetListMessageOfConversation(conversation._id)
      } else {
        setLoadingMessage(false)
      }
    }).catch(() => {
      setConversation([])
    }).finally(() => setLoadingConversation(false))
  }

  const handleGetListMessageOfConversation = (conversation_id) => {
    setLoadingMessage(true)
    getListMessageOfConversation(bot._id, conversation_id).then((res) => {
      setMessages(handleReversedMessages(res.data.data.messages))
    }).catch(() => {
      setConversation([])
    }).finally(() => setLoadingMessage(false))
  }

  const handleReversedMessages = (messages) => {
    return [...messages].reverse();
  }

  const handleSelectConversation = (conversation) => {
    setConversation(conversation)
    handleGetListMessageOfConversation(conversation._id)
  }

  return {
    options, typeMessage, conversations, loadingConversation,
    messages, loadingMessage, conversation, bot, bottomRef,
    setTypeMessage, handleSelectConversation
  }

}
