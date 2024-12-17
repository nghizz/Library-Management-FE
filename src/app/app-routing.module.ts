import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import các component
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { BookListComponent } from './books-management/book-list/book-list.component';
import { BookAddComponent } from './books-management/book-add/book-add.component';
import { BookEditComponent } from './books-management/book-edit/book-edit.component';
import { BookDetailsComponent } from './books-management/book-details/book-details.component';
import { BorrowingFormComponent } from './borrowing/borrowing-form/borrowing-form.component';
import { UserListComponent } from './user-management/user-list/user-list.component'; // Import component danh sách người dùng
import { AddUserComponent } from './user-management/add-user/add-user.component'; // Import component thêm người dùng
import { EditUserComponent } from './user-management/edit-user/edit-user.component'; // Import component sửa người dùng
import { ReportComponent } from './borrowing/report/report.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Trang chủ
  { path: 'login', component: LoginComponent }, // Trang đăng nhập
  { path: 'books', component: BookListComponent }, // Danh sách sách
  { path: 'books/add', component: BookAddComponent }, // Thêm sách mới
  { path: 'books/edit/:id', component: BookEditComponent }, // Sửa thông tin sách
  { path: 'books/details/:id', component: BookDetailsComponent }, // Xem chi tiết sách
  { path: 'borrowing/create', component: BorrowingFormComponent }, // Tạo đơn mượn sách
  { path: 'users', component: UserListComponent }, // Danh sách người dùng
  { path: 'users/add', component: AddUserComponent }, // Thêm người dùng mới
  { path: 'users/edit/:id', component: EditUserComponent }, // Sửa thông tin người dùng
  { path: 'report', component: ReportComponent }, // Báo cáo
  { path: '**', redirectTo: '' } // Redirect nếu không tìm thấy route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}