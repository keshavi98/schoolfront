import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentViewComponent } from "./student-view/student-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Student"
    },
    children: [
      {
        path: "",
        redirectTo: "student-list"
      },
      {
        path: "add-student",
        component: AddStudentComponent,
        data: {
          title: "Add Student"
        }
      },
      {
        path: "edit-student/:id",
        component: EditStudentComponent,
        data: {
          title: "Edit Student"
        }
      },
      {
        path: "student-list",
        component: StudentListComponent,
        data: {
          title: "Student List"
        }
      },
      {
        path: "student-view/:id",
        component: StudentViewComponent,
        data: {
          title: "Student View"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
