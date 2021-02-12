import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamattedanceService } from "../examattedance.service";
import { AcademicService } from "../../../academic/academic.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { environment } from "../../../../../environments/environment";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-exam-attendance-list",
  templateUrl: "./exam-attendance-list.component.html",
  styleUrls: ["./exam-attendance-list.component.css"]
})
export class ExamAttendanceListComponent implements OnInit {
  ClassList: any;
  class: any = "";
  section: any = "";
  examname: any = "";
  ExamAttendaceList: any;
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
  //columnDefs: any;
  role:any;
  userData:any;

  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private examService: ExamService,
    private examAttendanceService: ExamattedanceService,
    private examattedanceService: ExamattedanceService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSubject();
    this.getAllSection();
    // this.getExamAttendanceList();
    this.getAllExam();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "EXAM_ATTENDANCE") {
          self.enableAdd = self.permissionData[i].add;
          self.enableEdit = self.permissionData[i].edit;
          self.enableDelete = self.permissionData[i].delete;
          self.enableView = self.permissionData[i].view;
          self.permissionSet = true;
          //  self.setColumnDefs();
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

  // getExamAttendanceList() {
  //   this.examAttendanceService
  //     .getExamAttendanceList()
  //     .subscribe((data: any) => {
  //       this.ExamAttendaceList = data;
  //       this.agGrid.api.sizeColumnsToFit();
  //     });
  // }

  getExamAttendance() {
    this.examAttendanceService
      .getExamAttendance({
        examname: this.examname,
        class: this.class,
        section: this.section,
        subject: this.subject
      })
      .subscribe((data: any) => {
        this.ExamAttendaceList = data;
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

  onClassChanged() {
    this.section = "";
    this.selectedClassSection = this.SectionList.filter(Section => {
      return Section.class == this.class;
    });
    this.subject = "";
    this.selectedClassSubject = this.SubjectList.filter(Subject => {
      return Subject.class == this.class;
    });

    // this.examAttendanceService
    //   .getExamAttendance({
    //     examname: this.examname,
    //     class: this.class,
    //     section: this.section,
    //     subject: this.subject
    //   })
    //   .subscribe((data: any) => {
    //     this.ExamAttendaceList = data;
    //   });
  }

  onBtnExport() {
    let params = {
      columnKeys: ["student.student_name", "roll_no", "email", "status"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["student.student_name", "roll_no", "email", "status"]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  setColumnDefs() {}
  columnDefs = [
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
      headerName: "Status",
      field: "status",
      cellRenderer: this.statusCellRenderer,
      sortable: true,
      filter: true
    }
  ];
}
