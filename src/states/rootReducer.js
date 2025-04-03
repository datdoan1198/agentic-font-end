import appReducer from './modules/app/index.js';
import authSlide from './modules/auth/index.js';

const rootReducer = {
  app: appReducer,
  auth: authSlide
}

export default rootReducer
