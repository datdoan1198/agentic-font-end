import {useState} from "react";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {validate} from "@/utils/validates/validate.js";
import {LoginSchema} from "@/pages/User/Auth/Login/schema.js";
import {setAuthToken} from "@/utils/localStorage.js";
import {loginForUser} from "@/api/user/auth/index.js";

export default function Handle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errorFormData, setErrorFormData] = useState({
    email: '',
    password: ''
  })
  const [messageErrorLogin, setMessageErrorLogin] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false)

  const handleChangeData = (type, value) => {
    let data = _.cloneDeep(formData);
    data[type] = value
    setFormData(data)
  }

  const onFocusInputLesson = (type) => {
    setMessageErrorLogin('');
    let errorData = _.cloneDeep(errorFormData);
    errorData[type] = ''
    setErrorFormData(errorData)
  }

  const handleConfirmLogin = () => {
    validate(LoginSchema, formData, {
      onSuccess: (data) => {
        setLoadingLogin(true);
        loginForUser(data)
          .then((res) => {
            const accessToken = res.data.data.access_token;
            setAuthToken(accessToken);
            window.location.href = "/";
          })
          .catch((error) => {
            if (error.response?.data) {
              const {message, detail} = error.response.data;
              if (detail) {
                setErrorFormData(detail);
              } else {
                setMessageErrorLogin(message);
              }
            }
          })
          .finally(() => setLoadingLogin(false));
      },
      onError: setErrorFormData,
    });
  }

  const handleRedirectRoute = (path) => {
    navigate(path)
  }

  return {
    formData, errorFormData, loadingLogin, messageErrorLogin,
    handleChangeData, onFocusInputLesson, handleConfirmLogin, handleRedirectRoute
  }
}
