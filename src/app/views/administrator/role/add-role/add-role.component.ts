import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RoleService } from "../role.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"]
})
export class AddRoleComponent implements OnInit {
  createRoleForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createRoleForm = this.formBuilder.group({
      role: ["", Validators.required]
    });
  }
  addRole() {
    this.roleService.addRole(this.createRoleForm.value).subscribe(
      role => {
        this.toastr.success("Role has been added successfully ");

        this.router.navigate(["administrator/role/role-list"]);
      },
      error => {
        this.toastr.error("Error while adding Role", "", {
          timeOut: 3000
        });
      }
    );
  }

  resetRole() {
    this.createRoleForm.reset();
  }

  get role() {
    return this.createRoleForm.get("role");
  }
}
