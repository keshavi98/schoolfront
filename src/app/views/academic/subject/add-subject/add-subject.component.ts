import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubjectService } from "../subject.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-add-subject",
  templateUrl: "./add-subject.component.html",
  styleUrls: ["./add-subject.component.css"]
})
export class AddSubjectComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  role:any;
  userData:any;
  createSubjectForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private academicService: AcademicService
  ) {}

  ngOnInit() {
    this.role =localStorage.getItem("role");
    this.getAllClass();
    this.getAllTeacher();
    this.createSubjectForm = this.formBuilder.group({
      class: ["", Validators.required],
      teacher: ["", Validators.required],
      type: ["", Validators.required],
      pass_mark: ["", Validators.required],
      final_mark: ["", Validators.required],
      subject_name: ["", Validators.required],
      subject_author: [""],
      subject_code: ["", Validators.required]
    });
  }
  addSubject() {
    this.subjectService.addSubject(this.createSubjectForm.value).subscribe(
      subject => {
        this.toastr.success("Subject has been added successfully ");

        this.router.navigate(["academic/subject/subject-list"]);
      },
      error => {
        this.toastr.error("Error while adding subject", "", {
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

  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  resetSubject() {
    this.createSubjectForm.reset();
  }
  get class() {
    return this.createSubjectForm.get("class");
  }

  get teacher() {
    return this.createSubjectForm.get("teacher");
  }
  get type() {
    return this.createSubjectForm.get("type");
  }
  get pass_mark() {
    return this.createSubjectForm.get("pass_mark");
  }
  get final_mark() {
    return this.createSubjectForm.get("final_mark");
  }
  get subject_name() {
    return this.createSubjectForm.get("subject_name");
  }
  get subject_code() {
    return this.createSubjectForm.get("subject_code");
  }
}
