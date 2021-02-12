import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";
import { Routes, RouterModule, Router } from "@angular/router";
import { LoginService } from "../../views/login/login.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PermissionService } from "../../views/administrator/permission/permission.service";
import { SharedService } from "../../shared.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html"
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItemsArr = navItems;
  public navItems: any;
  createLoginForm: FormGroup;
  errorMessage: any;
  PermissionList: any;
  permissionData: any;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    //debugger;
    this.loginService.checkLogin().subscribe(
      data => {},
      error => {
        this.router.navigate(["/login"]);
      }
    );
    this.getAllPermission();
    let self = this;
    self.navItems = JSON.parse(JSON.stringify(self.navItemsArr));
    this.sharedService.permissionData.subscribe(permissionData => {
      // debugger;
      self.permissionData = permissionData;
      for (let i = 0; i < self.permissionData.length; i++) {
        if (
          self.permissionData[i].add == false &&
          self.permissionData[i].edit == false &&
          self.permissionData[i].view == false &&
          self.permissionData[i].delete == false
        ) {
          self.navItems = self.navItems.filter(item => {
            return (
              !item.page ||
              item.page !== self.permissionData[i].page ||
              item.children
            );
          });

          for (let j = 0; j < self.navItems.length; j++) {
            if (
              self.navItems[j].children &&
              self.navItems[j].children.length > 0
            ) {
              self.navItems[j].children = self.navItems[j].children.filter(
                child => {
                  return (
                    !child.page || child.page !== self.permissionData[i].page
                  );
                }
              );
            }
          }

          self.navItems = self.navItems.filter(item => {
            return !item.children || item.children.length > 0;
          });
        }
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  //checkPermission('TEACHER', 'add')
  checkPermission(page, action) {
    for (let i = 0; i < this.PermissionList.length; i++) {
      // debugger;
    }
  }

  getAllPermission() {
    this.permissionService
      .getPermission({ role: localStorage.getItem("role") })
      .subscribe((data: any) => {
        this.PermissionList = data;
        this.sharedService.setPermissionData(this.PermissionList);
      });
  }

  logoutUer() {
    this.loginService.logoutUser().subscribe(
      login => {
        localStorage.removeItem("token");
        this.toastr.success("Successfull Logout");
        this.router.navigate(["/login"]);
      },
      error => {
        this.toastr.error("error while logout", "", {
          timeOut: 3000
        });
      }
    );
  }
}
