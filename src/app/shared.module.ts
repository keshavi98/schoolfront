import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { ActionCellRendererComponent } from "./views/agGridComponents/actionCellRendererComponent";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [ActionCellRendererComponent],
  imports: [
    CommonModule,

    AgGridModule.withComponents([ActionCellRendererComponent])
  ]
})
export class SharedModule {}
