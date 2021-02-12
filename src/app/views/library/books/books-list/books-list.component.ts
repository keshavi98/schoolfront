import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BooksService } from "../books.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.css"]
})
export class BooksListComponent implements OnInit {
  BooksList: any;
  bookId: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getBooksList();
  }

  getBooksList() {
    this.booksService.getBooksList().subscribe((data: any) => {
      this.BooksList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteBooks = params => {
    this.booksService.deleteBooks(params.data._id).subscribe((data: any) => {
      this.getBooksList();
      this.toastr.success("Books has been deteted successfully");
      this.router.navigate(["library/books/books-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting books", "", {
          timeOut: 3000
        });
      };
  };

  columnDefs = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true
    },
    {
      headerName: "Author ",
      field: "author ",
      sortable: true,
      filter: true
    },
    {
      headerName: "Subject Code ",
      field: "subjectcode ",
      sortable: true,
      filter: true
    },
    {
      headerName: "Price ",
      field: "price ",
      sortable: true,
      filter: true
    },
    {
      headerName: "Rack No",
      field: "rackno",
      sortable: true,
      filter: true
    },
    {
      headerName: "Action",
      field: "",
      cellRendererFramework: ActionCellRendererComponent,
      cellRendererParams: {
        icon1: "cui-pencil",
        icon2: "cui-trash",
        action1: params => {
          this.router.navigate(["library/books/edit-books", params.data._id]);
        },
        action2: this.deleteBooks
      }
    }
  ];
}
