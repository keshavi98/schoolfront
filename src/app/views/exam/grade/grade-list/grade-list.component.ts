import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamService } from "../../exam.service";
import { GradeService } from "../grade.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-grade-list",
  templateUrl: "./grade-list.component.html",
  styleUrls: ["./grade-list.component.css"]
})
export class GradeListComponent implements OnInit {
  GradeList: any;
  ExamId: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private GradeService: GradeService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getGradeList();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "GRADE") {
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

  getGradeList() {
    this.GradeService.getGradeList().subscribe((data: any) => {
      this.GradeList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteGrade = params => {
    this.GradeService.deleteGrade(params.data._id).subscribe((data: any) => {
      this.getGradeList();
      this.toastr.success("Grade has been deteted successfully");
      this.router.navigate(["exam/grade/grade-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting grade", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["gradename", "gradepoint", "mark_from", "mark_upto", "note"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["gradename", "gradepoint", "mark_from", "mark_upto", "note"]
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
        headerName: "Grade Name",
        field: "gradename",
        sortable: true,
        filter: true
      },
      {
        headerName: "Grade Point",
        field: "gradepoint",
        sortable: true,
        filter: true
      },
      {
        headerName: "Mark From",
        field: "mark_from",
        sortable: true,
        filter: true
      },
      {
        headerName: "Mark Upto",
        field: "mark_upto",
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
            this.router.navigate(["exam/grade/edit-grade", params.data._id]);
          },
          action2: this.deleteGrade
        }
      }
    ];
  }
}
