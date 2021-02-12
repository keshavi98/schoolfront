import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableModule } from "ng-angular8-datatable";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentService } from "../../../student/student.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { environment } from "../../../../../environments/environment";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";
import { StudentattendanceService } from '../studentattendance.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
declare var $: any;

@Component({
  selector: "app-student-attendance-list",
  templateUrl: "./student-attendance-list.component.html",
  styleUrls: ["./student-attendance-list.component.css"]
})
export class StudentAttendanceListComponent implements OnInit {
  StudentList: any;
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
    private studentService: StudentService,
    private studentattendanceService:StudentattendanceService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService,
    private modalService: NgbModal,
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
    this.getStudentList();
    }
    this.getAllPermission();
    //this.getStudentList();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "STUDENT_ATTENDANCE") {
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
    this.studentattendanceService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      if(this.role==3){
        this.getStudentList();
      this.router.navigate([
        "/attendance/studentattendance/student-attendance-view",
        this.userData._id
      ]);
      }
      else{
        this.getStudentList();
      }
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

  getStudentList() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.studentService.getStudentList(data).subscribe((data: any) => {
      this.StudentList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  onBtnExport() {
    let params = {
      columnKeys: ["student_name", "email"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["student_name", "email"]
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
      { headerName: "Name", field: "student_name", sortable: true, filter: true },
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
          action1: params => {
            this.router.navigate(["/student/edit-student/", params.data._id]);
          },
          // action2: this.deleteStudent,
          action3: params => {
            this.router.navigate([
              "/attendance/studentattendance/student-attendance-view",
              params.data._id
            ]);
          }
        }
      }
    ];
  }
  
}
