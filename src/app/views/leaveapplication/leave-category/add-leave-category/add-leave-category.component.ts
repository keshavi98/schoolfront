import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeavecategoryService } from "../leavecategory.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-leave-category",
  templateUrl: "./add-leave-category.component.html",
  styleUrls: ["./add-leave-category.component.css"]
})
export class AddLeaveCategoryComponent implements OnInit {
  LeavecategoryList: any;

  createLeaveCategoryForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private LeavecategoryService: LeavecategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createLeaveCategoryForm = this.formBuilder.group({
      category: ["", Validators.required]
    });
  }
  addLeavecategory() {
    this.LeavecategoryService.addLeavecategory(
      this.createLeaveCategoryForm.value
    ).subscribe(
      exams => {
        this.toastr.success("Leave category has been added successfully ");

        this.router.navigate([
          "leaveapplication/leavecategory/leave-category-list"
        ]);
      },
      error => {
        this.toastr.error("Error while adding leave category", "", {
          timeOut: 3000
        });
      }
    );
  }

  resetLeavecategory() {
    this.createLeaveCategoryForm.reset();
  }
  
  get category() {
    return this.createLeaveCategoryForm.get("category");
  }
}
