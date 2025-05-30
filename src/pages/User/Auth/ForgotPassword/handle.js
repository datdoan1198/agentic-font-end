import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotification } from "@/utils/helper"
import { forgotPassword } from '@/api/user/auth/index';

export default function Handle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "" });
  const [errorFormData, setErrorFormData] = useState({ email: "" });
  const [loadingForgotPassword, setLoadingForgotPassword] = useState(false);
  const [messageErrorForgotPassword, setMessageErrorForgotPassword] = useState("");

  const handleChangeData = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value,
    }));

    // Clear error when user starts typing
    if (errorFormData[type]) {
      setErrorFormData((prev) => ({
        ...prev,
        [type]: "",
      }));
    }
  };

  const onFocusInputLesson = (type) => {
    // Optional: Add any focus-related logic
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errorFormData };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    setErrorFormData(newErrors);
    return isValid;
  };

  const handleConfirmForgotPassword = async () => {
    setMessageErrorForgotPassword("");
    if (!validateForm()) {
      return;
    }

    setLoadingForgotPassword(true);

    try {
      await forgotPassword(formData.email);
      getNotification("success", "Đã gửi yêu cầu đặt lại mật khẩu. Vui lòng kiểm tra email của bạn.");
      handleRedirectRoute("/login");
    } catch (error) {
      setMessageErrorForgotPassword(
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      setLoadingForgotPassword(false);
    }
  };

  const handleRedirectRoute = (route) => {
    navigate(route);
  };

  return {
    formData,
    errorFormData,
    loadingForgotPassword,
    messageErrorForgotPassword,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmForgotPassword,
    handleRedirectRoute,
  };
} 