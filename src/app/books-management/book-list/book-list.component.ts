import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = '';
  isLoading = true;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // Trong component BookListComponent
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        console.log(response);  // Kiểm tra cấu trúc response
        if (response && Array.isArray(response.data)) {
          this.books = response.data;  // Gán mảng sách vào biến `books`
        } else {
          console.error('Dữ liệu trả về không phải là mảng:', response.data);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải danh sách sách', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.bookService.searchBooks(this.searchTerm).pipe(
        debounceTime(500), // Đợi 500ms trước khi gửi yêu cầu tìm kiếm
        switchMap((data) => {
          return this.bookService.searchBooks(data);
        })
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
      if(confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
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
}
