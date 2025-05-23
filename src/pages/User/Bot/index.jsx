import React from 'react'
import MainLayout from '@/layouts/User/MainLayout/index.jsx'
import styles from './styles.module.scss'
import './styles.scss'
import { Button, Col, Empty, Popover, Row, Switch } from 'antd'
import InlineSVG from 'react-inlinesvg'
import Robot from '@/assets/images/icons/solid/robot.svg'
import Ellipsis from '@/assets/images/icons/solid/ellipsis-vertical.svg'
import Trash from '@/assets/images/icons/solid/trash.svg'
import LogoDefault from '@/assets/images/logos/logo_robot.png'
import Handle from '@/pages/User/Bot/handle.js'
import Loading from '@/components/Loading/index.jsx'
import ModalDeleteDefault from '@/components/ModalDelete'
import { STATUS_BOT } from '@/utils/constants.js'
import { useNavigate } from 'react-router-dom'

export default function Bot() {
  const navigate = useNavigate()

  const {
    botChats,
    loadingListBot,
    loadingBtnCreateBot,
    visibleDeleteBot,
    setVisibleDeleteBot,
    loadingBtnDelete,
    handleRedirectDetailBot,
    handleOpenModelDelete,
    handleConfirmDelete,
    handleChangeStatus,
  } = Handle()

  return (
    <MainLayout>
      <div className={styles.boxBotChats}>
        <Col xxl={8} xl={10} md={12} xs={16} className={styles.boxFilterWrap}>
          <Button
            className={styles.btnAddBot}
            loading={loadingBtnCreateBot}
            onClick={() => navigate('/bot-chats/create')}
          >
            <InlineSVG src={Robot} width={24} />
            Thêm Bot
          </Button>
        </Col>
        {loadingListBot && <Loading />}
        {!loadingListBot && botChats && botChats.length === 0 && <Empty />}
        {!loadingListBot &&
          botChats &&
          botChats.length > 0 &&
          botChats.map((bot) => {
            return (
              <Col key={bot._id} xxl={8} xl={10} md={12} xs={16} className={styles.itemBotWrap}>
                <div className={styles.itemBot}>
                  <Row gutter={10} className={styles.mainWrap}>
                    <div className="flex items-center flex-1">
                      <Col span={3} onClick={() => handleRedirectDetailBot(bot._id)}>
                        <img className={styles.imgWrap} src={bot.favicon || LogoDefault} alt="" />
                      </Col>

                      <Col span={18}>
                        <div
                          className="font-medium text-[16px] mb-[1px] cursor-pointer"
                          onClick={() => handleRedirectDetailBot(bot._id)}
                        >
                          {bot.name}
                        </div>
                      </Col>
                    </div>

                    <div className="flex items-center gap-4 mr-2 cursor-pointer flex-nowrap">
                      <div className={'switch-bot'}>
                        <Switch
                          onChange={(value) => handleChangeStatus(value, bot._id)}
                          value={bot?.status === STATUS_BOT.ACTIVE}
                        />
                      </div>

                      <Popover
                        className={`popover-info-wrap`}
                        placement="bottom"
                        content={
                          <div className={styles.menuAction}>
                            <div className={`${styles.itemBtn}`} onClick={() => handleOpenModelDelete(bot)}>
                              <div className="w-[25px] flex justify-center cursor-pointer ">
                                <InlineSVG src={Trash} width={12} />
                              </div>
                              Xóa bot
                            </div>
                          </div>
                        }
                        trigger="click"
                      >
                        <InlineSVG src={Ellipsis} width={6} />
                      </Popover>
                    </div>
                  </Row>
                </div>
              </Col>
            )
          })}
      </div>

      <ModalDeleteDefault
        content={<span>Bạn có chắc chắn muốn xóa bot không?</span>}
        contentBtn={'Xóa Bot'}
        isModalOpen={visibleDeleteBot}
        handleOk={() => setVisibleDeleteBot(!visibleDeleteBot)}
        handleCancel={() => setVisibleDeleteBot(!visibleDeleteBot)}
        handleConfirm={() => handleConfirmDelete()}
        loading={loadingBtnDelete}
      />
    </MainLayout>
  )
}
