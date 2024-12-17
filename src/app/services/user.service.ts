import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, username: 'nguyenvana', email: '[email protected]', fullName: 'Nguyen Van A', role: 'admin', phoneNumber: '0123456789', address: 'Hà Nội' },
    { id: 2, username: 'tranthib', email: '[email protected]', fullName: 'Tran Thi B', role: 'user', phoneNumber: '0123456790', address: 'Hồ Chí Minh' },
    { id: 3, username: 'levanc', email: '[email protected]', fullName: 'Le Van C', role: 'admin', phoneNumber: '0123456791', address: 'Đà Nẵng' },
  ];

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    const newUser = { ...user, id: this.generateId() };
    this.users.push(newUser);
  }

  editUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  searchUsers(searchTerm: string): User[] {
    if (!searchTerm) {
      return this.users; // Trả về danh sách đầy đủ nếu không có từ khóa tìm kiếm
    }
    return this.users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  private generateId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(user => user.id!)) + 1 : 1;
  }
}