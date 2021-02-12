import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RoleService } from "../role.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.css"]
})
export class RoleListComponent implements OnInit {
  RoleList: any;
  deleteData: any;
  RoleId: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    this.roleService.getRoleList().subscribe((data: any) => {
      this.RoleList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteRole = params => {
    this.roleService.deleteRole(params.data._id).subscribe((data: any) => {
      this.getRoleList();
      this.toastr.success("Role has been deteted successfully");
      this.router.navigate(["administrator/role/role-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting Role", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["role"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["role"]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  columnDefs = [
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
      filter: true
    },
    {
      headerName: "Action",
      field: "",
      cellRendererFramework: ActionCellRendererComponent,
      cellRendererParams: {
        icon1: "cui-pencil",
        icon2: "cui-trash",
        action1: params => {
          this.router.navigate([
            "/administrator/role/edit-role",
            params.data._id
          ]);
        },
        action2: this.deleteRole
      }
    }
  ];
}
