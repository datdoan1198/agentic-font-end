import React from "react";
import MainLayout from "@/layouts/User/MainLayout";
import styles from "@/pages/User/Home/styles.module.scss";

export default function Home() {
    return (
        <MainLayout>
            <div className={styles.homeContainer}>
                <div>Home Page User</div>
            </div>
        </MainLayout>
    )
}


