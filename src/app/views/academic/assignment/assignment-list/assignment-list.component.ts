import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { AssignmentService } from "../assignment.service";
import { ToastrService } from "ngx-toastr";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import * as moment from "moment";
import { AgGridAngular } from "ag-grid-angular";
import { PermissionService } from "../../../../views/administrator/permission/permission.service";
import { SharedService } from "../../../../shared.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DEFAULT_ECDH_CURVE } from "tls";

@Component({
  selector: "app-assignment-list",
  templateUrl: "./assignment-list.component.html",
  styleUrls: ["./assignment-list.component.css"]
})
export class AssignmentListComponent implements OnInit {
  ClassList: any;
  AssignmentList: any;
  TeacherList: any;
  deleteData: any;
  assignmentId: any;
  SectionList: any;
  SubjectList: any;
  enableAdd = true;
  enableEdit = true;
  enableDelete = true;
  enableView = true;
  enableAddAnswer = true;
  enableViewAnswer = true;
  enableDeleteAnswer = true;
  enableEditAnswer = true;
  permissionSet = false;
  PermissionList: any;
  permissionData: any;
  columnDefs: any;
  createDocumentForm: any;
  closeResult: string;
  fileData: any;
  userData: any;
  url: any;
  role: any;
  selectedAssignmentId: any;
  addAssigmentAnswerId:any;
  activeTab:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private academicService: AcademicService,
    private toastr: ToastrService,
    private assignmentService: AssignmentService,
    private permissionService: PermissionService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  @ViewChild("content") content: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    if(this.role == 3 || this.role == 4){
      this.getUserInfoByUserId();
    }
    // if(this.role == 4){
      
    //   this.getUserInfoByUserId();
    // }
   else {
    this.getAllClass();
    this.getAllSubject();
    this.getAllSection();
    this.getAssignmentList();
    
   }
    this.getAllPermission(); 
    let self = this;
    this.role = localStorage.getItem("role");

    this.sharedService.permissionData.subscribe(permissionData => {
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (self.permissionData[i].page == "ASSIGNMENT") {
          self.enableAdd = self.permissionData[i].add;
          self.enableEdit = self.permissionData[i].edit;
          self.enableDelete = self.permissionData[i].delete;
          self.enableView = self.permissionData[i].view;
          self.permissionSet = true;
          self.setColumnDefs();
        }
        if (self.permissionData[i].page == "ASSIGNMENT_ANSWER") {
          //debugger;
          self.enableAddAnswer = self.permissionData[i].add;
          self.enableEditAnswer = self.permissionData[i].edit;
          self.enableDeleteAnswer = self.permissionData[i].delete;
          self.enableViewAnswer = self.permissionData[i].view;
          self.permissionSet = true;
          self.setColumnDefs();
        }
      }
    });
    this.createDocumentForm = this.formBuilder.group({
      file: [""],
      file_name: ["", Validators.required]
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
    //debugger
    this.assignmentService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
    this.getAllClass(); 
    this.getAllSubject();
    this.getAllSection(); 
    this.getAssignmentList();
    
    });
  }
  
  getAssignmentList() {
    let data = {
    
    };
    if(this.role == 3){
      data["student"] = this.userData._id;
    }
    this.assignmentService.getAssignmentList(data).subscribe((data: any) => {
      this.AssignmentList = data; 
      this.agGrid.api.sizeColumnsToFit();
    });
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  sectionCellRenderer(params) {
    if (params.value == null) return "All";
    else return params.value;
  }

  switchTab(tabId) {
    this.activeTab = tabId;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

  addDocument(id) {
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.assignmentService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createDocumentForm.controls["file"].setValue(file.filename);

      this.assignmentService
        .addDocument(this.assignmentId, this.createDocumentForm.value)
        .subscribe(
          assignment => {
            this.toastr.success("Document has been added successfully ");

            // this.router.navigate(["/student/student-list"]);
          },
          error => {
            this.toastr.error("Error while adding Document", "", {
              timeOut: 3000
            });
          }
        );
    });
  }

  onBtnExport() {
    let params = {
      columnKeys: [
        "title",
        "description",
        "deadline",
        "section.section",
        "uploader"
      ]
    };
    this.agGrid.api.exportDataAsCsv(params);
  }

  onBtnExportExcel() {
    let params = {
      columnKeys: [
        "title",
        "description",
        "deadline",
        "section.section",
        "uploader"
      ]
    };
    this.agGrid.api.exportDataAsExcel(params);
  }

  deleteAssignment = params => {
    this.assignmentService
      .deleteAssignment(params.data._id)
      .subscribe((data: any) => {
        this.getAssignmentList();
        this.toastr.success("Syllabus has been deteted successfully");
        this.router.navigate(["academic/assignment/assignment-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting assignment", "", {
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

  getAllSubject() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSubject(data).subscribe((data: any) => {
      this.SubjectList = data;
    });
  }

  getAllSection() { let data = {
    
  };
  if (this.role == 4) {
    data["parents"] = this.userData._id;
  } 
    this.academicService.getAllSection(data).subscribe((data: any) => {
      this.SectionList = data;
    });
  }

  downloadDocument = params => {
    this.assignmentService.downloadDocument(params.data.file);
  };

  get file_name() {
    return this.createDocumentForm.get("file_name");
  }

 

  uploadDocument = params => {
    //debugger;
    this.selectedAssignmentId = params.data._id;
    this.modalService.open(this.content).result.then(result => {
      // this.closeResult = `Closed with: ${result}`;
    });
  };

  addAssigmentAnswer() {
  
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.assignmentService
      .uploadAssignmentAnswerFile(uploadFile)
      .subscribe((file: any) => {
        this.assignmentService
          .addAssignmentAnswer({
            assignment: this.selectedAssignmentId,
            student: this.userData._id,
            file: file.filename
          })
          .subscribe(
            assignment => {
              this.toastr.success("Document has been added successfully ");
               this.router.navigate([
        "academic/assignment/assignment-view/",
        this.selectedAssignmentId
      ]);
            },
            error => {
              this.toastr.error("Error while adding Document", "", {
                timeOut: 3000
              });
            }
          );
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
        headerName: "DeadLine",
        field: "deadline",
        cellRenderer: this.dateCellRenderer,
        sortable: true,
        filter: true
      },
      {
        headerName: "Section",
        field: "section.section",
        cellRenderer: this.sectionCellRenderer,
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
          icon3: "fa fa-check-square-o ",
          icon4: "fa fa-download fa-lg ",
          icon5: "fa fa-upload fa-lg",
          enableEdit: this.enableEdit,
          enableDelete: this.enableDelete,
          enableView: this.enableView,
          enableAddAnswer: this.enableAddAnswer,
          enableEditAnswer: this.enableEditAnswer,
          enableDeleteAnswer: this.enableDeleteAnswer,
          enableViewAnswer: this.enableViewAnswer,
          action1: params => {
            this.router.navigate([
              "academic/assignment/edit-assignment",
              params.data._id
            ]);
          },
          action2: this.deleteAssignment,
          action3: params => {
            this.router.navigate([
              "academic/assignment/assignment-view/",
              params.data._id
            ]);
          },
          action4: this.downloadDocument,
          action5: this.uploadDocument
        }
      }
    ];
  }
}
