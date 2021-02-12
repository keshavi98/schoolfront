import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnnouncementRoutingModule } from "./announcement-routing.module";
import { DataTableModule } from "ng-angular8-datatable";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../../shared.module";
import { AddNoticeComponent } from "./notice/add-notice/add-notice.component";
import { EditNoticeComponent } from "./notice/edit-notice/edit-notice.component";
import { NoticeListComponent } from "./notice/notice-list/notice-list.component";
import { AddEventComponent } from './event/add-event/add-event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { AddHolidayComponent } from './holiday/add-holiday/add-holiday.component';
import { EditHolidayComponent } from './holiday/edit-holiday/edit-holiday.component';
import { HolidayListComponent } from './holiday/holiday-list/holiday-list.component';
import { NoticeViewComponent } from './notice/notice-view/notice-view.component';
import { EventViewComponent } from './event/event-view/event-view.component';
import { HolidayViewComponent } from './holiday/holiday-view/holiday-view.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [AddNoticeComponent, EditNoticeComponent, NoticeListComponent, AddEventComponent, EditEventComponent, EventListComponent, AddHolidayComponent, EditHolidayComponent, HolidayListComponent, NoticeViewComponent, EventViewComponent, HolidayViewComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule
  ]
})
export class AnnouncementModule {}
