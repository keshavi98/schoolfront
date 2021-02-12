import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LeaveapplicationRoutingModule } from "./leaveapplication-routing.module";
import { AddLeaveApplyComponent } from "./leave-apply/add-leave-apply/add-leave-apply.component";
import { EditLeaveApplyComponent } from "./leave-apply/edit-leave-apply/edit-leave-apply.component";
import { LeaveApplyListComponent } from "./leave-apply/leave-apply-list/leave-apply-list.component";
import { AddLeaveAssignComponent } from "./leave-assign/add-leave-assign/add-leave-assign.component";
import { EditLeaveAssignComponent } from "./leave-assign/edit-leave-assign/edit-leave-assign.component";
import { LeaveAssignListComponent } from "./leave-assign/leave-assign-list/leave-assign-list.component";
import { AddLeaveCategoryComponent } from "./leave-category/add-leave-category/add-leave-category.component";
import { EditLeaveCategoryComponent } from "./leave-category/edit-leave-category/edit-leave-category.component";
import { LeaveCategoryListComponent } from "./leave-category/leave-category-list/leave-category-list.component";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { LeaveApplictionListComponent } from "./leave-applications/leave-appliction-list/leave-appliction-list.component";
import { LeaveApplyViewComponent } from './leave-apply/leave-apply-view/leave-apply-view.component';
import { LeaveApplicationViewComponent } from './leave-applications/leave-application-view/leave-application-view.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AddLeaveApplyComponent,
    EditLeaveApplyComponent,
    LeaveApplyListComponent,
    AddLeaveAssignComponent,
    EditLeaveAssignComponent,
    LeaveAssignListComponent,
    AddLeaveCategoryComponent,
    EditLeaveCategoryComponent,
    LeaveCategoryListComponent,
    LeaveApplictionListComponent,
    LeaveApplyViewComponent,
    LeaveApplicationViewComponent
  ],
  imports: [
    CommonModule,
    LeaveapplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule

  ]
})
export class LeaveapplicationModule {}
