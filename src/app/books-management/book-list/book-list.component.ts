import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model'; 
import { BookService } from '../../services/book.service'; 

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBooks: Book[] = []; // Mảng lưu các sách đã chọn
  searchTerm: string = '';
  isLoading = true;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading books:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch(): void {
    this.bookService.searchBooks(this.searchTerm).subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error searching books:', error);
      }
    );
  }

  onAddBook(): void {
    this.router.navigate(['/books/add']);
  }

  onEditBook(id: number): void {
    this.router.navigate([`/books/edit/${id}`]);
  }

  onViewDetails(id: number): void {
    this.router.navigate([`/books/details/${id}`]);
  }

  onDeleteBook(id: number): void {
    const book = this.books.find(b => b.id === id);
    if (book) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(b => b.id !== id); // Loại bỏ sách khỏi danh sách
      });
    }
  }

  onSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.books.forEach(book => {
      book.selected = isChecked;
    });
    this.onSelectionChange(); // Cập nhật danh sách sách đã chọn
  }

  onSelectionChange(): void {
    this.selectedBooks = this.books.filter(book => book.selected);
  }

  onBorrowBooks(): void {
    if (this.selectedBooks.length > 0) {
      // Chuyển đến form mượn sách và truyền thông tin các sách đã chọn
      const bookIds = this.selectedBooks.map(book => book.id);
      this.router.navigate(['/borrowing/create'], { queryParams: { ids: bookIds.join(',') } });
    } else {
      alert('Vui lòng chọn sách để mượn!');
    }
  }
}
