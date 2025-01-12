import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent {
  book: Book = {
    title: '',
    author: '',
    isbn: '',
    publishYear: '2023',
    quanity: 0,
    categoryId: null, // Đảm bảo khởi tạo là null hoặc giá trị mặc định
  };
  isLoading = false;

  constructor(private bookService: BookService, private router: Router) { }

  addBook(): void {
    if (!this.book.title || !this.book.author || !this.book.isbn || this.book.quanity <= 0) {
      alert('Vui lòng nhập đầy đủ thông tin sách!');
      return;
    }

    this.isLoading = true;
    // Trước khi gửi dữ liệu, bạn có thể kiểm tra hoặc xử lý lại dữ liệu
    console.log('Dữ liệu sách:', this.book);

    this.bookService.addBook(this.book).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Thêm sách thành công!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Lỗi khi thêm sách', error);
        this.isLoading = false;
        alert('Có lỗi xảy ra khi thêm sách. Vui lòng thử lại!');
      }
    });
  }

  goBack(): void {
    const confirmBack = confirm('Bạn có chắc chắn muốn quay lại mà không lưu?');
    if (confirmBack) {
      this.router.navigate(['/books']);
    }
  }
}
