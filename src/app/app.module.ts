import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule để sử dụng ngModel
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// Các component
import { AppComponent } from './app.component';
//Các component trong website
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BookListComponent } from './books-management/book-list/book-list.component';
import { BookAddComponent } from './books-management/book-add/book-add.component';
import { BookEditComponent } from './books-management/book-edit/book-edit.component';
import { BookDetailsComponent } from './books-management/book-details/book-details.component';
import { BorrowingFormComponent } from './borrowing/borrowing-form/borrowing-form.component';
import { ReportComponent } from './borrowing/report/report.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    BookListComponent,
    BookAddComponent,
    BookEditComponent,
    BookDetailsComponent,
    BorrowingFormComponent,
    ReportComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  // Thêm FormsModule để sử dụng ngModel trong các form
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
