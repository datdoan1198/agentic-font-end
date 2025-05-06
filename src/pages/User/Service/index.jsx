import React from 'react'
import MainLayout from "@/layouts/User/MainLayout/index.jsx";
import styles from './styles.module.scss'
import {Col, Row} from "antd";
import InlineSVG from "react-inlinesvg";
import Check from "@/assets/images/icons/solid/check.svg";
import Rocket from "@/assets/images/icons/solid/rocket.svg";
import Bolt from "@/assets/images/icons/solid/bolt.svg";
import Box from "@/assets/images/icons/solid/box-open-full.svg";

export default function Service() {
    return (
        <MainLayout>
            <div className={styles.serviceWrap}>
                <div className={styles.titleWrap}>
                    Bảng giá
                </div>

                <Row gutter={20}>
                    <Col span={8}>
                        <div className={styles.itemServiceWrap}>
                            <div className={styles.headerWrap}>
                                <div className={styles.icon}><InlineSVG src={Box} width={32}/></div>
                                <div className={styles.text}>Cơ bản</div>
                            </div>
                            <div className={styles.listFeatureGroup}>
                                <div className={styles.titleWrap}>Bao gồm:</div>
                                <div className={styles.listFeatureWrap}>
                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>1 chatbot</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>4000 tin nhắn/tháng</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>Tối đa 200 URL huấn luyện</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>20 tệp tài liệu huấn luyện (tối đa 10MB/tệp)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Tích hợp Facebook Messenger New</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Tích hợp Zalo OA New</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.itemServiceWrap}>
                            <div className={styles.headerWrap}>
                                <div className={styles.icon}><InlineSVG src={Rocket} width={28}/></div>
                                <div className={styles.text}>Nâng cao</div>
                            </div>
                            <div className={styles.listFeatureGroup}>
                                <div className={styles.titleWrap}>Bao gồm:</div>
                                <div className={styles.listFeatureWrap}>
                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>3 chatbot</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>15000 tin nhắn/tháng (cho tất cả bot)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>Tối đa 1000 URL huấn luyện</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>50 tệp tài liệu huấn luyện (tối đa 10MB/tệp)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Tích hợp Facebook Messenger New</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Tích hợp Zalo OA New</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Dữ liệu huấn luyện bot từ video YouTube (coming soon)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Khảo sát độ hài lòng của khách hàng sau mỗi phiên chat (coming soon)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={`${styles.itemServiceWrap} ${styles.itemServiceActive}`}>
                            <div className={styles.headerWrap}>
                                <div className={styles.icon}><InlineSVG src={Bolt} width={28}/></div>
                                <div className={styles.text}>Tùy chỉnh</div>
                            </div>
                            <div className={styles.listFeatureGroup}>
                                <div className={styles.titleWrap}>Bao gồm:</div>
                                <div className={styles.listFeatureWrap}>
                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>Không giới hạn chatbot</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>Không giới hạn tin nhắn/tháng (cho tất cả bot)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>Không giới hạn URL huấn luyện</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>Không giới hạn tệp tài liệu huấn luyện (tối đa 10MB/tệp)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Tích hợp Facebook Messenger New</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Tích hợp Zalo OA New</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Dữ liệu huấn luyện bot từ video YouTube (coming soon)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🔥 Khảo sát độ hài lòng của khách hàng sau mỗi phiên chat (coming soon)</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🌟 Tích hợp cơ sở dữ liệu</div>
                                    </div>

                                    <div className={styles.itemFeatureWrap}>
                                        <div className={styles.icon}><InlineSVG src={Check} width={16}/></div>
                                        <div className={styles.text}>🌟 Tích hợp với bên thứ 3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}
