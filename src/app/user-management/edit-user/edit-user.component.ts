import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Input() user: User = {
    id: undefined,
    username: '',
    email: '',
    fullName: '',
    role: 'user',
    phoneNumber: '',
    address: ''
  };
  @Output() save = new EventEmitter<User>();
  @Output() cancelEdit = new EventEmitter<void>();

  onSubmit(): void {
    this.save.emit(this.user); // Gửi dữ liệu người dùng đã chỉnh sửa
  }

  cancel(): void {
    this.cancelEdit.emit(); // Hủy chỉnh sửa
  }
}
