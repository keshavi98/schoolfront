import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GradeService } from "../grade.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-grade",
  templateUrl: "./add-grade.component.html",
  styleUrls: ["./add-grade.component.css"]
})
export class AddGradeComponent implements OnInit {
  GradeList: any;

  createGradeForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private GradeService: GradeService,
    private toastr: ToastrService,
    private ExamService: ExamService
  ) {}
  ngOnInit() {
    this.createGradeForm = this.formBuilder.group({
      gradename: ["", Validators.required],
      gradepoint: ["", Validators.required],
      mark_from: ["", Validators.required],
      mark_upto: ["", Validators.required],
      note: [""]
    });
  }
  addGrade() {
    this.GradeService.addGrade(this.createGradeForm.value).subscribe(
      grade => {
        this.toastr.success("Grade has been added successfully ");

        this.router.navigate(["exam/grade/grade-list"]);
      },
      error => {
        this.toastr.error("Error while adding grade", "", {
          timeOut: 3000
        });
      }
    );
  }

  resetGrade() {
    this.createGradeForm.reset();
  }
  get gradename() {
    return this.createGradeForm.get("gradename");
  }

  get gradepoint() {
    return this.createGradeForm.get("gradepoint");
  }

  get mark_from() {
    return this.createGradeForm.get("mark_from");
  }

  get mark_upto() {
    return this.createGradeForm.get("mark_upto");
  }
}
