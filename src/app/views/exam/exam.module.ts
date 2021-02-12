import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ExamRoutingModule } from "./exam-routing.module";
import { AddExamComponent } from "./exam/add-exam/add-exam.component";
import { EditExamComponent } from "./exam/edit-exam/edit-exam.component";
import { ExamListComponent } from "./exam/exam-list/exam-list.component";
import { DataTableModule } from "ng-angular8-datatable";
import { AddExamScheduleComponent } from "./exam schedule/add-exam-schedule/add-exam-schedule.component";
import { EditExamScheduleComponent } from "./exam schedule/edit-exam-schedule/edit-exam-schedule.component";
import { ExamScheduleListComponent } from "./exam schedule/exam-schedule-list/exam-schedule-list.component";
import { AddGradeComponent } from "./grade/add-grade/add-grade.component";
import { EditGradeComponent } from "./grade/edit-grade/edit-grade.component";
import { GradeListComponent } from "./grade/grade-list/grade-list.component";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { AddExamAttendanceComponent } from "./exam-attendance/add-exam-attendance/add-exam-attendance.component";
import { EditExamAttendanceComponent } from "./exam-attendance/edit-exam-attendance/edit-exam-attendance.component";
import { ExamAttendanceListComponent } from "./exam-attendance/exam-attendance-list/exam-attendance-list.component";
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AddExamComponent,
    EditExamComponent,
    ExamListComponent,
    AddExamScheduleComponent,
    EditExamScheduleComponent,
    ExamScheduleListComponent,
    AddGradeComponent,
    EditGradeComponent,
    GradeListComponent,
    AddExamAttendanceComponent,
    EditExamAttendanceComponent,
    ExamAttendanceListComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class ExamModule {}
