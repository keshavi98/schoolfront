import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamService } from "../../exam.service";
import { ExamsService } from "../exams.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.component.html",
  styleUrls: ["./exam-list.component.css"]
})
export class ExamListComponent implements OnInit {
  ExamList: any;
  ExamId: any;
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
    private ExamService: ExamService,
    private toastr: ToastrService,
    private ExamsService: ExamsService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    if(this.role == 4){
      
      this.getUserInfoByUserId();
    }else{
      this.getExamList();
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

  getUserInfoByUserId() {
    //debugger
    this.ExamsService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
     this.ExamList();
    });
  }

  getExamList() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.ExamsService.getExamList(data).subscribe((data: any) => {
      this.ExamList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  onBtnExport() {
    let params = {
      columnKeys: ["examname", "date", "note"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["examname", "date", "note"]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  deleteExam = params => {
    this.ExamsService.deleteExam(params.data._id).subscribe((data: any) => {
      this.getExamList();
      this.toastr.success("Exam has been deteted successfully");
      this.router.navigate(["exam/exam/exam-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting exam", "", {
          timeOut: 3000
        });
      };
  };

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
        field: "examname",
        sortable: true,
        filter: true
      },

      {
        headerName: "Date",
        field: "date",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true
      },
      {
        headerName: "Note",
        field: "note"
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
            this.router.navigate(["exam/exam/edit-exam", params.data._id]);
          },
          action2: this.deleteExam
        }
      }
    ];
  }
}
