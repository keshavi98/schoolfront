import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgModel } from "@angular/forms";
import { AssignmentService } from "../assignment.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { StudentService } from "../../../student/student.service";
import { environment } from "../../../../../environments/environment";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";
import { AnyARecord } from "dns";

@Component({
  selector: "app-assignment-view",
  templateUrl: "./assignment-view.component.html",
  styleUrls: ["./assignment-view.component.css"]
})
export class AssignmentViewComponent implements OnInit {
  constructor(
    private router: Router,
    private studentService: StudentService,
    private assignmentService: AssignmentService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  StudentList: any;
  StudentId: any;
  AssigmentId: any;
  studentview: any;
  AssigmentAnsview: any;
  marksDataList: any;
  activeTab: 1;
  MarkDistributionList: any;
  role: any;
  userData: any;
  student: any;
  apiUrl = environment.apiUrl;

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.AssigmentId = params.id;
        
          this.getUserInfoByUserId();
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/assignment-list"]);
        }
      }
    );
  }

  getUserInfoByUserId() {
    this.assignmentService.getUserInfoByUserId().subscribe((userdata: any) => {
      this.userData = userdata;
      // this.router.navigate([
      //   "academic/assignment/assignment-view/",
      //   this.userData._id
      // ]);
      this.getAssignmentAnswerList(this.AssigmentId);
    });
  }

  getAssignmentAnswerList(assigmentId) {

    let data = {
      assignment: assigmentId
    };
    if (this.role == 3) {
      data["student"] = this.userData._id;
    }
    this.assignmentService
      .getAssignmentAnswerList({ assignment: this.AssigmentId })
      .subscribe((answerdata: any) => {
        this.AssigmentAnsview = answerdata;
        console.log(this.AssigmentAnsview)
      });
  }

  downloadDocument = params => {
    this.assignmentService.downloadDocument(params.data.file);
  };
  
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
      headerName: "Title",
      field: "assignment.title",
      sortable: true,
      filter: true
    },
    {
      headerName: "Description",
      field: "assignment.description",
      sortable: true,
      filter: true
    },
    {
       headerName: "StudentName",
       field: "student.student_name",
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
        icon5: "fa fa-upload fa-lg",
        // enableEdit: this.enableEdit,
        // enableDelete: this.enableDelete,
        // enableView: this.enableView,
        // action1: params => {
        //   this.router.navigate([
        //     "academic/assignment/edit-assignment",
        //     params.data._id
        //   ]);
        // }
        // action2: this.deleteAssignment,
        action4: this.downloadDocument,
        // action5: this.uploadDocument
      }
    }
  ];
}
