import React from 'react'
import BotLayout from "@/layouts/User/BotLayout";
import styles from './styles.module.scss'
import {Button, Col, Empty, Popover, Row} from "antd";
import Handle from './handle.js'
import _ from 'lodash'
import LogoFB from '@/assets/images/logos/messenger.png'

export default function Integration() {
    const {
        bot, listPageFB, loadingBtnSelectPage, loadingBtnUnlink,
        facebookLogin, handleSelectPage, handleConfirmUnlink
    } = Handle();

    return (
        <BotLayout>
            <div className={styles.headerWrap}>
              <div className={styles.title}>
                Tích hợp
              </div>
            </div>
            <div className={styles.mainWrap}>
                <Row className={styles.groupService}>
                    <Col xl={6} lg={8} md={12} xs={24} className={styles.serviceItem}>
                        <div className={styles.logoWrap}>
                          <img src={LogoFB} alt=""/>
                        </div>
                        <div className={styles.title}>Facebook Messenger</div>
                        <div className={styles.description}>Tự động gửi tin nhắn qua nền tảng Messenger</div>
                        {
                            _.isEmpty(bot.page) ?
                            <Row gutter={10} className={styles.btnAction}>
                                <Col span={24}>
                                    {
                                        !bot.is_connect_fb ?
                                        <Button
                                            onClick={() => facebookLogin()}
                                            className={styles.btnLoginFB}
                                        >Đăng nhập
                                        </Button> :
                                        <Popover
                                            className={`popover-info-wrap`}
                                            placement={'bottom'}
                                            content={
                                                listPageFB.length > 0 ?
                                                    <div className={styles.listPageFB}>
                                                        {
                                                            listPageFB.map((page) => {
                                                                return(
                                                                    <div
                                                                        key={page.id}
                                                                        onClick={() => handleSelectPage(page.id)}
                                                                        className={styles.pageItem}
                                                                    >{page.name}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div> :
                                                    <Empty />
                                            }
                                            trigger="click"
                                        >
                                            <Button
                                                loading={loadingBtnSelectPage}
                                                className={styles.btnLoginFB}
                                            >Chọn Fanpage
                                            </Button>
                                        </Popover>
                                    }
                                </Col>
                            </Row> :
                            <div>
                                <Button
                                    onClick={() => handleConfirmUnlink()}
                                    loading={loadingBtnUnlink}
                                    className={styles.btnUnlink}
                                >Hủy liên kết
                                </Button>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        </BotLayout>
    )
}
