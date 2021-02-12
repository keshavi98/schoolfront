import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamScheduleService } from "../exam-schedule.service";
import { AcademicService } from "../../../academic/academic.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-exam-schedule",
  templateUrl: "./add-exam-schedule.component.html",
  styleUrls: ["./add-exam-schedule.component.css"]
})
export class AddExamScheduleComponent implements OnInit {
  Section: any = "";
  ClassList: any;
  SubjectList: any;
  classSubjectList: any;
  SectionList: any;
  classSectionList: any;
  ExamList: any;
  createExamscheduleForm: FormGroup;
  selectedClassSubject: [];
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private examScheduleService: ExamScheduleService
  ) {}

  ngOnInit() {
    
    $("#date").datepicker();
    $(document).ready(function() {
    $("#time_from").timepicker({
      timeFormat: 'hh:mm',
      dynamic: false,
      dropdown: true,
      scrollbar: true
    });
    $("#time_to").timepicker({
      timeFormat: 'hh:mm',
      dynamic: false,
      dropdown: true,
      scrollbar: true
    });
  });
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();
    this.getAllExam();
    this.createExamscheduleForm = this.formBuilder.group({
      class: ["", Validators.required],
      examname: ["", Validators.required],
      section: ["", Validators.required],
      subject: ["", Validators.required],
      date: ["", Validators.required],
      room: [""],
      time_from: ["", Validators.required],
      time_to: ["", Validators.required]
    });
  }

  onDateChanged(){
    
    this.createExamscheduleForm.controls["date"].setValue(
        $("#date").val()
    );
    this.createExamscheduleForm.controls["time_from"].setValue(
      $("#time_from").val()
  );
  this.createExamscheduleForm.controls["time_to"].setValue(
    $("#time_to").val()
);
   
}

  addExamSchedule() {
    this.examScheduleService
      .addExamSchedule(this.createExamscheduleForm.value)
      .subscribe(
        Examschedule => {
          this.toastr.success("Examschedule has been added successfully ");

          this.router.navigate(["exam/examschedule/exam-schedule-list"]);
        },
        error => {
          this.toastr.error("Error while adding Exam Schedule", "", {
            timeOut: 3000
          });
        }
      );
  }

  getAllClass() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllClass(data).subscribe((data: any) => {
      this.ClassList = data;
    });
  }

  getAllSubject() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSubject(data).subscribe((data: any) => {
      this.SubjectList = data;
    });
  }

  getAllSection() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSection(data).subscribe((data: any) => {
      this.SectionList = data;
    });
  }
  getAllExam() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.examService.getAllExam(data).subscribe((data: any) => {
      this.ExamList = data;
    });
  }
  onClassChanged() {
    this.createExamscheduleForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.createExamscheduleForm.value.class;
    });
    this.createExamscheduleForm.controls["subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return subject.class == this.createExamscheduleForm.value.class;
    });
  }

  resetExamschedule() {
    this.createExamscheduleForm.reset();
  }
  get examname() {
    return this.createExamscheduleForm.get("examname");
  }

  get date() {
    return this.createExamscheduleForm.get("date");
  }
  get class() {
    return this.createExamscheduleForm.get("class");
  }
  get section() {
    return this.createExamscheduleForm.get("section");
  }
  get subject() {
    return this.createExamscheduleForm.get("subject");
  }

  get time_from() {
    return this.createExamscheduleForm.get("time_from");
  }
  get time_to() {
    return this.createExamscheduleForm.get("time_to");
  }
  get room() {
    return this.createExamscheduleForm.get("room");
  }
}
