import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "../event.service";
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
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"]
})
export class EventListComponent implements OnInit {
  EventList: any;
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
    private eventService: EventService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getEventList();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "EVENT") {
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

  getEventList() {
    this.eventService.getEventList().subscribe((data: any) => {
      this.EventList = data;
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

  deleteEvent = params => {
    this.eventService.deleteEvent(params.data._id).subscribe((data: any) => {
      this.getEventList();
      this.toastr.success("Event has been deteted successfully");
      this.router.navigate(["announcement/event/event-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting event", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: [
        "title",
        "start_date",
        "end_date",
        "start_time",
        "end_time",
        "details"
      ]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: [
        "title",
        "start_date",
        "end_date",
        "start_time",
        "end_time",
        "details"
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
        headerName: "Photo",
        field: "photo",
        cellRenderer: this.photoCellRendere,
        width: 90
      },
      {
        headerName: "Title",
        field: "title",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Start Date",
        field: "start_date",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "End Date",
        field: "end_date",
        cellRenderer: this.enddateCellRenderer,
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Start Time",
        field: "start_time",
        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "End Time",
        field: "end_time",

        sortable: true,
        filter: true,
        width: 90
      },
      {
        headerName: "Details",
        field: "details",
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
              "/announcement/event/edit-event",
              params.data._id
            ]);
          },
          action2: this.deleteEvent,
          action3: params => {
            this.router.navigate([
              "/announcement/event/event-view",
              params.data._id
            ]);
          }
        }
      }
    ];
  }
}
