import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';  // Giả sử bạn đã có model Book

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishYear: 2021,
    quantity: 0,
    available: 0,
    description: '',
    coverImage: ''
  };
  isLoading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Có thể thêm logic khởi tạo, nếu cần thiết
  }

  addBook(): void {
    this.isLoading = true;
    // Logic thêm sách vào cơ sở dữ liệu hoặc trạng thái
    console.log('Adding book:', this.book);

    // Giả sử thêm thành công và chuyển hướng
    this.isLoading = false;
    this.router.navigate(['/']);  // Điều hướng đến danh sách sách
  }

  goBack(): void {
    this.router.navigate(['/']);  // Quay lại danh sách sách
  }
}
