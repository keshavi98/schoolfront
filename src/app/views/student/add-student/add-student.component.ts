import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentService } from "./../student.service";
import { ToastrService } from "ngx-toastr";
import { AcademicService } from "../../academic/academic.service";
import { ParentsService } from "../../parents/parents.service";
import { AdministratorService } from "../../administrator/administrator.service";
declare let $: any;

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent implements OnInit {
  student: any;
  errorMessage;
  getstudents: any;
  fileData: any;
  url: any;
  ParentsList: any;
  ClassList: any;
  SectionList: any;
  SubjectList: any;
  StudentGroupList: any;
  createStudentForm: FormGroup;
  classSectionList: any;
  classSubjectList: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private administratorService: AdministratorService,
    private parentsService: ParentsService
  ) {}

  ngOnInit() {
    $("#dob").datepicker();
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllParents();
    this.getAllSubject();
    this.getAllStudentGroup();
    this.createStudentForm = this.formBuilder.group({
      photo: [""],
      register_no: ["", Validators.required],
      roll_no: ["", Validators.required],
      student_name: ["", Validators.required],
      blood_group: [""],
      religion: [""],
      dob: ["", Validators.required],
      gender: [""],
      parents: ["", Validators.required],
      address: [""],
      state: [""],
      country: [""],
      phone: ["", Validators.max(10)],
      email: ["",Validators.email],
      class: ["", Validators.required],
      section: ["", Validators.required],
      optional_subject: [""],
      group: [""],
      extra_activities: [""],
      remark: [""],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onDateChanged(){
    
    this.createStudentForm.controls["dob"].setValue(
        $("#dob").val()
    );
   
}

  onSelectPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

  addStudent() {
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.studentService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
        this.createStudentForm.controls["photo"].setValue(photo.filename);
        this.studentService.addStudent(this.createStudentForm.value).subscribe(
          student => {
            this.toastr.success("Student has been added successfully ");

            this.router.navigate(["/student/student-list"]);
          },
          error => {
            this.toastr.error("Error while adding student", "", {
              timeOut: 3000
            });
          }
        );
      });
    } else {
      this.studentService.addStudent(this.createStudentForm.value).subscribe(
        student => {
          this.toastr.success("Student has been added successfully ");

          this.router.navigate(["/student/student-list"]);
        },
        error => {
          this.toastr.error("Error while adding Student", "Major Error", {
            timeOut: 3000
          });
        }
      );
    }
  }

  onClassChanged() {
    this.createStudentForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.createStudentForm.value.class;
    });
    this.createStudentForm.controls["optional_subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return (
        subject.class == this.createStudentForm.value.class &&
        subject.type == "optional"
      );
    });
  }

  resetStudent() {
    this.createStudentForm.reset();
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
  
  getAllParents() {
    this.parentsService.getAllParents().subscribe((data: any) => {
      this.ParentsList = data;
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
  getAllStudentGroup() {
    this.administratorService.getAllStudentGroup().subscribe((data: any) => {
      this.StudentGroupList = data;
    });
  }

  get register_no() {
    return this.createStudentForm.get("register_no");
  }
  get roll_no() {
    return this.createStudentForm.get("roll_no");
  }
  get student_name() {
    return this.createStudentForm.get("student_name");
  }

  get dob() {
    return this.createStudentForm.get("dob");
  }
  get email() {
    return this.createStudentForm.get("email");
  }
  get username() {
    return this.createStudentForm.get("username");
  }
  get password() {
    return this.createStudentForm.get("password");
  }

  get class() {
    return this.createStudentForm.get("class");
  }
  get section() {
    return this.createStudentForm.get("section");
  }
  get parents() {
    return this.createStudentForm.get("parents");
  }
}
