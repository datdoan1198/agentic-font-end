import React from 'react'
import BotLayout from "@/layouts/User/BotLayout";
import {Empty, Input, Segmented} from "antd";
import styles from "./styles.module.scss";
import './styles.scss'
import InputForm from "@/components/InputForm/index.jsx";
import LogoMessage from "@/assets/images/logos/messenger.png";
import LogoWeb from "@/assets/images/logos/widget.png";
import Handle from './handle.js'
import Loading from "@/components/Loading/index.jsx";
import {formatDateSecond} from "@/utils/helper.js";
import _ from 'lodash'
import IconSearch from "@/assets/images/icons/duotone/magnifying-glass.svg";

export default function Conversation() {
    const {
        options, typeMessage, conversations, loadingConversation,
        messages, loadingMessage, conversation, bot, bottomRef, dataFilter,
        handleSwitchTab, handleSelectConversation, handleSearch
    } = Handle()

    return (
        <BotLayout>
            <div className={styles.box}>
                <div className={styles.headerWrap}>
                    <div className={styles.title}>
                        Hội thoại
                    </div>
                </div>

                <div className={styles.boxTabConversation}>
                    <Segmented
                        className={'tab-conversation'}
                        size={'large'}
                        options={options}
                        value={typeMessage}
                        onChange={(val) => handleSwitchTab(val)}
                    />
                </div>

                <div className={styles.boxMessage}>
                    <div className={styles.sideBarMessage}>
                        <div className={styles.headerSideBar}>
                            <div className={styles.inputSearch}>
                                <Input
                                    prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
                                    className="main-input"
                                    size={"large"}
                                    placeholder={'Tìm kiếm theo tên file'}
                                    value={dataFilter.keySearch}
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>

                        <div className={styles.boxConversation}>
                            {
                                !loadingConversation ?
                                    <>
                                        {
                                            conversations && conversations.length > 0 &&
                                            <>
                                                {
                                                    conversations.map((conversationItem) => {
                                                        return (
                                                            <div
                                                                key={conversationItem._id}
                                                                className={`${styles.itemConversation} ${conversationItem._id === conversation._id && styles.itemConversationActive}`}
                                                                onClick={() => handleSelectConversation(conversationItem)}
                                                            >
                                                                {
                                                                    conversationItem.type === 'FB' ?
                                                                        <div
                                                                            className={`${styles.iconConversation} ${styles.iconFb}`}>
                                                                            <img src={LogoMessage} alt=""/>
                                                                        </div> :
                                                                        <div className={styles.iconConversation}>
                                                                            <img src={LogoWeb} alt=""/>
                                                                        </div>
                                                                }

                                                                <div className={styles.mainConversation}>
                                                                    <div className={styles.name}>Guest
                                                                        #{conversationItem.platform_user_id}</div>
                                                                    <div
                                                                        className={styles.lastMessage}>{conversationItem?.lastMessage.content}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </>
                                        }
                                    </> :
                                    <Loading/>
                            }
                        </div>
                    </div>
                    <div className={styles.mainMessage}>
                        {
                            !loadingMessage ?
                                <>
                                    {
                                        !_.isEmpty(conversation) ?
                                            <>

                                                <div className={styles.headerWrap}>
                                                    Guest #{conversation.platform_user_id}
                                                </div>

                                                <div className={styles.messageWrap}>
                                                    {
                                                        messages && messages.length > 0 &&
                                                        <>
                                                            {
                                                                messages.map((message) => {
                                                                    return (
                                                                        <div key={message._id}
                                                                             className={`${styles.boxItemMessage} ${message.type === "BOT" && styles.itemRight}`}>
                                                                            <div className={styles.itemMessage}>
                                                                                {
                                                                                    message.type === "USER" &&
                                                                                    <div
                                                                                        className={`${styles.iconMessage} ${conversation.type === 'FB' && styles.iconFb}`}></div>
                                                                                }


                                                                                <div
                                                                                    className={`${styles.context} ${message.type === "USER" && styles.contextUser}`}>
                                                                                    <div
                                                                                        dangerouslySetInnerHTML={{__html: message.content}}/>
                                                                                    <div
                                                                                        className={styles.time}>{formatDateSecond(message.created_at)}</div>
                                                                                </div>

                                                                                {
                                                                                    message.type === "BOT" &&
                                                                                    <div className={styles.iconBot}>
                                                                                        <img src={bot.favicon} alt=""/>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    }
                                                    <div ref={bottomRef}/>
                                                </div>
                                            </> :
                                            <Empty/>
                                    }
                                </> :
                                <Loading/>
                        }
                    </div>
                </div>
            </div>

        </BotLayout>
    )
}
