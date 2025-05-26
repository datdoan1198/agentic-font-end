import _ from "lodash"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {validate} from "@/utils/validates/validate.js"
import {getNotification} from "@/utils/helper"
import {CustomizeSchema} from "../Customize/components/LeftPage/schema"
import {useDispatch, useSelector} from "react-redux"
import {ColorMain, STATUS_ORDER} from "@/utils/constants.js"
import {updateConfigBot} from "@/api/user/customize/index.js"
import {dataURLtoFile} from "@/utils/dataURLtoFile.js"
import {getInfoBot, getListBotChats} from "@/api/user/bot/index.js"
import {setBot} from "@/states/modules/detailBot/index.js"
import {setBotChats} from "@/states/modules/bot/index.js";
import IconChat from "@/assets/images/logos/icon_chat.png";
import {getListDescriptionJobs} from "@/api/user/descriptionJob/index.js";

const initialFormData = {
    name: "",
    description: "",
    logo_message: "",
    color: ColorMain,
    name_business: "",
    logo: "",
    is_order: '',
    form_order: '',
}

export default function useCustomize() {
    const {bot} = useSelector((state) => state.detailBot)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [descriptionJobs, setDescriptionJobs] = useState([])
    const [formData, setFormData] = useState({
        name: bot?.name || "",
        description: bot?.description || "",
        logo_message: bot?.logo_message || IconChat,
        color: bot?.color || ColorMain,
        welcome_messages: bot?.welcome_messages ? bot.welcome_messages.join("\n") : "",
        name_business: bot?.business.name || "",
        logo: bot?.business?.logo || "",
        is_order: bot.is_order || false,
        form_order: [],
    })
    const [errorFormData, setErrorFormData] = useState(initialFormData)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [messageError, setMessageError] = useState("")
    useEffect(() => {
        setFormData({
            name: bot?.name || "",
            description: bot?.description || "",
            logo_message: bot?.logo_message || IconChat,
            color: bot?.color || ColorMain,
            welcome_messages: bot?.welcome_messages ? bot.welcome_messages.join("\n") : "",
            name_business: bot?.business.name || "",
            logo: bot?.business?.logo || "",
            is_order: STATUS_ORDER.ACTIVE === bot.is_order,
            form_order: bot?.order_config?.form_order ? JSON.parse(bot?.order_config?.form_order) : [],
        })
    }, [bot])

    useEffect(() => {
        handleGetListDescriptionJobs()
    }, [])

    const getConfigBot = async () => {
        await getInfoBot(bot._id)
            .then((res) => {
                dispatch(setBot(res.data.data))
            })
            .catch(() => {
                dispatch(setBot({}))
            })
    }

    const handleGetListDescriptionJobs = () => {
        getListDescriptionJobs()
            .then((res) => {
                setDescriptionJobs(res.data.data)
            })
            .catch(() => {
                setDescriptionJobs([])
            })
    }

    const handleChangeData = (type, value) => {
        let data = _.cloneDeep(formData)
        data[type] = value
        setFormData(data)
        let errorData = _.cloneDeep(errorFormData)
        errorData[type] = ""
        setErrorFormData(errorData)
    }

    const onFocusInputLesson = (type) => {
        setMessageError("")
        let errorData = _.cloneDeep(errorFormData)
        errorData[type] = ""
        setErrorFormData(errorData)
    }

    const handleSaveCustomize = async () => {
        const formDataForValidation = _.cloneDeep(formData)
        formDataForValidation.form_order = formDataForValidation.form_order.length > 0 ?
            JSON.stringify(formDataForValidation.form_order) : ''
        validate(CustomizeSchema, formDataForValidation, {
            onSuccess: async (validData) => {
                try {
                    setLoadingUpdate(true)
                    const formDataToSubmit = new FormData()

                    formDataToSubmit.append("name", validData.name)
                    formDataToSubmit.append("description", validData.description)
                    formDataToSubmit.append("color", validData.color)
                    if (formData.logo_message instanceof File) {
                        formDataToSubmit.append("logo_message", formData.logo_message)
                    } else if (typeof formData.logo_message === "string" && formData.logo_message.startsWith("data:")) {
                        const logoFile = await dataURLtoFile(formData.logo_message, "logo_message.png")
                        formDataToSubmit.append("logo_message", logoFile)
                    } else if (formData.logo_message) {
                        formDataToSubmit.append("logo_message", formData.logo_message)
                    }

                    formDataToSubmit.append("name_business", validData.name_business)
                    if (formData.logo instanceof File) {
                        formDataToSubmit.append("logo", formData.logo)
                    } else if (typeof formData.logo === "string" && formData.logo.startsWith("data:")) {
                        const faviconFile = await dataURLtoFile(formData.logo, "favicon.png")
                        formDataToSubmit.append("logo", faviconFile)
                    } else if (formData.logo) {
                        formDataToSubmit.append("logo", formData.logo)
                    }

                    formDataToSubmit.append("is_order", validData.is_order ? STATUS_ORDER.ACTIVE: STATUS_ORDER.DE_ACTIVE)
                    if (validData.is_order) {
                        formDataToSubmit.append("form_order", validData.form_order)
                    }

                    await updateConfigBot(formDataToSubmit, bot._id)
                        .then(async (res) => {
                            if (res.data) {
                                const {status, success} = res.data
                                if (success && status === 201) {
                                    getNotification("success", "Lưu tùy chỉnh thành công")
                                    handleGetListBotChats()
                                    window.location.reload();
                                }
                            }
                        })
                        .catch((error) => {
                            if (error.response?.data) {
                                const {message, detail} = error.response.data
                                if (detail) {
                                    setErrorFormData(detail)
                                } else {
                                    setMessageError(message || "Có lỗi xảy ra khi lưu tùy chỉnh")
                                    getNotification("error", message || "Có lỗi xảy ra khi lưu tùy chỉnh")
                                }
                            } else {
                                setMessageError(error.message || "Có lỗi xảy ra khi lưu tùy chỉnh")
                                getNotification("error", error.message || "Có lỗi xảy ra khi lưu tùy chỉnh")
                            }
                        })
                        .finally(() => setLoadingUpdate(false))
                } catch (error) {
                    console.error("Error in handleSaveCustomize:", error)
                    setMessageError(error.message || "Có lỗi xảy ra khi lưu tùy chỉnh")
                    getNotification("error", error.message || "Có lỗi xảy ra khi lưu tùy chỉnh")
                    setLoadingUpdate(false)
                }
            },
            onError: (errors) => {
                console.log(errors)
                setErrorFormData(errors)
            },
        })
    }

    const handleGetListBotChats = () => {
        getListBotChats().then((res) => {
            dispatch(setBotChats(res.data.data.botChats))
        }).catch(() => {
            dispatch(setBotChats([]))
        })
    }

    const resetForm = () => {
        setFormData(initialFormData)
        setErrorFormData(initialFormData)
        setMessageError("")
    }

    const handleRedirectRoute = (path) => {
        navigate(path)
    }

    return {
        formData,
        errorFormData,
        loadingUpdate,
        messageError,
        descriptionJobs,
        getConfigBot,
        handleChangeData,
        onFocusInputLesson,
        handleSaveCustomize,
        resetForm,
        handleRedirectRoute,
    }
}
