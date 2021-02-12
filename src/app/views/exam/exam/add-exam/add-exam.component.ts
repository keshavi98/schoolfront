import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamsService } from "../exams.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-exam",
  templateUrl: "./add-exam.component.html",
  styleUrls: ["./add-exam.component.css"]
})
export class AddExamComponent implements OnInit {
  ExamList: any;
  createExamForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ExamsService: ExamsService,
    private toastr: ToastrService,
    private ExamService: ExamService
  ) {}

  onDateChanged(){
    
    this.createExamForm.controls["date"].setValue(
        $("#date").val()
    );
   
}

  ngOnInit() {
    $("#date").datepicker();
    this.createExamForm = this.formBuilder.group({
      examname: ["", Validators.required],
      date: ["", Validators.required],
      note: [""]
    });
  }
  addExam() {
    this.ExamsService.addExam(this.createExamForm.value).subscribe(
      exams => {
        this.toastr.success("Exam has been added successfully ");

        this.router.navigate(["exam/exam/exam-list"]);
      },
      error => {
        this.toastr.error("Error while adding exam", "", {
          timeOut: 3000
        });
      }
    );
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
