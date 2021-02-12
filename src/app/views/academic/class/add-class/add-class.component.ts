import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClassService } from "../class.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-class",
  templateUrl: "./add-class.component.html",
  styleUrls: ["./add-class.component.css"]
})
export class AddClassComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  createClassForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private toastr: ToastrService,
    private academicService: AcademicService
  ) {}

  ngOnInit() {
    this.getAllTeacher();
    this.createClassForm = this.formBuilder.group({
      class: ["", Validators.required],
      class_numeric: ["", Validators.required],
      teacher: ["", Validators.required],
      note: [""]
    });
  }

  addClass() {
    this.classService.addClass(this.createClassForm.value).subscribe(
      classes => {
        this.toastr.success("Class has been added successfully ");

        this.router.navigate(["academic/class/class-list"]);
      },
      error => {
        this.toastr.error("Error while adding class", "", {
          timeOut: 3000
        });
      }
    );
  }
  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  resetClass() {
    this.createClassForm.reset();
  }
  get class() {
    return this.createClassForm.get("class");
  }

  get class_numeric() {
    return this.createClassForm.get("class_numeric");
  }
  get teacher() {
    return this.createClassForm.get("teacher");
  }
}
