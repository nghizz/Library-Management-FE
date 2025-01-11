// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';

// Interface để xác định kiểu trả về từ API
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7247/api/Customers'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getCustomers(): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCustomerById(id: string): Observable<ApiResponse<Customer>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Customer>>(url, { headers: this.getHeaders() });
  }

  addCustomer(customer: Customer): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, customer, { headers: this.getHeaders() });
  }

  editCustomer(customer: Customer): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/${customer.id}`;
    return this.http.put<ApiResponse<any>>(url, customer, { headers: this.getHeaders() });
  }

  deleteCustomer(customerId: number | undefined): Observable<ApiResponse<any>> {
    if (customerId === undefined) {
      return throwError(() => new Error('customerId cannot be undefined'));
    }
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.delete<ApiResponse<any>>(url, { headers: this.getHeaders() });
  }

  searchCustomers(searchTerm: string): Observable<ApiResponse<Customer[]>> {
    const url = `${this.apiUrl}/search?searchTerm=${searchTerm}`;
    return this.http.get<ApiResponse<Customer[]>>(url, { headers: this.getHeaders() });
  }
}
