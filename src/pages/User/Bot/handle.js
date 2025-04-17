import React, {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import _ from "lodash";
import {createBotChat, getListBotChats} from "@/api/user/bot/index.js";
import {validate} from "@/utils/validates/validate.js";
import {createBotSchema} from "@/pages/User/Bot/schema.js";
import {getNotification} from "@/utils/helper.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setBotChats} from "@/states/modules/bot/index.js";

export default function Handle() {
    const [dataForm, setDataForm] = useState({url: ''})
    const [errorDataForm, setErrorDataForm] = useState({url: ''})
    const [loadingStep, setLoadingStep] = useState(null)
    const [loadingBtnSubmitUrl, setLoadingBtnSubmitUrl] = useState(false)
    const botChats = useSelector(state => state.bot.botChats)
    const [loadingListBot, setLoadingListBot] = useState(false)
    const dispatch = useDispatch()
    const itemStep = [
        {
            title: 'Tự động khai thác liên kết',
            description: 'Hệ thống của chúng tôi sẽ tự động quét trang web của bạn và thu thập mọi liên kết quan trọng, giúp nắm bắt cấu trúc trang web toàn diện mà không cần phải thực hiện thủ công.',
            icon: loadingStep === 1 && <LoadingOutlined />,
        },
        {
            title: 'Trích xuất dữ liệu',
            description: 'Dựa trên dữ liệu đã thu thập, hệ thống của chúng tôi sẽ tự động xây dựng nhân vật cho bot, đảm bảo phù hợp với nội dung trang web và đáp ứng đúng nhu cầu của người dùng.',
            icon: loadingStep === 2 && <LoadingOutlined />,
        },
        {
            title: 'Tự động xây dựng tính cách cho bot',
            description: 'Các công cụ thu thập dữ liệu tiên tiến của chúng tôi sẽ tự động truy cập từng liên kết, trích xuất thông tin liên quan từ trang web của bạn, giúp trợ lý ảo có đủ kiến thức để hỗ trợ chính xác sau này.',
            icon: loadingStep === 3 && <LoadingOutlined />,
        },
        {
            title: 'Huấn luyện',
            description: 'Bot sẽ được đào tạo tự động dựa trên dữ liệu đã thu thập, giúp bot hiểu câu hỏi của người dùng và đưa ra câu trả lời hỗ trợ hữu ích mà không cần can thiệp từ con người.',
            icon: loadingStep === 4 && <LoadingOutlined />,
        }
    ]
    const navigate = useNavigate();

    useEffect(() => {
        handleGetListBotChats()
    }, [])

    const handleChangeData = (type, value) => {
        let data = _.cloneDeep(dataForm);
        data[type] = value
        setDataForm(data)
    }

    const onFocusInputLesson = (type) => {
        let errorData = _.cloneDeep(errorDataForm);
        errorData[type] = ''
        setErrorDataForm(errorData)
    }

    const handleConfirmSubmitLink = () => {
        validate(createBotSchema, dataForm, {
            onSuccess: (data) => {
                setLoadingBtnSubmitUrl(true);
                const interval = setInterval(() => {
                    setLoadingStep(prev => {
                        if (prev >= 3) {
                            clearInterval(interval);
                            return prev;
                        }
                        return prev + 1;
                    });
                }, 1000);
                createBotChat(data)
                    .then(() => {
                        setLoadingStep(4)
                        getNotification('success', 'Tạo bot thành công.');
                        setTimeout(() => {
                            handleGetListBotChats();
                            setLoadingStep(null)
                        }, 1000)
                    })
                    .catch((error) => {
                        clearInterval(interval);
                        setLoadingStep(null)
                        if (error.response?.data) {
                            const {message, detail} = error.response.data;
                            if (detail) {
                                setErrorDataForm(detail);
                            } else {
                                getNotification('warning', message);
                            }
                        }
                    })
                    .finally(() => {
                        setDataForm({url: ''})
                        setLoadingBtnSubmitUrl(false)
                    });
            },
            onError: setErrorDataForm,
        });
    }

    const handleGetListBotChats = () => {
        setLoadingListBot(true)
        getListBotChats().then((res) => {
            dispatch(setBotChats(res.data.data.botChats))
        }).catch(() => {
            dispatch(setBotChats([]))
        }).finally(() => setLoadingListBot(false))
    }

    const handleRedirectDetailBot = (botId) => {
        navigate(`/bot-chats/${botId}`)
    }

    return {
        dataForm, loadingStep, errorDataForm, itemStep, botChats, loadingListBot, loadingBtnSubmitUrl,
        handleChangeData, onFocusInputLesson, handleConfirmSubmitLink, handleRedirectDetailBot
    }
}
