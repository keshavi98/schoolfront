import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveassignService } from "../leaveassign.service";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { ToastrService } from "ngx-toastr";
import { AdministratorService } from "../../../administrator/administrator.service";

@Component({
  selector: "app-edit-leave-assign",
  templateUrl: "./edit-leave-assign.component.html",
  styleUrls: ["./edit-leave-assign.component.css"]
})
export class EditLeaveAssignComponent implements OnInit {
  LeaveassignList: any;
  LeavecategoryList: any;
  LeaveassignId: any;
  userRoles: any;
  RoleList: any;
  createLeaveassignForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private LeaveassignService: LeaveassignService,
    private LeaveapplicationService: LeaveapplicationService,
    private administratorService: AdministratorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllLeavecategoryList();
    // this.getuserRoles();
    this.getAllRole();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.LeaveassignId = params.id;
          this.getLeaveassignById(this.LeaveassignId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["leaveassign/leave-assign-list"]);
        }
      }
    );
    this.createLeaveassignForm = this.formBuilder.group({
      role: ["", Validators.required],
      category: ["", Validators.required],
      no_of_day: ["", Validators.required]
    });
  }

  editLeaveassign() {
    this.LeaveassignService.editLeaveassign(
      this.LeaveassignId,
      this.createLeaveassignForm.value
    ).subscribe(
      exams => {
        this.toastr.success("Leave Assign has been edited successfully ");

        this.router.navigate([
          "leaveapplication/leaveassign/leave-assign-list"
        ]);
      },
      error => {
        this.toastr.error("Error while editing leave assign", "", {
          timeOut: 3000
        });
      }
    );
  }
  getAllLeavecategoryList() {
    this.LeaveapplicationService.getAllLeavecategoryList().subscribe(
      (data: any) => {
        this.LeavecategoryList = data;
      }
    );
  }
  // getuserRoles() {
  //   this.LeaveassignService.getuserRoles().subscribe((data: any) => {
  //     this.userRoles = data.userRoles;
  //   });
  // }

  getAllRole() {
    this.administratorService.getAllRole().subscribe((data: any) => {
      this.RoleList = data;
    });
  }

  getLeaveassignById(id) {
    this.LeaveassignService.getLeaveassignById(id).subscribe(
      (leaveassign: any) => {
        this.createLeaveassignForm.controls["category"].setValue(
          leaveassign.category
        );
        this.createLeaveassignForm.controls["role"].setValue(leaveassign.role);
        this.createLeaveassignForm.controls["no_of_day"].setValue(
          leaveassign.no_of_day
        );
      }
    );
  }
  resetLeaveassign() {
    this.createLeaveassignForm.reset();
  }
  get category() {
    return this.createLeaveassignForm.get("category");
  }
  get role() {
    return this.createLeaveassignForm.get("role");
  }
  get no_of_day() {
    return this.createLeaveassignForm.get("no_of_day");
  }
}
