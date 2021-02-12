import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { SectionService } from "../section.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-section-list",
  templateUrl: "./section-list.component.html",
  styleUrls: ["./section-list.component.css"]
})
export class SectionListComponent implements OnInit {
  ClassList: any;
  SectionList: any;
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
    private sectionservice: SectionService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role=localStorage.getItem("role");
    if(this.role == 4){
      
      this.getUserInfoByUserId();
    }
   else {
    this.getSectionList();
    this.getAllClass();
   }
    
    this.getAllTeacher();
    this.getAllPermission();
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "SECTION") {
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
    
    this.sectionservice.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getSectionList();
      this.getAllClass();
    });
  }
  
  getSectionList() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.sectionservice.getSectionList(data).subscribe((data: any) => {
      this.SectionList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }
  statusCellRenderer(params) {
    if (params.value == 1) return "Active";
    else return "In Active";
  }

  deleteSection = params => {
    this.sectionservice
      .deleteSection(params.data._id)
      .subscribe((data: any) => {
        this.getSectionList();
        this.toastr.success("Section has been deteted successfully");
        this.router.navigate(["academic/section/section-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting section", "", {
          timeOut: 3000
        });
      };
  };

  onBtnExport() {
    let params = {
      columnKeys: ["section", "category", "capacity", "teacher.name", "note"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["section", "category", "capacity", "teacher.name", "note"]
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
      { headerName: "Section", field: "section", sortable: true, filter: true },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true
      },
      {
        headerName: "Capacity",
        field: "capacity",
        sortable: true,
        filter: true
      },
      {
        headerName: "Teacher Name",
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
              "academic/section/edit-section",
              params.data._id
            ]);
          },
          action2: this.deleteSection
        }
      }
    ];
  }
}
