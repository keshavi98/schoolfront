import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamScheduleService } from "../exam-schedule.service";
import { AcademicService } from "../../../academic/academic.service";
import { ExamService } from "../../exam.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-exam-schedule-list",
  templateUrl: "./exam-schedule-list.component.html",
  styleUrls: ["./exam-schedule-list.component.css"]
})
export class ExamScheduleListComponent implements OnInit {
  ClassList: any;
  class: any = "";
  section: any = "";
  year: any = "";
  ExamScheduleList: any;
  deleteData: any;
  classId: any;
  SectionList: any;
  SubjectList: any;
  allSectionList: any;
  selectedClassSection: [];
  ExamList: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;
  role:any;
  userData:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private examService: ExamService,
    private examScheduleService: ExamScheduleService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role=localStorage.getItem("role");
    if(this.role == 3 || this.role == 4){
      this.getUserInfoByUserId();
    }
    // if(this.role == 4){
      
    //   this.getUserInfoByUserId();
    // }
   else {
    this.getAllClass();
    this.getAllExam();
    this.getAllSubject();
    this.getAllSection();
    this.getExamScheduleList(); 
   }
      
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "EXAMSCHEDULE") {
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

  deleteExamSchedule = params => {
    this.examScheduleService
      .deleteExamSchedule(params.data._id)
      .subscribe((data: any) => {
        this.getExamScheduleList();
        this.toastr.success("Exam Schedule has been deteted successfully");
        this.router.navigate(["exam/examschedule/exam-schedule-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting exam schedule", "", {
          timeOut: 3000
        });
      };
  };

  getUserInfoByUserId() {
    
    this.examScheduleService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getAllClass();
      this.getAllExam();
      this.getAllSubject();
      this.getAllSection();
      this.getExamScheduleList();
     
    });
  }

  getExamScheduleList() {
    let data = {
    
    };
    if(this.role == 3){
      
      data["student"]=this.userData._id;
    }
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.examScheduleService.getExamScheduleList(data).subscribe((data: any) => {
      this.ExamScheduleList = data;
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

  onClassChanged() {
    this.section = "";
    this.selectedClassSection = this.SectionList.filter(Section => {
      return Section.class == this.class;
    });
    this.examScheduleService
      .filterExamScheduleList({
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.ExamScheduleList = data;
      });
  }

  onSectionChanged() {
    this.examScheduleService
      .filterExamScheduleList({
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.ExamScheduleList = data;
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
        headerName: "Exam Name",
        field: "examname.examname",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Class",
        field: "class.class",
        width: 90
      },
      {
        headerName: "Section",
        field: "section.section",
        width: 90
      },
      {
        headerName: "Subject",
        field: "subject.subject_name",
        width: 90
      },
      {
        headerName: "Date",
        field: "date",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Room",
        field: "room",
        width: 90
      },
      {
        headerName: "Time From",
        field: "time_from",
        width: 90
      },
      {
        headerName: "Time To",
        field: "time_to",
        width: 90
      },

      {
        headerName: "Action",
        field: "",
        cellRendererFramework: ActionCellRendererComponent,
        cellRendererParams: {
          icon1: "cui-pencil",
          icon2: "cui-trash",
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate([
              "exam/examschedule/edit-exam-schedule",
              params.data._id
            ]);
          },
          action2: this.deleteExamSchedule
        }
      }
    ];
  }
}
