import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamattedanceService } from "../examattedance.service";
import { AcademicService } from "../../../academic/academic.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-add-exam-attendance",
  templateUrl: "./add-exam-attendance.component.html",
  styleUrls: ["./add-exam-attendance.component.css"]
})
export class AddExamAttendanceComponent implements OnInit {
  Section: any = "";
  ClassList: any;
  SubjectList: any;
  classSubjectList: any;
  SectionList: any;
  classSectionList: any;
  ExamList: any;
  getExamAttendanceForm: FormGroup;
  selectedClassSubject: [];
  ExamAttendanceList: any;
  role:any;
  userData:any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private examattedanceService: ExamattedanceService
  ) {}

  ngOnInit() {
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();
    this.getAllExam();
    this.getExamAttendanceForm = this.formBuilder.group({
      class: ["", Validators.required],
      examname: ["", Validators.required],
      section: ["", Validators.required],
      subject: ["", Validators.required]
    });
  }

  getExamAttendance() {
    this.examattedanceService
      .getExamAttendance(this.getExamAttendanceForm.value)
      .subscribe((data: any) => {
        this.ExamAttendanceList = data;
        this.ExamAttendanceList.map(student => {
          if (student.attendance_detail.length > 0) {
            student.attendance = student.attendance_detail[0].attendance;
          }
        });
      });
  }

  setExamAttendance() {
    let records = [];
    for (let i = 0; i < this.ExamAttendanceList.length; i++) {
      records.push({
        student: this.ExamAttendanceList[i]._id,
        examname: this.getExamAttendanceForm.value.examname,
        class: this.getExamAttendanceForm.value.class,
        section: this.getExamAttendanceForm.value.section,
        subject: this.getExamAttendanceForm.value.subject,
        attendance: this.ExamAttendanceList[i].attendance
      });
    }
    //console.log(teacherAttendance);
    this.examattedanceService.setExamAttendance({ records: records }).subscribe(
      examAttendance => {
        this.toastr.success("Attendance has been added successfully ");

        this.router.navigate(["exam/exam-attendance/exam-attendance-list"]);
      },
      error => {
        this.toastr.error("Error while adding student attendance", "", {
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
    this.getExamAttendanceForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.getExamAttendanceForm.value.class;
    });
    this.getExamAttendanceForm.controls["subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return subject.class == this.getExamAttendanceForm.value.class;
    });
  }

  resetExamattendance() {
    this.getExamAttendanceForm.reset();
  }
  get examname() {
    return this.getExamAttendanceForm.get("examname");
  }

  get date() {
    return this.getExamAttendanceForm.get("date");
  }
  get class() {
    return this.getExamAttendanceForm.get("class");
  }
  get section() {
    return this.getExamAttendanceForm.get("section");
  }
  get subject() {
    return this.getExamAttendanceForm.get("subject");
  }
}
