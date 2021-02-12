import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "ng-angular8-datatable";
import { MarkRoutingModule } from "./mark-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { AddMarkComponent } from "./marks/add-mark/add-mark.component";
import { MarkListComponent } from "./marks/mark-list/mark-list.component";
import { MarkViewComponent } from "./marks/mark-view/mark-view.component";
import { AddMarkDistributionComponent } from './mark-distribution/add-mark-distribution/add-mark-distribution.component';
import { EditMarkDistributionComponent } from './mark-distribution/edit-mark-distribution/edit-mark-distribution.component';
import { MarkDistributionListComponent } from './mark-distribution/mark-distribution-list/mark-distribution-list.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [AddMarkComponent, MarkListComponent, MarkViewComponent, AddMarkDistributionComponent, EditMarkDistributionComponent, MarkDistributionListComponent],
  imports: [
    CommonModule,
    MarkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class MarkModule {}
