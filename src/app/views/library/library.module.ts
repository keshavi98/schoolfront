import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LibraryRoutingModule } from "./library-routing.module";
import { AddBooksComponent } from "./books/add-books/add-books.component";
import { EditBooksComponent } from "./books/edit-books/edit-books.component";
import { BooksListComponent } from "./books/books-list/books-list.component";
import { AddIssueComponent } from './issue/add-issue/add-issue.component';
import { EditIssueComponent } from './issue/edit-issue/edit-issue.component';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [AddBooksComponent, EditBooksComponent, BooksListComponent, AddIssueComponent, EditIssueComponent, IssueListComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class LibraryModule {}
