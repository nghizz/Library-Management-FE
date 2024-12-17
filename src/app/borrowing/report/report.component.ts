import { Component, OnInit } from '@angular/core';
import { BorrowingService } from '../../services/borrowing.service';
import { BorrowingRecord } from '../../models/borrowingrecord.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  borrowRecords: BorrowingRecord[] = [];  // Dữ liệu về các bản ghi mượn sách
  filteredRecords: BorrowingRecord[] = [];  // Dữ liệu sau khi lọc theo ngày và tìm kiếm
  searchTerm = '';  // Từ khóa tìm kiếm
  selectedDate: string | null = null;  // Ngày chọn để lọc
  totalBooksBorrowed = 0;  // Tổng số sách đã mượn trong ngày

  constructor(private borrowingService: BorrowingService) { }

  ngOnInit(): void {
    this.loadBorrowingRecords();
  }

  // Tải dữ liệu về các bản ghi mượn
  loadBorrowingRecords(): void {
    this.borrowingService.getBorrowingRecords().subscribe(records => {
      this.borrowRecords = records;
      this.filteredRecords = [...records];  // Sao chép dữ liệu ban đầu
      this.updateTotalBooks();
    });
  }

  // Cập nhật tổng số sách đã mượn
  updateTotalBooks(): void {
    this.totalBooksBorrowed = this.filteredRecords.reduce((sum, record) => sum + record.books.length, 0);
  }

  // Lọc theo từ khóa tìm kiếm
  onSearch(): void {
    this.filteredRecords = this.borrowRecords.filter(record =>
      record.borrower.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateTotalBooks();
  }

  // Lọc theo ngày
  onDateChange(): void {
    if (this.selectedDate) {
      this.filteredRecords = this.borrowRecords.filter(record =>
        record.borrowDate === this.selectedDate
      );
    } else {
      this.filteredRecords = [...this.borrowRecords];
    }
    this.updateTotalBooks();
  }
}
