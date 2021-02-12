import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeavecategoryService } from "../leavecategory.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-leave-category",
  templateUrl: "./edit-leave-category.component.html",
  styleUrls: ["./edit-leave-category.component.css"]
})
export class EditLeaveCategoryComponent implements OnInit {
  LeavecategoryList: any;
  LeavecategoryId: any;
  createLeaveCategoryForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private LeavecategoryService: LeavecategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.LeavecategoryId = params.id;
          this.getLeavecategoryById(this.LeavecategoryId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["exam/exam-list"]);
        }
      }
    );
    this.createLeaveCategoryForm = this.formBuilder.group({
      category: ["", Validators.required]
    });
  }
  editLeavecategory() {
    this.LeavecategoryService.editLeavecategory(
      this.LeavecategoryId,
      this.createLeaveCategoryForm.value
    ).subscribe(
      exams => {
        this.toastr.success("Leave category has been edit successfully ");

        this.router.navigate([
          "leaveapplication/leavecategory/leave-category-list"
        ]);
      },
      error => {
        this.toastr.error("Error while editing leave category", "", {
          timeOut: 3000
        });
      }
    );
  }

  getLeavecategoryById(id) {
    this.LeavecategoryService.getLeavecategoryById(id).subscribe(
      (leavecategorydata: any) => {
        this.createLeaveCategoryForm.controls["category"].setValue(
          leavecategorydata.category
        );
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
