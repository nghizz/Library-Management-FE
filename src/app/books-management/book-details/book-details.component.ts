import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service'; // Import service
import { Book } from '../../models/book.model'; // Import model

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  isLoading: boolean = true; // Để kiểm soát trạng thái loading

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
      this.isLoading = false; // Dừng trạng thái loading khi có dữ liệu
    });
  }

  // Phương thức quay lại trang trước
  goBack(): void {
    this.router.navigate(['/']); // Quay lại danh sách sách
  }

  // Phương thức cập nhật sách
  updateBook(): void {
    if (this.book) {
      this.bookService.updateBook(this.book.id, this.book).subscribe(updatedBook => {
        this.book = updatedBook; // Cập nhật thông tin sách sau khi sửa
        this.router.navigate(['/']); // Quay lại danh sách sách sau khi lưu
      });
    }
  }
}
