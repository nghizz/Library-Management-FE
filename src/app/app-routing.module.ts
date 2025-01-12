import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import các component
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { BookListComponent } from './books-management/book-list/book-list.component';
import { BookAddComponent } from './books-management/book-add/book-add.component';
import { BookEditComponent } from './books-management/book-edit/book-edit.component';
import { BookDetailsComponent } from './books-management/book-details/book-details.component';
import { BorrowingFormComponent } from './borrowing/borrowing-form/borrowing-form.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
import { ReportComponent } from './borrowing/report/report.component';
import { BorrowingDetailComponent } from './borrowing/borrowing-detail/borrowing-detail.component';
import { BorrowingListComponent } from './borrowing/borrowing-list/borrowing-list.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'books', component: BookListComponent },
      { path: 'users', component: UserListComponent },
      { path: 'report', component: ReportComponent },
      { path: 'borrowing', component: BorrowingListComponent},
      { path: '', redirectTo: 'books', pathMatch: 'full' }
    ]
  },
  { path: 'books/add', component: BookAddComponent, canActivate: [AuthGuard] },
  { path: 'books/edit/:id', component: BookEditComponent, canActivate: [AuthGuard] },
  { path: 'books/details/:id', component: BookDetailsComponent, canActivate: [AuthGuard] },
  { path: 'users/add', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'borrowing/create', component: BorrowingFormComponent, canActivate: [AuthGuard] },
  { path: 'borrowing/detail/:id', component: BorrowingDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
