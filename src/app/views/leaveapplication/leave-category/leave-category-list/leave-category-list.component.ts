import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeavecategoryService } from "../leavecategory.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-leave-category-list",
  templateUrl: "./leave-category-list.component.html",
  styleUrls: ["./leave-category-list.component.css"]
})
export class LeaveCategoryListComponent implements OnInit {
  LeavecategoryList: any;
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
    private LeavecategoryService: LeavecategoryService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getLeavecategoryList();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "LEAVE_CATEGORY") {
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
  getLeavecategoryList() {
    this.LeavecategoryService.getLeavecategoryList().subscribe((data: any) => {
      this.LeavecategoryList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteLeavecategory = params => {
    this.LeavecategoryService.deleteLeavecategory(params.data._id).subscribe(
      (data: any) => {
        this.getLeavecategoryList();
        this.toastr.success("Leave category has been deteted successfully");
        this.router.navigate([
          "leaveapplication/leavecategory/leave-category-list"
        ]);
      }
    ),
      error => {
        this.toastr.error("Error while deleting leave category", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["category"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["category"]
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
        headerName: "Category",
        field: "category",
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
              "/leaveapplication/leavecategory/edit-leave-category/",
              params.data._id
            ]);
          },
          action2: this.deleteLeavecategory
        }
      }
    ];
  }
}
