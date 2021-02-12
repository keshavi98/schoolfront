import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParentsService } from "./../parents.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../environments/environment";
import { ActionCellRendererComponent } from "../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../shared.service";
declare var $: any;
@Component({
  selector: "app-parents-list",
  templateUrl: "./parents-list.component.html",
  styleUrls: ["./parents-list.component.css"]
})
export class ParentsListComponent implements OnInit {
  ParentsList: any;
  deleteData: any;
  parentsId: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;
  role: any;
  userData: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private parentsService: ParentsService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    if (this.role == 4) {
      this.getUserInfoByUserId();
    } else {
      this.getParentsList();
    }
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "PARENT") {
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

  getUserInfoByUserId() {
    this.parentsService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.router.navigate(["/parents/parents-view/", this.userData._id]);
    });
  }
  getParentsList() {
    this.parentsService.getParentsList().subscribe((data: any) => {
      this.ParentsList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  onBtnExport() {
    let params = {
      columnKeys: ["guardian_name", "email", "phone", "status"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = { columnKeys: ["guardian_name", "email", "phone", "status"] };
    this.agGrid.api.exportDataAsExcel(params);
  }

  deleteParents = params => {
    this.parentsService
      .deleteParents(params.data._id)
      .subscribe((data: any) => {
        this.getParentsList();
        this.toastr.success("Parent has been deteted successfully");
        this.router.navigate(["/parents/parents-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting parent", "", {
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
      {
        headerName: "Name",
        field: "guardian_name",
        sortable: true,
        filter: true
      },
      { headerName: "Email", field: "email", sortable: true, filter: true },
      { headerName: "Phone", field: "phone", sortable: true, filter: true },
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
            this.router.navigate(["/parents/edit-parents/", params.data._id]);
          },
          action2: this.deleteParents,
          action3: params => {
            this.router.navigate(["/parents/parents-view/", params.data._id]);
          }
        }
      }
    ];
  }
}
