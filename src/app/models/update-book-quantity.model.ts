export interface UpdateBookQuantityDto {
    BookId: number;       // ID của sách
    QuantityChange: number; // Số lượng thay đổi (có thể âm hoặc dương)
}
