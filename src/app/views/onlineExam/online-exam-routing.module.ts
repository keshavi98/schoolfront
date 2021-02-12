import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddQuestionGroupComponent } from "./question-group/add-question-group/add-question-group.component";
import { EditQuestionGroupComponent } from "./question-group/edit-question-group/edit-question-group.component";
import { QuestionGroupListComponent } from "./question-group/question-group-list/question-group-list.component";
import { AddQuestionLevelComponent } from "./question-level/add-question-level/add-question-level.component";
import { EditQuestionLevelComponent } from "./question-level/edit-question-level/edit-question-level.component";
import { QuestionLevelListComponent } from "./question-level/question-level-list/question-level-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Question Group"
    },
    children: [
      {
        path: "",
        redirectTo: "question-group/question-group-list"
      },
      {
        path: "question-group/add-question-group",
        component: AddQuestionGroupComponent,
        data: {
          title: "Add Question Group"
        }
      },
      {
        path: "question-group/question-group-list",
        component: QuestionGroupListComponent,
        data: {
          title: "Question Group List"
        }
      },
      {
        path: "question-group/edit-question-group/:id",
        component: EditQuestionGroupComponent,
        data: {
          title: "Edit Question Group"
        }
      },
      {
        path: "",
        redirectTo: "question-level/question-level-list"
      },
      {
        path: "question-level/add-question-level",
        component: AddQuestionLevelComponent,
        data: {
          title: "Add Question Level"
        }
      },
      {
        path: "question-level/question-level-list",
        component: QuestionLevelListComponent,
        data: {
          title: "Question Level List"
        }
      },
      {
        path: "question-level/edit-question-level/:id",
        component: EditQuestionLevelComponent,
        data: {
          title: "Edit Question Level"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class OnlineExamRoutingModule {}
