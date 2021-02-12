import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NoticeService } from "../notice.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
declare let $:any;

@Component({
  selector: "app-edit-notice",
  templateUrl: "./edit-notice.component.html",
  styleUrls: ["./edit-notice.component.css"]
})
export class EditNoticeComponent implements OnInit {
  createNoticeForm: FormGroup;
  noticeId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private noticeService: NoticeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#date").datepicker();
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
    this.createNoticeForm = this.formBuilder.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      notice: ["", Validators.required]
    });
  }
  onDateChanged(){
    
    this.createNoticeForm.controls["date"].setValue(
        $("#date").val()
    );
    }
    
  editNotice() {
    this.noticeService
      .editNotice(this.noticeId, this.createNoticeForm.value)
      .subscribe(
        notice => {
          this.toastr.success("Notice has been edited successfully ");

          this.router.navigate(["announcement/notice/notice-list"]);
        },
        error => {
          this.toastr.error("Error while editing notice", "", {
            timeOut: 3000
          });
        }
      );
  }

  getNoticeById(id) {
    this.noticeService.getNoticeById(id).subscribe((noticedata: any) => {
      this.createNoticeForm.controls["title"].setValue(noticedata.title);
      noticedata.date = moment(noticedata.date).format("YYYY/MM/DD");
      this.createNoticeForm.controls["date"].setValue(noticedata.date);

      this.createNoticeForm.controls["notice"].setValue(noticedata.notice);
    });
  }

  resetNotice() {
    this.createNoticeForm.reset();
  }

  get title() {
    return this.createNoticeForm.get("title");
  }

  get date() {
    return this.createNoticeForm.get("date");
  }
  get notice() {
    return this.createNoticeForm.get("notice");
  }
}
