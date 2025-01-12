import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    isbn: '',
    publishYear: '',
    quanity: 0,
    categoryId: 0
  };
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (data) => {
          this.book = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Lỗi khi tải thông tin sách', error);
          this.isLoading = false;
          alert('Không thể tải thông tin sách, vui lòng thử lại!');
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  saveChanges(): void {
    if (!this.book.title || !this.book.author || !this.book.isbn || this.book.quanity <= 0) {
      alert('Vui lòng nhập đầy đủ thông tin sách!');
      return;
    }

    this.isLoading = true;
    if (this.book.id) {
      this.bookService.updateBook(this.book.id, this.book).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Cập nhật sách thành công!');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Lỗi khi cập nhật sách', error);
          alert('Có lỗi xảy ra khi cập nhật sách. Vui lòng thử lại!');
        }
      });
    } else {
      this.bookService.addBook(this.book).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Thêm sách mới thành công!');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Lỗi khi thêm sách mới', error);
          alert('Có lỗi xảy ra khi thêm sách mới. Vui lòng thử lại!');
        }
      });
    }
  }

  goBack(): void {
    const confirmBack = confirm('Bạn có chắc chắn muốn quay lại mà không lưu?');
    if (confirmBack) {
      this.router.navigate(['/books']);
    }
  }
}
