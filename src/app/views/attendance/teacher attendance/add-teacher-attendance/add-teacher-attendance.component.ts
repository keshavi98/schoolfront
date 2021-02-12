import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherAttendanceService } from "../teacher-attendance.service";
import { ToastrService } from "ngx-toastr";
import {
  NgbDateParserFormatter,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import { DatePickerComponent } from "@syncfusion/ej2-angular-calendars";
import { environment } from "../../../../../environments/environment";
declare let $:any;
@Component({
  selector: "app-add-teacher-attendance",
  templateUrl: "./add-teacher-attendance.component.html",
  styleUrls: ["./add-teacher-attendance.component.css"]
})
export class AddTeacherAttendanceComponent implements OnInit {
  TeacherAttendanceList: any;
  selectedFile: any;
  getTeacherAttendanceForm: FormGroup;
  setTeacherAttendanceForm: FormGroup;
  fileData: any;
  url: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private teacherAttendanceService: TeacherAttendanceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#date").datepicker();
    this.getTeacherAttendanceForm = this.formBuilder.group({
      //  email: ["", Validators.email],
      date: ["", Validators.required]
    });
  }

  getTeacherAttendance() {
    this.teacherAttendanceService
      .getTeacherAttendance(this.getTeacherAttendanceForm.value)
      .subscribe((data: any) => {
        this.TeacherAttendanceList = data;

        this.TeacherAttendanceList.map(teacher => {
          if (teacher.attendance_detail.length > 0) {
            teacher.attendance = teacher.attendance_detail[0].attendance;
          } else {
            // teacher.attendance = 0;
          }
        });
      });
  }

  onDateChanged(){
    
    this.getTeacherAttendanceForm.controls["date"].setValue(
        $("#date").val()
    );
   
}
  setTeacherAttendance() {
    let records = [];
    for (let i = 0; i < this.TeacherAttendanceList.length; i++) {
      if (this.TeacherAttendanceList[i].attendance) {
        records.push({
          teacher: this.TeacherAttendanceList[i]._id,
          date: this.getTeacherAttendanceForm.value.date,
          attendance: this.TeacherAttendanceList[i].attendance
        });
      }
    }
    //console.log(teacherAttendance);
    this.teacherAttendanceService
      .setTeacherAttendance({ records: records })
      .subscribe(
        teacherAttendance => {
          this.toastr.success("Attendance has been added successfully ");

          this.router.navigate([
            "attendance/teacherattendance/teacher-attendance-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding teacher attendance", "", {
            timeOut: 3000
          });
        }
      );
  }

  resetTeacherAttendance() {
    this.getTeacherAttendanceForm.reset();
  }
}
