import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RoleService } from "../role.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.css"]
})
export class EditRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  roleId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.roleId = params.id;
          this.getRoleById(this.roleId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["role/role-list"]);
        }
      }
    );
    this.createRoleForm = this.formBuilder.group({
      role: ["", Validators.required]
    });
  }

  editRole() {
    this.roleService.editRole(this.roleId, this.createRoleForm.value).subscribe(
      role => {
        this.toastr.success("Role has been edited successfully ");

        this.router.navigate(["administrator/role/role-list"]);
      },
      error => {
        this.toastr.error("Error while editing Role", "", {
          timeOut: 3000
        });
      }
    );
  }

  getRoleById(id) {
    this.roleService.getRoleById(id).subscribe((roledata: any) => {
      this.createRoleForm.controls["role"].setValue(roledata.role);
    });
  }

  resetRole() {
    this.createRoleForm.reset();
  }

  get role() {
    return this.createRoleForm.get("role");
  }
}
