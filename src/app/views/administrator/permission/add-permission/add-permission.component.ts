import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PermissionService } from "../permission.service";
import { ToastrService } from "ngx-toastr";
import { AdministratorService } from "../../../administrator/administrator.service";
@Component({
  selector: "app-add-permission",
  templateUrl: "./add-permission.component.html",
  styleUrls: ["./add-permission.component.css"]
})
export class AddPermissionComponent implements OnInit {
  userRoles: any;
  createPermissionForm: FormGroup;
  PermissionList: any;
  checklist: any;
  checkedList: any;
  allPages: any;
  AllpagesDataList: any;
  // showTable = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private administratorService: AdministratorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getuserRoles();
    this.getAllPages();

    this.createPermissionForm = this.formBuilder.group({
      role: ["", Validators.required]
    });
    //this.getAllPermission();
  }

  checkUncheckAll(data) {
    if (data.AllSelected) {
      data.add = true;
      data.edit = true;
      data.view = true;
      data.delete = true;
    } else {
      data.add = false;
      data.edit = false;
      data.view = false;
      data.delete = false;
    }
  }

  checkUncheck(data) {
    if (data.add && data.edit && data.view && data.delete) {
      data.AllSelected = true;
    } else {
      data.AllSelected = false;
    }
  }

  getuserRoles() {
    this.permissionService.getuserRoles().subscribe((data: any) => {
      this.userRoles = data;
    });
  }

  getAllPages() {
    this.permissionService.getAllPages().subscribe((data: any) => {
      this.allPages = data;
    });
    // this.getAllPermission();
  }

  getAllPermission() {
    // this.showTable = true;
    // debugger;
    this.permissionService
      .getPermission(this.createPermissionForm.value)
      .subscribe((data: any) => {
        this.PermissionList = data;
        this.AllpagesDataList = [];

        for (let i = 0; i < this.allPages.length; i++) {
          let pageObj = {};
          pageObj["page"] = this.allPages[i].code;
          pageObj["name"] = this.allPages[i].name;
          pageObj["role"] = this.createPermissionForm.value.role;
          // pageObj["permission"] = [];
          // console.log(">>>>>>", this.PermissionList.length);
          for (let j = 0; j < this.PermissionList.length; j++) {
            if (
              this.PermissionList[j].page &&
              this.allPages[i].code == this.PermissionList[j].page
            ) {
              pageObj["add"] = this.PermissionList[j].add;
              pageObj["edit"] = this.PermissionList[j].edit;
              pageObj["delete"] = this.PermissionList[j].delete;
              pageObj["view"] = this.PermissionList[j].view;
            }
          }
          // console.log("________", pageObj["add"]);
          this.AllpagesDataList.push(pageObj);
          // console.log(this.AllpagesDataList);
        }
      });
  }

  setPermission() {
    //debugger;
    let records = [];

    //console.log(teacherAttendance);
    this.permissionService
      .setPermission({ records: this.AllpagesDataList })
      .subscribe(
        permission => {
          this.toastr.success("Permission has been added successfully ");
          this.router.navigate(["administrator/permission/add-permission"]);
        },
        error => {
          this.toastr.error("Error while adding teacher Permission", "", {
            timeOut: 3000
          });
        }
      );
  }

  get role() {
    return this.createPermissionForm.get("role");
  }
}
