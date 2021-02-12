import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HolidayService } from "../holiday.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
declare let $:any;

@Component({
  selector: "app-edit-holiday",
  templateUrl: "./edit-holiday.component.html",
  styleUrls: ["./edit-holiday.component.css"]
})
export class EditHolidayComponent implements OnInit {

  createHolidayForm: FormGroup;
  fileData: any;
  url: any;
  holidayId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private holidayService: HolidayService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#to_date").datepicker();
    $("#from_date").datepicker();
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
    this.createHolidayForm = this.formBuilder.group({
      photo: [""],
      title: ["", Validators.required],
      from_date: ["", Validators.required],
      to_date: ["", Validators.required],
      details: ["", Validators.required]
    });
  }

  onDateChanged(){
    
    this.createHolidayForm.controls["to_date"].setValue(
        $("#to_date").val()
    );
    this.createHolidayForm.controls["from_date"].setValue(
      $("#from_date").val()
  );
   
}
  onSelectPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

  editHoliday() {
    const uploadPhoto = new FormData();
    uploadPhoto.append("photo", this.fileData);
    this.holidayService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
      this.createHolidayForm.controls["photo"].setValue(photo.filename);
      this.holidayService
        .editHoliday(this.holidayId, this.createHolidayForm.value)
        .subscribe(
          holiday => {
            this.toastr.success("Holiday has been edited successfully ");

            this.router.navigate(["announcement/holiday/holiday-list"]);
          },
          error => {
            this.toastr.error("Error while editing Holiday", "", {
              timeOut: 3000
            });
          }
        );
    });
  }

  getHolidayById(id) {
    this.holidayService.getHolidayById(id).subscribe((holidaydata: any) => {
      this.createHolidayForm.controls["title"].setValue(holidaydata.title);
      this.createHolidayForm.controls["photo"].setValue(holidaydata.photo);
      holidaydata.from_date = moment(holidaydata.from_date).format(
        "YYYY/MM/DD"
      );
      this.createHolidayForm.controls["from_date"].setValue(
        holidaydata.from_date
      );
      holidaydata.to_date = moment(holidaydata.to_date).format("YYYY/MM/DD");
      this.createHolidayForm.controls["to_date"].setValue(holidaydata.to_date);
      this.createHolidayForm.controls["details"].setValue(holidaydata.details);
    });
  }

  resetHoliday() {
    this.createHolidayForm.reset();
  }

  get title() {
    return this.createHolidayForm.get("title");
  }

  get from_date() {
    return this.createHolidayForm.get("from_date");
  }
  get to_date() {
    return this.createHolidayForm.get("to_date");
  }

  get details() {
    return this.createHolidayForm.get("details");
  }
}
