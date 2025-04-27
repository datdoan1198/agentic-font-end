import styles from "./styles.module.scss";
import InlineSVG from "react-inlinesvg";
import Rotate from "@/assets/images/icons/solid/rotate.svg";
import Minus from "@/assets/images/icons/solid/minus.svg";
import {Button, Input} from "antd";
import Send from "@/assets/images/icons/solid/paper-plane-top.svg";
import React, {useEffect, useRef, useState} from "react";
import {activeSendMessage, getInfoBotOfChat} from "@/api/user/chat/index.js";
import _ from "lodash";
import {getAllMessageFlowConversation} from "@/api/user/conversation/index.js";

export default function ChatBox({botId}) {
    const [isShowFormChat, setIsShowFormChat] = useState(false)
    const [sendMessage, setSendMessage] = useState('')
    const [loadingSendMessage, setLoadingSendMessage] = useState('')
    const [textSending, setTextSending] = useState('')
    const [messages, setMessages] = useState([])
    const [bot, setBot] = useState({})
    const bottomRef = useRef(null);
    const conversation_id = localStorage.getItem(`bot_${botId}`)

    useEffect(() => {
        getInfoBotOfChat(botId).then((res) => {
            setBot(res.data.data)
        })
        .catch(() => {
            setBot({})
        })
    }, [botId])

    useEffect(() => {
        if (isShowFormChat && conversation_id) {
            handleGetAllMessageFlowConversation()
        }
        isShowFormChat && bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [isShowFormChat]);


    const handleGetAllMessageFlowConversation = () => {
        getAllMessageFlowConversation(botId, conversation_id).then((res) => {
            setMessages(res.data.data.messages)
        }).catch(() => {
            handleReloadConversation()
        })
    }

    const handleSendMessage = () => {
        if (!loadingSendMessage && sendMessage) {
            const data = {
                send_message: sendMessage,
                ...(conversation_id && {conversation_id})
            }
            setLoadingSendMessage(true)
            setSendMessage('')
            setTextSending(sendMessage)
            activeSendMessage(botId, data).then((res) => {
                localStorage.setItem(`bot_${botId}`, res.data.data.conversation_id)
                setMessages(res.data.data.messages)
            }).catch(() => {
                setMessages([])
            }).finally(() => {
                setTextSending('')
                setLoadingSendMessage(false)
            })
        }
    }

    const handleReloadConversation = () => {
        localStorage.removeItem(`bot_${botId}`)
        setMessages([])
    }

    return (
        <>
            {
                !_.isEmpty(bot) &&
                <div className={styles.boxChat}>
                    <div
                        className={`${styles.boxIconChat} ${isShowFormChat && styles.boxIconChatClose}`}
                        onClick={() => setIsShowFormChat(!isShowFormChat)}
                    >
                        <div className={styles.imgWrap} style={{background: bot?.config_bot?.color}}>
                            <img src={bot?.config_bot?.logo_message} alt=""/>
                        </div>
                    </div>

                    <div className={`${styles.boxLayoutChat} ${isShowFormChat && styles.boxLayoutChatShow}`}>
                        <div className={styles.headerLayout} style={{background: bot?.config_bot?.color}}>
                            <div className={styles.logoWrap}>
                                <div className={styles.boxImg}>
                                    <div className={styles.imgWrap}>
                                        <img src={bot.favicon} alt=""/>
                                    </div>
                                    <div className={styles.name}>{bot.name}</div>
                                </div>
                                <div className={styles.btnAction}>
                                    <div
                                        className={styles.btnItem}
                                        onClick={() => handleReloadConversation()}
                                    >
                                        <InlineSVG src={Rotate} width={14}/>
                                    </div>

                                    <div
                                        className={styles.btnItem}
                                        onClick={() => setIsShowFormChat(!isShowFormChat)}
                                    >
                                        <InlineSVG src={Minus} width={14}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.messageWrap}>
                            <div ref={bottomRef}/>
                            {
                                loadingSendMessage &&
                                <>
                                    <div className={`${styles.itemMessage}`}>
                                        <div className={styles.itemMessage}>
                                            <div className={`${styles.iconMessage}`}>
                                                <img src={bot.favicon} alt=""/>
                                            </div>
                                            <div className={`${styles.contextWrap}`}>
                                                <div className={styles.contextItem}>
                                                    <div className={styles.loadingSendMessage}>

                                                        <div className={styles.dot}></div>
                                                        <div className={styles.dot}></div>
                                                        <div className={styles.dot}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${styles.itemMessage} ${styles.itemRight}`}>
                                        <div className={`${styles.contextWrap} ${styles.contextUserWrap}`}>
                                            <div className={`${styles.contextItem} ${styles.contextItemUser}`}>{textSending}</div>
                                        </div>
                                    </div>
                                </>
                            }

                            {
                                messages  && messages.length > 0 ?
                                <>
                                {
                                    messages.map((message) => {
                                        return (
                                            <div key={message._id} className={`${styles.itemMessage} ${message.type === 'USER' && styles.itemRight}`}>
                                                {
                                                    message.type === 'USER' ?
                                                        <div className={`${styles.contextWrap} ${styles.contextUserWrap}`}>
                                                            <div className={`${styles.contextItem} ${styles.contextItemUser}`}>
                                                                {message.content}
                                                            </div>
                                                        </div>:
                                                        <>
                                                            <div className={`${styles.iconMessage}`}>
                                                                <img src={bot.favicon} alt=""/>
                                                            </div>
                                                            <div className={`${styles.contextWrap}`}>
                                                                <div className={styles.contextItem}>
                                                                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                                                                </div>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                </> :
                                <div className={styles.itemMessage}>
                                    <div className={`${styles.iconMessage}`}>
                                        <img src={bot.favicon} alt=""/>
                                    </div>
                                    <div className={`${styles.contextWrap}`}>
                                        <div className={styles.contextItem}>
                                            Xin chào, mình là trợ lý ảo của {bot.name}👋
                                        </div>
                                        <div className={styles.contextItem}>
                                            Bạn cần mình hỗ trợ gì? 😊
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                        <div className={styles.actionWrap}>
                            <div className={styles.inputSendWrap}>
                                <Input
                                    className={styles.inputSend}
                                    placeholder={'Nhập lời nhắn'}
                                    size={"large"}
                                    value={sendMessage}
                                    onChange={(e) => setSendMessage(e.target.value)}
                                />
                                <Button
                                    onClick={() => handleSendMessage()}
                                    style={{background: bot?.config_bot?.color}}
                                    className={`${styles.btnSend} ${!sendMessage && styles.btnSendDisabled}`}
                                >
                                    <InlineSVG src={Send} width={20}/>
                                </Button>
                            </div>
                            <div className={styles.introduceWrap}>
                                <div className={styles.description}>
                                    Đối tác triển khai ứng dụng AI hàng đầu cho doanh nghiệp
                                </div>
                                <div className={styles.description}>
                                    Powered by Zent Soft
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

