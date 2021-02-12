import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HolidayService } from "../holiday.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-holiday",
  templateUrl: "./add-holiday.component.html",
  styleUrls: ["./add-holiday.component.css"]
})
export class AddHolidayComponent implements OnInit {
  createHolidayForm: FormGroup;
  fileData: any;
  url: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private holidayService: HolidayService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#to_date","").datepicker();
    $("#from_date").datepicker();
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

onFronDateChange(){
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

  addHoliday() {
    const uploadPhoto = new FormData();
    uploadPhoto.append("photo", this.fileData);
    this.holidayService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
      this.createHolidayForm.controls["photo"].setValue(photo.filename);
      this.holidayService.addHoliday(this.createHolidayForm.value).subscribe(
        holiday => {
          this.toastr.success("Holiday has been added successfully ");

          this.router.navigate(["announcement/holiday/holiday-list"]);
        },
        error => {
          this.toastr.error("Error while adding Holiday", "", {
            timeOut: 3000
          });
        }
      );
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
