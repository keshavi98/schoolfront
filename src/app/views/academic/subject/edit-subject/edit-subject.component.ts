import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubjectService } from "../subject.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-subject",
  templateUrl: "./edit-subject.component.html",
  styleUrls: ["./edit-subject.component.css"]
})
export class EditSubjectComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  createSubjectForm: FormGroup;
  subjectId: any;
  role:any;
  userData:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.getAllClass();
    this.getAllTeacher();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.subjectId = params.id;
          this.getSubjectById(this.subjectId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["subject/subject-list"]);
        }
      }
    );
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

  editSubject() {
    this.subjectService
      .editSubject(this.subjectId, this.createSubjectForm.value)
      .subscribe(
        subject => {
          this.toastr.success("Subject has been edited successfully");

          this.router.navigate(["academic/subject/subject-list"]);
        },
        error => {
          this.toastr.error("Error while editing subject", "", {
            timeOut: 3000
          });
        }
      );
  }

  getSubjectById(id) {
    this.subjectService.getSubjectById(id).subscribe((subjectdata: any) => {
      this.createSubjectForm.controls["class"].setValue(subjectdata.class);

      this.createSubjectForm.controls["teacher"].setValue(subjectdata.teacher);
      this.createSubjectForm.controls["type"].setValue(subjectdata.type);
      this.createSubjectForm.controls["pass_mark"].setValue(
        subjectdata.pass_mark
      );
      this.createSubjectForm.controls["final_mark"].setValue(
        subjectdata.final_mark
      );
      this.createSubjectForm.controls["subject_name"].setValue(
        subjectdata.subject_name
      );
      this.createSubjectForm.controls["subject_code"].setValue(
        subjectdata.subject_code
      );
      this.createSubjectForm.controls["subject_author"].setValue(
        subjectdata.subject_author
      );
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
