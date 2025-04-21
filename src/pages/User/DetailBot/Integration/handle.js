import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import _ from "lodash";
import {getInfoBot, getListPageFB, selectPageFB, unlinkPageFB} from "@/api/user/bot/index.js";
import { getNotification } from "@/utils/helper.js";
import { setBot } from "@/states/modules/detailBot/index.js";
import { useNavigate } from "react-router-dom";

export default function Handle() {
  const bot = useSelector((state) => state.detailBot.bot);
  const [listPageFB, setListPageFB] = useState([]);
  const [loadingBtnSelectPage, setLoadingBtnSelectPage] = useState(false);
  const [loadingBtnUnlink, setLoadingBtnUnlink] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(bot) && _.isEmpty(bot.page)) {
      getListPageFB(bot._id)
        .then((res) => {
          setListPageFB(res.data.data);
        })
        .catch(() => {
          setListPageFB([]);
        });
    }
  }, []);

  const facebookLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_FB_APP_ID;
    const REDIRECT_URI = encodeURIComponent(`${import.meta.env.VITE_API_URL}/auth/callback`);
    const SCOPES = "pages_show_list,pages_messaging";

    const fbAuthURL = `${
      import.meta.env.VITE_FB_URL
    }?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code&state=${bot._id}`;

    window.location.href = fbAuthURL;
  };

  const handleSelectPage = (page_id) => {
    setLoadingBtnSelectPage(true);
    selectPageFB({ page_id }, bot._id)
      .then(() => {
        handleGetDetailBot();
        getNotification("success", "Chọn fanpage thành công.");
      })
      .catch(() => {
        getNotification("error", "Chọn fanpage không thành công.");
      })
      .finally(() => setLoadingBtnSelectPage(false));
  };

  const handleGetDetailBot = () => {
    getInfoBot(bot._id)
      .then((res) => {
        dispatch(setBot(res.data.data));
      })
      .catch(() => {
        dispatch(setBot({}));
        navigate("bot-chats");
      });
  };

  const handleConfirmUnlink = () => {
      setLoadingBtnUnlink(true)
      unlinkPageFB(bot._id).then(() => {
          getNotification('success', 'Ngắt kết nối thành công.');
          handleGetDetailBot();
      }).catch(() => {
          getNotification('error', 'Ngắt kết nối thất bại.');
      }).finally(() => setLoadingBtnUnlink(false));
  }

  return {
    bot, listPageFB, loadingBtnSelectPage, loadingBtnUnlink,
    facebookLogin, handleSelectPage, handleConfirmUnlink
  };
}
