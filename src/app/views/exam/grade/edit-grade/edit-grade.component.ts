import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GradeService } from "../grade.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-grade",
  templateUrl: "./edit-grade.component.html",
  styleUrls: ["./edit-grade.component.css"]
})
export class EditGradeComponent implements OnInit {
  GradeList: any;
  GradeId: any;
  createGradeForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private GradeService: GradeService,
    private toastr: ToastrService,
    private ExamService: ExamService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.GradeId = params.id;
          this.getGradeById(this.GradeId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["grade/grade-list"]);
        }
      }
    );
    this.createGradeForm = this.formBuilder.group({
      gradename: ["", Validators.required],
      gradepoint: ["", Validators.required],
      mark_from: ["", Validators.required],
      mark_upto: ["", Validators.required],
      note: [""]
    });
  }

  editGrade() {
    this.GradeService.editGrade(
      this.GradeId,
      this.createGradeForm.value
    ).subscribe(
      grade => {
        this.toastr.success("Grade has been edited successfully ");

        this.router.navigate(["exam/grade/grade-list"]);
      },
      error => {
        this.toastr.error("Error while editing grade", "", {
          timeOut: 3000
        });
      }
    );
  }
  getGradeById(id) {
    this.GradeService.getGradeById(id).subscribe((Gradedata: any) => {
      this.createGradeForm.controls["gradename"].setValue(Gradedata.gradename);
      this.createGradeForm.controls["gradepoint"].setValue(
        Gradedata.gradepoint
      );
      this.createGradeForm.controls["mark_from"].setValue(Gradedata.mark_from);
      this.createGradeForm.controls["mark_upto"].setValue(Gradedata.mark_upto);
      this.createGradeForm.controls["note"].setValue(Gradedata.note);
    });
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
