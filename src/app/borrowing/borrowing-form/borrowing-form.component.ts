import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BorrowingService } from '../../services/borrowing.service'; 
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-borrowing-form',
  templateUrl: './borrowing-form.component.html',
  styleUrls: ['./borrowing-form.component.css']
})
export class BorrowingFormComponent implements OnInit {
  isLoading = true;
  books: Book[] = [];  // Danh sách các sách được chọn
  borrower = { name: '', email: '', phone: '' };  // Thông tin người mượn
  borrowDetails = { books: [], borrowDate: '', returnDate: '', notes: '', quantity: 1  };  // Thông tin mượn sách

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private borrowingService: BorrowingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const bookIds = this.route.snapshot.queryParamMap.get('ids')?.split(','); // Lấy các ID sách từ query params
    if (bookIds && bookIds.length > 0) {
      this.loadBooks(bookIds);
    }
  }

  loadBooks(bookIds: string[]): void {
    const ids = bookIds.map(id => +id); // Chuyển sang dạng số
    this.books = [];  // Reset danh sách sách trước khi load
  
    // Lấy từng sách theo ID và thêm vào books
    ids.forEach(id => {
      this.bookService.getBookById(id).subscribe(
        (book) => {
          this.books.push(book);  // Thêm sách vào danh sách books
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading book:', error);
          this.isLoading = false;
        }
      );
    });
  }
  

  onSubmit(): void {
    // Thực hiện tạo đơn mượn sách với nhiều sách
    this.borrowingService.createBorrowing(this.borrower, this.borrowDetails).subscribe(
      (response) => {
        console.log('Thông tin mượn sách đã được lưu:', response);
        this.router.navigate(['/']); // Điều hướng đến báo cáo hoặc trang khác
      },
      (error) => {
        console.error('Error creating borrowing:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);  // Quay lại danh sách sách
  }
}
