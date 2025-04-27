import _ from "lodash"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { validate } from "@/utils/validates/validate.js"
import { getNotification } from "@/utils/helper"
import { CustomizeSchema } from "../Customize/components/LeftPage/schema"
import {useDispatch, useSelector} from "react-redux"
import { ColorMain } from "@/utils/constants.js"
import { updateConfigBot } from "../../../../api/user/customize"
import { dataURLtoFile } from "@/utils/dataURLtoFile.js"
import {getInfoBot, getListBotChats} from "@/api/user/bot/index.js"
import { setBot } from "../../../../states/modules/detailBot"
import {setBotChats} from "@/states/modules/bot/index.js";

const initialFormData = {
  name: "",
  favicon: "",
  description: "",
  logo_message: "",
  color: ColorMain,
  welcome_messages: "",
  quick_prompts: "",
  auto_display_chatbox: "off",
}

export default function useCustomize() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { bot } = useSelector((state) => state.detailBot)

  const [formData, setFormData] = useState({
    name: bot.name || "",
    favicon: bot.favicon || "",
    description: bot.description || "",
    logo_message: bot?.config_bot?.logo_message || "",
    color: bot?.config_bot?.color || ColorMain,
    welcome_messages: bot?.config_bot?.welcome_messages ? bot?.config_bot?.welcome_messages.join("\n") : "",
    quick_prompts: bot?.config_bot?.quick_prompts ? bot?.config_bot?.quick_prompts.join("\n") : "",
    auto_display_chatbox: bot?.config_bot?.auto_display_chatbox || "off",
  })
  const [errorFormData, setErrorFormData] = useState(initialFormData)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [messageError, setMessageError] = useState("")

  const getConfigBot = async () => {
    await getInfoBot(bot._id)
      .then((res) => {
        dispatch(setBot(res.data.data))
      })
      .catch(() => {
        dispatch(setBot({}))
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

    if (formDataForValidation.welcome_messages) {
      formDataForValidation.welcome_messages = formDataForValidation.welcome_messages
        .split("\n")
        .filter((item) => item.trim() !== "")
    } else {
      formDataForValidation.welcome_messages = []
    }

    if (formDataForValidation.quick_prompts) {
      formDataForValidation.quick_prompts = formDataForValidation.quick_prompts
        .split("\n")
        .filter((item) => item.trim() !== "")
    } else {
      formDataForValidation.quick_prompts = []
    }

    validate(CustomizeSchema, formDataForValidation, {
      onSuccess: async (validData) => {
        try {
          setLoadingUpdate(true)
          const formDataToSubmit = new FormData()

          formDataToSubmit.append("name", validData.name)
          if (formData.favicon instanceof File) {
            formDataToSubmit.append("favicon", formData.favicon)
          } else if (typeof formData.favicon === "string" && formData.favicon.startsWith("data:")) {
            const faviconFile = await dataURLtoFile(formData.favicon, "favicon.png")
            formDataToSubmit.append("favicon", faviconFile)
          } else if (formData.favicon) {
            formDataToSubmit.append("favicon", formData.favicon)
          }
          formDataToSubmit.append("description", validData.description)
          formDataToSubmit.append("color", validData.color)
          formDataToSubmit.append("auto_display_chatbox", validData.auto_display_chatbox)
          if (Array.isArray(validData.welcome_messages)) {
            formDataToSubmit.append("welcome_messages", JSON.stringify(validData.welcome_messages))
          }
          if (Array.isArray(validData.quick_prompts)) {
            formDataToSubmit.append("quick_prompts", JSON.stringify(validData.quick_prompts))
          }
          if (formData.logo_message instanceof File) {
            formDataToSubmit.append("logo_message", formData.logo_message)
          } else if (typeof formData.logo_message === "string" && formData.logo_message.startsWith("data:")) {
            const logoFile = await dataURLtoFile(formData.logo_message, "logo_message.png")
            formDataToSubmit.append("logo_message", logoFile)
          } else if (formData.logo_message) {
            formDataToSubmit.append("logo_message", formData.logo_message)
          }
          await updateConfigBot(formDataToSubmit, bot._id)
            .then(async (res) => {
              if (res.data) {
                const { status, success } = res.data
                if (success && status === 201) {
                  getNotification("success", "Lưu tùy chỉnh thành công")
                  await getConfigBot()
                  handleGetListBotChats()
                }
              }
            })
            .catch((error) => {
              if (error.response?.data) {
                const { message, detail } = error.response.data
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
        setErrorFormData(errors)
        const firstError = Object.values(errors).find((error) => error && error.length > 0)
        if (firstError) {
          getNotification("error", firstError)
        }
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
    getConfigBot,
    handleChangeData,
    onFocusInputLesson,
    handleSaveCustomize,
    resetForm,
    handleRedirectRoute,
  }
}
