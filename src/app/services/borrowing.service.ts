import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Borrowing } from '../models/borrowing.model'; // Giả sử bạn có model Borrowing
import { BorrowingRecord } from '../models/borrowingrecord.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  constructor() { }

  // Giả lập việc tạo đơn mượn sách
  createBorrowing(borrower: any, borrowDetails: any): Observable<any> {
    console.log('Thông tin người mượn:', borrower);
    console.log('Chi tiết mượn sách:', borrowDetails);

    // Giả lập trả về kết quả thành công sau khi "gửi" thông tin mượn sách
    return of({ success: true, message: 'Đơn mượn sách đã được tạo thành công!' });
  }
  getBorrowingRecords(): Observable<BorrowingRecord[]> {
    const records: BorrowingRecord[] = [
      {
        borrower: { name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789' },
        borrowDate: '2024-12-10',
        returnDate: '2024-12-20',
        books: [
          { id: 1, title: 'Sách mẫu 1', author: 'Tác giả 1' },
          { id: 2, title: 'Sách mẫu 2', author: 'Tác giả 2' },
        ],
      },
      {
        borrower: { name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321' },
        borrowDate: '2024-12-11',
        returnDate: '2024-12-21',
        books: [
          { id: 3, title: 'Sách mẫu 3', author: 'Tác giả 3' },
        ],
      },
      // Thêm các bản ghi khác nếu cần
    ];

    return of(records);  // Trả về Observable chứa dữ liệu giả lập
  }
}
