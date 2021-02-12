import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ParentsRoutingModule } from "./parents-routing.module";
import { AddParentsComponent } from "./add-parents/add-parents.component";
import { ParentsListComponent } from "./parents-list/parents-list.component";
import { EditParentsComponent } from "./edit-parents/edit-parents.component";
import { ParentsViewComponent } from "./parents-view/parents-view.component";
import { DataTableModule } from "ng-angular8-datatable";
import { AgGridModule } from "ag-grid-angular";
// import { ActionCellRendererComponent } from "../agGridComponents/actionCellRendererComponent";
import { SharedModule } from "../../shared.module";
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AddParentsComponent,
    ParentsListComponent,
    EditParentsComponent,
    ParentsViewComponent
    // ActionCellRendererComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class ParentsModule {}
