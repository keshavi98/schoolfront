import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableModule } from "ng-angular8-datatable";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "../../../teacher/teacher.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { environment } from "../../../../../environments/environment";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";
import { TeacherAttendanceService } from '../teacher-attendance.service';


declare var $: any;
@Component({
  selector: "app-teacher-attendance-list",
  templateUrl: "./teacher-attendance-list.component.html",
  styleUrls: ["./teacher-attendance-list.component.css"]
})
export class TeacherAttendanceListComponent implements OnInit {
  TeacherList: any;
  deleteData: any;
  teacherId: any;
  enableAdd=true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  PermissionList: any;
  permissionData: any;
  permissionSet = false;
  columnDefs: any;
  role: any;
  userData: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private teacherAttendanceService:TeacherAttendanceService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService,
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    if (this.role == 3) {
      this.getUserInfoByUserId();
    }
    if(this.role == 4){
      this.getUserInfoByUserId();
    } else {
      this.getTeacherList();
    }
    this.getAllPermission();
    //this.getStudentList();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "TEACHER_ATTENDANCE") {
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

  
  getUserInfoByUserId() {
    this.teacherAttendanceService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getTeacherList();
     
    });
  }

  getTeacherList() {
    this.teacherService.getTeacherList().subscribe((data: any) => {
      this.TeacherList = data;
      this.agGrid.api.sizeColumnsToFit();
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

  onBtnExport() {
    let params = {
      columnKeys: ["name", "email"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["name", "email"]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }
  setColumnDefs(){
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
          // action1: params => {
          //   this.router.navigate(["/teacher/edit-teacher", params.data._id]);
          // },
          // action2: this.deleteTeacher,
          action3: params => {
            this.router.navigate([
              "/attendance/teacherattendance/teacher-attendance-view/",
  
              params.data._id
            ]);
          }
        }
      }
    ];
  }
 
}
