import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { validateEmail, validatePassword } from '@/utils/validation'

export default function Handle() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  })

  const [errorFormData, setErrorFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  })

  const [loadingChangePassword, setLoadingChangePassword] = useState(false)
  const [messageErrorChangePassword, setMessageErrorChangePassword] = useState('')

  const handleChangeData = (type, value) => {
    setFormData({
      ...formData,
      [type]: value,
    })
  }

  const onFocusInputLesson = (type) => {
    setErrorFormData({
      ...errorFormData,
      [type]: '',
    })
    setMessageErrorChangePassword('')
  }

  const validationForm = () => {
    let isValid = true
    const errorFields = {}

    if (!formData.current_password || formData.current_password.trim() === '') {
      errorFields.current_password = 'Vui lòng nhập mật khẩu hiện tại'
      isValid = false
    }

    if (!formData.new_password || formData.new_password.trim() === '') {
      errorFields.new_password = 'Vui lòng nhập mật khẩu mới'
      isValid = false
    } else if (formData.new_password.length < 6) {
      errorFields.new_password = 'Mật khẩu phải có ít nhất 6 ký tự'
      isValid = false
    }

    if (!formData.confirm_new_password || formData.confirm_new_password.trim() === '') {
      errorFields.confirm_new_password = 'Vui lòng xác nhận mật khẩu mới'
      isValid = false
    } else if (formData.new_password !== formData.confirm_new_password) {
      errorFields.confirm_new_password = 'Xác nhận mật khẩu không khớp'
      isValid = false
    }

    if (formData.current_password === formData.new_password) {
      errorFields.new_password = 'Mật khẩu mới không được trùng với mật khẩu hiện tại'
      isValid = false
    }

    setErrorFormData(errorFields)
    return isValid
  }

  const handleConfirmChangePassword = async () => {
    if (!validationForm()) return

    setLoadingChangePassword(true)
    try {
      // Call API to change password here
      // Example:
      // const response = await apiChangePassword(formData)
      // if (response.success) {
      //   navigate('/login')
      // } else {
      //   setMessageErrorChangePassword(response.message || 'Có lỗi xảy ra khi thay đổi mật khẩu')
      // }

      // Temporary success - to be replaced with actual API call
      setTimeout(() => {
        setLoadingChangePassword(false)
        navigate('/login')
      }, 1000)
    } catch (error) {
      setMessageErrorChangePassword('Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại sau.')
      setLoadingChangePassword(false)
    }
  }

  const handleRedirectRoute = (route) => {
    navigate(route)
  }

  return {
    formData,
    errorFormData,
    loadingChangePassword,
    messageErrorChangePassword,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmChangePassword,
    handleRedirectRoute,
  }
}
