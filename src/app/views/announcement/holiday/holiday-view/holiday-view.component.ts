import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { HolidayService } from "../holiday.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { AnyARecord } from "dns";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-holiday-view",
  templateUrl: "./holiday-view.component.html",
  styleUrls: ["./holiday-view.component.css"]
})
export class HolidayViewComponent implements OnInit {
  holidayId: any;
  holidayview: any;
  apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private holidayService: HolidayService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.holidayId = params.id;
          this.getHolidayById(this.holidayId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["event/event-list"]);
        }
      }
    );
  }
  getHolidayById(id) {
    this.holidayService.getHolidayById(id).subscribe((holidaydata: any) => {
      this.holidayview = holidaydata;
      holidaydata.start_date = moment(holidaydata.start_date).format(
        "YYYY/MM/DD"
      );
      holidaydata.end_date = moment(holidaydata.end_date).format("YYYY/MM/DD");
    });
  }
}
