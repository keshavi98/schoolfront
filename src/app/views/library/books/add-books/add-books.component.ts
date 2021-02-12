import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BooksService } from "../books.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-books",
  templateUrl: "./add-books.component.html",
  styleUrls: ["./add-books.component.css"]
})
export class AddBooksComponent implements OnInit {
  createBooksForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createBooksForm = this.formBuilder.group({
      name: ["", Validators.required],
      author: ["", Validators.required],
      subjectcode: ["", Validators.required],
      price: ["", Validators.required],
      quantity: ["", Validators.required],
      rackno: ["", Validators.required]
    });
  }

  addBooks() {
    this.booksService.addBooks(this.createBooksForm.value).subscribe(
      books => {
        this.toastr.success("Books has been added successfully ");

        this.router.navigate(["library/books/books-list"]);
      },
      error => {
        this.toastr.error("Error while adding Books", "", {
          timeOut: 3000
        });
      }
    );
  }

  resetBooks() {
    this.createBooksForm.reset();
  }

  get name() {
    return this.createBooksForm.get("name");
  }

  get author() {
    return this.createBooksForm.get("author");
  }

  get subjectcode() {
    return this.createBooksForm.get("subjectcode");
  }

  get price() {
    return this.createBooksForm.get("price");
  }

  get quantity() {
    return this.createBooksForm.get("quantity");
  }

  get rackno() {
    return this.createBooksForm.get("rackno");
  }
}
