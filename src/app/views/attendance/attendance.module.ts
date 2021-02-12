import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AttendanceRoutingModule } from "./attendance-routing.module";
import { AddTeacherAttendanceComponent } from "./teacher attendance/add-teacher-attendance/add-teacher-attendance.component";
import { EditTeacherAttendanceComponent } from "./teacher attendance/edit-teacher-attendance/edit-teacher-attendance.component";
import { TeacherAttendanceListComponent } from "./teacher attendance/teacher-attendance-list/teacher-attendance-list.component";
import { DataTableModule } from "ng-angular8-datatable";
import { AddStudentAttendanceComponent } from "./student attendance/add-student-attendance/add-student-attendance.component";
import { StudentAttendanceListComponent } from "./student attendance/student-attendance-list/student-attendance-list.component";
import { SharedModule } from "../../shared.module";
import { AgGridModule } from "ag-grid-angular";
import { StudentAttendanceViewComponent } from './student attendance/student-attendance-view/student-attendance-view.component';
import { TeacherAttendanceViewComponent } from './teacher attendance/teacher-attendance-view/teacher-attendance-view.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AddTeacherAttendanceComponent,
    EditTeacherAttendanceComponent,
    TeacherAttendanceListComponent,
    AddStudentAttendanceComponent,
    StudentAttendanceListComponent,
    StudentAttendanceViewComponent,
    TeacherAttendanceViewComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class AttendanceModule {}
