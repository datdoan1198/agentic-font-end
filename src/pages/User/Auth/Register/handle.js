import {useState} from "react";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {validate} from "@/utils/validates/validate.js";
import {RegisterSchema} from "./schema.js";
import {registerForUser} from "@/api/user/auth/index.js";
import {getNotification} from "@/utils/helper.js";

export default function Handle() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    })
    const [errorFormData, setErrorFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    })
    const [messageErrorRegister, setMessageErrorRegister] = useState("")
    const [loadingRegister, setLoadingRegister] = useState(false)
    const handleChangeData = (type, value) => {
        let data = _.cloneDeep(formData);
        data[type] = value
        setFormData(data)
    }

    const onFocusInputLesson = (type) => {
        let errorData = _.cloneDeep(errorFormData);
        errorData[type] = ''
        setErrorFormData(errorData)
    }

    const handleConfirmRegister = () => {
        validate(RegisterSchema, formData, {
            onSuccess: (data) => {
                delete data.password_confirm
                setLoadingRegister(true);
                registerForUser(data)
                    .then(() => {
                        getNotification('success', 'Tạo tài khoản thành công.');
                        setTimeout(() => {
                            navigate('/login')
                        }, 500)
                    })
                    .catch((error) => {
                        if (error.response?.data) {
                            const {message, detail} = error.response.data;
                            if (detail) {
                                setErrorFormData(detail);
                            } else {
                                setMessageErrorRegister(message);
                            }
                        }
                    })
                    .finally(() => setLoadingRegister(false));
            },
            onError: setErrorFormData,
        });
    }

    const handleRedirectRoute = (path) => {
        navigate(path)
    }

    return {
        formData, errorFormData, loadingRegister, messageErrorRegister,
        handleChangeData, onFocusInputLesson, handleConfirmRegister, handleRedirectRoute
    }
}
