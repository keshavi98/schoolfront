import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SyllabusService } from "./../syllabus.service";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-syllabus",
  templateUrl: "./edit-syllabus.component.html",
  styleUrls: ["./edit-syllabus.component.css"]
})
export class EditSyllabusComponent implements OnInit {
  ClassList: any;
  createSyllabusForm: FormGroup;
  selectedFile: any;
  fileData: any;
  url: any;
  SyllabusId: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private syllabusService: SyllabusService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.SyllabusId = params.id;
          this.getSyllabusById(this.SyllabusId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/parents-list"]);
        }
      }
    );
    this.createSyllabusForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      class: ["", Validators.required],
      file: ["", Validators.required],
      file_name: [""]
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

  editSyllabus() {
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.syllabusService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createSyllabusForm.controls["file"].setValue(file.filename);

      this.syllabusService
        .editSyllabus(this.SyllabusId, this.createSyllabusForm.value)
        .subscribe(
          syllabus => {
            this.toastr.success("Syllabus has been edited successfully ");

            this.router.navigate(["academic/syllabus/syllabus-list"]);
          },
          error => {
            this.toastr.error("Error while edting syllabus", "", {
              timeOut: 3000
            });
          }
        );
    });
  }

  getSyllabusById(id) {
    this.syllabusService.getSyllabusById(id).subscribe((parentsdata: any) => {
      this.createSyllabusForm.controls["title"].setValue(parentsdata.title);
      this.createSyllabusForm.controls["description"].setValue(
        parentsdata.description
      );

      this.createSyllabusForm.controls["class"].setValue(parentsdata.class);
      this.createSyllabusForm.controls["file"].setValue(parentsdata.file);
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

  get file() {
    return this.createSyllabusForm.get("file");
  }
}
