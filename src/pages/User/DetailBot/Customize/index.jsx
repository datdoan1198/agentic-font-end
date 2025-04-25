import React from "react"
import BotLayout from "@/layouts/User/BotLayout"
import {Splitter} from "antd"
import LeftPage from "./components/LeftPage"
import ChatBox from "@/components/Feature/ChatBox";
import {useSelector} from "react-redux";

export default function CustomizeBotPage() {
    const bot = useSelector((state) => state.detailBot.bot);
    return (
        <>
            <BotLayout>
                <Splitter>
                    <Splitter.Panel defaultSize="50%" min="30%" max="50%">
                        <LeftPage/>
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <ChatBox botId={bot._id}/>
                    </Splitter.Panel>
                </Splitter>
            </BotLayout>
        </>
    )
}
