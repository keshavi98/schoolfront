import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { ToastrService } from "ngx-toastr";
import { PermissionService } from "../../views/administrator/permission/permission.service";
import { SharedService } from "../../shared.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  login: any;
  token: any;
  loginuserlist;
  errorMessage;
  PermissionList: any;
  allPages: any;

  createLoginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loginService.checkLogin().subscribe(data => {
      this.router.navigate(["/dashboard"]);
    });
    this.createLoginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required]
    });
  }

  loginUser() {
    this.loginService.loginUser(this.createLoginForm.value).subscribe(
      login => {
        this.toastr.success("Successfull Login");
        this.loginuserlist = login;
        localStorage.setItem("token", this.loginuserlist.token);
        localStorage.setItem("user_id", this.loginuserlist.id);
        localStorage.setItem("role", this.loginuserlist.role);

        this.getAllPermission();
      },
      error => {
        this.toastr.error("error while login ", "", {
          timeOut: 3000
        });
      }
    );
  }

  getAllPermission() {
    this.permissionService
      .getPermission({ role: localStorage.getItem("role") })
      .subscribe((data: any) => {
        this.PermissionList = data;
        this.sharedService.setPermissionData(this.PermissionList);
        this.router.navigate(["/dashboard"]);
      });
  }

  get username() {
    return this.createLoginForm.get("username");
  }

  get password() {
    return this.createLoginForm.get("password");
  }
}
