import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Customer } from '../../models/customer.model';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newCustomer: Customer = {
    cccd: '',
    fullName: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private router: Router, private customerService: UserService) {}

  cancel(): void {
    if (confirm('Bạn có chắc chắn muốn hủy thao tác thêm mới?')) { 
      this.router.navigate(['/home']);
    }
  }

  submitForm(form: any): void {
    if (form.valid) {
      this.customerService.addCustomer(this.newCustomer).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
