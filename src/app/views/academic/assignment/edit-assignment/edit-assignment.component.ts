import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";
import { AssignmentService } from "../assignment.service";
import * as moment from "moment";
declare let $: any;

@Component({
  selector: "app-edit-assignment",
  templateUrl: "./edit-assignment.component.html",
  styleUrls: ["./edit-assignment.component.css"]
})
export class EditAssignmentComponent implements OnInit {
  ClassList: any;
  SubjectList: any;
  SectionList: any;
  createAssigmentForm: FormGroup;
  selectedFile: any;
  fileData: any;
  url: any;
  assignmentId: any;
  classSectionList: any;
  classSubjectList: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    $("#deadline").datepicker();
    this.role = localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.assignmentId = params.id;
          this.getAssignmentById(this.assignmentId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["academic/assignment/assignment-list"]);
        }
      }
    );

    this.createAssigmentForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      class: ["", Validators.required],
      subject: ["", Validators.required],
      deadline: ["", Validators.required],
      section: [""],
      file: ["", Validators.required],
      file_name: [""]
    });
  }

  onDateChanged(){
    
    this.createAssigmentForm.controls["deadline"].setValue(
        $("#deadline").val()
    );
   
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

  editAssignment() {
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.assignmentService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createAssigmentForm.controls["file"].setValue(file.filename);

      this.assignmentService
        .editAssignment(this.assignmentId, this.createAssigmentForm.value)
        .subscribe(
          assignment => {
            this.toastr.success("Assignment has been edited successfully ");

            this.router.navigate(["academic/assignment/assignment-list"]);
          },
          error => {
            this.toastr.error("Error while editing Assignment", "", {
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

  getAllSubject() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSubject(data).subscribe((data: any) => {
      this.SubjectList = data;
    });
  }

  getAllSection() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSection(data).subscribe((data: any) => {
      this.SectionList = data;
    });
  }

  getAssignmentById(id) {
    this.assignmentService
      .getAssignmentById(id)
      .subscribe((assignmentdata: any) => {
        this.createAssigmentForm.controls["title"].setValue(
          assignmentdata.title
        );
        this.createAssigmentForm.controls["description"].setValue(
          assignmentdata.description
        );
        this.createAssigmentForm.controls["class"].setValue(
          assignmentdata.class
        );
        this.onClassChanged();
        this.createAssigmentForm.controls["subject"].setValue(
          assignmentdata.subject
        );
        assignmentdata.deadline = moment(assignmentdata.deadline).format(
          "YYYY/MM/DD"
        );
        this.createAssigmentForm.controls["deadline"].setValue(
          assignmentdata.deadline
        );
        this.createAssigmentForm.controls["section"].setValue(
          assignmentdata.section
        );

        this.createAssigmentForm.controls["file"].setValue(assignmentdata.file);
      });
  }
  onClassChanged() {
    this.createAssigmentForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.createAssigmentForm.value.class;
    });
    this.createAssigmentForm.controls["subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return subject.class == this.createAssigmentForm.value.class;
    });
  }

  resetAssigmnet() {
    this.createAssigmentForm.reset();
  }

  get title() {
    return this.createAssigmentForm.get("title");
  }

  get description() {
    return this.createAssigmentForm.get("description");
  }
  get class() {
    return this.createAssigmentForm.get("class");
  }
  get file_name() {
    return this.createAssigmentForm.get("file_name");
  }
  get file() {
    return this.createAssigmentForm.get("file");
  }
  get subject() {
    return this.createAssigmentForm.get("subject");
  }
  get deadline() {
    return this.createAssigmentForm.get("deadline");
  }
}
