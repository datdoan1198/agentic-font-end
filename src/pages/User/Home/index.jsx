import React from "react";
import MainLayout from "@/layouts/User/MainLayout";
import styles from "@/pages/User/Home/styles.module.scss";

export default function Home() {
    const facebookLogin = () => {
        const CLIENT_ID = "1162832692148543";  // App ID của bạn
        const REDIRECT_URI = encodeURIComponent("https://f36b-2402-800-61ae-9d37-b52c-6f7a-c790-2c38.ngrok-free.app/auth/callback");
        const SCOPES = "pages_show_list,pages_messaging";
        const STATE = "AfuBoayAQuOepaXljYtjFT96C1eAnbzEjdT6sDh2";

        const fbAuthURL = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code&state=${STATE}`;

        window.location.href = fbAuthURL;
    };

    return (
        <MainLayout>
            <div className={styles.homeContainer}>
                <div>Home Page User</div>
                <button onClick={facebookLogin}>Đăng nhập Facebook</button>;
            </div>
        </MainLayout>
    )
}


