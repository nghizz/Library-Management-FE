import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BorrowingService } from '../../services/borrowing.service';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  isAdmin: boolean = false;
  books: Book[] = [];
  searchTerm: string = '';
  isLoading = true;
  currentPage: number = 1;
  itemsPerPage: number = 5; // Số sách hiển thị mỗi trang
  totalItems: number = 0; // Tổng số sách
  pagedBooks: Book[] = []; // Danh sách sách hiển thị trên trang hiện tại
  p: number = 1; // Khai báo biến p để lưu số trang hiện tại

  counter(i: number): number[] {
    return i > 0 ? new Array(i) : [];
  }

  // Cập nhật checkedQuantities để lưu số lượng sách muốn mượn
  checkedQuantities: { [bookId: number]: number } = {};

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute, private authService: AuthService, private borowwing: BorrowingService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.isAdmin = this.authService.isAdmin();
  }

  loadBooks(): void {
    this.bookService.getBooks().pipe(
      tap(response => {
        if (response && Array.isArray(response.data)) {
          this.books = response.data;
          this.totalItems = this.books.length;
          this.updatePagedBooks();

          // Khởi tạo checkedQuantities sau khi nhận được dữ liệu
          this.books.forEach(book => {
            this.checkedQuantities[book.id!] = 0; // Khởi tạo số lượng sách muốn mượn là 0
          });
        } else {
          console.error('Dữ liệu trả về không hợp lệ:', response.data);
        }
      })
    ).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải danh sách sách', error);
        this.isLoading = false;
      }
    });
  }

  updatePagedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedBooks = this.books.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedBooks(); // Cập nhật danh sách hiển thị
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.bookService.searchBooks(this.searchTerm).pipe(
        debounceTime(500) // Đợi 500ms trước khi gửi yêu cầu tìm kiếm
      ).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (error) => {
          console.error('Lỗi khi tìm kiếm sách', error);
        }
      });
    } else {
      this.loadBooks();
    }
  }

  onEditBook(id: number): void {
    this.router.navigate([`/books/edit/${id}`]);
  }

  onViewDetails(id: number): void {
    this.router.navigate([`/books/details/${id}`]);
  }

  onDeleteBook(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
        },
        error: (error) => {
          console.error('Lỗi khi xóa sách', error);
        }
      });
    }
  }

  onAddBook(): void {
    this.router.navigate(['books/add']);
  }

  // Cập nhật số lượng sách
  onUpdateQuantity(bookId: number, quantityChange: number): void {
    this.bookService.updateBookQuantity(bookId, quantityChange).subscribe({
      next: () => {
        alert('Cập nhật số lượng thành công');
        this.loadBooks();  // Tải lại danh sách sách
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật số lượng sách', error);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Xử lý khi checkbox thay đổi
  onCheckboxChange(book: Book): void {
    if (!this.checkedQuantities[book.id!]) {
      this.checkedQuantities[book.id!] = 1;  // Mặc định số lượng khi chọn sách
    } else {
      this.checkedQuantities[book.id!] = 0;  // Nếu bỏ chọn thì đặt lại số lượng
    }
  }

  //thêm chuyển trang đến trang mượn sách 
  onBorrowBooks() {
    const selectedBooks = this.books
      .map(book => ({
        id: book.id ?? 0,
        title: book.title,
        quantity: this.checkedQuantities[book.id!] || 0
      }))
      .filter(book => book.quantity > 0);

    console.log('Selected Books:', selectedBooks);
    if (!selectedBooks || selectedBooks.length === 0) {
      alert('Vui lòng chọn ít nhất một cuốn sách để mượn.');
      return;
    }

    // Chuyển hướng sang trang tạo yêu cầu mượn sách
    this.borowwing.setSelectedBooks(selectedBooks);
    this.router.navigate(['/borrowing/create']);
  }
}
