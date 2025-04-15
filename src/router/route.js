import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./rootLoader.js";
import UserHome from "@/pages/User/Home";
import UserLogin from "@/pages/User/Auth/Login";
import UserRegister from "@/pages/User/Auth/Register";
import UserBotChats from "@/pages/User/Bot";
import UserDashBoardDetailBotChats from "@/pages/User/DetailBot/DashBoard";
import UserIntegrationDetailBotChats from "@/pages/User/DetailBot/Integration";
import WebsiteLinksDetailBotChats from "@/pages/User/DetailBot/Links";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <UserLogin />,
    loader: ({ request, params }) => rootLoader({ request, params }, false),
  },
  {
    path: "/register",
    element: <UserRegister />,
    loader: ({ request, params }) => rootLoader({ request, params }, false),
  },
  {
    path: "",
    element: <UserHome />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, "LOAD_HOME_PAGE"),
  },
  {
    path: "/bot-chats",
    element: <UserBotChats />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, "LOAD_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId",
    element: <UserDashBoardDetailBotChats />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId/integration",
    element: <UserIntegrationDetailBotChats />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId/links",
    element: <WebsiteLinksDetailBotChats />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, "LOAD_DETAIL_BOT_PAGE"),
  },
]);

export default router;
