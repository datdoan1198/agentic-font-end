import React, {useState} from "react";
import AuthLayout from "@/layouts/Admin/AuthLayout";
import {Alert, Button, Flex, Input} from "antd";
import styles from "./styles.module.scss";
import clsx from "clsx";
import _ from "lodash";
import ErrorMessage from "@/components/ErrorMessage/index.jsx";
import {validate} from "@/utils/validates/validate.js";
import {LoginSchema} from "./schema.js";
import {login} from "@/api/admin/auth/index.js";
import {setAuthTokenAdmin} from "@/utils/localStorage.js";

function Login() {
    const [dataFormLogin, setDataFormLogin] = useState({phone: "", password: ""});
    const [errorDataLogin, setErrorDataLogin] = useState({});
    const [loadingRequestLogin, setLoadingRequestLogin] = useState(false);
    const [messageErrorLogin, setMessageErrorLogin] = useState("");

    const handleChangeInput = (e, type) => {
        let value = e.target.value;
        let data = _.cloneDeep(dataFormLogin);
        data[type] = value;
        setDataFormLogin(data);
    };

    const handleFocusInput = (key) => setErrorDataLogin({...errorDataLogin, [key]: ""});

    const handleConfirmLogin = () => {
        validate(LoginSchema, dataFormLogin, {
            onSuccess: (data) => {
                setLoadingRequestLogin(true);
                setMessageErrorLogin("");
                login(data)
                    .then((res) => {
                        const accessToken = res.data.data.access_token;
                        setAuthTokenAdmin(accessToken);
                        window.location.href = "/admin";
                    })
                    .catch((error) => {
                        if (error.response?.data) {
                            const {message, detail} = error.response.data;
                            if (detail) {
                                setErrorDataLogin(detail);
                            } else {
                                setMessageErrorLogin(message);
                            }
                        }
                    })
                    .finally(() => setLoadingRequestLogin(false));
            },
            onError: setErrorDataLogin,
        });
    };

    return (
        <AuthLayout title={"Đăng nhập"} description={""}>
            {messageErrorLogin &&
                <Alert type="error" closable message={messageErrorLogin} className="mb-3 text-black-15" showIcon/>}
            <div className={`input-wrap`}>
                <div className={styles.title}>Số điện thoại</div>
                <Input
                    className={clsx("main-input", errorDataLogin.phone ? "error-input" : "")}
                    placeholder={"Nhập số điện thoại"}
                    value={dataFormLogin.phone}
                    onChange={(e) => handleChangeInput(e, "phone")}
                    onFocus={() => handleFocusInput("phone")}
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmLogin()}
                />
                <ErrorMessage message={errorDataLogin?.phone}/>
            </div>

            <div className={`input-wrap mt-5`}>
                <div className={styles.title}>Mật khẩu</div>
                <Input.Password
                    className={clsx("main-input", errorDataLogin.password ? "error-input" : "")}
                    placeholder={"Mật khẩu"}
                    value={dataFormLogin.password}
                    onChange={(e) => handleChangeInput(e, "password")}
                    onFocus={() => handleFocusInput("password")}
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmLogin()}
                />
                <ErrorMessage message={errorDataLogin?.password}/>
            </div>
            <Flex vertical gap="small">
                <Button
                    loading={loadingRequestLogin}
                    type="primary"
                    onClick={() => handleConfirmLogin()}
                    size={"large"}
                    className={`main-btn-primary font-semibold mt-1`}
                    block
                >
                    Đăng nhập
                </Button>
            </Flex>
        </AuthLayout>
    );
}

export default Login;
