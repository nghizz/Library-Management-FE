export interface Borrowing {
  id?: number; // Thêm id
  cccd: string;
  returnDate: Date;
  borrowDate?: Date; // Thêm borrowDate
  status?: number; // Thêm status
  borrowingDetails: BorrowingDetail[];
  user?: User;
}

export interface User { // Tạo interface User
  idUser?: number;
  userName?: string;
  email?: string;
  phone?: string;
  fullName?: string; // Thêm trường fullName
}

export interface BorrowingDetail {
  bookId: number;
  quantity: number;
  book?: Book; // Thêm book (tùy thuộc vào cấu trúc dữ liệu từ API)
}

export interface Book { // Thêm interface Book để lưu thông tin sách
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
}
