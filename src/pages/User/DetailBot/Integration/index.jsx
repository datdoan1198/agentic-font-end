import React from 'react'
import BotLayout from "@/layouts/User/BotLayout";
import styles from './styles.module.scss'
import {Button, Col, Empty, Popover, Row} from "antd";
import Handle from './handle.js'
import _ from 'lodash'

export default function Integration() {
    const {
        bot, listPageFB, loadingBtnSelectPage,
        facebookLogin, handleSelectPage
    } = Handle();

    return (
        <BotLayout>
            <div className={styles.headerWrap}>Tích hợp</div>
            <div className={styles.mainWrap}>
                <Row className={styles.groupService}>
                    <Col span={8} className={styles.serviceItem}>
                        <div>Facebook Messenger</div>
                        <div>Tự động gửi tin nhắn qua nền tảng Messenger</div>
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
                                            trigger="hover"
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
                                Đã tạo liên kết
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        </BotLayout>
    )
}
