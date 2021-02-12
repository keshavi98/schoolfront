import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicYearService } from "../academic-year.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-academic-year-list",
  templateUrl: "./academic-year-list.component.html",
  styleUrls: ["./academic-year-list.component.css"]
})
export class AcademicYearListComponent implements OnInit {
  AcademicyearList: any;
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
    private academicyearService: AcademicYearService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;

  ngOnInit() {
    this.getAcademicYearList();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "ACADEMIC_YEAR") {
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

  getAcademicYearList() {
    this.academicyearService.getAcademicYearList().subscribe((data: any) => {
      this.AcademicyearList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  endDateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }
  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }

  deleteAcademicYear = params => {
    this.academicyearService
      .deleteAcademicYear(params.data._id)
      .subscribe((data: any) => {
        this.getAcademicYearList();
        this.toastr.success("Year has been deteted successfully");
        this.router.navigate([
          "administrator/academic-year/academic-year-list"
        ]);
      }),
      error => {
        this.toastr.error("Error while deleting year", "", {
          timeOut: 3000
        });
      };
  };
  onBtnExport() {
    let params = {
      columnKeys: ["year", "year_title", "start_date", "end_date", "status"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["year", "year_title", "start_date", "end_date", "status"]
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
        field: "year",
        sortable: true,
        filter: true
      },
      { headerName: "Title", field: "year_title" },
      {
        headerName: "Start Date",
        field: "start_date",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true
      },
      {
        headerName: "End Date",
        field: "end_date ",
        cellRenderer: this.endDateCellRenderer,
        sortable: true,
        filter: true
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: this.statusCellRenderer,
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
              "/administrator/academic-year/edit-academic-year",
              params.data._id
            ]);
          },
          action2: this.deleteAcademicYear
        }
      }
    ];
  }
}
