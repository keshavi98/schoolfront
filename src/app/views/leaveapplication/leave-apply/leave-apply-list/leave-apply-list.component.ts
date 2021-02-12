import { Component, OnInit, ViewChild, ɵConsole } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveapplyService } from "../leaveapply.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { environment } from "../../../../../environments/environment";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-leave-apply-list",
  templateUrl: "./leave-apply-list.component.html",
  styleUrls: ["./leave-apply-list.component.css"]
})
export class LeaveApplyListComponent implements OnInit {
  LeavecategoryList: any;
  LeaveapplyList: any;
  TeacherList: any;
  AdminList: any;
  userRoles: any;
  ExamId: any;
  Difference_In_Time: any;
  to_dates: any;
  from_dates: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private LeaveapplyService: LeaveapplyService,
    private LeaveapplicationService: LeaveapplicationService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;

  ngOnInit() {
    this.getLeaveapplyList();
    this.getAllLeavecategoryList();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "LEAVE_APPLY") {
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

  getLeaveapplyList() {
    this.LeaveapplyService.getLeaveapplyList().subscribe((data: any) => {
      this.LeaveapplyList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }

  // ApplicationToCellRenderer(params) {
  //
  //   return params.value.name;
  // }

  onDutyLeaveCellRenderer(params) {
    if (params.value == true) return "Yes";
    else return "No";
  }

  DateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }
  toDateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  fromDateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  DaysCellRenderer(params) {
    let to_dates = moment(params.data.to_date);
    let from_dates = moment(params.data.from_date);
    let days = to_dates.diff(from_dates, "days");
    return days;
  }

  deleteLeaveapply = params => {
    this.LeaveapplyService.deleteLeaveapply(params.data._id).subscribe(
      (data: any) => {
        this.getLeaveapplyList();
        this.toastr.success("leave Assign has been deteted successfully");
        this.router.navigate(["leaveapplication/leaveapply/leave-apply-list"]);
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

  getAllTeacher() {
    this.LeaveapplicationService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  getAllAdmin() {
    this.LeaveapplicationService.getAllAdmin().subscribe((data: any) => {
      this.AdminList = data;
    });
  }

  getuserRoles() {
    this.LeaveapplyService.getuserRoles().subscribe((data: any) => {
      this.userRoles = data.userRoles;
    });
  }

  onBtnExport() {
    let params = {
      columnKeys: [
        "to_user_info.name",
        "category.category",
        "created_at",
        "to_date",
        "from_date",
        "days",
        "status"
      ]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: [
        "to_user_info.name",
        "category.category",
        "created_at",
        "to_date",
        "from_date",
        "day",
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
        headerName: "Application To",
        field: "to_user_info.name",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Category",
        field: "category.category",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Date",
        field: "created_at",
        sortable: true,
        filter: true,
        cellRenderer: this.DateCellRenderer,
        width: 90
      },
      {
        headerName: "To Date",
        field: "to_date",
        sortable: true,
        filter: true,
        cellRenderer: this.toDateCellRenderer,
        width: 90
      },
      {
        headerName: "From Date",
        field: "from_date",
        sortable: true,
        filter: true,
        cellRenderer: this.fromDateCellRenderer,
        width: 90
      },
      {
        headerName: "Attachment",
        field: "file_name",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Days",
        field: "day",
        sortable: true,
        filter: true,
        cellRenderer: this.DaysCellRenderer,
        width: 90
      },
      {
        headerName: "On Duty Leave",
        field: "on_duty_leave",
        sortable: true,
        filter: true,
        cellRenderer: this.onDutyLeaveCellRenderer,
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
          icon3: "fa fa-check-square-o ",
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate([
              "/leaveapplication/leaveapply/edit-leave-apply/",
              params.data._id
            ]);
          },
          action2: this.deleteLeaveapply,
          action3: params => {
            this.router.navigate([
              "/leaveapplication/leaveapply/leave-apply-view/",
              params.data._id
            ]);
          }
        }
      }
    ];
  }
}
