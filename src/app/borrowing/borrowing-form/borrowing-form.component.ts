import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowingService } from '../../services/borrowing.service';
import { Borrowing, BorrowingDetail } from '../../models/borrowing.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-borrowing-form',
  templateUrl: './borrowing-form.component.html',
  styleUrls: ['./borrowing-form.component.css']
})
export class BorrowingFormComponent implements OnInit {
  selectedBooks: { id: number; title: string; quantity: number }[] = [];
  cccd: string = ''; // Biến lưu trữ CCCD
  returnDate: Date = new Date(); // Biến lưu trữ ngày trả sách

  constructor(
    private borrowingService: BorrowingService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.selectedBooks = this.borrowingService.getSelectedBooks();
    if (this.selectedBooks.length === 0) {
      // Nếu không có sách nào được chọn, chuyển hướng về trang sách
      alert('Vui lòng chọn ít nhất một cuốn sách để mượn.');
      this.router.navigate(['/books']);
      return;
    }
  }
  
  createBorrowing() {
    if (!this.cccd || !this.returnDate || this.selectedBooks.length === 0) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const borrowingDetails: BorrowingDetail[] = this.selectedBooks.map(book => ({
      bookId: book.id!,
      quantity: book.quantity
    }));

    
    const newBorrowing: Borrowing = {
      cccd: this.cccd,
      returnDate: this.returnDate,
      borrowingDetails: borrowingDetails
    };

    this.borrowingService.createBorrowing(newBorrowing).subscribe(
      (response: any) => {
        console.log('Tạo phiếu mượn thành công', response);
        // Chuyển hướng về trang danh sách sách hoặc thực hiện các hành động khác
        this.router.navigate(['/books']);
      },
      (error: any) => {
        console.error('Lỗi khi tạo phiếu mượn', error);
        // Hiển thị thông báo lỗi cho người dùng
        alert('Lỗi khi tạo phiếu mượn. Vui lòng thử lại sau.');
      }
    );
  }
  onBack(): void {
    this.location.back();
  }
}