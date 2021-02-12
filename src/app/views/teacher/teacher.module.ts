import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TeacherRoutingModule } from "./teacher-routing.module";
import { AddTeacherComponent } from "./add-teacher/add-teacher.component";
import { EditTeacherComponent } from "./edit-teacher/edit-teacher.component";
import { TeacherListComponent } from "./teacher-list/teacher-list.component";
import { TeacherViewComponent } from "./teacher-view/teacher-view.component";
import { DataTableModule } from "ng-angular8-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { AgGridModule } from "ag-grid-angular";
import { ActionCellRendererComponent } from "../agGridComponents/actionCellRendererComponent";
import { SharedModule } from "../../shared.module";
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AddTeacherComponent,
    EditTeacherComponent,
    TeacherListComponent,
    TeacherViewComponent
    //ActionCellRendererComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgbModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    DatePickerModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class TeacherModule {}
