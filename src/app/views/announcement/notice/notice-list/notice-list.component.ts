import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NoticeService } from "../notice.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-notice-list",
  templateUrl: "./notice-list.component.html",
  styleUrls: ["./notice-list.component.css"]
})
export class NoticeListComponent implements OnInit {
  NoticeList: any;
  deleteData: any;
  academicyearId: any;
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
    private noticeService: NoticeService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getNoticeList();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "NOTICE") {
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

  getNoticeList() {
    this.noticeService.getNoticeList().subscribe((data: any) => {
      this.NoticeList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  deleteNotice = params => {
    this.noticeService.deleteNotice(params.data._id).subscribe((data: any) => {
      this.getNoticeList();
      this.toastr.success("Notice has been deteted successfully");
      this.router.navigate(["announcement/notice/notice-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting notice", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["title", "date"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["title", "date"]
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
        headerName: "Title",
        field: "title",
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
              "/announcement/notice/edit-notice",
              params.data._id
            ]);
          },
          action2: this.deleteNotice,
          action3: params => {
            this.router.navigate([
              "/announcement/notice/notice-view",
              params.data._id
            ]);
          }
        }
      }
    ];
  }
}
