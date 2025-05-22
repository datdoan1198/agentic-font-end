import React from 'react'
import BotLayout from '@/layouts/User/BotLayout'
import { Empty, Input, Segmented} from 'antd'
import styles from './styles.module.scss'
import './styles.scss'
import LogoMessage from '@/assets/images/logos/messenger.png'
import LogoWeb from '@/assets/images/logos/widget.png'
import Loading from '@/components/Loading/index.jsx'
import { formatDateSecond } from '@/utils/helper.js'
import _ from 'lodash'
import IconSearch from '@/assets/images/icons/duotone/magnifying-glass.svg'
import LogoFB from '@/assets/images/logos/messenger.png'
import { TYPE_CONVERSATION } from '@/utils/constants.js'
import Integration from '../Integration/handle.js'
import Handle from './handle.js'

export default function Conversation() {
  const {
    options,
    typeMessage,
    conversations,
    loadingConversation,
    messages,
    loadingMessage,
    conversation,
    bot,
    bottomRef,
    dataFilter,
    handleSwitchTab,
    handleSelectConversation,
    handleSearch,
  } = Handle();

  const {facebookLogin} = Integration();

  return (
    <BotLayout>
      <div className={styles.box}>
        <div className={styles.headerWrap}>
          <div className={styles.title}>Hội thoại</div>
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
            {!loadingConversation && typeMessage === TYPE_CONVERSATION.FB && conversations.length === 0 && (
              <div className={styles.serviceItem}>
                <div className="px-4 py-8">
                  <img src={LogoFB} alt="" className="w-[90px] h-[90px] object-contain mx-auto" />
                </div>
                <div className="px-2 my-4">
                  <div className="mb-2 font-bold text-center">Chưa tích hợp Facebook Messenger</div>
                  <p className="text-sm font-medium text-center text-gray-500 ">
                    Kết nối tài khoản Facebook Messenger để sử dụng AI CSKH 24/7. Không cần chuyển đổi giữa các kênh,
                    mọi thứ đều diễn ra ngay trên AI.CSKH.
                  </p>
                </div>

                <div className="flex justify-center px-2 ">
                  <button
                    onClick={() => facebookLogin()}
                    className="w-full bg-mainColor text-white h-[40px] border-none rounded-md hover:bg-[#4ca1f5]/80 transition-all duration-300"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            )}

            {!loadingConversation && conversations.length > 0 && (
              <div className={styles.headerSideBar}>
                <div className={styles.inputSearch}>
                  <Input
                    prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
                    className="main-input"
                    size={'large'}
                    placeholder={'Tìm kiếm'}
                    value={dataFilter.keySearch}
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
              </div>
            )}

            <div className={styles.boxConversation}>
              {!loadingConversation ? (
                <>
                  {conversations && conversations.length > 0 && (
                    <>
                      {conversations.map((conversationItem) => {
                        return (
                          <div
                            key={conversationItem._id}
                            className={`${styles.itemConversation} ${
                              conversationItem._id === conversation._id && styles.itemConversationActive
                            }`}
                            onClick={() => handleSelectConversation(conversationItem)}
                          >
                            {conversationItem.type === 'FB' ? (
                              <div className={`${styles.iconConversation} ${styles.iconFb}`}>
                                <img src={LogoMessage} alt="" />
                              </div>
                            ) : (
                              <div className={styles.iconConversation}>
                                <img src={LogoWeb} alt="" />
                              </div>
                            )}

                            <div className={styles.mainConversation}>
                              <div className={styles.name}>Guest #{conversationItem.platform_user_id}</div>
                              <div className={styles.lastMessage}>{conversationItem?.lastMessage.content}</div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </div>
          </div>
          <div className={styles.mainMessage}>
            {!loadingMessage ? (
              <>
                {!_.isEmpty(conversation) ? (
                  <>
                    <div className={styles.headerWrap}>Guest #{conversation.platform_user_id}</div>

                    <div className={styles.messageWrap}>
                      {messages && messages.length > 0 && (
                        <>
                          {messages.map((message) => {
                            return (
                              <div
                                key={message._id}
                                className={`${styles.boxItemMessage} ${message.type === 'BOT' && styles.itemRight}`}
                              >
                                <div className={styles.itemMessage}>
                                  {message.type === 'USER' && (
                                    <div
                                      className={`${styles.iconMessage} ${conversation.type === 'FB' && styles.iconFb}`}
                                    ></div>
                                  )}

                                  <div
                                    className={`${styles.context} ${message.type === 'USER' && styles.contextUser}`}
                                    style={{background: message.type === 'USER' && bot?.color}}
                                  >
                                    <div dangerouslySetInnerHTML={{__html: message.content}} />
                                    <div className={styles.time}>{formatDateSecond(message.created_at)}</div>
                                  </div>

                                  {message.type === 'BOT' && (
                                    <div className={styles.iconBot}>
                                      <img src={bot.logo_message} alt="" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      <div ref={bottomRef} />
                    </div>
                  </>
                ) : (
                  <Empty />
                )}
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </BotLayout>
  );
}
