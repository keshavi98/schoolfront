import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddMarkComponent } from "./marks/add-mark/add-mark.component";
import { MarkListComponent } from "./marks/mark-list/mark-list.component";
import { MarkViewComponent } from "./marks/mark-view/mark-view.component";
import { AddMarkDistributionComponent } from "./mark-distribution/add-mark-distribution/add-mark-distribution.component";
import { EditMarkDistributionComponent } from "./mark-distribution/edit-mark-distribution/edit-mark-distribution.component";
import { MarkDistributionListComponent } from "./mark-distribution/mark-distribution-list/mark-distribution-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Mark"
    },
    children: [
      {
        path: "",
        redirectTo: "mark-list"
      },
      {
        path: "marks/add-mark",
        component: AddMarkComponent,
        data: {
          title: "Add Mark"
        }
      },
      {
        path: "marks/mark-list",
        component: MarkListComponent,
        data: {
          title: "Mark List"
        }
      },
      {
        path: "marks/mark-view/:id",
        component: MarkViewComponent,
        data: {
          title: "Mark View"
        }
      },
      {
        path: "",
        redirectTo: "mark-distribution-list"
      },
      {
        path: "mark-distribution/add-mark-distribution",
        component: AddMarkDistributionComponent,
        data: {
          title: "Add Mark Distribution"
        }
      },
      {
        path: "mark-distribution/mark-distribution-list",
        component: MarkDistributionListComponent,
        data: {
          title: "Mark Distribution List"
        }
      },
      {
        path: "mark-distribution/edit-mark-distribution/:id",
        component: EditMarkDistributionComponent,
        data: {
          title: "Edit Mark Distribution"
        }
      },
      {
        path: "mark-distribution/mark-distribution-view/:id",
        component: MarkViewComponent,
        data: {
          title: "Mark View"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class MarkRoutingModule {}
