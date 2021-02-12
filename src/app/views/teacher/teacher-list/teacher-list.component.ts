import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "./../teacher.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { environment } from "../../../../environments/environment";
import { ActionCellRendererComponent } from "../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../shared.service";

declare var $: any;
@Component({
  selector: "app-teacher-list",
  templateUrl: "./teacher-list.component.html",
  styleUrls: ["./teacher-list.component.css"]
})
export class TeacherListComponent implements OnInit {
  TeacherList: any;
  deleteData: any;
  teacherId: any;
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
    private teacherService: TeacherService,
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
    this.getTeacherList();
    this.getAllPermission();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        //debugger;
        if (self.permissionData[i].page == "TEACHER") {
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
    this.teacherService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.router.navigate(["/teacher/teacher-view/", this.userData._id]);
    });
  }

  getTeacherList() {
    this.teacherService.getTeacherList().subscribe((data: any) => {
      this.TeacherList = data;
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

  deleteTeacher = params => {
    this.teacherService
      .deleteTeacher(params.data._id)
      .subscribe((data: any) => {
        this.getTeacherList();
        this.toastr.success("Teacher has been deteted successfully");
        this.router.navigate(["/teacher/teacher-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting teacher", "", {
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
          enableAdd:this.enableAdd,
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate(["/teacher/edit-teacher", params.data._id]);
          },
          action2: this.deleteTeacher,
          action3: params => {
            this.router.navigate(["/teacher/teacher-view/", params.data._id]);
          }
        }
      }
    ];
  }
}
