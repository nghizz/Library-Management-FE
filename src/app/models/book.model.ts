export interface Book {
  id?: number;           // ID của sách
  title: string;         // Tên sách
  author?: string;       // Tác giả (có thể null)
  isbn?: string;         // ISBN (có thể null)
  publishYear?: string;  // Năm xuất bản (có thể null)
  quanity: number;       // Số lượng (bắt buộc)
  categoryId: number | null;// ID thể loại (bắt buộc)
  createAt?: string;     // Thời gian tạo (ISO string)
  updateAt?: string;     // Thời gian cập nhật (ISO string)
  category?: Category;   // Đối tượng thể loại liên kết
}

export interface Category {
  id: number;
  name: string;
}
