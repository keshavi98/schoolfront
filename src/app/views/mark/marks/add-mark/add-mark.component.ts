import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MarksService } from "../marks.service";
import { AcademicService } from "../../../academic/academic.service";
import { ExamService } from "../../../exam/exam.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../../environments/environment";
import { MarkdistributionService } from "../../mark-distribution/markdistribution.service";
import { DataTableModule } from "ng-angular8-datatable";

@Component({
  selector: "app-add-mark",
  templateUrl: "./add-mark.component.html",
  styleUrls: ["./add-mark.component.css"]
})

export class AddMarkComponent implements OnInit {
  Section: any = "";
  ClassList: any;
  SubjectList: any;
  classSubjectList: any;
  SectionList: any;
  classSectionList: any;
  ExamList: any;
  getMarkForm: FormGroup;
  selectedClassSubject: [];
  studentList: any;
  markDistributionList: any;
  role:any;
  userData:any;
  apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private marksService: MarksService,
    private markdistributionService: MarkdistributionService
  ) {}

  ngOnInit() {
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();
    this.getAllExam();

    this.getMarkForm = this.formBuilder.group({
      class: ["", Validators.required],
      examname: ["", Validators.required],
      section: ["", Validators.required],
      subject: ["", Validators.required]
    });
  }

  getMark() {
    this.marksService.getMark(this.getMarkForm.value).subscribe((data: any) => {
      this.studentList = data;
      this.getMarkDistributionList();
    });
  }

  setMark() {
    let records = [];
    for (let i = 0; i < this.studentList.length; i++) {
      records.push({
        student: this.studentList[i]._id,
        class: this.studentList[i].class,
        examname: this.getMarkForm.value.examname,
        section: this.studentList[i].section,
        subject: this.getMarkForm.value.subject,
        sub_records: this.studentList[i].sub_records
      });
    }
    this.marksService.setMark({ records: records }).subscribe(
      mark => {
        this.toastr.success("Mark has been added successfully ");

        this.router.navigate(["mark/marks/mark-list"]);
      },
      error => {
        this.toastr.error("Error while adding mark", "", {
          timeOut: 3000
        });
      }
    );
  }

  getMarkDistributionList() {
    this.markdistributionService
      .getMarkDistributionList()
      .subscribe((data: any) => {
        this.markDistributionList = data;

        this.studentList.map(student => {
          student.sub_records = [];
          for (let i = 0; i < this.markDistributionList.length; i++) {
            student.sub_records.push({
              mark_distribution_type: this.markDistributionList[i]._id,
              mark: 0
            });
          }
          //this.markDistributionList.forEach(element => {});
        });
        //.agGrid.api.sizeColumnsToFit();
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
  
  getAllExam() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.examService.getAllExam(data).subscribe((data: any) => {
      this.ExamList = data;
    });
  }

  onClassChanged() {
    this.getMarkForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.getMarkForm.value.class;
    });
    this.getMarkForm.controls["subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return subject.class == this.getMarkForm.value.class;
    });
  }

  resetMark() {
    this.getMarkForm.reset();
  }

  get examname() {
    return this.getMarkForm.get("examname");
  }

  get date() {
    return this.getMarkForm.get("date");
  }
  get class() {
    return this.getMarkForm.get("class");
  }
  get section() {
    return this.getMarkForm.get("section");
  }
  get subject() {
    return this.getMarkForm.get("subject");
  }
}
