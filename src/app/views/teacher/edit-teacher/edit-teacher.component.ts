import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "./../teacher.service";
import { ToastrService } from "ngx-toastr";
import { NgbDatepicker, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { MomentModule } from "ngx-moment";
import * as moment from "moment";
// import { MonthPickerComponent } from "ngx-bootstrap";
declare let $: any;


@Component({
  selector: "app-edit-teacher",
  templateUrl: "./edit-teacher.component.html",
  styleUrls: ["./edit-teacher.component.css"]
})
export class EditTeacherComponent implements OnInit {
  TeacherList: any;
  createTeacherForm: FormGroup;
  teacherId: any;
  updatePhoto: any;
  selectedFile: any;
  fileData: any;
  url: any;
  dateModel: any;
  // ngbDatepicker: NgbDateStruct;
  @ViewChild("dp") datepicker: NgbDatepicker;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#dob").datepicker();
    $("#joining_date").datepicker();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.teacherId = params.id;
          this.getTeacherById(this.teacherId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/teacher-list"]);
        }
      }
    );

    this.createTeacherForm = this.formBuilder.group({
      photo: [""],
      name: ["", Validators.required],
      designation: ["", Validators.required],
      joining_date: ["", Validators.required],
      gender: [""],
      religion: [""],
      email: ["",[Validators.required,Validators.email]],
      phone: ["",Validators.max(10)],
      address: [""],
      dob: ["", Validators.required],
      status: [""]
    });
  }

  onSelectPhoto(event) {
    // called each time file input changes

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        // called once readAsDataURL is completed

        this.url = event.target.result;
      };
    }
  }

onDateChanged(){
    
    this.createTeacherForm.controls["dob"].setValue(
        $("#dob").val()
    );
    this.createTeacherForm.controls["joining_date"].setValue($("#joining_date").val());
}
  editTeacher() {
    // this.createTeacherForm.controls["joining_date"].setValue(
    //   this.formatDate(this.createTeacherForm.value.joining_date)
    // );
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.teacherService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
        this.createTeacherForm.controls["photo"].setValue(photo.filename);

        this.teacherService
          .editTeacher(this.teacherId, this.createTeacherForm.value)
          .subscribe(
            teacher => {
              this.toastr.success("Teacher has been edited successfully");

              this.router.navigate(["/teacher/teacher-list"]);
            },
            error => {
              this.toastr.error("Error while editing teacher", "", {
                timeOut: 3000
              });
            }
          );
      });
    } else {
      // this.createTeacherForm.controls["joining_date"].setValue(
      //   this.formatDate(this.createTeacherForm.value.joining_date)
      // );
      this.teacherService
        .editTeacher(this.teacherId, this.createTeacherForm.value)
        .subscribe(
          teacher => {
            this.toastr.success("Teacher has been edited successfully");

            this.router.navigate(["/teacher/teacher-list"]);
          },
          error => {
            this.toastr.error("Error while editing teacher", "", {
              timeOut: 3000
            });
          }
        );
    }
  }

  resetTeacher() {
    this.createTeacherForm.reset();
  }
  getTeacherById(id) {
    var self = this;
    // console.log(this.ngbDatepicker);
    this.teacherService.getTeacherById(id).subscribe((teacherdata: any) => {
      this.createTeacherForm.controls["photo"].setValue(teacherdata.photo);
      this.createTeacherForm.controls["name"].setValue(teacherdata.name);

      this.createTeacherForm.controls["designation"].setValue(
        teacherdata.designation
      );

      teacherdata.dob = moment(teacherdata.dob).format("YYYY/MM/DD");
      this.createTeacherForm.controls["dob"].setValue(teacherdata.dob);

      teacherdata.joining_date = moment(teacherdata.joining_date).format(
        "YYYY/MM/DD"
      );

      this.createTeacherForm.controls["joining_date"].setValue(
        teacherdata.joining_date
      );

      // this.createTeacherForm.controls["joining_date"].setValue(
      //   this.parseDate(teacherdata.joining_date)
      // );

      this.createTeacherForm.controls["gender"].setValue(teacherdata.gender);
      this.createTeacherForm.controls["religion"].setValue(
        teacherdata.religion
      );
      this.createTeacherForm.controls["email"].setValue(teacherdata.email);
      this.createTeacherForm.controls["phone"].setValue(teacherdata.phone);
      this.createTeacherForm.controls["address"].setValue(teacherdata.address);

      this.createTeacherForm.controls["status"].setValue(teacherdata.status);
    });
  }

  parseDate(date: any) {
    var dateTimeArr = date.split("T");
    var dateArr = dateTimeArr[0].split("-");
    var dateobj = {
      year: parseInt(dateArr[0]),
      month: parseInt(dateArr[1]),
      date: parseInt(dateArr[2])
    };
    return dateobj;
  }
  formatDate(date: any) {
    return date
      ? `${date.year ? date.year : ""}-${date.month ? date.month : ""}-${
          date.day ? date.day : ""
        }`
      : "";
  }
  get name() {
    return this.createTeacherForm.get("name");
  }

  get email() {
    return this.createTeacherForm.get("email");
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
