export interface Borrowing {
    cccd: string; // Thay thế userId bằng CCCD
    returnDate: Date; 
    borrowingDetails: BorrowingDetail[]; // Thay thế bookId và quantity bằng BorrowingDetail[]
  }
  
  export interface BorrowingDetail {
    bookId: number;
    quantity: number;
  }