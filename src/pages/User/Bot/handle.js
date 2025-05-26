import { useEffect, useState } from 'react'
import _ from 'lodash'
import { changeStatusBot, createBotChat, deleteBot, getListBotChats } from '@/api/user/bot/index.js'
import { getNotification } from '@/utils/helper.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBotChats } from '@/states/modules/bot/index.js'
import { ColorMain, STATUS_BOT } from '@/utils/constants.js'
import { validate } from '@/utils/validates/validate.js'
import {
  createBotSchema,
  createBotInfoSchema,
  createBotKnowledgeSchema,
  createBotCompanySchema,
} from '@/pages/User/Bot/schema.js'
import IconChat from "@/assets/images/logos/icon_chat.png";
import {getListDescriptionJobs} from "@/api/user/descriptionJob/index.js";

export default function Handle() {
  const [visibleDeleteBot, setVisibleDeleteBot] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [dataForm, setDataForm] = useState({
    name: '',
    description: null,
    logo_message: IconChat,
    color: ColorMain,
    url: '',
    file: null,
    name_business: '',
    logo: null,
  })
  const [errorDataForm, setErrorDataForm] = useState({
    name: '',
    description: '',
    logo_message: '',
    color: '',
    url: '',
    file: '',
    name_business: '',
    logo: '',
  })

  const [loadingBtnCreateBot, setLoadingBtnCreateBot] = useState(false)
  const botChats = useSelector((state) => state.bot.botChats)
  const [loadingListBot, setLoadingListBot] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [botSelect, setBotSelect] = useState(null)
  const [loadingBtnDelete, setLoadingBtnDelete] = useState(false)
  const [descriptionJobs, setDescriptionJobs] = useState([])

  useEffect(() => {
    handleGetListBotChats()
    handleGetListDescriptionJobs()
  }, [])

  const handleChangeData = (type, value) => {
    let data = _.cloneDeep(dataForm)
    data[type] = value
    setDataForm(data)
  }

  const onFocusInputLesson = (type) => {
    let errorData = _.cloneDeep(errorDataForm)
    errorData[type] = ''
    setErrorDataForm(errorData)
  }

  const handleNextStep = () => {
    switch (currentStep) {
      case 0:
        validate(createBotInfoSchema, dataForm, {
          onSuccess: () => setCurrentStep(currentStep + 1),
          onError: (error) => setErrorDataForm(error),
        })
        break
      case 1:
        validate(createBotKnowledgeSchema, dataForm, {
          onSuccess: () => setCurrentStep(currentStep + 1),
          onError: (error) => setErrorDataForm(error),
        })
        break
      case 2:
        validate(createBotCompanySchema, dataForm, {
          onSuccess: () => handleConfirmCreateBot(),
          onError: (error) => setErrorDataForm(error),
        })
        break
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleConfirmCreateBot = async () => {
    validate(createBotSchema, dataForm, {
      onSuccess: () => {
        setLoadingBtnCreateBot(true)
        const formData = new FormData()

        formData.append('name', dataForm.name)
        formData.append('description', dataForm.description)
        formData.append('color', dataForm.color)
        formData.append('logo_message', dataForm.logo_message)
        formData.append('name_business', dataForm.name_business)
        formData.append('logo', dataForm.logo)

        if (dataForm.file) {
          formData.append('file', dataForm.file)
        }

        if (dataForm.url) {
          formData.append('url', dataForm.url)
        }

        createBotChat(formData)
          .then(() => {
            getNotification('success', 'Tạo bot thành công.')
            navigate('/bot-chats')
            setTimeout(() => {
              handleGetListBotChats()
            }, 1000)
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
                url: _.get(errors, 'url', ''),
              })
              getNotification(
                'error',
                Object.keys(errors)
                  .map((key) => errors[key])
                  .join(', ')
              )
            } else {
              getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.')
            }
          })
          .finally(() => setLoadingBtnCreateBot(false))
      },
      onError: (error) => setErrorDataForm(error),
    })
  }

  const handleGetListBotChats = () => {
    setLoadingListBot(true)
    getListBotChats()
      .then((res) => {
        dispatch(setBotChats(res.data.data.botChats))
      })
      .catch(() => {
        dispatch(setBotChats([]))
      })
      .finally(() => setLoadingListBot(false))
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

  const handleRedirectDetailBot = (botId) => {
    navigate(`/bot-chats/${botId}`)
  }

  const handleOpenModelDelete = (bot) => {
    setBotSelect(bot)
    setVisibleDeleteBot(true)
  }

  const handleConfirmDelete = () => {
    setLoadingBtnDelete(true)
    deleteBot(botSelect._id)
      .then(() => {
        handleGetListBotChats()
        getNotification('success', 'Xóa danh mục thành công.')
      })
      .catch(() => {
        getNotification('error', 'Xóa danh mục thất bại')
      })
      .finally(() => {
        setLoadingBtnDelete(false)
      })
  }

  const handleChangeStatus = (value, bot_id) => {
    const status = value ? STATUS_BOT.ACTIVE : STATUS_BOT.DE_ACTIVE
    changeStatusBot({ status }, bot_id)
      .then(() => {
        handleGetListBotChats()
        getNotification('success', 'Cập nhật trạng thái thành công.')
      })
      .catch(() => {
        getNotification('error', 'Cập nhật trạng thái thất bại')
      })
  }

  return {
    dataForm,
    errorDataForm,
    currentStep,
    botChats,
    loadingListBot,
    loadingBtnCreateBot,
    visibleDeleteBot,
    setVisibleDeleteBot,
    loadingBtnDelete,
    descriptionJobs,
    handleChangeData,
    onFocusInputLesson,
    handleRedirectDetailBot,
    handleConfirmCreateBot,
    handleOpenModelDelete,
    handleConfirmDelete,
    handleChangeStatus,
    handleNextStep,
    handlePrevStep,
  }
}
