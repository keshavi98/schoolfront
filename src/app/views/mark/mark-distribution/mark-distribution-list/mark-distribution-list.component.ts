import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MarkdistributionService } from "../markdistribution.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-mark-distribution-list",
  templateUrl: "./mark-distribution-list.component.html",
  styleUrls: ["./mark-distribution-list.component.css"]
})
export class MarkDistributionListComponent implements OnInit {
  MarkDistributionList: any;
  deleteData: any;
  RoleId: any;
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
    private markdistributionService: MarkdistributionService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getMarkDistributionList();
    let self = this;
    //debugger;
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

  getMarkDistributionList() {
    this.markdistributionService
      .getMarkDistributionList()
      .subscribe((data: any) => {
        this.MarkDistributionList = data;
        this.agGrid.api.sizeColumnsToFit();
      });
  }

  deleteMarkDistribution = params => {
    this.markdistributionService
      .deleteMarkDistribution(params.data._id)
      .subscribe((data: any) => {
        this.getMarkDistributionList();
        this.toastr.success(
          "Mark DistributionList has been deteted successfully"
        );
        this.router.navigate(["mark/mark-distribution/mark-distribution-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting Role", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["mark_distribution_type", "mark_value"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["mark_distribution_type", "mark_value"]
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
        headerName: "Mark Distribution Type",
        field: "mark_distribution_type",
        sortable: true,
        filter: true
      },
      {
        headerName: "Mark Value",
        field: "mark_value",
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
              "/mark/mark-distribution/edit-mark-distribution",
              params.data._id
            ]);
          },
          action2: this.deleteMarkDistribution
        }
      }
    ];
  }
}
