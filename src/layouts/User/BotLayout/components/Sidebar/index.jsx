import React from "react"
import styles from "./styles.module.scss"
import { Avatar, Button, Popover } from "antd"
import { routeBotMap } from "@/router/routeBotMap.js"
import InlineSVG from "react-inlinesvg"
import _ from "lodash"
import { useLocation, useNavigate } from "react-router-dom"
import { handleCheckRoute } from "@/utils/helper.js"
import { useDispatch, useSelector } from "react-redux"
import { setIsShowSideBar } from "@/states/modules/detailBot/index.js"
import { ChevronLeft, CircleChevronLeft, CircleChevronRight } from "lucide-react"

export default function Sidebar() {
  const isShowSideBar = useSelector((state) => state.detailBot.isShowSideBar)
  const location = useLocation()
  const navigate = useNavigate()
  const bot = useSelector((state) => state.detailBot.bot)
  const botChats = useSelector((state) => state.bot.botChats)
  const dispatch = useDispatch()

  const handleGetBotSelect = () => {
    return botChats.find((botChat) => botChat._id === bot._id)
  }

  const handleRedirectDetailBot = (botId) => {
    navigate(`/bot-chats/${botId}`)
  }

  return (
    <div className={`${styles.boxSideBar} ${!isShowSideBar && styles.closeBoxSideBar}`}>
      <div className={styles.headerSideBar}>
        <div className={styles.logoWrap}>
          <img src="https://console.easyaichat.app/easy-ai-chat-logo-square.png" alt="" />
        </div>
        {!_.isEmpty(handleGetBotSelect()) && (
          <div className={styles.boxListBotChats}>
            {isShowSideBar && <Button icon={<ChevronLeft />} onClick={() => navigate("/bot-chats")}></Button>}
            <Popover
              className={`popover-info-wrap`}
              placement={isShowSideBar ? "bottom" : "right"}
              content={
                <div className={styles.groupBotChatsWrap}>
                  {botChats.map((botChat) => {
                    return (
                      <div
                        onClick={() => handleRedirectDetailBot(botChat._id)}
                        key={botChat._id}
                        className={`${styles.botItemWrap} ${botChat._id === bot._id && styles.botItemActive}`}
                      >
                        {botChat.url}
                      </div>
                    )
                  })}
                  <div className={`${styles.botItemWrap}`} onClick={() => navigate("/bot-chats")}>
                    Tạo Bot
                  </div>
                </div>
              }
              trigger="hover"
            >
              <div className={styles.botSelected}>
                {!isShowSideBar ? (
                  <Avatar size={20} src={handleGetBotSelect().favicon} />
                ) : (
                  <>{handleGetBotSelect().url}</>
                )}
              </div>
            </Popover>
          </div>
        )}
      </div>

      <div className={styles.mainSideWrap}>
        {routeBotMap(bot._id).map((groupRouter, groupRouteIndex) => {
          return (
            <div key={`group-route-${groupRouteIndex}`} className={styles.groupSideBarWrap}>
              {!_.isEmpty(groupRouter.label) && <div className={styles.labelWrap}>{groupRouter.label}</div>}

              <div className={styles.groupItemWrap}>
                {groupRouter.routes.map((router, routerIndex) => {
                  return (
                    <div
                      key={`route-${routerIndex}`}
                      className={`${styles.itemWrap} ${
                        handleCheckRoute(router.routeActive, location.pathname) && styles.itemActive
                      } `}
                      onClick={() => navigate(router.path)}
                    >
                      {!isShowSideBar ? (
                        <div>
                          <Popover
                            className={`popover-info-wrap`}
                            placement="right"
                            content={<div>{router.label}</div>}
                            trigger="hover"
                          >
                            <InlineSVG src={router.icon} width={27} />
                          </Popover>
                        </div>
                      ) : (
                        <InlineSVG src={router.icon} width={27} />
                      )}
                      <div className={styles.text}>{router.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.btnWrap} onClick={() => dispatch(setIsShowSideBar(!isShowSideBar))}>
        {isShowSideBar ? <CircleChevronLeft /> : <CircleChevronRight />}
      </div>
    </div>
  )
}
