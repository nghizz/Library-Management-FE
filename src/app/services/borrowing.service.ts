import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrowing } from '../models/borrowing.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {
  private apiUrl = 'https://localhost:7282/api/Borrowing';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    const headersConfig: { [header: string]: string | string[] } = {};

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    return new HttpHeaders(headersConfig);
  }

  // Tạo mới borrowing
  createBorrowing(borrowing: Borrowing): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, borrowing, { headers: this.getHeaders() });
  }

  // Lấy tất cả borrowing
  getBorrowings(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Lấy borrowing theo ID
  getBorrowingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Cập nhật trạng thái borrowing
  // borrowing.service.ts
  updateBorrowingStatus(id: number, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    const body = { newStatus }; // Gửi enum BorrowingStatus dưới dạng string
    return this.http.put(url, body, { headers: this.getHeaders() });
  }

  
  // Xóa borrowing theo ID
  deleteBorrowing(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
