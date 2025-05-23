import moment from 'moment';
import './momentConfig';

/**
 * Định dạng thời gian hiển thị theo tiếng Việt
 * @param {string} dateString - Chuỗi thời gian cần định dạng
 * @param {number} maxDays - Số ngày tối đa để hiển thị dạng tương đối (ví dụ: "5 phút trước")
 * @returns {string} Chuỗi thời gian đã định dạng
 */
const formatViTime = (dateString, maxDays = 7) => {
  if (!dateString) return '';
  
  const now = moment();
  const date = moment(dateString);
  
  if (!date.isValid()) {
    return 'Ngày không hợp lệ';
  }
  
  const diffInDays = now.diff(date, 'days');

  if (diffInDays < maxDays) {
    return date.fromNow();
  } else {
    return date.format('DD/MM/YYYY');
  }
}

export default formatViTime; 