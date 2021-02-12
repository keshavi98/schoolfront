import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SectionService } from "../section.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-section",
  templateUrl: "./edit-section.component.html",
  styleUrls: ["./edit-section.component.css"]
})
export class EditSectionComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  createSectionForm: FormGroup;
  sectionId: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private toastr: ToastrService,
    private academicService: AcademicService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.getAllTeacher();
    this.getAllClass();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.sectionId = params.id;
          this.getSectionById(this.sectionId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["section/section-list"]);
        }
      }
    );

    this.createSectionForm = this.formBuilder.group({
      section: ["", Validators.required],
      category: ["", Validators.required],
      capacity: ["", Validators.required],
      class: ["", Validators.required],
      teacher: ["", Validators.required],
      note: [""]
    });
  }
  editSection() {
    this.sectionService
      .editSection(this.sectionId, this.createSectionForm.value)
      .subscribe(
        section => {
          this.toastr.success("Section has been edited successfully");

          this.router.navigate(["academic/section/section-list"]);
        },
        error => {
          this.toastr.error("Error while editing section", "", {
            timeOut: 3000
          });
        }
      );
  }
  getSectionById(id) {
    this.sectionService.getSectionById(id).subscribe((sectiondata: any) => {
      this.createSectionForm.controls["section"].setValue(sectiondata.section);

      this.createSectionForm.controls["category"].setValue(
        sectiondata.category
      );
      this.createSectionForm.controls["capacity"].setValue(
        sectiondata.capacity
      );
      this.createSectionForm.controls["teacher"].setValue(sectiondata.teacher);
      this.createSectionForm.controls["class"].setValue(sectiondata.class);
      this.createSectionForm.controls["note"].setValue(sectiondata.note);
    });
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
