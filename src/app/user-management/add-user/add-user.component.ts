import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: any = {
    username: '',
    email: '',
    fullName: '',
    role: 'user',
    phoneNumber: '',
    address: ''
  };

  constructor(private router: Router) {}

  // Xử lý khi nhấn Thêm mới
  onSubmit(): void {
    console.log('Thêm người dùng mới:', this.user);
    alert('Người dùng mới đã được thêm thành công!');
    this.resetForm();
  }

  // Reset form về trạng thái ban đầu
  resetForm(): void {
    this.user = {
      username: '',
      email: '',
      fullName: '',
      role: 'user',
      phoneNumber: '',
      address: ''
    };
  }

  // Hủy thao tác
  cancel(): void {
    alert('Hủy thao tác thêm mới!');
    this.router.navigate(['/home/']);
  }
}
