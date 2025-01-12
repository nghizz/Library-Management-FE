import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  customers: Customer[] = [];
  searchTerm: string = '';
  editingCustomer: Customer | null = null;
  isLoading = true;

  constructor(private customerService: UserService, private router: Router) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'Success') {
          this.customers = response.data;
        } else {
          console.error('Failed to load customers:', response.message);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
        this.isLoading = false;
      }
    );
  }

  editCustomer(customer: Customer): void {
    this.router.navigate([`/users/edit`, customer.id]);
  }  

  saveCustomer(customer: Customer): void {
    this.customerService.editCustomer(customer).subscribe(
      (response) => {
        if (response.status === 'Success') {
          this.getCustomers();
          this.editingCustomer = null;
        } else {
          console.error('Failed to save customer:', response.message);
        }
      },
      (error) => {
        console.error('Lỗi khi lưu khách hàng:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  deleteCustomer(customerId: number | undefined): void {
    if (customerId === undefined) {
        console.error('customerId cannot be undefined');
        return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
        this.customerService.deleteCustomer(customerId).subscribe(
          (response) => {
            if (response.status === 'Success') {
              this.getCustomers();
            } else {
              console.error('Failed to delete customer:', response.message);
            }
          },
          (error) => {
            console.error('Lỗi khi xóa khách hàng:', error);
          }
        );
    }
  }

  searchCustomers(): void {
    this.customerService.searchCustomers(this.searchTerm).subscribe(
      (response) => {
        if (response.status === 'Success') {
          this.customers = response.data;
        } else {
          console.error('Không tìm thấy khách hàng:', response.message);
        }
      },
      (error) => {
        console.error('Lỗi khi tìm kiếm khách hàng:', error);
      }
    );
  }
}
