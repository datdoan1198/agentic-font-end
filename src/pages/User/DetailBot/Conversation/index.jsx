import React from 'react'
import BotLayout from "@/layouts/User/BotLayout";
import {Empty, Segmented} from "antd";
import styles from "./styles.module.scss";
import './styles.scss'
import InputForm from "@/components/InputForm/index.jsx";
import LogoMessage from "@/assets/images/logos/messenger.png";
import LogoWeb from "@/assets/images/logos/widget.png";
import Handle from './handle.js'
import Loading from "@/components/Loading/index.jsx";
import {formatDateSecond} from "@/utils/helper.js";
import _ from 'lodash'

export default function Conversation() {
  const {
    options, typeMessage, conversations, loadingConversation,
    messages, loadingMessage, conversation, bot, bottomRef,
    setTypeMessage, handleSelectConversation
  } = Handle()

  return (
    <BotLayout>
      <div className={styles.box}>
        <div className={styles.headerWrap}>Hội thoại</div>

        <div className={styles.boxTabConversation}>
          <Segmented
            className={'tab-conversation'}
            size={'large'}
            options={options}
            value={typeMessage}
            onChange={(val) => setTypeMessage(val)}
          />
        </div>

        <div className={styles.boxMessage}>
          <div className={styles.sideBarMessage}>
            <div className={styles.headerSideBar}>
              <InputForm
                placeholder={'Tìm kiếm'}
                type={'email'}
              />
            </div>

            <div className={styles.boxConversation}>
              {
                !loadingConversation ?
                  <>
                    {
                      conversations && conversations.length > 0 &&
                      <>
                        {
                          conversations.map((conversation) => {
                            return (
                              <div
                                key={conversation._id}
                                className={styles.itemConversation}
                                onClick={() => handleSelectConversation(conversation)}
                              >
                                {
                                  conversation.type === 'FB' ?
                                    <div className={`${styles.iconConversation} ${styles.iconFb}`}>
                                      <img src={LogoMessage} alt=""/>
                                    </div>:
                                    <div className={styles.iconConversation}>
                                      <img src={LogoWeb} alt=""/>
                                    </div>
                                }

                                <div className={styles.mainConversation}>
                                  <div className={styles.name}>Guest #{conversation.platform_user_id}</div>
                                  <div className={styles.lastMessage}>{conversation?.lastMessage.content}</div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </>
                    }
                  </> :
                  <Loading />
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
                                    <div key={message._id} className={`${styles.boxItemMessage} ${message.type === "BOT" && styles.itemRight}`}>
                                      <div className={styles.itemMessage}>
                                        {
                                          message.type === "USER" &&
                                          <div className={`${styles.iconMessage} ${conversation.type === 'FB' && styles.iconFb}`}></div>
                                        }


                                        <div className={`${styles.context} ${message.type === "USER" && styles.contextUser}`}>
                                          {message.content}
                                          <div className={styles.time}>{formatDateSecond(message.created_at)}</div>
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
                          <div ref={bottomRef} />
                        </div>
                      </>:
                      <Empty />
                  }
                </>:
                <Loading />
            }
          </div>
        </div>
      </div>

    </BotLayout>
  )
}
