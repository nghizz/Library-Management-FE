import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  searchTerm: string = '';
  editingUser: User | null = null; 
  users: User[] = []; // Khởi tạo mảng người dùng
  newUser: User = { // Khởi tạo đối tượng người dùng để thêm mới
    username: '',
    email: '',
    fullName: '',
    role: 'user', // Mặc định là 'user'
    phoneNumber: '',
    address: ''
  };

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers(); // Lấy dữ liệu từ UserService
  }

  onSearch(): void {
    this.users = this.userService.searchUsers(this.searchTerm); // Tìm kiếm người dùng
  }
  addUser() {
    this.userService.addUser(this.newUser); // Thêm người dùng mới
    this.users = this.userService.getUsers(); // Cập nhật danh sách người dùng
    this.resetNewUser(); // Đặt lại form
  }

  editUser(user: User): void {
    this.editingUser = { ...user }; // Tạo bản sao để chỉnh sửa
  }

  saveUser(updatedUser: User): void {
    this.userService.editUser(updatedUser); // Lưu thông tin người dùng đã chỉnh sửa
    this.users = this.userService.getUsers(); // Cập nhật danh sách
    this.editingUser = null; // Đóng form chỉnh sửa
  }

  cancelEdit(): void {
    this.editingUser = null; // Đóng form chỉnh sửa
  }
  deleteUser(userId: number | undefined) {
    if (userId !== undefined) { // Kiểm tra nếu userId không phải là undefined
      this.userService.deleteUser(userId);
      this.users = this.userService.getUsers(); // Cập nhật danh sách người dùng
    }
  }

  resetNewUser() {
    this.newUser = {
      username: '',
      email: '',
      fullName: '',
      role: 'user',
      phoneNumber: '',
      address: ''
    };
  }
}