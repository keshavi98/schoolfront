import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamsService } from "../exams.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
declare let $:any;
@Component({
  selector: "app-edit-exam",
  templateUrl: "./edit-exam.component.html",
  styleUrls: ["./edit-exam.component.css"]
})
export class EditExamComponent implements OnInit {
  ExamList: any;
  createExamForm: FormGroup;
  ExamId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ExamsService: ExamsService,
    private toastr: ToastrService,
    private ExamService: ExamService
  ) {}

  ngOnInit() {
    $("#date").datepicker();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.ExamId = params.id;
          this.getExamById(this.ExamId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["exam/exam-list"]);
        }
      }
    );
    this.createExamForm = this.formBuilder.group({
      examname: ["", Validators.required],
      date: ["", Validators.required],
      note: [""]
    });
  }
  
  onDateChanged(){
    
    this.createExamForm.controls["date"].setValue(
        $("#date").val()
    );
   
}

  editExam() {
    this.ExamsService.editExam(
      this.ExamId,
      this.createExamForm.value
    ).subscribe(
      exams => {
        this.toastr.success("Exam has been edited successfully ");

        this.router.navigate(["exam/exam/exam-list"]);
      },
      error => {
        this.toastr.error("Error while editing exam", "", {
          timeOut: 3000
        });
      }
    );
  }
  getExamById(id) {
    this.ExamsService.getExamById(id).subscribe((examdata: any) => {
      this.createExamForm.controls["examname"].setValue(examdata.examname);
      examdata.date = moment(examdata.date).format("YYYY/MM/DD");
      this.createExamForm.controls["date"].setValue(examdata.date);

      this.createExamForm.controls["note"].setValue(examdata.note);
    });
  }
  resetExam() {
    this.createExamForm.reset();
  }
  get examname() {
    return this.createExamForm.get("examname");
  }

  get date() {
    return this.createExamForm.get("date");
  }
}
