import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";
import { ClassService } from "../class.service";

@Component({
  selector: "app-edit-class",
  templateUrl: "./edit-class.component.html",
  styleUrls: ["./edit-class.component.css"]
})
export class EditClassComponent implements OnInit {
  ClassList: any;
  createClassForm: FormGroup;
  classId: any;
  TeacherList: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private classService: ClassService
  ) {}

  ngOnInit() {
    this.getAllTeacher();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.classId = params.id;
          this.getClassById(this.classId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["class/class-list"]);
        }
      }
    );

    this.createClassForm = this.formBuilder.group({
      class: ["", Validators.required],
      class_numeric: ["", Validators.required],
      teacher: ["", Validators.required],
      note: [""]
    });
  }

  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }
  editClass() {
    this.classService
      .editClass(this.classId, this.createClassForm.value)
      .subscribe(
        classes => {
          this.toastr.success("Class has been edited successfully");

          this.router.navigate(["academic/class/class-list"]);
        },
        error => {
          this.toastr.error("Error while editing class", "", {
            timeOut: 3000
          });
        }
      );
  }
  resetClass() {
    this.createClassForm.reset();
  }
  getClassById(id) {
    this.classService.getClassById(id).subscribe((classdata: any) => {
      this.createClassForm.controls["class"].setValue(classdata.class);

      this.createClassForm.controls["class_numeric"].setValue(
        classdata.class_numeric
      );
      this.createClassForm.controls["teacher"].setValue(classdata.teacher);
      this.createClassForm.controls["note"].setValue(classdata.note);
    });
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
