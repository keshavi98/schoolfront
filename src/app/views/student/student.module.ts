import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentRoutingModule } from "./student-routing.module";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentViewComponent } from "./student-view/student-view.component";
import { DataTableModule } from "ng-angular8-datatable";
import { AgGridModule } from "ag-grid-angular";
//import { ActionCellRendererComponent } from "../agGridComponents/actionCellRendererComponent";
import { SharedModule } from "../../shared.module";
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AddStudentComponent,
    EditStudentComponent,
    StudentListComponent,
    StudentViewComponent
    //ActionCellRendererComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class StudentModule {}
