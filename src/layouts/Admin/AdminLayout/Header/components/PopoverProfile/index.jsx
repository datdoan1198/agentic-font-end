import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Button} from "antd";
import {logout} from "@/api/admin/auth";
import {removeAuthTokenAdmin} from "@/utils/localStorage.js";
import {getNotification} from "@/utils/helper";
import _ from "lodash";
import {useSelector} from "react-redux";

function PopoverProfile() {
    const [loadingLogout, setLoadingLogout] = useState(false);
    const authUser = useSelector((state) => state.auth.authAdmin);
    const handleConfirmLogout = () => {
        setLoadingLogout(true);
        logout()
            .then(() => {
                removeAuthTokenAdmin();
                window.location.href = `${window.location.href}`;
            })
            .catch((error) => {
                getNotification("error", _.get(error, "response.data.message", "Đã xảy ra lỗi! Vui lòng thử lại sau."));
            })
            .finally(() => setLoadingLogout(false));
    };

    return (
        <div className={styles.modalInfoWrap}>

            <div className={styles.mainModalInfoWrap}>
                {authUser?.name?.length > 0 &&
                    <div className={'p-5'}>
                        <div className="font-semibold text-brandb-base text-left text-base">{authUser.name}</div>
                        {authUser.school_current &&
                            <div
                                className='text-gray-45 text-sm'>{authUser.affiliated_branch ? authUser.affiliated_branch.name : authUser.school_current.name}</div>
                        }
                    </div>
                }
                <div className="border-t border-gray-300 mx-5"></div>
                <ul className={styles.menuInfoWrap}>
                    <li className={`${styles.itemInfoWrap}`}>
                        <div>
                            <span className={styles.text}>Thông tin cá nhân</span>
                        </div>
                    </li>
                    <li onClick={() => handleConfirmLogout()} className={styles.itemInfoWrap}>
                        <Button
                            type="text"
                            loading={loadingLogout}
                            className="!h-[unset] !p-0 !rounded-none hover:!text-black-15 hover:!bg-transparent active:!text-black-15 active:!bg-transparent"
                        >
                            Đăng xuất
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PopoverProfile;
