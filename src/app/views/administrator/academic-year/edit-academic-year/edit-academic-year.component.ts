import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicYearService } from "../academic-year.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
declare let  $:any;
@Component({
  selector: "app-edit-academic-year",
  templateUrl: "./edit-academic-year.component.html",
  styleUrls: ["./edit-academic-year.component.css"]
})
export class EditAcademicYearComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  createAcademicYearForm: FormGroup;
  academicYearId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private academicyearService: AcademicYearService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#start_date").datepicker();
    $("#end_date").datepicker();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.academicYearId = params.id;
          this.getAcademicYearById(this.academicYearId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["academic-year/academic-year-list"]);
        }
      }
    );
    this.createAcademicYearForm = this.formBuilder.group({
      year: ["", Validators.required],
      year_title: [""],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      status: [""]
    });
  }

  onDateChanged(){
    
    this.createAcademicYearForm.controls["start_date"].setValue(
        $("#start_date").val()
    );
    this.createAcademicYearForm.controls["end_date"].setValue(
      $("#end_date").val()
  );
}

  editAcademicYear() {
    this.academicyearService
      .editAcademicYear(this.academicYearId, this.createAcademicYearForm.value)
      .subscribe(
        academicyear => {
          this.toastr.success("Academic has been edited successfully ");

          this.router.navigate([
            "administrator/academic-year/academic-year-list"
          ]);
        },
        error => {
          this.toastr.error("Error while editing academic Year", "", {
            timeOut: 3000
          });
        }
      );
  }

  getAcademicYearById(id) {
    this.academicyearService
      .getAcademicYearById(id)
      .subscribe((academicyeardata: any) => {
        this.createAcademicYearForm.controls["year"].setValue(
          academicyeardata.year
        );

        this.createAcademicYearForm.controls["year_title"].setValue(
          academicyeardata.year_title
        );
        academicyeardata.start_date = moment(
          academicyeardata.start_date
        ).format("YYYY/MM/DD");
        this.createAcademicYearForm.controls["start_date"].setValue(
          academicyeardata.start_date
        );
        academicyeardata.end_date = moment(academicyeardata.end_date).format(
          "YYYY/MM/DD"
        );
        this.createAcademicYearForm.controls["end_date"].setValue(
          academicyeardata.end_date
        );
        this.createAcademicYearForm.controls["status"].setValue(
          academicyeardata.status
        );
      });
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
