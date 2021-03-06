import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SystemadminService } from "../systemadmin.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { environment } from "../../../../../environments/environment";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-system-admin-list",
  templateUrl: "./system-admin-list.component.html",
  styleUrls: ["./system-admin-list.component.css"]
})
export class SystemAdminListComponent implements OnInit {
  SystemAdminList: any;
  deleteData: any;
  SystemAdminIdId: any;
  show: any = true;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  gridOptions: any;
  columnDefs: any;
  userData: any;
  role: any;
  apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private systemadminService: SystemadminService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;

  ngOnInit() {
    this.role = localStorage.getItem("role");
    // if (this.role == 3) {
    //   this.getUserInfoByUserId();
    // } else {

    // }
    this.getAdminList();
    this.getAllPermission();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        //debugger;
        if (self.permissionData[i].page == "ADMIN") {
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

  photoCellRendere(params) {
    return `<img _ngcontent-gvm-c2="" class="photo" src="${environment.apiUrl}${params.value}" style="width: 40px;
    height: 40px;
    border-radius: 50%";>`;
  }

  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }

  getAdminList() {
    this.systemadminService.getAdminList().subscribe((data: any) => {
      this.SystemAdminList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  onBtnExport() {
    let params = {
      columnKeys: ["name", "email", "status"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = { columnKeys: ["name", "email", "status"] };
    this.agGrid.api.exportDataAsExcel(params);
  }

  deleteAdmin = params => {
    this.systemadminService
      .deleteAdmin(params.data._id)
      .subscribe((data: any) => {
        this.getAdminList();
        this.toastr.success("System Admin has been deteted successfully");
        this.router.navigate(["/administrator/system-admin/system-admin-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting system admin", "", {
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
        headerName: "Photo",
        field: "photo",
        cellRenderer: this.photoCellRendere
      },
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Email", field: "email", sortable: true, filter: true },

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
          icon3: "fa fa-check-square-o ",
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate([
              "/administrator/system-admin/edit-system-admin",
              params.data._id
            ]);
          },
          action2: this.deleteAdmin,
          action3: params => {
            this.router.navigate([
              "/administrator/system-admin/system-admin-view/",
              params.data._id
            ]);
          }
        }
      }
    ];
  }
}
