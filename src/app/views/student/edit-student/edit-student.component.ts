import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentService } from "./../student.service";
import { ToastrService } from "ngx-toastr";
import { AcademicService } from "../../academic/academic.service";
import { ParentsService } from "../../parents/parents.service";
import * as moment from "moment";
import { AdministratorService } from "../../administrator/administrator.service";
declare let $: any;

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.css"]
})
export class EditStudentComponent implements OnInit {
  StudentList: any;
  createStudentForm: FormGroup;
  StudentId: any;
  updatePhoto: any;
  selectedFile: any;
  fileData: any;
  url: any;
  ParentsList: any;
  ClassList: any;
  SectionList: any;
  SubjectList: any;
  StudentGroupList: any;
  classSectionList: any;
  classSubjectList: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
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
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.StudentId = params.id;
          this.getStudentById(this.StudentId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/studnet-list"]);
        }
      }
    );
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
      phone: ["",Validators.max(10)],
      email: ["",Validators.email],
      class: ["", Validators.required],
      section: ["", Validators.required],
      optional_subject: [""],
      group: [""],
      extra_activities: [""],
      remark: [""],

      status: [""]
    });
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
  onDateChanged(){
    
    this.createStudentForm.controls["dob"].setValue(
        $("#dob").val()
    );
   
}
  editStudent() {
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.studentService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
        this.createStudentForm.controls["photo"].setValue(photo.filename);

        this.studentService
          .editStudent(this.StudentId, this.createStudentForm.value)
          .subscribe(
            student => {
              this.toastr.success("Student has been edited successfully ");

              this.router.navigate(["/student/student-list"]);
            },
            error => {
              this.toastr.error("Error while editing student", "", {
                timeOut: 3000
              });
            }
          );
      });
    } else {
      this.studentService
        .editStudent(this.StudentId, this.createStudentForm.value)
        .subscribe(
          student => {
            this.toastr.success("Student has been edited successfully ");
            this.router.navigate(["/student/student-list"]);
          },
          error => {
            this.toastr.error("Error while editing Student", "", {
              timeOut: 3000
            });
          }
        );
    }
  }
  resetStudent() {
    this.createStudentForm.reset();
  }

  getUserInfoByUserId() {
    
    this.studentService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getAllClass();
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
  resetstudent() {
    this.createStudentForm.reset();
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe((studentdata: any) => {
      this.createStudentForm.controls["photo"].setValue(studentdata.photo);
      this.createStudentForm.controls["student_name"].setValue(
        studentdata.student_name
      );

      this.createStudentForm.controls["register_no"].setValue(
        studentdata.register_no
      );
      this.createStudentForm.controls["roll_no"].setValue(studentdata.roll_no);
      this.createStudentForm.controls["parents"].setValue(studentdata.parents);
      studentdata.dob = moment(studentdata.dob).format("YYYY/MM/DD");
      this.createStudentForm.controls["dob"].setValue(studentdata.dob);
      this.createStudentForm.controls["gender"].setValue(studentdata.gender);
      this.createStudentForm.controls["blood_group"].setValue(
        studentdata.blood_group
      );
      this.createStudentForm.controls["religion"].setValue(
        studentdata.religion
      );
      this.createStudentForm.controls["state"].setValue(studentdata.state);
      this.createStudentForm.controls["country"].setValue(studentdata.country);

      this.createStudentForm.controls["class"].setValue(studentdata.class._id);
      this.onClassChanged();
      this.createStudentForm.controls["section"].setValue(
        studentdata.section._id
      );
      this.createStudentForm.controls["group"].setValue(studentdata.group._id);
      this.createStudentForm.controls["optional_subject"].setValue(
        studentdata.optional_subject
      );
      this.createStudentForm.controls["extra_activities"].setValue(
        studentdata.extra_activities
      );
      this.createStudentForm.controls["remark"].setValue(studentdata.remark);

      this.createStudentForm.controls["phone"].setValue(studentdata.phone);
      this.createStudentForm.controls["address"].setValue(studentdata.address);
      this.createStudentForm.controls["photo"].setValue(studentdata.photo);

      this.createStudentForm.controls["status"].setValue(studentdata.status);
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
