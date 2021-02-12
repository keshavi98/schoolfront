import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "./../teacher.service";
import { ToastrService } from "ngx-toastr";
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import {
  NgbDateParserFormatter,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import { DatePickerComponent } from "@syncfusion/ej2-angular-calendars";
declare let $: any;

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.component.css"]
})

export class AddTeacherComponent implements OnInit {
  TeacherList: any;
  selectedFile: any;
  createTeacherForm: FormGroup;
  fileData: any;
  url: any;
   // title = 'MDK';
 title = "I love pizza!"

  @ViewChild("ejDatePicker") ejDatePicker: DatePickerComponent;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {  
    
    $("#dob").datepicker();
    $("#joining_date").datepicker();

    this.createTeacherForm = this.formBuilder.group({
      photo: [""],
      name: ["", Validators.required],
      designation: ["", Validators.required],
      joining_date: ["", Validators.required],
      gender: [""],
      religion: [""],
      email: ["",Validators.email],
      phone: ["",Validators.max(10)],
      address: [""],
      dob: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
     
    });
  }

  onSelectPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

onDateChanged(){
   
    this.createTeacherForm.controls["dob"].setValue(
        $("#dob").val()
    );
    this.createTeacherForm.controls["joining_date"].setValue(
      $("#joining_date").val()
  );
}


formatDate(date: any) {
    return date
      ? `${date.year ? date.year : ""}-${date.month ? date.month : ""}-${
          date.day ? date.day : ""
        }`
      : "";
  }

addTeacher() {
    // this.createTeacherForm.controls["joining_date"].setValue(
    //   this.formatDate(this.createTeacherForm.value.joining_date)
    // );
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.teacherService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
        this.createTeacherForm.controls["photo"].setValue(photo.filename);

        this.teacherService.addTeacher(this.createTeacherForm.value).subscribe(
          teacher => {
            this.toastr.success("Teacher has been added successfully  ");
            this.router.navigate(["/teacher/teacher-list"]);
          },
          error => {
            this.toastr.error("error while adding data", "", {
              timeOut: 3000
            });
          }
        );
      });
    } else {
      this.teacherService.addTeacher(this.createTeacherForm.value).subscribe(
        teacher => {
          this.toastr.success("Teacher has been added successfully ");

          this.router.navigate(["/teacher/teacher-list"]);
        },
        error => {
          this.toastr.error("Error while adding teacher", "", {
            timeOut: 3000
          });
        }
      );
    }
  }

  resetTeacher() {
    this.createTeacherForm.reset();
  }

  

  get name() {
    return this.createTeacherForm.get("name");
  }

  get email() {
    return this.createTeacherForm.get("email");
  }
  get username() {
    return this.createTeacherForm.get("username");
  }
  get password() {
    return this.createTeacherForm.get("password");
  }
  get joining_date() {
    return this.createTeacherForm.get("joining_date");
  }
  get dob() {
    return this.createTeacherForm.get("dob");
  }
  get designation() {
    return this.createTeacherForm.get("designation");
  }
}
