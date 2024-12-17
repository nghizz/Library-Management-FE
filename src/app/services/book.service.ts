import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor() { }

  // Phương thức giả lập để lấy danh sách sách
  getBooks(): Observable<Book[]> {
    const books: Book[] = [
      {
        id: 1,
        title: 'Sách mẫu 1',
        author: 'Tác giả 1',
        isbn: '123456',
        category: 'Thể loại 1',
        publishYear: 2021,
        quantity: 10,
        available: 8,
        description: 'Mô tả sách mẫu 1',
        coverImage: '/assets/images/book1.jpg'
      },
      {
        id: 2,
        title: 'Sách mẫu 2',
        author: 'Tác giả 2',
        isbn: '987654',
        category: 'Thể loại 2',
        publishYear: 2022,
        quantity: 5,
        available: 3,
        description: 'Mô tả sách mẫu 2',
        coverImage: '/assets/images/book2.jpg'
      }
    ];

    return of(books); // Trả về danh sách sách như một Observable
  }

  // Phương thức giả lập để tìm kiếm sách theo từ khóa
  searchBooks(searchTerm: string): Observable<Book[]> {
    const books: Book[] = [
      {
        id: 1,
        title: 'Sách mẫu 1',
        author: 'Tác giả 1',
        isbn: '123456',
        category: 'Thể loại 1',
        publishYear: 2021,
        quantity: 10,
        available: 8,
        description: 'Mô tả sách mẫu 1',
        coverImage: '/assets/images/book1.jpg'
      },
      {
        id: 2,
        title: 'Sách mẫu 2',
        author: 'Tác giả 2',
        isbn: '987654',
        category: 'Thể loại 2',
        publishYear: 2022,
        quantity: 5,
        available: 3,
        description: 'Mô tả sách mẫu 2',
        coverImage: '/assets/images/book2.jpg'
      }
    ];

    // Tìm kiếm sách theo tên
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filteredBooks); // Trả về kết quả tìm kiếm như một Observable
  }

  // Phương thức giả lập để lấy chi tiết sách theo ID
  getBookById(id: number): Observable<Book> {
    const book: Book = {
      id: id,
      title: `Sách mẫu ${id}`,
      author: `Tác giả ${id}`,
      isbn: `123456789${id}`,
      category: 'Thể loại mẫu',
      publishYear: 2021,
      quantity: 10,
      available: 8,
      description: `Mô tả chi tiết về sách mẫu ${id}`,
      coverImage: `/assets/images/book${id}.jpg`
    };

    return of(book); // Trả về sách chi tiết như một Observable
  }

  // Phương thức giả lập để thêm sách mới
  addBook(book: Book): Observable<Book> {
    return of({ ...book, id: new Date().getTime() });
  }

  // Phương thức giả lập để sửa sách
  updateBook(id: number, book: Book): Observable<Book> {
    return of({ ...book, id });
  }

  // Phương thức giả lập để xóa sách
  deleteBook(id: number): Observable<void> {
    console.log('Xóa sách với ID:', id);
    return of(); // Trả về Observable hoàn thành
  }
}
