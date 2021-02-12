import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddLeaveCategoryComponent } from "./leave-category/add-leave-category/add-leave-category.component";
import { EditLeaveCategoryComponent } from "./leave-category/edit-leave-category/edit-leave-category.component";
import { LeaveCategoryListComponent } from "./leave-category/leave-category-list/leave-category-list.component";
import { AddLeaveAssignComponent } from "./leave-assign/add-leave-assign/add-leave-assign.component";
import { EditLeaveAssignComponent } from "./leave-assign/edit-leave-assign/edit-leave-assign.component";
import { LeaveAssignListComponent } from "./leave-assign/leave-assign-list/leave-assign-list.component";
import { AddLeaveApplyComponent } from "./leave-apply/add-leave-apply/add-leave-apply.component";
import { EditLeaveApplyComponent } from "./leave-apply/edit-leave-apply/edit-leave-apply.component";
import { LeaveApplyListComponent } from "./leave-apply/leave-apply-list/leave-apply-list.component";
import { LeaveApplictionListComponent } from "./leave-applications/leave-appliction-list/leave-appliction-list.component";
import { LeaveApplyViewComponent } from "./leave-apply/leave-apply-view/leave-apply-view.component";
import { LeaveApplicationViewComponent } from "./leave-applications/leave-application-view/leave-application-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Leave Application"
    },
    children: [
      {
        path: "",
        redirectTo: "leavecategory/leave-category-list"
      },
      {
        path: "leavecategory/add-leave-category",
        component: AddLeaveCategoryComponent,
        data: {
          title: "Add Leave Category"
        }
      },
      {
        path: "leavecategory/leave-category-list",
        component: LeaveCategoryListComponent,
        data: {
          title: "Leave Category List"
        }
      },
      {
        path: "leavecategory/edit-leave-category/:id",
        component: EditLeaveCategoryComponent,
        data: {
          title: "Edit Leave Category"
        }
      },
      {
        path: "",
        redirectTo: "leaveassign/leave-assign-list"
      },
      {
        path: "leaveassign/add-leave-assign",
        component: AddLeaveAssignComponent,
        data: {
          title: "Add Leave Assign"
        }
      },
      {
        path: "leaveassign/leave-assign-list",
        component: LeaveAssignListComponent,
        data: {
          title: "Leave Assign List"
        }
      },
      {
        path: "leaveassign/edit-leave-assign/:id",
        component: EditLeaveAssignComponent,
        data: {
          title: "Edit Leave Assign"
        }
      },
      {
        path: "",
        redirectTo: "leaveapply/leave-apply-list"
      },
      {
        path: "leaveapply/add-leave-apply",
        component: AddLeaveApplyComponent,
        data: {
          title: "Add Leave Apply"
        }
      },
      {
        path: "leaveapply/leave-apply-list",
        component: LeaveApplyListComponent,
        data: {
          title: "Leave Apply List"
        }
      },
      {
        path: "leaveapply/edit-leave-apply/:id",
        component: EditLeaveApplyComponent,
        data: {
          title: "Edit Leave Apply"
        }
      },
      {
        path: "leaveapply/leave-apply-view/:id",
        component: LeaveApplyViewComponent,
        data: {
          title: "Leave Apply View"
        }
      },
      {
        path: "",
        redirectTo: "leaveapplications/leave-application-list"
      },
      // {
      //   path: "leaveapply/add-leave-apply",
      //   component: AddLeaveApplyComponent,
      //   data: {
      //     title: "Add Leave Apply"
      //   }
      // },
      {
        path: "leaveapplications/leave-application-list",
        component: LeaveApplictionListComponent,
        data: {
          title: "Leave Application List"
        }
      },
      {
        path: "leaveapplications/leave-application-view/:id",
        component: LeaveApplicationViewComponent,
        data: {
          title: "Leave Application View"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class LeaveapplicationRoutingModule {}
