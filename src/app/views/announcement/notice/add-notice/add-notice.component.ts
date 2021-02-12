import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NoticeService } from "../notice.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-notice",
  templateUrl: "./add-notice.component.html",
  styleUrls: ["./add-notice.component.css"]
})
export class AddNoticeComponent implements OnInit {
  createNoticeForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private noticeService: NoticeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#date").datepicker();
    
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
  addNotice() {
    this.noticeService.addNotice(this.createNoticeForm.value).subscribe(
      notice => {
        this.toastr.success("Notice has been added successfully ");

        this.router.navigate(["announcement/notice/notice-list"]);
      },
      error => {
        this.toastr.error("Error while adding notice", "", {
          timeOut: 3000
        });
      }
    );
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
