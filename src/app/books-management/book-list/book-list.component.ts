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
        alert('Có lỗi khi tải danh sách sách, vui lòng thử lại!');
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
          alert('Có lỗi xảy ra khi tìm kiếm sách, vui lòng thử lại!');
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
          alert('Xóa sách thành công!');
          this.books = this.books.filter(book => book.id !== id);
        },
        error: (error) => {
          console.error('Lỗi khi xóa sách', error);
          alert('Có lỗi khi xóa sách, vui lòng thử lại!');
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
        alert('Cập nhật số lượng thành công!');
        this.loadBooks();  // Tải lại danh sách sách
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật số lượng sách', error);
        alert('Có lỗi khi cập nhật số lượng sách, vui lòng thử lại!');
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
