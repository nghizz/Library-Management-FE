import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowingService } from '../../services/borrowing.service';
import { Borrowing, BorrowingDetail } from '../../models/borrowing.model';
import { Location } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-borrowing-form',
  templateUrl: './borrowing-form.component.html',
  styleUrls: ['./borrowing-form.component.css']
})
export class BorrowingFormComponent implements OnInit {
  availableBooks: Book[] = []; // Danh sách sách có sẵn trong CSDL
  selectedBooks: { id: number; title: string; quantity: number }[] = [];
  cccd: string = '';
  returnDate: Date = new Date();
  searchTerm: string = '';
  todayDate: string;
  isLoadingList: boolean = true;

  constructor(
    private borrowingService: BorrowingService,
    private bookService: BookService, // Inject BookService
    private router: Router,
    private location: Location
  ) { 
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadAvailableBooks(); // Load danh sách sách khi component khởi tạo
  }

  loadAvailableBooks() {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.availableBooks = response.data;
        } else {
          console.error('Dữ liệu trả về không hợp lệ:', response.data);
          this.isLoadingList = false;
        }
      },
      error: (error) => {
        console.error('Lỗi khi tải danh sách sách', error);
        this.isLoadingList = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.bookService.searchBooks(this.searchTerm).pipe(
        debounceTime(500) // Đợi 500ms trước khi gửi yêu cầu tìm kiếm
      ).subscribe({
        next: (data) => {
          this.availableBooks = data;
        },
        error: (error) => {
          console.error('Lỗi khi tìm kiếm sách', error);
          this.isLoadingList = false;
        }
      });
    } else {
      this.loadAvailableBooks();
    }
  }

  // Thêm sách vào danh sách sách đã chọn
  addBook(book: Book) {
    const existingBook = this.selectedBooks.find(b => b.id === book.id);
    if (existingBook) {
      // Nếu sách đã tồn tại, tăng số lượng
      existingBook.quantity++;
    } else {
      // Nếu sách chưa tồn tại, thêm sách vào danh sách
      this.selectedBooks.push({ id: book.id!, title: book.title, quantity: 1 });
    }
  }

  removeBook(index: number) {
    this.selectedBooks.splice(index, 1);
  }

  createBorrowing() {
    if (!this.cccd || !this.returnDate || this.selectedBooks.length === 0) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    // Tạo phiếu mượn thông qua API
    const borrowingDetails: BorrowingDetail[] = this.selectedBooks.map(book => ({
      bookId: book.id!,
      quantity: book.quantity
    }));

    const newBorrowing: Borrowing = {
      cccd: this.cccd,
      returnDate: this.returnDate,
      borrowingDetails: borrowingDetails
    };

    this.borrowingService.createBorrowing(newBorrowing).subscribe(
      (response: any) => {
        if (response.status === "Faild" && response.message === "Customer not found with CCCD!") {
          // Nếu thông báo là "Customer not found with CCCD!", hiển thị hộp thoại xác nhận
          const confirmNavigate = confirm("Người dùng không tồn tại. Bạn có muốn tạo người dùng mới?");
          if (confirmNavigate) {
            this.router.navigate(['/users/add']); // Chuyển đến trang tạo người dùng
          }
        } else {
          // Nếu thành công, chuyển hướng hoặc hiển thị thông báo
          console.log('Tạo phiếu mượn thành công', response);
          this.router.navigate(['/books']);
        }
      },
      (error: any) => {
        console.error('Lỗi khi tạo phiếu mượn', error);
        // Hiển thị thông báo lỗi cho người dùng
        alert('Lỗi khi tạo phiếu mượn. Vui lòng thử lại sau.');
      }
    );
  }

  onBack(): void {
    alert('Bạn có chắc chắn muốn thoát không?');
    this.location.back();
  }
}
