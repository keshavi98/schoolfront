import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicYearService } from "../academic-year.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-academic-year",
  templateUrl: "./add-academic-year.component.html",
  styleUrls: ["./add-academic-year.component.css"]
})
export class AddAcademicYearComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  createAcademicYearForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private academicyearService: AcademicYearService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#start_date").datepicker();
    $("#end_date").datepicker();
    this.createAcademicYearForm = this.formBuilder.group({
      year: ["", Validators.required],
      year_title: [""],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required]
    });
  }
  addAcademicYear() {
    this.academicyearService
      .addAcademicYear(this.createAcademicYearForm.value)
      .subscribe(
        academicyear => {
          this.toastr.success("Academic Year has been added successfully ");

          this.router.navigate([
            "administrator/academic-year/academic-year-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding academic Year", "", {
            timeOut: 3000
          });
        }
      );
  }

  onDateChanged(){
    
    this.createAcademicYearForm.controls["start_date"].setValue(
        $("#start_date").val()
    );
    this.createAcademicYearForm.controls["end_date"].setValue(
      $("#end_date").val()
  );
    }

  resetAcademicYear() {
    this.createAcademicYearForm.reset();
  }

  get year() {
    return this.createAcademicYearForm.get("year");
  }

  get start_date() {
    return this.createAcademicYearForm.get("start_date");
  }
  get end_date() {
    return this.createAcademicYearForm.get("end_date");
  }
}
