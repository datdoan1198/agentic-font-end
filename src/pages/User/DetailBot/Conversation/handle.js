import {useEffect, useRef, useState} from "react";
import {getListConversations, getListMessageOfConversation} from "@/api/user/conversation/index.js";
import {useSelector} from "react-redux";
import {TYPE_CONVERSATION} from "@/utils/constants.js";
import _ from "lodash";
import {handleSetTimeOut} from "@/utils/helper.js";

export default function Handle() {
    const [timeoutId, setTimeoutId] = useState(null)
    const bot = useSelector((state) => state.detailBot.bot);
    const options = [
        {label: 'Tất cả tin nhắn', value: 'ALL'},
        {label: 'Website', value: TYPE_CONVERSATION.WEB},
        {label: 'Messager', value: TYPE_CONVERSATION.FB}
    ]
    const [dataFilter, setDataFilter] = useState({
        keySearch: "",
    });
    const [typeMessage, setTypeMessage] = useState('ALL');
    const [conversations, setConversations] = useState([])
    const [conversation, setConversation] = useState({})
    const [loadingConversation, setLoadingConversation] = useState(false)
    const [messages, setMessages] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(true)
    const bottomRef = useRef(null);

    useEffect(() => {
        handleGetListConversation()
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const handleGetListConversation = (data = null) => {
        setLoadingConversation(true)
        getListConversations(bot._id, data).then((res) => {
            setConversations(res.data.data.conversations)
            if (res.data.data.conversations.length > 0) {
                const conversation = res.data.data.conversations[0]
                setConversation(conversation)
                handleGetListMessageOfConversation(conversation._id)
            } else {
                setConversation([])
                setConversation(null)
                setLoadingMessage(false)
            }
        }).catch(() => {
            setConversation([])
        }).finally(() => setLoadingConversation(false))
    }

    const handleGetListMessageOfConversation = (conversation_id) => {
        setLoadingMessage(true)
        getListMessageOfConversation(bot._id, conversation_id).then((res) => {
            setMessages(handleReversedMessages(res.data.data.messages))
        }).catch(() => {
            setConversation([])
        }).finally(() => setLoadingMessage(false))
    }

    const handleReversedMessages = (messages) => {
        return [...messages].reverse();
    }

    const handleSelectConversation = (conversation) => {
        setConversation(conversation)
        handleGetListMessageOfConversation(conversation._id)
    }

    const handleSwitchTab = (type) => {
        setTypeMessage(type)
        handleGetListConversation({type})
    }

    const handleSearch = (e) => {
        let newDataFilter = _.cloneDeep(dataFilter);
        newDataFilter.keySearch = e.target.value;
        setDataFilter(newDataFilter);
        let newTimeoutId = handleSetTimeOut(() => {
            handleGetListConversation({
                keySearch: e.target.value,
                type: typeMessage
            })
        }, 500, timeoutId)
        setTimeoutId(newTimeoutId);
    }

    return {
        options, typeMessage, conversations, loadingConversation,
        messages, loadingMessage, conversation, bot, bottomRef, dataFilter,
        handleSwitchTab, handleSelectConversation, handleSearch
    }

}
