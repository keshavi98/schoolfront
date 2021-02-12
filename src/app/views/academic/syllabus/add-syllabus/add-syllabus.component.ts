import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SyllabusService } from "../syllabus.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-add-syllabus",
  templateUrl: "./add-syllabus.component.html",
  styleUrls: ["./add-syllabus.component.css"]
})
export class AddSyllabusComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  createSyllabusForm: FormGroup;
  selectedFile: any;
  fileData: any;
  url: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private syllabusService: SyllabusService,
    private toastr: ToastrService,
    private academicService: AcademicService
  ) {}
  ngOnInit() {
    this.getAllClass();
    this.createSyllabusForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      class: ["", Validators.required],
      file: [""],
      file_name: ["", Validators.required]
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

  addSyllabus() {
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.syllabusService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createSyllabusForm.controls["file"].setValue(file.filename);

      this.syllabusService.addSyllabus(this.createSyllabusForm.value).subscribe(
        syllabus => {
          this.toastr.success("Syllabus has been added successfully ");

          this.router.navigate(["academic/syllabus/syllabus-list"]);
        },
        error => {
          this.toastr.error("Error while adding Syllabus", "", {
            timeOut: 3000
          });
        }
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

  resetSyllabus() {
    this.createSyllabusForm.reset();
  }
  get title() {
    return this.createSyllabusForm.get("title");
  }

  get description() {
    return this.createSyllabusForm.get("description");
  }
  get class() {
    return this.createSyllabusForm.get("class");
  }
  get file_name() {
    return this.createSyllabusForm.get("file_name");
  }
}
