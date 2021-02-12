import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveassignService } from "../leaveassign.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-leave-assign-list",
  templateUrl: "./leave-assign-list.component.html",
  styleUrls: ["./leave-assign-list.component.css"]
})
export class LeaveAssignListComponent implements OnInit {
  LeavecategoryList: any;
  LeaveassignList: any;
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
    private LeaveassignService: LeaveassignService,
    private LeaveapplicationService: LeaveapplicationService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getLeaveassignList();
    this.getAllLeavecategoryList();
    let self = this;
    debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "LEAVE_ASSIGN") {
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

  getLeaveassignList() {
    this.LeaveassignService.getLeaveassignList().subscribe((data: any) => {
      this.LeaveassignList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteLeaveassign = params => {
    this.LeaveassignService.deleteLeaveassign(params.data._id).subscribe(
      (data: any) => {
        this.getLeaveassignList();
        this.toastr.success("leave Assign has been deteted successfully");
        this.router.navigate([
          "leaveapplication/leaveassign/leave-assign-list"
        ]);
      }
    ),
      error => {
        this.toastr.error("Error while deleting leave assign", "", {
          timeOut: 3000
        });
      };
  };

  getAllLeavecategoryList() {
    this.LeaveapplicationService.getAllLeavecategoryList().subscribe(
      (data: any) => {
        this.LeavecategoryList = data;
      }
    );
  }

  roleCellRenderer(params) {
    if (params.value == 1) return "Admin";
    else return "Teacher";
  }

  onBtnExport() {
    let params = {
      columnKeys: ["role", "category.category", "no_of_day"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["role", "category.category", "no_of_day"]
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
        headerName: "Role",
        field: "role",
        sortable: true,
        filter: true,
        cellRenderer: this.roleCellRenderer
      },
      {
        headerName: "Category",
        field: "category.category",
        sortable: true,
        filter: true
      },
      {
        headerName: "No of Day",
        field: "no_of_day",
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
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate([
              "/leaveapplication/leaveassign/edit-leave-assign/",
              params.data._id
            ]);
          },
          action2: this.deleteLeaveassign
        }
      }
    ];
  }
}
