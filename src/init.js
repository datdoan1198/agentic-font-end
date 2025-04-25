import React from "react";
import { createRoot } from "react-dom/client";
import ChatBox from "@/components/Feature/ChatBox";
import {emptyDisplay} from "@/config/antd.js";
import {Provider} from "react-redux";
import store from "@/states/configureStore.js";
import {ToastContainer} from "react-toastify";
import {ConfigProvider} from "antd";
import "./index.scss"
import "tw-elements-react/dist/css/tw-elements-react.min.css"
import "animate.css"
import "react-toastify/dist/ReactToastify.css"

function init({ code }) {
    const id = "agentic-ai-chat-root";
    let container = document.getElementById(id);
    if (!container) {
        container = document.createElement("div");
        container.id = id;
        document.body.appendChild(container);
    }

    const root = createRoot(container);
    root.render(
        <ConfigProvider renderEmpty={emptyDisplay}>
            <Provider store={store}>
                <ChatBox botId={code} />
                <ToastContainer />
            </Provider>
        </ConfigProvider>
    );
}

window.AiAgentic = { init };
