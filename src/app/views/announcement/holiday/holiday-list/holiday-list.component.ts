import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HolidayService } from "../holiday.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { environment } from "../../../../../environments/environment";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-holiday-list",
  templateUrl: "./holiday-list.component.html",
  styleUrls: ["./holiday-list.component.css"]
})
export class HolidayListComponent implements OnInit {
  HolidayList: any;
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
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private holidayService: HolidayService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getHolidayList();
    let self = this;
    debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "HOLIDAY") {
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

  getHolidayList() {
    this.holidayService.getHolidayList().subscribe((data: any) => {
      this.HolidayList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  photoCellRendere(params) {
    return `<img _ngcontent-gvm-c2="" class="photo" src="${environment.apiUrl}${params.value}" style="width: 40px;
    height: 40px;
    border-radius: 50%;">`;
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  enddateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  deleteHoliday = params => {
    this.holidayService
      .deleteHoliday(params.data._id)
      .subscribe((data: any) => {
        this.getHolidayList();
        this.toastr.success("Holiday has been deteted successfully");
        this.router.navigate(["announcement/holiday/holiday-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting holiday", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["title", "from_date", "to_date", "details"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["title", "from_date", "to_date", "details"]
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
        headerName: "Photo",
        field: "photo",
        cellRenderer: this.photoCellRendere
      },
      {
        headerName: "Title",
        field: "title",
        sortable: true,
        filter: true
      },
      {
        headerName: "From Date",
        field: "from_date",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true
      },
      {
        headerName: "To Date",
        field: "to_date",
        cellRenderer: this.enddateCellRenderer,
        sortable: true,
        filter: true
      },

      {
        headerName: "Details",
        field: "details",
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
              "/announcement/holiday/edit-holiday",
              params.data._id
            ]);
          },
          action2: this.deleteHoliday,
          action3: params => {
            this.router.navigate([
              "/announcement/holiday/holiday-view",
              params.data._id
            ]);
          }
        }
      }
    ];
  }
}
