export const wedding = {
  eventName: "20/10 – Vietnamese Women's Day",
  shortName: "20/10",
  date: {
    iso: "2026-10-20T11:00:00+08:00",
    display: "20 tháng 10, 2026 · 11:00",
    location: "Chongqing University, Trung Quốc",
  },
  venue: {
    name: "Địa điểm sự kiện",
    lines: [
      "Chongqing University, Trung Quốc",
      "Chi tiết địa điểm sẽ được cập nhật sau.",
    ],
    mapQuery: "Chongqing University , Trung Quốc",
  },
  description:
    "Một ngày để yêu thương được gọi tên, để những người phụ nữ Việt Nam được nâng niu và tỏa sáng — nơi những người con xa quê tại Trùng Khánh cùng gửi trao niềm tự hào, niềm tin và những ước mơ đang lớn.",
} as const;

export const weddingTimeline = [
  { time: "11:00", title: "Lễ mở cửa", note: "Chào đón và sắp xếp chỗ ngồi" },
  { time: "11:30", title: "Lời chúc và lời dẫn", note: "Những câu chuyện ý nghĩa của ngày 20/10" },
  { time: "12:30", title: "Hoạt động kết nối", note: "Chia sẻ hình ảnh và kỷ niệm cùng bạn bè" },
  { time: "14:00", title: "Bữa ăn", note: "Nghênh hưởng cùng nhau" },
  { time: "16:00", title: "Hoạt động cuối", note: "Lời chúc và hẹn gặp lại trong tương lai" },
] as const;

export const faq = [
  {
    q: "Sự kiện có những hoạt động gì?",
    a: "Chương trình sẽ có nhiều hoạt động giao lưu, chia sẻ và những khoảnh khắc đặc biệt dành cho các bạn nữ. Chi tiết chương trình sẽ được cập nhật sớm trên trang.",
  },
  {
    q: "Tôi có cần đăng ký trước không?",
    a: "Có. Vui lòng hoàn thành form RSVP để ban tổ chức có thể chuẩn bị chu đáo về chỗ ngồi và các hoạt động trong chương trình.",
  },
  {
    q: "Tôi có thể tham gia cùng bạn bè không?",
    a: "Tất nhiên! Hãy rủ thêm những người bạn Việt Nam tại Trùng Khánh cùng tham gia và ghi rõ số lượng người đi cùng trong form RSVP nhé.",
  },
  {
    q: "Tôi nên chuẩn bị gì cho sự kiện?",
    a: "Chỉ cần mang theo một tâm trạng thật vui và một chút háo hức. Đừng quên diện một bộ trang phục bạn cảm thấy tự tin và thoải mái nhất!",
  },
] as const;
