import React, {useState} from 'react'
import BotLayout from "@/layouts/User/BotLayout";
import styles from "./styles.module.scss";
import {useSelector} from "react-redux";

export default function Embed() {
    const [copied, setCopied] = useState(false);
    const bot = useSelector((state) => state.detailBot.bot);

    const codeString = `<script src="${window.location.origin}/dist/widget/main.js"></script>
<script>
  window.AiAgentic.init({ code: "${bot._id}" });
</script>
`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <BotLayout>
            <div className={styles.headerWrap}>
                <div className={styles.title}>
                    Nhúng code
                </div>
            </div>
            <div className={styles.mainWrap}>
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
        </BotLayout>
    )
}
