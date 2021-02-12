import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddBooksComponent } from "./books/add-books/add-books.component";
import { EditBooksComponent } from "./books/edit-books/edit-books.component";
import { BooksListComponent } from "./books/books-list/books-list.component";
import { IssueListComponent } from "./issue/issue-list/issue-list.component";
import { AddIssueComponent } from "./issue/add-issue/add-issue.component";
import { EditIssueComponent } from "./issue/edit-issue/edit-issue.component";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "library"
    },
    children: [
      {
        path: "",
        redirectTo: "books/books-list"
      },
      {
        path: "books/add-books",
        component: AddBooksComponent,
        data: {
          title: "Add Books"
        }
      },
      {
        path: "books/books-list",
        component: BooksListComponent,
        data: {
          title: "Books List"
        }
      },
      {
        path: "books/edit-books/:id",
        component: EditBooksComponent,
        data: {
          title: "Edit Books"
        }
      },
      {
        path: "",
        redirectTo: "issue/issue-list"
      },
      {
        path: "issue/add-issue",
        component: AddIssueComponent,
        data: {
          title: "Add Issue"
        }
      },
      {
        path: "issue/issue-list",
        component: IssueListComponent,
        data: {
          title: "issue List"
        }
      },
      {
        path: "issue/edit-issue/:id",
        component: EditIssueComponent,
        data: {
          title: "Edit Issue"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
