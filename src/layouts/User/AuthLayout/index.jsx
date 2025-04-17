import React from 'react';
import './styles.scss'
import styles from './styles.module.scss';
import {Col, Row} from "antd";

function AuthLayout({ children }) {

    return (
        <Row className={styles.authLoginWrap}>
            <Col span={12} className={styles.bannerWrap}>

            </Col>
            <Col span={12}>
                {children}
            </Col>
        </Row>
    );
}

export default AuthLayout;
