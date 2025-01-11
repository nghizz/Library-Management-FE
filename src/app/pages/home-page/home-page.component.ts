import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class HomePageComponent implements OnInit {
  isOpen: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Kiểm tra xem người dùng có đăng nhập hay không
    if (!this.authService.isLoggedIn()) {
      console.log('Người dùng chưa đăng nhập, chuyển hướng về trang login.');
      this.router.navigate(['/login']);
    }
    this.isAdmin = this.authService.isAdmin();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  logOut(): void {
    this.authService.clearUserData(); // Xóa AccessToken và thông tin người dùng
    console.log('Đăng xuất thành công');
    this.router.navigate(['/login']); // Chuyển hướng về trang login
  }
}
