import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  isRegistering: boolean = false;

  constructor(private router: Router) {}

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }
  // Đăng nhập
  login() {
    // Giả sử đăng nhập thành công, điều hướng đến trang chủ
    console.log('Logged in with email:', this.email);
    this.router.navigate(['/home']);
  }

  // Đăng ký
  register() {
    // Giả sử đăng ký thành công, điều hướng đến trang chủ
    console.log('Registered with email:', this.email);
    this.router.navigate(['/home']);
  }

  // Quên mật khẩu (có thể điều hướng đến một trang khác)
  forgotPassword() {
    console.log('Forgot password clicked');
    // Điều hướng đến trang quên mật khẩu
    this.router.navigate(['/forgot-password']);
  }
}
