import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { EventService } from "../event.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { environment } from "../../../../../environments/environment";
@Component({
  selector: "app-event-view",
  templateUrl: "./event-view.component.html",
  styleUrls: ["./event-view.component.css"]
})
export class EventViewComponent implements OnInit {
  eventId: any;
  eventview: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.eventId = params.id;
          this.getEventById(this.eventId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["event/event-list"]);
        }
      }
    );
  }

  getEventById(id) {
    this.eventService.getEventById(id).subscribe((eventdata: any) => {
      this.eventview = eventdata;
      eventdata.start_date = moment(eventdata.start_date).format("YYYY/MM/DD");
      eventdata.end_date = moment(eventdata.end_date).format("YYYY/MM/DD");
    });
  }
}
