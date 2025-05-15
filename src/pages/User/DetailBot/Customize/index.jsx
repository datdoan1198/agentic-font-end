import React from "react"
import BotLayout from "@/layouts/User/BotLayout"
import {Col, Row} from "antd"
import LeftPage from "./components/LeftPage"
import ChatBox from "@/components/Feature/ChatBox";
import {useSelector} from "react-redux";
import styles from './styles.module.scss'

export default function CustomizeBotPage() {
    const bot = useSelector((state) => state.detailBot.bot);
    return (
        <>
            <BotLayout>
                <Row>
                    <Col span={12} className={styles.boxLeftWrap} >
                        <LeftPage/>
                    </Col>

                    <Col span={12}>
                        <ChatBox botId={bot._id}/>
                    </Col>
                </Row>
            </BotLayout>
        </>
    )
}
