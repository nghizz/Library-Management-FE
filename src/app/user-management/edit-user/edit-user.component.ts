import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  customer: Customer | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.loadCustomerById(customerId);
    }
  }

  // Phương thức để tải thông tin khách hàng từ API
  loadCustomerById(id: string): void {
    this.loading = true;
    this.customerService.getCustomerById(id).subscribe(
      (response) => {
        if (response.data) {
          this.customer = response.data;
        } else {
          this.errorMessage = 'Không tìm thấy khách hàng.';
          alert(this.errorMessage);
          this.router.navigate(['/users']); // Quay lại trang danh sách nếu không tìm thấy khách hàng
        }
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        this.errorMessage = 'Không thể tải thông tin khách hàng.';
        alert(this.errorMessage);
        this.loading = false;
      }
    );
  }

  // Phương thức để lưu khách hàng
  saveCustomer(customer: Customer): void {
    if (!customer) {
      this.errorMessage = 'Không có thông tin khách hàng để lưu.';
      alert(this.errorMessage);
      return;
    }

    this.loading = true;
    this.customerService.editCustomer(customer).subscribe(
      (response) => {
        if (response.status === 'Success') {
          alert('Cập nhật khách hàng thành công!');
          this.router.navigate(['/users']); // Quay lại trang danh sách khi lưu thành công
        } else {
          this.errorMessage = response.message;
          alert(this.errorMessage);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lưu khách hàng:', error);
        this.errorMessage = 'Lỗi khi lưu khách hàng.';
        alert(this.errorMessage);
        this.loading = false;
      }
    );
  }

  // Phương thức hủy chỉnh sửa
  cancelEdit(): void {
    this.router.navigate(['/users']); // Quay lại danh sách khi hủy chỉnh sửa
  }
}
