import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = this.authService.getToken();
    if (accessToken && !this.authService.isTokenExpired(accessToken)) {
      return true; // Token hợp lệ
    } else {
      console.warn('Token không hợp lệ hoặc đã hết hạn. Chuyển hướng về trang login.');
      this.authService.clearUserData(); // Xóa dữ liệu người dùng
      return this.router.parseUrl('/login'); // Chuyển hướng về trang login
    }
  }
}
