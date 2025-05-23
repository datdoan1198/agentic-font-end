// Cấu hình và kiểm tra moment.js
import moment from 'moment';
import 'moment/locale/vi';

// Đảm bảo locale tiếng Việt được áp dụng cho toàn bộ ứng dụng
moment.locale('vi');

// Ghi đè các cụm từ tương đối cho phù hợp hơn với tiếng Việt
moment.updateLocale('vi', {
  relativeTime: {
    future: '%s tới',
    past: '%s trước',
    s: 'vài giây',
    ss: '%d giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    w: '1 tuần',
    ww: '%d tuần',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm'
  },
  // Thêm các tùy chỉnh khác nếu cần
});

// Hàm kiểm tra locale đã được áp dụng chưa
export function checkMomentLocale() {
  console.log('Current locale:', moment.locale());
  console.log('Sample relative time:', moment().subtract(5, 'minutes').fromNow());
  return moment.locale();
}

// Export các hàm tiện ích nếu cần
export default {
  checkMomentLocale
}; 