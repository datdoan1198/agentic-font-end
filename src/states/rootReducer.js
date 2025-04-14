import appReducer from './modules/app/index.js';
import authSlide from './modules/auth/index.js';
import botSlide from './modules/bot';
import detailBotSlide from './modules/detailBot';

const rootReducer = {
  app: appReducer,
  auth: authSlide,
  bot: botSlide,
  detailBot: detailBotSlide
}

export default rootReducer
