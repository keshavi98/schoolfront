import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AcademicRoutingModule } from "./academic-routing.module";

import { AddAssignmentComponent } from "./assignment/add-assignment/add-assignment.component";
import { EditAssignmentComponent } from "./assignment/edit-assignment/edit-assignment.component";
import { AssignmentListComponent } from "./assignment/assignment-list/assignment-list.component";
import { AddClassComponent } from "./class/add-class/add-class.component";
import { EditClassComponent } from "./class/edit-class/edit-class.component";
import { ClassListComponent } from "./class/class-list/class-list.component";
import { AddSectionComponent } from "./section/add-section/add-section.component";
import { EditSectionComponent } from "./section/edit-section/edit-section.component";
import { SectionListComponent } from "./section/section-list/section-list.component";
import { AddSubjectComponent } from "./subject/add-subject/add-subject.component";
import { EditSubjectComponent } from "./subject/edit-subject/edit-subject.component";
import { SubjectListComponent } from "./subject/subject-list/subject-list.component";
import { AddSyllabusComponent } from "./syllabus/add-syllabus/add-syllabus.component";
import { EditSyllabusComponent } from "./syllabus/edit-syllabus/edit-syllabus.component";
import { SyllabusListComponent } from "./syllabus/syllabus-list/syllabus-list.component";
import { AddTimetableComponent } from "./timetable/add-timetable/add-timetable.component";
import { EditTimetableComponent } from "./timetable/edit-timetable/edit-timetable.component";
import { TimetableListComponent } from "./timetable/timetable-list/timetable-list.component";
import { DataTableModule } from "ng-angular8-datatable";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { AssignmentViewComponent } from './assignment/assignment-view/assignment-view.component';
//import { ActionCellRendererComponent } from "../agGridComponents/actionCellRendererComponent";
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AddAssignmentComponent,
    EditAssignmentComponent,
    AssignmentListComponent,
    AddClassComponent,
    EditClassComponent,
    ClassListComponent,
    AddSectionComponent,
    EditSectionComponent,
    SectionListComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    SubjectListComponent,
    AddSyllabusComponent,
    EditSyllabusComponent,
    SyllabusListComponent,
    AddTimetableComponent,
    EditTimetableComponent,
    TimetableListComponent,
    AssignmentViewComponent
    //ActionCellRendererComponent
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    AgGridModule.withComponents([]),
  //  RouterModule.forRoot([])
  RouterModule
  ]
})
export class AcademicModule {}
