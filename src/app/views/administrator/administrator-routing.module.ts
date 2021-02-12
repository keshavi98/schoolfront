import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAcademicYearComponent } from "./academic-year/add-academic-year/add-academic-year.component";
import { EditAcademicYearComponent } from "./academic-year/edit-academic-year/edit-academic-year.component";
import { AcademicYearListComponent } from "./academic-year/academic-year-list/academic-year-list.component";
import { AddRoleComponent } from "./role/add-role/add-role.component";
import { EditRoleComponent } from "./role/edit-role/edit-role.component";
import { RoleListComponent } from "./role/role-list/role-list.component";
import { AddStudentGroupComponent } from "./student-group/add-student-group/add-student-group.component";
import { EditStudentGroupComponent } from "./student-group/edit-student-group/edit-student-group.component";
import { StudentGroupListComponent } from "./student-group/student-group-list/student-group-list.component";
import { AddPermissionComponent } from "./permission/add-permission/add-permission.component";
import { AddSystemAdminComponent } from "./system-admin/add-system-admin/add-system-admin.component";
import { EditSystemAdminComponent } from "./system-admin/edit-system-admin/edit-system-admin.component";
import { SystemAdminListComponent } from "./system-admin/system-admin-list/system-admin-list.component";
import { SystemAdminViewComponent } from "./system-admin/system-admin-view/system-admin-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Administrator"
    },
    children: [
      {
        path: "",
        redirectTo: "academic-year/academic-year-list"
      },
      {
        path: "academic-year/add-academic-year",
        component: AddAcademicYearComponent,
        data: {
          title: "Add Year"
        }
      },
      {
        path: "academic-year/academic-year-list",
        component: AcademicYearListComponent,
        data: {
          title: " Year List"
        }
      },
      {
        path: "academic-year/edit-academic-year/:id",
        component: EditAcademicYearComponent,
        data: {
          title: "Edit Year"
        }
      },
      {
        path: "",
        redirectTo: "role/role-list"
      },
      {
        path: "role/add-role",
        component: AddRoleComponent,
        data: {
          title: "Add Role"
        }
      },
      {
        path: "role/role-list",
        component: RoleListComponent,
        data: {
          title: "Role List"
        }
      },
      {
        path: "role/edit-role/:id",
        component: EditRoleComponent,
        data: {
          title: "Edit role"
        }
      },
      {
        path: "",
        redirectTo: "student-group/student-group-list"
      },
      {
        path: "student-group/add-student-group",
        component: AddStudentGroupComponent,
        data: {
          title: "Add Student Group"
        }
      },
      {
        path: "student-group/student-group-list",
        component: StudentGroupListComponent,
        data: {
          title: "Student Group List"
        }
      },
      {
        path: "student-group/edit-student-group/:id",
        component: EditStudentGroupComponent,
        data: {
          title: "Edit Student Group"
        }
      },
      {
        path: "permission/add-permission",
        component: AddPermissionComponent,
        data: {
          title: "Add Permission"
        }
      },
      {
        path: "",
        redirectTo: "system-admin/system-admin-list"
      },
      {
        path: "system-admin/add-system-admin",
        component: AddSystemAdminComponent,
        data: {
          title: "Add System Admin"
        }
      },
      {
        path: "system-admin/system-admin-list",
        component: SystemAdminListComponent,
        data: {
          title: "System Admin List"
        }
      },
      {
        path: "system-admin/edit-system-admin/:id",
        component: EditSystemAdminComponent,
        data: {
          title: "Edit System Admin "
        }
      },
      {
        path: "system-admin/system-admin-view/:id",
        component: SystemAdminViewComponent,
        data: {
          title: "System Admin View "
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {}
