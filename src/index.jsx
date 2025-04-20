import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import "tw-elements-react/dist/css/tw-elements-react.min.css"
import reportWebVitals from "./reportWebVitals"
import { RouterProvider } from "react-router-dom"
import router from "./router/route.js"
import { Provider } from "react-redux"
import store from "./states/configureStore"
import "animate.css"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ConfigProvider } from "antd"
import { emptyDisplay } from "./config/antd.js"

Chart.register(CategoryScale)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ConfigProvider renderEmpty={emptyDisplay}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </ConfigProvider>
)

reportWebVitals()
