import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.loginModel).subscribe(
      (response) => {
        if (response.status === 'Success') {
          // Xử lý đăng nhập thành công
          const userData: User = {
            IdUser: response.data.idUser,
            Username: response.data.username,
            AccessToken: response.data.accessToken,
            Expiration: response.data.expiration,
            Roles: response.data.roles,
          };
  
          // Lưu thông tin người dùng và token vào localStorage
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('accessToken', response.data.accessToken);
  
          console.log('Đăng nhập thành công', userData);
          
          // Điều hướng đến trang chính sau khi đăng nhập thành công
          this.router.navigate(['/home']);
        } else if (response.message === "This UserName don't have in system!") {
          console.error('Tài khoản không tồn tại:', response.message);
          alert('Tài khoản không tồn tại!');
        } else if (response.message === 'The password is incorrect!') {
          console.error('Mật khẩu không đúng:', response.message);
          alert('Mật khẩu không đúng!');
        } else {
          console.error('Lỗi đăng nhập:', response.message);
          alert(response.message);  // Hiển thị thông báo lỗi từ API
        }
      },
      (error) => {
        console.error('Lỗi API:', error);
        alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!');
      }
    );
  }

  forgotPassword() {
    console.log('Forgot password clicked');
    // Điều hướng đến trang quên mật khẩu
    this.router.navigate(['/forgot-password']);
  }
}
