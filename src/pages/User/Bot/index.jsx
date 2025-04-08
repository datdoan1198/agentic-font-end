import React, {useState} from 'react'
import MainLayout from "@/layouts/User/MainLayout/index.jsx";
import styles from './styles.module.scss'
import {Button, Col, Popover, Row, Steps} from "antd";
import InlineSVG from "react-inlinesvg";
import Robot from "@/assets/images/icons/solid/robot.svg";
import InputForm from "@/components/InputForm/index.jsx";
import _ from "lodash";
import {LoadingOutlined} from "@ant-design/icons";

export default function Bot() {
    const [dataForm, setDataForm] = useState({link: ''})
    const [errorDataForm, setErrorDataForm] = useState({link: ''})
    const [loadingStep, setLoadingStep] = useState(null)
    const itemStep = [
        {
            title: 'Tự động khai thác liên kết',
            description: 'Hệ thống của chúng tôi sẽ tự động quét trang web của bạn và thu thập mọi liên kết quan trọng, giúp nắm bắt cấu trúc trang web toàn diện mà không cần phải thực hiện thủ công.',
            icon: loadingStep === 1 && <LoadingOutlined />,
        },
        {
            title: 'Trích xuất dữ liệu',
            description: 'Dựa trên dữ liệu đã thu thập, hệ thống của chúng tôi sẽ tự động xây dựng nhân vật cho bot, đảm bảo phù hợp với nội dung trang web và đáp ứng đúng nhu cầu của người dùng.',
            icon: loadingStep === 2 && <LoadingOutlined />,
        },
        {
            title: 'Tự động xây dựng tính cách cho bot',
            description: 'Các công cụ thu thập dữ liệu tiên tiến của chúng tôi sẽ tự động truy cập từng liên kết, trích xuất thông tin liên quan từ trang web của bạn, giúp trợ lý ảo có đủ kiến thức để hỗ trợ chính xác sau này.',
            icon: loadingStep === 3 && <LoadingOutlined />,
        },
        {
            title: 'Huấn luyện',
            description: 'Bot sẽ được đào tạo tự động dựa trên dữ liệu đã thu thập, giúp bot hiểu câu hỏi của người dùng và đưa ra câu trả lời hỗ trợ hữu ích mà không cần can thiệp từ con người.',
            icon: loadingStep === 4 && <LoadingOutlined />,
        }
    ]

    const handleChangeData = (type, value) => {
        let data = _.cloneDeep(dataForm);
        data[type] = value
        setDataForm(data)
    }

    const onFocusInputLesson = (type) => {
        let errorData = _.cloneDeep(errorDataForm);
        errorData[type] = ''
        setErrorDataForm(errorData)
    }

    const handleConfirmSubmitLink = () => {
        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= 3) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
    }

    return(
        <MainLayout>
            <div className={styles.boxBotChats}>
                <div className={styles.boxFilterWrap}>
                    <Popover
                        placement="leftBottom"
                        content={
                            <div className={styles.boxFormSubmitLink}>
                                <div className={styles.formSubmitLink}>
                                    <InputForm
                                        placeholder={'Nhập địa chỉ Website'}
                                        type={'link'}
                                        value={dataForm.link}
                                        error={errorDataForm.link}
                                        handleChangeData={(type, value) => handleChangeData(type, value)}
                                        onFocusInputLesson={(type) => onFocusInputLesson(type)}
                                    />

                                    <Button
                                        onClick={() => handleConfirmSubmitLink()}
                                        className={styles.btnConfirm}
                                    ><InlineSVG src={Robot} width={24}/>Tạo Bot
                                    </Button>
                                </div>

                                <Steps
                                    current={loadingStep}
                                    direction="vertical"
                                    items={itemStep}
                                />
                            </div>
                        }
                        trigger="click"
                    >
                        <Button
                            className={styles.btnAddBot}
                        ><InlineSVG src={Robot} width={24}/>Thêm Bot
                        </Button>
                    </Popover>
                </div>

                <div>
                    <Row gutter={10}>
                        <Col span={8}>
                            Item 1
                        </Col>
                        <Col span={8}>
                            Item 1
                        </Col>
                        <Col span={8}>
                            Item 1
                        </Col>
                    </Row>

                    {/*<Empty />*/}
                </div>
            </div>
        </MainLayout>
    )
}
