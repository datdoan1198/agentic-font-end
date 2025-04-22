import _ from "lodash"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { validate } from "@/utils/validates/validate.js"
import { getNotification } from "@/utils/helper"
import { CustomizeSchema } from "../Customize/components/LeftPage/schema"
import { useSelector } from "react-redux"
import { ColorMain } from "@/utils/constants.js"
import { updateConfigBot } from "../../../../api/user/customize"
import { dataURLtoFile } from "@/utils/dataURLtoFile.js"
import { getInfoBot } from "@/api/user/bot/index.js"
import store from "../../../../states/configureStore"
import { setBot } from "../../../../states/modules/detailBot"

const initialFormData = {
  url: "",
  name: "",
  logo: "",
  favicon: "",
  color: ColorMain,
  description: "",
  welcome_messages: "",
  quick_prompts: "",
  auto_display_chatbox: "off",
}

export default function useCustomize() {
  const navigate = useNavigate()

  const { bot } = useSelector((state) => state.detailBot)
  const { url, name, logo, favicon, color, description, welcome_messages, quick_prompts, auto_display_chatbox } = bot

  const [formData, setFormData] = useState({
    url: url || "",
    name: name || "",
    logo: logo || "",
    favicon: favicon || "",
    color: color || ColorMain,
    description: description || "",
    welcome_messages: welcome_messages ? welcome_messages.join("\n") : "",
    quick_prompts: quick_prompts ? quick_prompts.join("\n") : "",
    auto_display_chatbox: auto_display_chatbox || "off",
  })
  const [errorFormData, setErrorFormData] = useState(initialFormData)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [messageError, setMessageError] = useState("")

  const getConfigBot = async () => {
    await getInfoBot(bot._id)
      .then((res) => {
        store.dispatch(setBot(res.data.data))
      })
      .catch(() => {
        store.dispatch(setBot({}))
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

          formDataToSubmit.append("url", validData.url)
          formDataToSubmit.append("name", validData.name)
          formDataToSubmit.append("description", validData.description)
          formDataToSubmit.append("color", validData.color)
          formDataToSubmit.append("auto_display_chatbox", validData.auto_display_chatbox)

          if (Array.isArray(validData.welcome_messages)) {
            formDataToSubmit.append("welcome_messages", JSON.stringify(validData.welcome_messages))
          }

          if (Array.isArray(validData.quick_prompts)) {
            formDataToSubmit.append("quick_prompts", JSON.stringify(validData.quick_prompts))
          }

          if (formData.logo instanceof File) {
            formDataToSubmit.append("logo", formData.logo)
          } else if (typeof formData.logo === "string" && formData.logo.startsWith("data:")) {
            const logoFile = await dataURLtoFile(formData.logo, "logo.png")
            formDataToSubmit.append("logo", logoFile)
          } else if (formData.logo) {
            formDataToSubmit.append("logo", formData.logo)
          }

          if (formData.favicon instanceof File) {
            formDataToSubmit.append("favicon", formData.favicon)
          } else if (typeof formData.favicon === "string" && formData.favicon.startsWith("data:")) {
            const faviconFile = await dataURLtoFile(formData.favicon, "favicon.png")
            formDataToSubmit.append("favicon", faviconFile)
          } else if (formData.favicon) {
            formDataToSubmit.append("favicon", formData.favicon)
          }

          await updateConfigBot(formDataToSubmit, bot._id)
            .then(async (res) => {
              if (res.data) {
                const { status, success } = res.data
                if (success && status === 201) {
                  getNotification("success", "Lưu tùy chỉnh thành công")
                  await getConfigBot()
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
