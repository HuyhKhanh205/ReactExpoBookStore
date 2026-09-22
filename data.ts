const COVER = 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600';

const DESCRIPTION = [
  'Cuốn sách là tập hợp những bài học được đúc kết từ hàng trăm câu chuyện đời thường, giúp người đọc nhìn lại cách mình đang sống, đang làm việc và đang đối xử với những người xung quanh.',
  'Mỗi chương sách mở ra bằng một tình huống quen thuộc, sau đó dẫn dắt người đọc đi tới nguyên tắc cốt lõi phía sau tình huống đó. Cách viết gần gũi, không giáo điều, không áp đặt, để mỗi người tự rút ra phần phù hợp với hoàn cảnh của mình.',
  'Điểm mạnh của tác phẩm nằm ở tính thực hành: sau mỗi nguyên tắc đều có ví dụ cụ thể và gợi ý áp dụng ngay trong công việc lẫn cuộc sống hằng ngày. Đây là lý do cuốn sách được tái bản liên tục suốt nhiều thập kỷ và vẫn giữ nguyên giá trị.',
  'Sách phù hợp với học sinh, sinh viên, người đi làm và bất kỳ ai muốn cải thiện kỹ năng giao tiếp, xây dựng các mối quan hệ bền vững cũng như tìm lại sự cân bằng cho chính mình.',
].join('\n\n');

export interface Book {
  id: string;
  title: string;
  author: string;
  /** Đơn giá (VND), để số nguyên để cộng tổng tiền ở màn Giỏ hàng. */
  price: number;
  coverImage: string;
  discountPercent?: number;
  description: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export const BOOKS: Book[] = [
  { id: '1', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000, coverImage: COVER, discountPercent: 20, description: DESCRIPTION },
  { id: '2', title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, coverImage: COVER, description: DESCRIPTION },
  { id: '3', title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: 68000, coverImage: COVER, discountPercent: 10, description: DESCRIPTION },
  { id: '4', title: 'Cây Cam Ngọt Của Tôi', author: 'José Mauro de Vasconcelos', price: 92000, coverImage: COVER, description: DESCRIPTION },
  { id: '5', title: 'Muôn Kiếp Nhân Sinh', author: 'Nguyên Phong', price: 128000, coverImage: COVER, discountPercent: 15, description: DESCRIPTION },
  { id: '6', title: 'Tôi Tài Giỏi, Bạn Cũng Thế', author: 'Adam Khoo', price: 75000, coverImage: COVER, description: DESCRIPTION },
];

export const CATEGORIES = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Ngoại ngữ',
  'Tâm lý',
  'Lịch sử',
];

/** 86000 -> "86.000đ". Tự chèn dấu chấm thay vì Intl để chạy đồng nhất trên mọi nền tảng. */
export function formatVnd(value: number): string {
  return `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`;
}
