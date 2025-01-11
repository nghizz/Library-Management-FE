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
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  createBorrowing(borrowing: Borrowing): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, borrowing, { headers: this.getHeaders() }); 
  }

  getBorrowings(): Observable<Borrowing[]> {
    return this.http.get<Borrowing[]>(`${this.apiUrl}/get-all`, { headers: this.getHeaders() }); 
  }


  //set dữ liệu sách đã chọn để thực hiện thành toán 
  private selectedBooks: { id: number; title: string; quantity: number }[] = [];

  // Getter và Setter cho selectedBooks
  setSelectedBooks(books: { id: number; title: string; quantity: number }[]): void {
    this.selectedBooks = books;
  }

  getSelectedBooks(): { id: number; title: string; quantity: number }[] {
    return this.selectedBooks;
  }

}