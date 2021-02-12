import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParentsService } from "./../parents.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../environments/environment";
import { ActionCellRendererComponent } from "../../agGridComponents/actionCellRendererComponent";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";
import * as moment from "moment";

@Component({
  selector: "app-parents-view",
  templateUrl: "./parents-view.component.html",
  styleUrls: ["./parents-view.component.css"]
})
export class ParentsViewComponent implements OnInit {
  activeTab = 1;
  apiUrl = environment.apiUrl;
  ParentsId: any;
  parentsview: any;
  childrenview: any;
  closeResult: string;
  fileData: any;
  url: any;
  createDocumentForm: FormGroup;
  DocumentList: any;
  role: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private parentsService: ParentsService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.ParentsId = params.id;
          this.getParentById(this.ParentsId);
          this.getParentChildrenInfoById(this.ParentsId);
          this.getDocumentListById(this.ParentsId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/parents-list"]);
        }
      }
    );
    this.createDocumentForm = this.formBuilder.group({
      file: [""],
      file_name: ["", Validators.required],
      title: ["", Validators.required]
    });
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
    this.parentsService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createDocumentForm.controls["file"].setValue(file.filename);

      this.parentsService
        .addDocument(this.ParentsId, this.createDocumentForm.value)
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
  getParentById(id) {
    this.parentsService.getParentById(id).subscribe((parentsdata: any) => {
      this.parentsview = parentsdata;
    });
  }

  getParentChildrenInfoById(id) {
    this.parentsService
      .getParentChildrenInfoById(id)
      .subscribe((childrendata: any) => {
        this.childrenview = childrendata;
        this.agGrid.api.sizeColumnsToFit();
      });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
  }

  photoCellRendere(params) {
    return `<img _ngcontent-gvm-c2="" class="photo" src="${environment.apiUrl}${params.value}" style="width: 40px;
    height: 40px;
    border-radius: 50%";>`;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        }
        // reason => {
        //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // }
      );
  }

  get title() {
    return this.createDocumentForm.get("title");
  }

  get file_name() {
    return this.createDocumentForm.get("file_name");
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  getDocumentListById(id) {
    this.parentsService.getDocumentListById(id).subscribe((data: any) => {
      this.DocumentList = data;

      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteDocument = params => {
    this.parentsService
      .deleteDocument(params.data._id)
      .subscribe((data: any) => {
        this.getDocumentListById(this.ParentsId);
        this.toastr.success("Document has been deteted successfully");
        //this.router.navigate(["/student/student-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting Document", "", {
          timeOut: 3000
        });
      };
  };

  downloadDocument = params => {
    this.parentsService.downloadDocument(params.data.file);
    // .subscribe((data: any) => {
    //   // const blob = new Blob([data], { type: "text/csv" });

    //   let blob = new Blob([data], { type: "text/csv" });
    //   let url = window.URL.createObjectURL(blob);
    //   let pwa = window.open(url);
    //   if (!pwa || pwa.closed || typeof pwa.closed == "undefined") {
    //     this.toastr.error(
    //       "Please disable your Pop-up blocker and try again."
    //     );
    //   } else {
    //     this.toastr.success("Document has been Download successfully");
    //   }

    //   //this.router.navigate(["/student/student-list"]);
    // }),
    // error => {
    //   this.toastr.error("Error while deleting Download", "", {
    //     timeOut: 3000
    //   });
    // };
  };

  columnDefs = [
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
    { headerName: "Roll", field: "roll_no", sortable: true, filter: true },
    {
      headerName: "Class",
      field: "class.class",
      sortable: true,
      filter: true
    },
    {
      headerName: "Section",
      field: "section.section",
      sortable: true,
      filter: true
    }
  ];

  documentlist = [
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

    { headerName: "title", field: "title", sortable: true, filter: true },

    {
      headerName: "Date",
      field: "created_at",
      sortable: true,
      filter: true,
      cellRenderer: this.dateCellRenderer
    },

    {
      headerName: "Action",
      field: "",
      cellRendererFramework: ActionCellRendererComponent,
      cellRendererParams: {
        //icon1: "cui-pencil",
        icon2: "cui-trash",
        icon4: "fa fa-download fa-lg ",

        action2: this.deleteDocument,
        action4: this.downloadDocument
      }
    }
  ];
}
