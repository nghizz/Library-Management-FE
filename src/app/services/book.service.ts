import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { UpdateBookQuantityDto } from '../models/update-book-quantity.model'; // Import DTO mới

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://localhost:7025/api/Books'; // Đảm bảo baseUrl chính xác

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Lấy danh sách tất cả các sách
  getBooks(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.getHeaders() });
  }

  // Tìm kiếm sách theo tiêu đề
  searchBooks(searchTerm: string): Observable<any> {
    const url = `${this.baseUrl}?title=${encodeURIComponent(searchTerm)}`; //dùng encodeURIComponent để mã hóa dữ liệu
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  // Lấy thông tin một cuốn sách theo ID
  getBookById(id: number): Observable<Book> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Book>(url, { headers: this.getHeaders() });
  }

  // Thêm một cuốn sách mới
  addBook(bookDto: any): Observable<any> { // Dùng DTO khi tạo sách
    return this.http.post<any>(this.baseUrl, bookDto, { headers: this.getHeaders() });
  }

  // Cập nhật thông tin một cuốn sách
  updateBook(id: number, bookDto: any): Observable<any> { // Cập nhật với BookDTO
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, bookDto, { headers: this.getHeaders() });
  }

  // Xóa một cuốn sách
  deleteBook(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }

  // Cập nhật số lượng sách
  updateBookQuantity(bookId: number, quantityChange: number): Observable<any> {
    const url = `${this.baseUrl}/${bookId}/quantity`;
    const body: UpdateBookQuantityDto = { BookId: bookId, QuantityChange: quantityChange }; // Sử dụng DTO cho body
    return this.http.put(url, body, { headers: this.getHeaders() });
  }
}
