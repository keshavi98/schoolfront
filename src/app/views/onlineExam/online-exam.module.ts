import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OnlineExamRoutingModule } from "./online-exam-routing.module";
import { AddQuestionGroupComponent } from "./question-group/add-question-group/add-question-group.component";
import { EditQuestionGroupComponent } from "./question-group/edit-question-group/edit-question-group.component";
import { QuestionGroupListComponent } from "./question-group/question-group-list/question-group-list.component";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { AddQuestionLevelComponent } from './question-level/add-question-level/add-question-level.component';
import { EditQuestionLevelComponent } from './question-level/edit-question-level/edit-question-level.component';
import { QuestionLevelListComponent } from './question-level/question-level-list/question-level-list.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AddQuestionGroupComponent,
    EditQuestionGroupComponent,
    QuestionGroupListComponent,
    AddQuestionLevelComponent,
    EditQuestionLevelComponent,
    QuestionLevelListComponent
  ],
  imports: [
    CommonModule,
    OnlineExamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class OnlineExamModule {}
