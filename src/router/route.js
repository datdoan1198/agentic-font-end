import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {rootLoader} from "./rootLoader.js";
import UserHome from "@/pages/User/Home";
import UserLogin from "@/pages/User/Auth/Login";
import UserRegister from "@/pages/User/Auth/Register";
import UserForgotPassword from "@/pages/User/Auth/ForgotPassword";
import UserChangePassword from "@/pages/User/Auth/ChangePassword";
import UserBotChats from "@/pages/User/Bot";
import UserProfile from "@/pages/User/Profile";
import UserService from "@/pages/User/Service";
import UserDashBoardDetailBotChats from "@/pages/User/DetailBot/DashBoard";
import UserIntegrationDetailBotChats from "@/pages/User/DetailBot/Integration";
import WebsiteLinksDetailBotChats from "@/pages/User/DetailBot/Links";
import FileDetailBotChats from "@/pages/User/DetailBot/File";
import UserConversationDetailBotChats from "@/pages/User/DetailBot/Conversation";
import CustomizeBotPage from "@/pages/User/DetailBot/Customize/index.jsx";
import Embed from "@/pages/User/DetailBot/Embed";
import CreateBot from "@/pages/User/CreateBot";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <UserLogin />,
    loader: ({request, params}) => rootLoader({request, params}, false),
  },
  {
    path: "/register",
    element: <UserRegister />,
    loader: ({request, params}) => rootLoader({request, params}, false),
  },
  {
    path: "/forgot-password",
    element: <UserForgotPassword />,
    loader: ({request, params}) => rootLoader({request, params}, false),
  },
  {
    path: "/change-password",
    element: <UserChangePassword />,
    loader: ({request, params}) => rootLoader({request, params}, false),
  },
  {
    path: "",
    element: <UserHome />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_HOME_PAGE"),
  },
  {
    path: "/profile",
    element: <UserProfile />,
    loader: ({request, params}) =>
      rootLoader(
        {
          request,
          params,
        },
        true,
        "LOAD_HOME_PAGE"
      ),
  },
  {
    path: "/service",
    element: <UserService />,
    loader: ({request, params}) =>
      rootLoader(
        {
          request,
          params,
        },
        true,
        "LOAD_HOME_PAGE"
      ),
  },
  {
    path: "/bot-chats",
    element: <UserBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_BOT_PAGE"),
  },
  {
    path: "/bot-chats/create",
    element: <CreateBot />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId",
    element: <UserDashBoardDetailBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId/integration",
    element: <UserIntegrationDetailBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bots/:botId/links",
    element: <WebsiteLinksDetailBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bots/:botId/files",
    element: <FileDetailBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId/conversation",
    element: <UserConversationDetailBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bot-chats/:botId/conversation/:conversationId",
    element: <UserConversationDetailBotChats />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bots/:botId/customize",
    element: <CustomizeBotPage />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
  {
    path: "/bots/:botId/embed",
    element: <Embed />,
    loader: ({request, params}) => rootLoader({request, params}, true, "LOAD_DETAIL_BOT_PAGE"),
  },
]);

export default router;
