import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdministratorRoutingModule } from "./administrator-routing.module";
import { AddAcademicYearComponent } from "./academic-year/add-academic-year/add-academic-year.component";
import { EditAcademicYearComponent } from "./academic-year/edit-academic-year/edit-academic-year.component";
import { AcademicYearListComponent } from "./academic-year/academic-year-list/academic-year-list.component";
import { DataTableModule } from "ng-angular8-datatable";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { AddStudentGroupComponent } from './student-group/add-student-group/add-student-group.component';
import { EditStudentGroupComponent } from './student-group/edit-student-group/edit-student-group.component';
import { StudentGroupListComponent } from './student-group/student-group-list/student-group-list.component';
import { AddPermissionComponent } from './permission/add-permission/add-permission.component';
import { AddSystemAdminComponent } from './system-admin/add-system-admin/add-system-admin.component';
import { EditSystemAdminComponent } from './system-admin/edit-system-admin/edit-system-admin.component';
import { SystemAdminListComponent } from './system-admin/system-admin-list/system-admin-list.component';
import { SystemAdminViewComponent } from './system-admin/system-admin-view/system-admin-view.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AddAcademicYearComponent,
    EditAcademicYearComponent,
    AcademicYearListComponent,
    AddRoleComponent,
    EditRoleComponent,
    RoleListComponent,
    AddStudentGroupComponent,
    EditStudentGroupComponent,
    StudentGroupListComponent,
    AddPermissionComponent,
    AddSystemAdminComponent,
    EditSystemAdminComponent,
    SystemAdminListComponent,
    SystemAdminViewComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class AdministratorModule {}
