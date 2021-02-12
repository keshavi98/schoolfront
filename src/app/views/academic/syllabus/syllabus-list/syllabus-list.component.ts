import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { SyllabusService } from "../syllabus.service";
import { ToastrService } from "ngx-toastr";
import { error } from "protractor";
import { DataTableModule } from "ng-angular8-datatable";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";

@Component({
  selector: "app-syllabus-list",
  templateUrl: "./syllabus-list.component.html",
  styleUrls: ["./syllabus-list.component.css"]
})
export class SyllabusListComponent implements OnInit {
  ClassList: any;
  SyllabusList: any;
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
    private syllabusService: SyllabusService,
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
    this.getAllClass();
    this.getSyllabusList();
   }
   
    
    let self = this;
    //debugger;
    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "SYLLABUS") {
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

  getSyllabusList() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.syllabusService.getSyllabusList(data).subscribe((data: any) => {
      this.SyllabusList = data;
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  getUserInfoByUserId() {
    
    this.syllabusService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      this.getAllClass();
      this.getSyllabusList();
    });
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }
  onBtnExport() {
    let params = {
      columnKeys: ["title", "description", "created_at", "uploader"]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: ["title", "description", "created_at", "uploader"]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  deleteSyllabus = params => {
    this.syllabusService
      .deleteSyllabus(params.data._id)
      .subscribe((data: any) => {
        this.getSyllabusList();
        this.toastr.success("Syllabus has been deteted successfully");
        this.router.navigate(["academic/syllabus/syllabus-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting syllabus", "", {
          timeOut: 3000
        });
      };
  };

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

  downloadDocument = params => {
    this.syllabusService.downloadDocument(params.data.file);
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
        headerName: "Title",
        field: "title",
        sortable: true,
        filter: true
      },
      {
        headerName: "Description",
        field: "description",
        sortable: true,
        filter: true
      },
      {
        headerName: "	Date ",
        field: "created_at",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true
      },
      {
        headerName: "	Uploader",
        field: "uploader",
        sortable: true,
        filter: true
      },
      { headerName: "File", field: "file", sortable: true, filter: true },

      {
        headerName: "Action",
        field: "",
        cellRendererFramework: ActionCellRendererComponent,
        cellRendererParams: {
          icon1: "cui-pencil",
          icon2: "cui-trash",
          icon4: "fa fa-download fa-lg ",
          enableAdd:this.enableAdd,
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,

          action1: params => {
            this.router.navigate([
              "academic/syllabus/edit-syllabus",
              params.data._id
            ]);
          },
          action2: this.deleteSyllabus,
          action4: this.downloadDocument
        }
      }
    ];
  }
}
