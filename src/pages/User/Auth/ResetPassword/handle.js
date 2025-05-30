import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../../api/user/auth";
import { getNotification } from '@/utils/helper.js';

export default function Handle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [formData, setFormData] = useState({
    new_password: "",
    confirm_new_password: "",
  });

  const [errorFormData, setErrorFormData] = useState({
    new_password: "",
    confirm_new_password: "",
  });

  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [messageErrorChangePassword, setMessageErrorChangePassword] = useState("");

  const handleChangeData = (type, value) => {
    setFormData({
      ...formData,
      [type]: value,
    });
  };

  const onFocusInputLesson = (type) => {
    setErrorFormData({
      ...errorFormData,
      [type]: "",
    });
    setMessageErrorChangePassword("");
  };

  const validationForm = () => {
    let isValid = true;
    const errorFields = {};

    if (!formData.new_password || formData.new_password.trim() === "") {
      errorFields.new_password = "Vui lòng nhập mật khẩu mới";
      isValid = false;
    } else if (formData.new_password.length < 6) {
      errorFields.new_password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    if (!formData.confirm_new_password || formData.confirm_new_password.trim() === "") {
      errorFields.confirm_new_password = "Vui lòng xác nhận mật khẩu mới";
      isValid = false;
    } else if (formData.new_password !== formData.confirm_new_password) {
      errorFields.confirm_new_password = "Xác nhận mật khẩu không khớp";
      isValid = false;
    }

    setErrorFormData(errorFields);
    return isValid;
  };

  const handleConfirmChangePassword = async () => {
    if (!validationForm()) return;

    setLoadingChangePassword(true);
    try {
      const response = await resetPassword({
        password: formData.new_password,
        code: code,
      });
      if (response && response.data && response.data.success) {
        getNotification("success", "Thay đổi mật khẩu thành công!");
        handleRedirectRoute("/login");
      } else {
        setMessageErrorChangePassword(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      setMessageErrorChangePassword(error.response?.data?.message || "Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại sau.");
      setLoadingChangePassword(false);
    } finally {
      setLoadingChangePassword(false);
    }
  };

  const handleRedirectRoute = (route) => {
    navigate(route);
  };

  return {
    formData,
    errorFormData,
    loadingChangePassword,
    messageErrorChangePassword,
    handleChangeData,
    onFocusInputLesson,
    handleConfirmChangePassword,
    handleRedirectRoute,
  };
}
