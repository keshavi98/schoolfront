import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentattendanceService } from "../studentattendance.service";
import { AcademicService } from "../../../academic/academic.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../../environments/environment";
declare let $: any;
@Component({
  selector: "app-add-student-attendance",
  templateUrl: "./add-student-attendance.component.html",
  styleUrls: ["./add-student-attendance.component.css"]
})
export class AddStudentAttendanceComponent implements OnInit {
  Section: any = "";
  ClassList: any;
  SubjectList: any;
  classSubjectList: any;
  SectionList: any;
  classSectionList: any;
  subjectTeacherList: any;
  getStudentAttendanceForm: FormGroup;
  selectedClassSubject: [];
  StudentAttendanceList: any;
  selectedFile: any;
  setStudentAttendanceForm: FormGroup;
  fileData: any;
  url: any;
  role:any;
  userData:any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private studentattendanceService: StudentattendanceService,
    private toastr: ToastrService,
    private academicService: AcademicService
  ) {}

  ngOnInit() {
    $("#date").datepicker();
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();

    this.getStudentAttendanceForm = this.formBuilder.group({
      class: ["", Validators.required],
      section: ["", Validators.required],
      subject: ["", Validators.required],
      date: ["", Validators.required]
    });
  }

  onDateChanged(){
    
    this.getStudentAttendanceForm.controls["date"].setValue(
        $("#date").val()
    );
   
}

  getStudentAttendance() {
    this.studentattendanceService
      .getStudentAttendance(this.getStudentAttendanceForm.value)
      .subscribe((data: any) => {
        this.StudentAttendanceList = data;
        this.StudentAttendanceList.map(student => {
          if (student.attendance_detail.length > 0) {
            student.attendance = student.attendance_detail[0].attendance;
          } else {
            // teacher.attendance = 0;
          }
        });
      });
  }

  setStudentAttendance() {
    let records = [];
    for (let i = 0; i < this.StudentAttendanceList.length; i++) {
      if (this.StudentAttendanceList[i].attendance) {
        records.push({
          student: this.StudentAttendanceList[i]._id,
          date: this.getStudentAttendanceForm.value.date,
          class: this.getStudentAttendanceForm.value.class,
          section: this.getStudentAttendanceForm.value.section,
          subject: this.getStudentAttendanceForm.value.subject,
          attendance: this.StudentAttendanceList[i].attendance
        });
      }
    }
    //console.log(teacherAttendance);
    this.studentattendanceService
      .setStudentAttendance({ records: records })
      .subscribe(
        studentAttendance => {
          this.toastr.success("Attendance has been added successfully ");

          this.router.navigate([
            "attendance/studentattendance/student-attendance-list"
          ]);
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

  getAllSubject() { let data = {
    
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
  onClassChanged() {
    this.getStudentAttendanceForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.getStudentAttendanceForm.value.class;
    });
    this.getStudentAttendanceForm.controls["subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return subject.class == this.getStudentAttendanceForm.value.class;
    });
  }

  resetStudentAttendanceForm() {
    this.getStudentAttendanceForm.reset();
  }

  get date() {
    return this.getStudentAttendanceForm.get("date");
  }
  get class() {
    return this.getStudentAttendanceForm.get("class");
  }
  get section() {
    return this.getStudentAttendanceForm.get("section");
  }
  get subject() {
    return this.getStudentAttendanceForm.get("subject");
  }
}
