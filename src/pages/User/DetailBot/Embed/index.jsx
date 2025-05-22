import React, {useEffect, useState} from 'react'
import BotLayout from "@/layouts/User/BotLayout";
import styles from "./styles.module.scss";
import {useSelector} from "react-redux";
import {Button, Select, Tooltip} from 'antd';
import {validate} from "@/utils/validates/validate.js";
import {UpdateActiveUrlsBotChatSchema} from "@/pages/User/DetailBot/Embed/schema.js";
import {updateActiveUrlsBotChat} from "@/api/user/bot/index.js";
import ErrorMessage from "@/components/ErrorMessage/index.jsx";
import {getNotification} from "@/utils/helper.js";
import _ from 'lodash';
import InlineSVG from "react-inlinesvg";
import Question from "@/assets/images/icons/solid/circle-question.svg";

export default function Embed() {
    const [copied, setCopied] = useState(false);
    const [activeUrls, setActiveUrls] = useState([]);
    const [errorData, setErrorData] = useState({active_urls: ''});
    const [loading, setLoading] = useState(false);
    const bot = useSelector((state) => state.detailBot.bot);
    const codeString = `<script src="${import.meta.env.VITE_WIDGET_URL}"></script>
<script>
  window.AiAgentic.init({ code: "${bot._id}" });
</script>
`;
    useEffect(() => {
        setActiveUrls(bot.active_urls ? bot.active_urls : [])
    }, [bot])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleChange = value => {
        setActiveUrls(value)
        setErrorData({active_urls: ''})
    }

    const handleConfirmSave = () => {
        validate(UpdateActiveUrlsBotChatSchema, {active_urls: activeUrls}, {
            onSuccess: (data) => {
                setLoading(true)
                updateActiveUrlsBotChat(bot._id, data)
                    .then(() => {
                        getNotification("success", "Lưu thành công")
                    })
                    .catch((error) => {
                        if (error.response?.data) {
                            const {detail} = error.response.data;
                            setErrorData(detail);
                        }
                    })
                    .finally(() => setLoading(false));
            },
            onError: (error) => {
                const firstActiveUrlErrorKey = Object.keys(error).find(key => key.startsWith('active_urls.'));

                if (firstActiveUrlErrorKey) {
                    setErrorData({
                        active_urls: error[firstActiveUrlErrorKey]
                    });
                } else {
                    setErrorData(error);
                }
            },
        });
    }

    return (
        <BotLayout>
            <div className={styles.headerWrap}>
                <div className={styles.title}>
                    Nhúng code
                </div>
            </div>
            <div className={styles.mainWrap}>
                <div className={styles.sessionWrap}>
                    <div className={styles.tooltip}>
                        Cấu hình domain
                        <div className={styles.iconQuestion}>
                            <Tooltip placement="top" title={'Nhập danh sách domain vào ô bên dưới để hiển thị bong bóng chat ở phần tùy chỉnh'}>
                                <InlineSVG src={Question} width={16}/>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={styles.formSaveUrlActiveWrap}>
                        <Select
                            size={"large"}
                            showSearch={false}
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Nhập danh sách đường dẫn"
                            value={activeUrls}
                            onChange={(value) => handleChange(value)}
                            options={[]}
                            open={false}
                            suffixIcon={false}
                        />
                        {errorData.active_urls && errorData.active_urls.length > 0 ? <ErrorMessage message={errorData.active_urls} /> : ""}

                        <Button
                            className={styles.btnSave}
                            loading={loading}
                            onClick={() => handleConfirmSave()}
                        >Cập nhật
                        </Button>
                    </div>
                </div>

                <div className={styles.sessionWrap}>
                    <div className={styles.tooltip}>Sao chép mã nhúng dưới đây và thêm vào HTML</div>

                    <div className={styles.embedCodeWrap}>
                        <button
                            className={styles.btnCopy}
                            onClick={handleCopy}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <pre style={{ overflowX: 'auto' }}>
                        <code>
                          {codeString}
                        </code>
                      </pre>
                    </div>
                </div>
            </div>
        </BotLayout>
    )
}
