import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MarksService } from "../marks.service";
import { AcademicService } from "../../../academic/academic.service";
import { ExamService } from "../../../exam/exam.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { environment } from "../../../../../environments/environment";
import { StudentService } from "../../../student/student.service";
import { Identifiers } from "@angular/compiler";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-mark-list",
  templateUrl: "./mark-list.component.html",
  styleUrls: ["./mark-list.component.css"]
})
export class MarkListComponent implements OnInit {
  StudentList: any;
  StudentId: Identifiers;
  studentview: any;
  ClassList: any;
  class: any = "";
  section: any = "";
  examname: any = "";
  MarkList: any;
  deleteData: any;
  classId: any;
  SectionList: any;
  SubjectList: any;
  allSectionList: any;
  selectedClassSection: [];
  ExamList: any;
  subject: any;
  selectedClassSubject: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;
  role: any;
  userData: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private examService: ExamService,
    private marksService: MarksService,
    private studentService: StudentService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    if (this.role == 3) {
      this.getUserInfoByUserId();
    }
    if(this.role == 4)
    {
      this.getUserInfoByUserId();
    } else {
      this.getStudentList();
      this.getAllClass();
      this.getAllSubject();
      this.getAllSection();
      this.getAllExam();
    }
   
    
    //this.getMarkList();
   
  
    let self = this;

    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "MARK") {
          self.enableAdd = self.permissionData[i].add;
          self.enableEdit = self.permissionData[i].edit;
          self.enableDelete = self.permissionData[i].delete;
          self.enableView = self.permissionData[i].view;
          self.permissionSet = true;
          self.setColumnDefs();
        }
      }
    });
  }

  getAllPermission() {
    this.permissionService
      .getPermission({ role: localStorage.getItem("role") })
      .subscribe((data: any) => {
        this.PermissionList = data;
        this.sharedService.setPermissionData(this.PermissionList);
      });
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  getUserInfoByUserId() {
    this.marksService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      if(this.role==3){
        this.getStudentList();
        this.getAllClass();
        this.getAllSubject();
        this.getAllSection();
        this.getAllExam();
        this.router.navigate(["mark/marks/mark-view/", this.userData._id]);
      }else{
        this.getStudentList();
        this.getAllClass();
        this.getAllSubject();
        this.getAllSection();
        this.getAllExam();
      }
     
      // this.router.navigate(["mark/marks/mark-view/", userdata._id]);
    });
  }

  getStudentList() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.studentService.getStudentList(data).subscribe((data: any) => {
      this.StudentList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  getMarkList() {
    
    this.marksService.getMarkList().subscribe((data: any) => {
      this.MarkList = data;
      this.agGrid.api.sizeColumnsToFit();
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

  photoCellRendere(params) {
    return `<img _ngcontent-gvm-c2="" class="photo" src="${environment.apiUrl}${params.value}" style="width: 40px;
    height: 40px;
    border-radius: 50%";>`;
  }

  statusCellRenderer(params) {
    if (params.value == 1) return "Present";
    else return "Absent";
  }

  // onClassChanged() {
  //   this.section = "";
  //   this.selectedClassSection = this.SectionList.filter(Section => {
  //     return Section.class == this.class;
  //   });
  //   this.subject = "";
  //   this.selectedClassSubject = this.SubjectList.filter(Subject => {
  //     return Subject.class == this.class;
  //   });
  // }

  onClassChanged() {
    this.section = "";
    this.selectedClassSection = this.SectionList.filter(Section => {
      return Section.class == this.class;
    });
    this.marksService
      .filterStudentByClassSection({
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.StudentList = data;
      });
  }

  onSectionChanged() {
    this.marksService
      .filterStudentByClassSection({
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.StudentList = data;
      });
  }

  onBtnExport() {
    let params = {
      columnKeys: [
        "examname.examname",
        "class.class",
        "section.section",
        "subject.subject_name",
        "date",
        "room",
        "time_from",
        "time_to"
      ]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: [
        "examname.examname",
        "class.class",
        "section.section",
        "subject.subject_name",
        "date",
        "room",
        "time_from",
        "time_to"
      ]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }
  setColumnDefs() {
    this.columnDefs = [
      {
        headerName: "",
        field: "rowSelect",
        colId: "rowSelect",
        width: 40,
        suppressMenu: true,
        suppressMovable: true,
        suppressNavigable: true,
        suppressResize: true,
        suppressSorting: true,
        pinned: "left",
        lockPosition: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        lockPinned: true,
        lockVisible: true,
        suppressToolPanel: true
      },
      {
        headerName: "Photo",
        field: "photo",
        cellRenderer: this.photoCellRendere
      },
      {
        headerName: "Name",
        field: "student_name",
        sortable: true,
        filter: true
      },
      {
        headerName: "Roll ",
        field: "roll_no",
        sortable: true,
        filter: true
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true
      },
      {
        headerName: "Action",
        field: "",
        cellRendererFramework: ActionCellRendererComponent,
        cellRendererParams: {
          icon1: "cui-pencil",
          icon2: "cui-trash",
          icon3: "fa fa-check-square-o ",
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate(["/mark/edit-mark/", params.data._id]);
          },
          //   action2: this.deleteStudent,
          action3: params => {
            this.router.navigate(["mark/marks/mark-view/", params.data._id]);
          }
        }
      }
    ];
  }
}
