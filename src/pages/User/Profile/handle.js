import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import _ from "lodash";
import {validate} from "@/utils/validates/validate.js";
import {changePasswordSchema, infoSchema} from "@/pages/User/Profile/schema.js";
import {changePassword, getChangeProfile, getMeForUser} from "@/api/user/auth/index.js";
import {getNotification} from "@/utils/helper.js";
import {setAuthUser} from "@/states/modules/auth/index.js";
import {removeAuthTokenAdmin} from "@/utils/localStorage.js";
import {setBotChats} from "@/states/modules/bot/index.js";

export default function Handle() {
  const authUser = useSelector(state => state.auth.authUser)
  const dispatch = useDispatch()

  const [dataInfo, setDataInfo] = useState({
    name: authUser.name
  })
  const [errorDataInfo, setErrorDataInfo] = useState({
    name: ''
  })
  const [loadingInfo, setLoadingInfo] = useState(false)

  const [dataChangePassword, setDataChangePassword] = useState({
    password: '',
    password_confirm: ''
  })
  const [errorDataChangePassword, setErrorDataChangePassword] = useState({
    password: '',
    password_confirm: ''
  })
  const [loadingChangePassword, setLoadingChangePassword] = useState(false)

  const handleChangeDataInfo = (type, value) => {
    let data = _.cloneDeep(dataInfo);
    data[type] = value
    setDataInfo(data)
  }

  const onFocusInputLessonInfo = (type) => {
    let errorData = _.cloneDeep(errorDataInfo);
    errorData[type] = ''
    setErrorDataInfo(errorData)
  }


  const handleChangePassword = (type, value) => {
    let data = _.cloneDeep(dataChangePassword);
    data[type] = value
    setDataChangePassword(data)
  }

  const onFocusInputLessonChangePassword = (type) => {
    let errorData = _.cloneDeep(errorDataChangePassword);
    errorData[type] = ''
    setErrorDataChangePassword(errorData)
  }

  const handleConfirmSaveInfo = () => {
    validate(infoSchema, dataInfo, {
      onSuccess: (data) => {
        setLoadingInfo(true);
        getChangeProfile(data).then(() => {
          getMeForUser().then((res) => {
            dispatch(setAuthUser({isAuthAdminSuccess: true, data: res.data.data}))
            dispatch(setBotChats(res.data.data.botChats))
          }).catch(error => {
            if (error.response?.data?.status === 401) {
              removeAuthTokenAdmin();
            }
          });
          getNotification('success', 'Cập nhật thành công.')
        }).catch((error) => {
          getNotification('error', 'Cập nhật không thành công.')
          if (error.response?.data) {
            const {detail} = error.response.data;
            if (detail) {
              setErrorDataInfo(detail);
            }
          }
        })
        .finally(() => setLoadingInfo(false));
      },
      onError: setErrorDataInfo,
    });
  }

  const handleConfirmSaveChangePassword = () => {
    validate(changePasswordSchema, dataChangePassword, {
      onSuccess: (data) => {
        setLoadingChangePassword(true)
        changePassword(data).then(() => {
          setDataChangePassword({
            password: '',
            password_confirm: ''
          })
          getNotification('success', 'Thay đổi mật khẩu thành công.')
        }).catch((error) => {
          getNotification('error', 'Thay đổi mật khẩu không thành công.')
          if (error.response?.data) {
            const {detail} = error.response.data;
            if (detail) {
              setErrorDataChangePassword(detail);
            }
          }
        })
        .finally(() => setLoadingChangePassword(false));
      },
      onError: setErrorDataChangePassword,
    });
  }

  return {
    authUser,
    dataInfo, errorDataInfo, loadingInfo,
    dataChangePassword, errorDataChangePassword, loadingChangePassword,
    handleChangeDataInfo, onFocusInputLessonInfo, handleConfirmSaveInfo,
    handleChangePassword, onFocusInputLessonChangePassword, handleConfirmSaveChangePassword,
  }
}
