import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BorrowingService } from '../../services/borrowing.service';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { Borrowing } from '../../models/borrowing.model';
import { Book } from '../../models/book.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-borrowing-detail',
  templateUrl: './borrowing-detail.component.html',
  styleUrls: ['./borrowing-detail.component.css']
})
export class BorrowingDetailComponent implements OnInit {
  borrowingId: number;
  borrowing: Borrowing | undefined;
  userFullName: string | undefined;
  userCccd: string | undefined;
  bookDetails: Book[] = []; // Danh sách thông tin sách mượn
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private borrowingService: BorrowingService,
    private userService: UserService,
    private bookService: BookService,
    private location: Location
  ) {
    this.borrowingId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadBorrowingDetails();
  }

  loadBorrowingDetails(): void {
    this.borrowingService.getBorrowingById(this.borrowingId).subscribe(
      (response: any) => {
        if (response.status === 'Success' && response.data) {
          this.borrowing = response.data;
          // Kiểm tra sự tồn tại của 'user' trước khi truy cập vào 'userId'
          if (this.borrowing?.user?.idUser) {
            this.loadUserDetails(this.borrowing.user.idUser);
          }
          if (this.borrowing?.borrowingDetails) {
            this.loadBookDetails(this.borrowing.borrowingDetails); // Tải thông tin sách
          }
        } else {
          console.error('Dữ liệu không hợp lệ:', response.message);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Lỗi khi tải chi tiết mượn sách:', error);
        this.isLoading = false;
      }
    );
  }

  loadUserDetails(userId: number): void {
    this.userService.getCustomerById(userId.toString()).subscribe(
      (response: any) => {
        if (response.status === 'Success' && response.data) {
          this.userFullName = response.data.fullName;
          this.userCccd = response.data.cccd;
          console.log('Thông tin người dùng:', this.userFullName, this.userCccd);
        } else {
          console.error('Không tìm thấy thông tin người dùng:', response.message);
        }
      },
      (error) => {
        console.error('Lỗi khi tải thông tin người dùng:', error);
      }
    );
  }

  loadBookDetails(borrowingDetails: any[]): void {
    borrowingDetails.forEach(detail => {
      this.bookService.getBookById(detail.bookId).subscribe(
        (response: any) => {
          if (response.status === 'Success' && response.data) {
            detail.book = response.data; // Gắn thông tin sách vào detail
            console.log('Thông tin sách:', detail.book); // Xem dữ liệu sách
          } else {
            console.error('Không tìm thấy thông tin sách:', response.message);
          }
        },
        (error) => {
          console.error('Lỗi khi tải thông tin sách:', error);
        }
      );
    });
  }
  

  updateStatus(newStatus: number): void {
    if (this.borrowing) {
      this.borrowingService.updateBorrowingStatus(this.borrowing.id!, newStatus.toString()).subscribe(
        () => {
          alert('Cập nhật trạng thái thành công!');
          this.loadBorrowingDetails(); // Tải lại chi tiết đơn mượn
        },
        (error) => {
          console.error('Lỗi khi cập nhật trạng thái:', error);
        }
      );
    }
  }
  goBack(): void {
    this.location.back();  // Quay lại trang trước đó
  }
}
