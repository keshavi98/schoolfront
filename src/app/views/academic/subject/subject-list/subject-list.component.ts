import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { SubjectService } from "../subject.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-subject-list",
  templateUrl: "./subject-list.component.html",
  styleUrls: ["./subject-list.component.css"]
})
export class SubjectListComponent implements OnInit {
  ClassList: any;
  SubjectList: any;
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
    private subjectService: SubjectService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    if(this.role == 3 || this.role == 4 ){
      
      this.getUserInfoByUserId();
    }
    // if(this.role == 4){
      
    //   this.getUserInfoByUserId();
    // }
   else {
    this.getAllClass();
    this.getSubjectList();
   
   }
    this.getAllTeacher();
   this.getAllPermission();
    let self = this;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "SUBJECT") {
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
    this.subjectService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
        this.getAllClass();
        this.getSubjectList();
    });
  }

  getSubjectList() {
   
    let data = {
    
    };
    if(this.role == 3){

      data["student"] = this.userData._id;
      console.log("aaaaa");
    }
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.subjectService.getSubjectList(data).subscribe((data: any) => {
      this.SubjectList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteSubject = params => {
    this.subjectService
      .deleteSubject(params.data._id)
      .subscribe((data: any) => {
        this.getSubjectList();
        this.toastr.success("Section has been deteted successfully");
        this.router.navigate(["academic/subject/subject-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting subject", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: [
        "subject_name",
        "subject_author",
        "subject_code",
        "teacher.name",
        "pass_mark",
        "final_mark",
        "type"
      ]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: [
        "subject_name",
        "subject_author",
        "subject_code",
        "teacher.name",
        "pass_mark",
        "final_mark",
        "type"
      ]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  getAllClass() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllClass(data).subscribe((data: any) => {
      this.ClassList = data;
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
      {
        headerName: "Subject Name",
        field: "subject_name",
        sortable: true,
        filter: true
      },
      { headerName: "Subject Author", field: "subject_author" },
      {
        headerName: "Subject Code",
        field: "subject_code",
        sortable: true,
        filter: true
      },
      {
        headerName: "Teacher Name",
        field: "teacher.name",
        sortable: true,
        filter: true
      },
      {
        headerName: "Pass Mark",
        field: "pass_mark",
        sortable: true,
        filter: true
      },
      {
        headerName: "Final Mark",
        field: "final_mark",
        sortable: true,
        filter: true
      },

      { headerName: "Type", field: "type", sortable: true, filter: true },

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
              "academic/subject/edit-subject",
              params.data._id
            ]);
          },
          action2: this.deleteSubject
        }
      }
    ];
  }
}
