import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { ClassService } from "../class.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";
declare var $: any;

@Component({
  selector: "app-class-list",
  templateUrl: "./class-list.component.html",
  styleUrls: ["./class-list.component.css"]
})
export class ClassListComponent implements OnInit {
  ClassList: any;
  TeacherList: any;
  deleteData: any;
  classId: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private classService: ClassService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    
    if(this.role == 4){
      
      this.getUserInfoByUserId();
    }
   else {
   
    this.getClassList();
   }
    
    this.getAllTeacher();
    this.getAllPermission();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "CLASS") {
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

  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }
  
  getUserInfoByUserId() {
    
    this.classService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getClassList();
    });
  }
  
  getClassList() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.classService.getClassList(data).subscribe((data: any) => {
      this.ClassList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }
  onBtnExport() {
    let params = {
      columnKeys: ["class", "class_numeric", "teacher.name", "note"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["class", "class_numeric", "teacher.name", "note"]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  deleteClass = params => {
    this.classService.deleteClass(params.data._id).subscribe((data: any) => {
      this.getClassList();
      this.toastr.success("Class has been deteted successfully");
      this.router.navigate(["academic/class/class-list"]);
    }),
      error => {
        this.toastr.error("Error while deleting class", "", {
          timeOut: 3000
        });
      };
  };

  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
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
      { headerName: "Class", field: "class", sortable: true, filter: true },
      {
        headerName: "Class Numeric",
        field: "class_numeric",
        sortable: true,
        filter: true
      },
      {
        headerName: "Teacher",
        field: "teacher.name",
        sortable: true,
        filter: true
      },
      { headerName: "Note", field: "note", sortable: true, filter: true },

      {
        headerName: "Action",
        field: "",
        cellRendererFramework: ActionCellRendererComponent,
        cellRendererParams: {
          icon1: "cui-pencil",
          icon2: "cui-trash",
          enableAdd:this.enableAdd,
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          action1: params => {
            this.router.navigate([
              "academic/class/edit-class",
              params.data._id
            ]);
          },
          action2: this.deleteClass
        }
      }
    ];
  }
}
