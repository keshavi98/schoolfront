import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddTeacherComponent } from "./add-teacher/add-teacher.component";
import { EditTeacherComponent } from "./edit-teacher/edit-teacher.component";
import { TeacherListComponent } from "./teacher-list/teacher-list.component";
import { TeacherViewComponent } from "./teacher-view/teacher-view.component";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Teacher"
    },
    children: [
      {
        path: "add-teacher",
        component: AddTeacherComponent,
        data: {
          title: "Add Teacher"
        }
      },
      {
        path: "",
        redirectTo: "teacher-list"
      },
      {
        path: "teacher-list",
        component: TeacherListComponent,
        data: {
          title: "Teacher List"
        }
      },
      {
        path: "edit-teacher/:id",
        component: EditTeacherComponent,
        data: {
          title: "Edit Teacher"
        }
      },
      {
        path: "teacher-view/:id",
        component: TeacherViewComponent,
        data: {
          title: "Teacher View"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
