import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { LeaveApplictionService } from "../leave-appliction.service";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-leave-application-view",
  templateUrl: "./leave-application-view.component.html",
  styleUrls: ["./leave-application-view.component.css"]
})
export class LeaveApplicationViewComponent implements OnInit {
  LeaveApplicationId: any;
  leaveApplicationview: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaveapplicationServices: LeaveapplicationService,
    private leaveApplictionService: LeaveApplictionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.LeaveApplicationId = params.id;
          this.getLeaveapplicationById(this.LeaveApplicationId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["leaveapplication/leave-application-list"]);
        }
      }
    );
  }

  getLeaveapplicationById(id) {
    this.leaveApplictionService
      .getLeaveapplicationById(id)
      .subscribe((leaveApplydata: any) => {
        this.leaveApplicationview = leaveApplydata;
        leaveApplydata.dob = moment(leaveApplydata.dob).format("YYYY/MM/DD");
      });
  }
}
