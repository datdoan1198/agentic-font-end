import moment from "moment";
import { toast } from 'react-toastify';
import vi_VN from 'antd/es/date-picker/locale/vi_VN.js';
import _ from "lodash";
import dayjs from "dayjs";

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,50}$/
export const VALIDATE_PHONE_REGEX_RULE = /^(0[235789])[0-9]{8}$/
export const VALIDATE_NAME_REGEX_RULE = /^[\p{L} ]*$/u;
export const MAX_STRING_SIZE = 255
export const MAX_SIZE_NAME = 50

export const hasPermissions = (userPermissions, ...permissions) => {
  if (!_.isArray(userPermissions) || _.isEmpty(userPermissions)) {
    return false;
  }
  if (userPermissions.includes("super-admin")) {
    return true;
  }
  return permissions.some((code) => userPermissions.includes(code));
};

export const getNotification = (type, content, duration = 2500, align = "top-right") => {
  toast[type](content, {
    position: align,
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
};

// Validate
export const isValidEmail = (email) => {
  let result = false
  if (email && typeof email === 'string') {
    const regex = RegExp(VALIDATE_EMAIL_REGEX);
    result = regex.test(email.trim())
  }
  return result
}


export const isValidPassword = (password) => {
  let result = false
  if (password && typeof password === 'string') {
    const regex = RegExp(VALIDATE_PASSWORD_REGEX);
    result = regex.test(password.trim())
  }
  return result
}

export const isValidPhone = (phone) => {
  let result = false

  if (phone && typeof phone === 'string') {
    let trimPhone = phone.trim()

    if (trimPhone) {
      const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

      let ruleMatchs = trimPhone.match(regexRule);

      if (ruleMatchs && ruleMatchs.length > 0) {
        result = (ruleMatchs[0] === trimPhone)
      }
    }
  }
  return result
}

export const handleCheckRoute = (routes, currentRoute, params = {}) => {
  let keys = Object.keys(params);
  let param = ''
  keys.map(key => {
    param += ('/'+params[key])
  });
  currentRoute = currentRoute.replaceAll(param, '');
  if (routes && routes.length > 0) {
    return routes.includes(currentRoute);
  }
};


export const convertQueryStringToObject = (queryString) => {
  if (queryString.charAt(0) === '?') {
    queryString = queryString.substring(1);
  }

  var pairs = queryString.split('&');
  var result = {};

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1] || '');

    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }

      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export const handleSetTimeOut = (func, delay = 1000, timeoutId = null) => {
  let handleSetTimeOut;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  handleSetTimeOut = setTimeout(func, delay);

  return handleSetTimeOut;
}

export const formatDate = (date) => {
  return  moment(date).format('DD/MM/YYYY');
}

export const formatDateTime = (date) => {
  return dayjs(date).format('HH:mm DD [thg] MM');
}

export const formatDateTimeTable = (date) => {
  return dayjs(date).format('HH:mm DD-MM-YYYY');
}

export const formatNumber = (number) => {
  const hasDecimal = number % 1 !== 0;
  if (hasDecimal) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  } else {
    return number.toLocaleString('en-US');
  }
}

export const handleConvertSportToUSDT = (sport) => {
  return sport * parseFloat(import.meta.env.VITE_EXCHANGE_VALUE_SPORT);
}

export const handleGetTotalBalance = (sport, usdt ) => {
  return (sport * parseFloat(import.meta.env.VITE_EXCHANGE_VALUE_SPORT)) + usdt;
}

export const handleGetTextSelectPage = (totalRecord, currentPage, perPage) => {
  if (totalRecord < 1) {
    return 'Không có bản ghi nào.'
  }
  let text = 'Hiển thị ';
  text += ((currentPage - 1) * perPage + 1) + ' - ';
  text += handleGetLastRecordFlowPage(totalRecord, currentPage, perPage) + ' trên tổng ';
  text += totalRecord + ' bản ghi.';
  return text;
}

export const handleGetLastRecordFlowPage = (totalRecord, currentPage, perPage) => {
  let number = (currentPage - 1) * perPage + perPage;
  if (totalRecord <= number) {
    number = totalRecord;
  }
  return Number(number);
}

export const formatLocalDateTime = {
  ...vi_VN,
  lang: {
      ...vi_VN.lang,
      shortWeekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      shortMonths:  [
        "Thg 1",
        "Thg 2",
        "Thg 3",
        "Thg 4",
        "Thg 5",
        "Thg 6",
        "Thg 7",
        "Thg 8",
        "Thg 9",
        "Thg 10",
        "Thg 11",
        "Thg 12",
    ],
    shortQuarter: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
      "now": "Hiện tại",
  },
}

export const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

export const compareValues = (value1, value2) => {
  if (value1 === value2) {
    return value1;
  }
  return null;
}

export const getFileType = (attachment) => {
  if (!attachment) {
    return 'unknown';
  }
  const extension = attachment.split('.').pop().toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return 'image';
  } else if (['pdf'].includes(extension)) {
      return 'pdf';
  } else if (['doc', 'docx'].includes(extension)) {
      return 'document';
  }  else if (['xls', 'xlsx'].includes(extension)) {
    return 'excel';
  } else {
      return 'unknown';
  }
}

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const isTokenExpired = (token) => {
  if (!token) return false;

  const decoded = parseJwt(token);
  const expirationTime = moment.unix(decoded.exp);
  return moment().isAfter(expirationTime);
}
