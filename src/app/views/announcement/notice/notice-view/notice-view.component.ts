import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { NoticeService } from "../notice.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: "app-notice-view",
  templateUrl: "./notice-view.component.html",
  styleUrls: ["./notice-view.component.css"]
})
export class NoticeViewComponent implements OnInit {
  noticeId: any;
  noticeview: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noticeService: NoticeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.noticeId = params.id;
          this.getNoticeById(this.noticeId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["notice/noticelist"]);
        }
      }
    );
  }

  getNoticeById(id) {
    this.noticeService.getNoticeById(id).subscribe((noticedata: any) => {
      this.noticeview = noticedata;
      noticedata.date = moment(noticedata.date).format("YYYY/MM/DD");
    });
  }
}
