import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SystemadminService } from "../systemadmin.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { environment } from "../../../../../environments/environment";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";

@Component({
  selector: "app-system-admin-view",
  templateUrl: "./system-admin-view.component.html",
  styleUrls: ["./system-admin-view.component.css"]
})
export class SystemAdminViewComponent implements OnInit {
  teacherview: any;
  SystemAdminId: any;
  systemAdminview: any;
  url: any;
  role: any;
  activeTab = 1;
  apiUrl = environment.apiUrl;

  @ViewChild("agGrid") agGrid: AgGridAngular;
  constructor(
    private router: Router,
    private systemadminService: SystemadminService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.SystemAdminId = params.id;
          this.getAdminById(this.SystemAdminId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/system-admin-list"]);
        }
      }
    );
  }

  switchTab(tabId) {
    this.activeTab = tabId;
  }

  getAdminById(id) {
    this.systemadminService
      .getAdminById(id)
      .subscribe((systemAdmindata: any) => {
        this.systemAdminview = systemAdmindata;
        systemAdmindata.dob = moment(systemAdmindata.dob).format("YYYY/MM/DD");
        systemAdmindata.joining_date = moment(
          systemAdmindata.joining_date
        ).format("YYYY/MM/DD");
      });
  }
}
