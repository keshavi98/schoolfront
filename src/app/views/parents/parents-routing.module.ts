import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddParentsComponent } from "./add-parents/add-parents.component";
import { ParentsListComponent } from "./parents-list/parents-list.component";
import { EditParentsComponent } from "./edit-parents/edit-parents.component";
import { ParentsViewComponent } from "./parents-view/parents-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Parents"
    },
    children: [
      {
        path: "",
        redirectTo: "parents-list"
      },
      {
        path: "add-parents",
        component: AddParentsComponent,
        data: {
          title: "Add Parents"
        }
      },

      {
        path: "parents-list",
        component: ParentsListComponent,
        data: {
          title: "Parents List"
        }
      },
      {
        path: "edit-parents/:id",
        component: EditParentsComponent,
        data: {
          title: "Edit Parents"
        }
      },
      {
        path: "parents-view/:id",
        component: ParentsViewComponent,
        data: {
          title: "Parents View"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class ParentsRoutingModule {}
