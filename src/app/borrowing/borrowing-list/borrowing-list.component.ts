import { Component, OnInit } from '@angular/core';
import { BorrowingService } from '../../services/borrowing.service';
import { Borrowing } from '../../models/borrowing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrowing-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.css']
})
export class BorrowingListComponent implements OnInit {
  borrowings: Borrowing[] = [];
  isLoading = true;

  constructor(
    private borrowingService: BorrowingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBorrowings();
  }

  loadBorrowings(): void {
    this.borrowingService.getBorrowings().subscribe(
      (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.borrowings = response.data;
        } else {
          console.error('Dữ liệu không hợp lệ:', response);
          alert('Có lỗi khi tải danh sách đơn mượn sách, vui lòng thử lại!');
          this.isLoading = false;
        }
      },
      (error: any) => {
        console.error('Lỗi khi tải danh sách đơn hàng:', error);
        alert('Có lỗi khi tải danh sách đơn mượn sách, vui lòng thử lại!');
        this.isLoading = false;
      }
    );
  }

  viewDetails(borrowingId: number): void {
    this.router.navigate(['/borrowing/detail', borrowingId]);
  }
  borrowBook(): void{
    this.router.navigate(['/borrowing/create']);
  }
}
