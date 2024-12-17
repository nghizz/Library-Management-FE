// borrowing-record.model.ts
export interface BorrowingRecord {
    borrower: {
      name: string;
      email: string;
      phone: string;
    };
    borrowDate: string;
    returnDate: string;
    books: { id: number; title: string; author: string }[];  // Danh sách sách mượn
  }
  