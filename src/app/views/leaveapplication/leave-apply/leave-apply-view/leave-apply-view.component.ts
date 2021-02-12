import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveapplyService } from "../leaveapply.service";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-leave-apply-view",
  templateUrl: "./leave-apply-view.component.html",
  styleUrls: ["./leave-apply-view.component.css"]
})
export class LeaveApplyViewComponent implements OnInit {
  url: any;
  RoleList: any;
  LeaveApplyId: any;
  leaveApplyview: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private LeaveapplyService: LeaveapplyService,
    private LeaveapplicationService: LeaveapplicationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.LeaveApplyId = params.id;
          this.getLeaveapplyById(this.LeaveApplyId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["leaveapply/leave-apply-list"]);
        }
      }
    );
  }

  getLeaveapplyById(id) {
    this.LeaveapplyService.getLeaveapplyById(id).subscribe(
      (leaveApplydata: any) => {
        this.leaveApplyview = leaveApplydata;
        leaveApplydata.from_date = moment(leaveApplydata.from_date).format(
          "YYYY/MM/DD"
        );
        leaveApplydata.to_date = moment(leaveApplydata.to_date).format(
          "YYYY/MM/DD"
        );
        leaveApplydata.from_user_info.dob = moment(
          leaveApplydata.from_user_info.dob
        ).format("YYYY/MM/DD");
        console.log(this.leaveApplyview);
      }
    );
  }
}
