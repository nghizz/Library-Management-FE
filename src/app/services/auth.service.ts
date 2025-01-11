import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7147/api/Auth';

  constructor(private http: HttpClient) { }

  // Hàm login
  login(loginModel: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginModel);
  }

  // Hàm kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      return !!token && !this.isTokenExpired(token); // Kiểm tra token có hợp lệ không
    }
    return false;
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  // Lưu token vào localStorage
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  // Xóa thông tin người dùng khi logout
  clearUserData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }

  // Kiểm tra xem token có hết hạn hay không
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã phần payload của JWT
      const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)
      return payload.exp < currentTime; // So sánh thời gian hết hạn với thời gian hiện tại
    } catch (error) {
      console.error('Không thể giải mã token:', error);
      return true; // Token không hợp lệ
    }
  }
  isAdmin(): boolean {
    const userStr = localStorage.getItem('user'); // Lấy thông tin người dùng với key 'user'
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.Roles && user.Roles.includes('Admin'); // Kiểm tra role 'admin'
    }
    return false;
  }
}
