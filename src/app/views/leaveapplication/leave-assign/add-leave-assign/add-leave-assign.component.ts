import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveassignService } from "../leaveassign.service";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { ToastrService } from "ngx-toastr";
import { AdministratorService } from "../../../administrator/administrator.service";

@Component({
  selector: "app-add-leave-assign",
  templateUrl: "./add-leave-assign.component.html",
  styleUrls: ["./add-leave-assign.component.css"]
})
export class AddLeaveAssignComponent implements OnInit {
  LeavecategoryList: any;
  userRoles: any;
  createLeaveassignForm: FormGroup;
  RoleList: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private LeaveassignService: LeaveassignService,
    private LeaveapplicationService: LeaveapplicationService,
    private administratorService: AdministratorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllLeavecategoryList();
    this.getuserRoles();
    //this.getAllRole();
    this.createLeaveassignForm = this.formBuilder.group({
      role: ["", Validators.required],
      category: ["", Validators.required],
      no_of_day: ["", Validators.required]
    });
  }
  addLeaveassign() {
    this.LeaveassignService.addLeaveassign(
      this.createLeaveassignForm.value
    ).subscribe(
      exams => {
        this.toastr.success("Leave Assign has been added successfully ");

        this.router.navigate([
          "leaveapplication/leaveassign/leave-assign-list"
        ]);
      },
      error => {
        this.toastr.error("Error while adding leave assign", "", {
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

  getuserRoles() {
    this.LeaveassignService.getuserRoles().subscribe((data: any) => {
      this.userRoles = data;
      console.log(this.userRoles);
    });
  }

  // getAllRole() {
  //   this.administratorService.getAllRole().subscribe((data: any) => {
  //     this.RoleList = data;
  //   });
  // }

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
