import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // Biến giả lập để lưu thông tin user (thay thế PHP session)
  userId: string | null = null;
  isOpen: boolean = false;

  ngOnInit(): void {
    // Giả lập dữ liệu user lấy từ session (hoặc API sau này)
    this.userId = 'User123'; // Thay bằng API hoặc service nếu có
  }
  constructor(
      private router: Router
    ) { }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  // Hàm xử lý logout
  logOut(): void {
    // Xóa thông tin user giả lập
    this.userId = null;
    console.log('User logged out');
    // Thêm logic điều hướng bằng Angular Router (nếu cần)
    this.router.navigate(['/login']);
  }
}
