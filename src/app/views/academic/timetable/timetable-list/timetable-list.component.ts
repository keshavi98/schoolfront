import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";
import { TimetableService } from "../timetable.service";
import { AdministratorService } from "../../../administrator/administrator.service";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-timetable-list",
  templateUrl: "./timetable-list.component.html",
  styleUrls: ["./timetable-list.component.css"]
})
export class TimetableListComponent implements OnInit {
  ClassList: any;
  class: any = "";
  section: any = "";
  year: any = "";
  TimetableList: any;
  TeacherList: any;
  deleteData: any;
  classId: any;
  SectionList: any;
  SubjectList: any;
  AcademicyearList: any;
  allSectionList: any;
  YearList: any;
  selectedClassSection: [];
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
    private timetableService: TimetableService,
    private administratorService: AdministratorService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role=localStorage.getItem("role");
    if(this.role == 3 || this.role == 4){
      
      this.getUserInfoByUserId();
    }
   else {
    this.getAllClass();
    this.getAllSubject();
    this.getAllSection();
    this.getTimetableList();
    
   }
    this.getAllAcademicYear();
    this.getAllTeacher();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "TIMETABLE") {
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

  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }

  deleteTimetable = params => {
    this.timetableService
      .deleteTimetable(params.data._id)
      .subscribe((data: any) => {
        this.getTimetableList();
        this.toastr.success("Timetable has been deteted successfully");
        this.router.navigate(["academic/timetable/timetable-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting timetable", "", {
          timeOut: 3000
        });
      };
  };

  getUserInfoByUserId() {
    
    this.timetableService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getAllClass();
      this.getAllSubject();
      this.getAllSection();
      this.getTimetableList();
    });
  }

  getTimetableList() {
    let data = {
    
    };
    if(this.role == 3){
      data["student"]=this.userData._id;
    }
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.timetableService.getTimetableList(data).subscribe((data: any) => {
      this.TimetableList = data;
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

  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  getAllAcademicYear() {
    this.administratorService.getAllAcademicYear().subscribe((data: any) => {
      this.AcademicyearList = data;
    });
  }

  onYearChanged() {
    this.timetableService
      .filterClassList({
        year: this.year,
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.TimetableList = data;
      });
  }

  onClassChanged() {
    this.section = "";
    this.selectedClassSection = this.SectionList.filter(Section => {
      return Section.class == this.class;
    });
    this.timetableService
      .filterClassList({
        year: this.year,
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.TimetableList = data;
      });
  }

  onSectionChanged() {
    this.timetableService
      .filterClassList({
        year: this.year,
        class: this.class,
        section: this.section
      })
      .subscribe((data: any) => {
        this.TimetableList = data;
      });
  }

  onBtnExport() {
    let params = {
      columnKeys: [
        "year.year",
        "class.class",
        "section.section",
        "subject.subject_name",
        "day",
        "teacher.name",
        "start_time",
        "end_time",
        "room",
        "status"
      ]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: [
        "year.year",
        "class.class",
        "section.section",
        "subject.subject_name",
        "day",
        "teacher.name",
        "start_time",
        "end_time",
        "room",
        "status"
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
        headerName: "Year",
        field: "year.year",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Class",
        field: "class.class",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Section",
        field: "section.section",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Subject",
        field: "subject.subject_name",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Day",
        field: "day",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Teacher",
        field: "teacher.name",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Starting Time",
        field: "start_time",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Ending Time",
        field: "end_time",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Room",
        field: "room",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: this.statusCellRenderer,
        sortable: true,
        filter: true,
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
              "academic/timetable/edit-timetable",
              params.data._id
            ]);
          },
          action2: this.deleteTimetable
        }
      }
    ];
  }
}
