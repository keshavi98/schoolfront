import { Component, ViewChild, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { StudentService } from "./../student.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";
import { PermissionService } from "../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../shared.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  gridOptions: any;
  columnDefs: any;
  StudentList: any;
  deleteData: any;
  studentId: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  ParentsId:any;
  userData: any;
  role: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private studentService: StudentService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    
    if (this.role == 3) {
     
      this.getUserInfoByUserId();
     }
     if(this.role == 4){
      
       this.getUserInfoByUserId();
     }
    else {
    
      this.getStudentList();
    }
   this.getAllPermission();   
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "STUDENT") {
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

  photoCellRendere(params) {
    return `<img _ngcontent-gvm-c2="" class="photo" src="${environment.apiUrl}${params.value}" style="width: 40px;
    height: 40px;
    border-radius: 50%;">`;
  }

  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }

  getUserInfoByUserId() {
    
    this.studentService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      if(this.role == 3)
      {
        this.router.navigate(["/student/student-view/",this.userData._id]);
      }
      else{
        this.getStudentList();
      }
     
      
    });
  }

  getStudentList() {
    
    let data = {
    
    };
    // if(this.role == 3){
    //   data["student"] = this.userData._id;
    // }
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
      columnKeys: ["student_name", "roll_no", "email", "status"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = { columnKeys: ["student_name", "roll_no", "email", "status"] };
    this.agGrid.api.exportDataAsExcel(params);
  }

  onBtnExportCopy() {
    // let params = {};
    this.agGrid.api.copySelectedRowsToClipboard(true);
  }

  getAllPermission() {
    this.permissionService
      .getPermission({ role: localStorage.getItem("role") })
      .subscribe((data: any) => {
        this.PermissionList = data;
        this.sharedService.setPermissionData(this.PermissionList);
      });
  }

  deleteStudent = params => {
    this.studentService
      .deleteStudent(params.data._id)
      .subscribe((data: any) => {
        this.getStudentList(

          
        );
        this.toastr.success("Student has been deteted successfully");
        this.router.navigate(["/student/student-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting Student", "", {
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
        field: "student_name",
        sortable: true,
        filter: true
      },
      { headerName: "Roll No", field: "roll_no", sortable: true, filter: true },
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
            this.router.navigate(["/student/edit-student/", params.data._id]);
          },
          action2: this.deleteStudent,
          action3: params => {
            this.router.navigate(["/student/student-view/", params.data._id]);
          }
        }
      }
    ];
  }
}
