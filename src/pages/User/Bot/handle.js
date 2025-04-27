import {useEffect, useState} from "react";
import _ from "lodash";
import {
    changeStatusBot,
    createBotChat,
    createBotChatWithFile,
    deleteBot,
    getListBotChats
} from "@/api/user/bot/index.js";

import {getNotification} from "@/utils/helper.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setBotChats} from "@/states/modules/bot/index.js";
import {ColorMain, STATUS_BOT} from "@/utils/constants.js";
import {validate} from "@/utils/validates/validate.js";
import {createBotWithFileSchema, createBotWithUrlSchema} from "@/pages/User/Bot/schema.js";

export default function Handle() {
    const [visibleDeleteBot, setVisibleDeleteBot] = useState(false)
    const [dataForm, setDataForm] = useState({
        name: '',
        url: '',
        file: null,
        logo: null,
        logo_message: null,
        color: ColorMain,
        description: "",
    })
    const [errorDataForm, setErrorDataForm] = useState({
        name: '',
        url: '',
        file: '',
        logo: '',
        logo_message: '',
        color: '',
        description: '',
    })
    const [loadingBtnSubmitUrl, setLoadingBtnSubmitUrl] = useState(false)
    const botChats = useSelector(state => state.bot.botChats)
    const [loadingListBot, setLoadingListBot] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [botSelect, setBotSelect] = useState(null)
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false)
    const [visibleCreateBot, setVisibleCreateBot] = useState(false)
    const [isCreateUrl, setIsCreateUrl] = useState(true)

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
        validate(createBotWithUrlSchema, dataForm, {
            onSuccess: () => {
                setLoadingBtnSubmitUrl(true);
                const formData = new FormData()
                formData.append("url", dataForm.url)
                createBotChat(formData).then(() => {
                    getNotification('success', 'Tạo bot thành công.');
                    setTimeout(() => {
                        handleGetListBotChats();
                    }, 1000)
                    setVisibleCreateBot(false)
                })
                    .catch((error) => {
                        let statusError = error.response.status
                        if (statusError === 400) {
                            let errors = error.response.data.detail
                            setErrorDataForm({
                                url: _.get(errors, 'url', ''),
                            })
                        } else {
                            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
                        }
                    })
                    .finally(() => setLoadingBtnSubmitUrl(false));
            },
            onError: (error) => setErrorDataForm(error)
        });
    }

    const handleCreateBotWithFile = () => {
        validate(createBotWithFileSchema, dataForm, {
            onSuccess: () => {
                setLoadingBtnSubmitUrl(true);
                const formData = new FormData()

                formData.append("name", dataForm.name)
                formData.append("description", dataForm.description)
                formData.append("color", dataForm.color)
                formData.append("logo", dataForm.logo)
                formData.append("logo_message", dataForm.logo_message)
                formData.append("file", dataForm.file)

                createBotChatWithFile(formData).then(() => {
                    getNotification('success', 'Tạo bot thành công.');
                    setTimeout(() => {
                        handleGetListBotChats();
                    }, 1000)
                    setVisibleCreateBot(false)
                })
                    .catch((error) => {
                        let statusError = error.response.status
                        if (statusError === 400) {
                            let errors = error.response.data.detail
                            setErrorDataForm({
                                name: _.get(errors, 'name', ''),
                                description: _.get(errors, 'description', ''),
                                color: _.get(errors, 'color', ''),
                                logo_message: _.get(errors, 'logo_message', ''),
                                logo: _.get(errors, 'logo', ''),
                                file: _.get(errors, 'file', ''),
                            })
                        } else {
                            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
                        }
                    })
                    .finally(() => setLoadingBtnSubmitUrl(false));
            },
            onError: (error) => setErrorDataForm(error)
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

    const handleOpenModelDelete = (bot) => {
        setBotSelect(bot)
        setVisibleDeleteBot(true)
    }

    const handleConfirmDelete = () => {
        setLoadingBtnDelete(true)
        deleteBot(botSelect._id).then(() => {
            handleGetListBotChats();
            getNotification('success', 'Xóa danh mục thành công.');
        }).catch(() => {
            getNotification('error', 'Xóa danh mục thất bại');
        }).finally(() => {
            setLoadingBtnDelete(false)
        });
    }

    const handleChangeStatus = (value, bot_id) => {
        const status = value ? STATUS_BOT.ACTIVE : STATUS_BOT.DE_ACTIVE;
        changeStatusBot({status}, bot_id).then(() => {
            handleGetListBotChats();
            getNotification('success', 'Cập nhật trạng thái thành công.');
        }).catch(() => {
            getNotification('error', 'Cập nhật trạng thái thất bại');
        });
    }

    return {
        dataForm, errorDataForm, botChats, loadingListBot, loadingBtnSubmitUrl,
        visibleDeleteBot, setVisibleDeleteBot, loadingBtnDelete,
        visibleCreateBot, setVisibleCreateBot, isCreateUrl, setIsCreateUrl,
        handleChangeData, onFocusInputLesson, handleConfirmSubmitLink, handleRedirectDetailBot, handleCreateBotWithFile,
        handleOpenModelDelete, handleConfirmDelete, handleChangeStatus
    }
}
