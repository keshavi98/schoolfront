import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SectionService } from "../section.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-section",
  templateUrl: "./add-section.component.html",
  styleUrls: ["./add-section.component.css"]
})
export class AddSectionComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  role:any;
  userData:any;
  createSectionForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sectionService: SectionService,
    private toastr: ToastrService,
    private academicService: AcademicService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.getAllTeacher();
    this.getAllClass();
    this.createSectionForm = this.formBuilder.group({
      section: ["", Validators.required],
      category: ["", Validators.required],
      capacity: ["", Validators.required],
      class: ["", Validators.required],
      teacher: ["", Validators.required],
      note: [""]
    });
  }

  addSection() {
    this.sectionService.addSection(this.createSectionForm.value).subscribe(
      section => {
        this.toastr.success("Section has been added successfully ");

        this.router.navigate(["academic/section/section-list"]);
      },
      error => {
        this.toastr.error("Error while adding section", "", {
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

  resetSection() {
    this.createSectionForm.reset();
  }
  get section() {
    return this.createSectionForm.get("section");
  }

  get category() {
    return this.createSectionForm.get("category");
  }
  get capacity() {
    return this.createSectionForm.get("capacity");
  }
  get teacher() {
    return this.createSectionForm.get("teacher");
  }
  get class() {
    return this.createSectionForm.get("class");
  }
}
