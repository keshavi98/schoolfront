import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNoticeComponent } from "./notice/add-notice/add-notice.component";
import { EditNoticeComponent } from "./notice/edit-notice/edit-notice.component";
import { NoticeListComponent } from "./notice/notice-list/notice-list.component";
import { AddEventComponent } from "./event/add-event/add-event.component";
import { EditEventComponent } from "./event/edit-event/edit-event.component";
import { EventListComponent } from "./event/event-list/event-list.component";
import { AddHolidayComponent } from "./holiday/add-holiday/add-holiday.component";
import { EditHolidayComponent } from "./holiday/edit-holiday/edit-holiday.component";
import { HolidayListComponent } from "./holiday/holiday-list/holiday-list.component";
import { NoticeViewComponent } from "./notice/notice-view/notice-view.component";
import { EventViewComponent } from "./event/event-view/event-view.component";
import { HolidayViewComponent } from "./holiday/holiday-view/holiday-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Announcement"
    },
    children: [
      {
        path: "",
        redirectTo: "notice/notice-list"
      },
      {
        path: "notice/add-notice",
        component: AddNoticeComponent,
        data: {
          title: "Add Notice"
        }
      },
      {
        path: "notice/notice-list",
        component: NoticeListComponent,
        data: {
          title: " Notice List"
        }
      },
      {
        path: "notice/edit-notice/:id",
        component: EditNoticeComponent,
        data: {
          title: "Edit Notice"
        }
      },
      {
        path: "notice/notice-view/:id",
        component: NoticeViewComponent,
        data: {
          title: "Notice View"
        }
      },
      {
        path: "",
        redirectTo: "event/event-list"
      },
      {
        path: "event/add-event",
        component: AddEventComponent,
        data: {
          title: "Add Event"
        }
      },
      {
        path: "event/event-list",
        component: EventListComponent,
        data: {
          title: " Event List"
        }
      },
      {
        path: "event/edit-event/:id",
        component: EditEventComponent,
        data: {
          title: "Edit Event"
        }
      },
      {
        path: "event/event-view/:id",
        component: EventViewComponent,
        data: {
          title: "Event View"
        }
      },
      {
        path: "",
        redirectTo: "holiday/holiday-list"
      },
      {
        path: "holiday/add-holiday",
        component: AddHolidayComponent,
        data: {
          title: "Add Holiday"
        }
      },
      {
        path: "holiday/holiday-list",
        component: HolidayListComponent,
        data: {
          title: "Holiday List"
        }
      },
      {
        path: "holiday/edit-holiday/:id",
        component: EditHolidayComponent,
        data: {
          title: "Edit Holiday"
        }
      },
      {
        path: "holiday/holiday-view/:id",
        component: HolidayViewComponent,
        data: {
          title: "Holiday view"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {}
