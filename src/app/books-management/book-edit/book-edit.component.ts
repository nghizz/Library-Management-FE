import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service'; // Import service
import { Book } from '../../models/book.model'; // Import model

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', isbn: '', category: '', publishYear: 0, quantity: 0, available: 0, description: '', coverImage: '' };
  isLoading: boolean = true;  // Khai báo biến isLoading

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
      this.isLoading = false;  // Đặt isLoading thành false khi dữ liệu đã được tải xong
    });
  }

  saveChanges(): void {
    const id = this.book.id;
    this.bookService.updateBook(id, this.book).subscribe(() => {
      this.router.navigate(['/']); // Điều hướng lại danh sách sách sau khi lưu
    });
  }

  goBack(): void {
    this.router.navigate(['/']);  // Quay lại danh sách sách
  }
}
