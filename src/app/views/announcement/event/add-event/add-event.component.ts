import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "../event.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  createEventForm: FormGroup;
  fileData: any;
  url: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#start_date").datepicker();
    $("#end_date").datepicker();
    this.createEventForm = this.formBuilder.group({
      photo: [""],
      title: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      details: ["", Validators.required],
      start_time: ["", Validators.required],
      end_time: ["", Validators.required]
    });
  }
  onDateChanged(){
    
    this.createEventForm.controls["start_date"].setValue(
        $("#start_date").val()
    );
    this.createEventForm.controls["end_date"].setValue(
      $("#end_date").val()
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

  addEvent() {
    const uploadPhoto = new FormData();
    uploadPhoto.append("photo", this.fileData);
    this.eventService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
      this.createEventForm.controls["photo"].setValue(photo.filename);
      this.eventService.addEvent(this.createEventForm.value).subscribe(
        event => {
          this.toastr.success("Event has been added successfully ");

          this.router.navigate(["announcement/event/event-list"]);
        },
        error => {
          this.toastr.error("Error while adding notice", "", {
            timeOut: 3000
          });
        }
      );
    });
  }

  resetEvent() {
    this.createEventForm.reset();
  }

  get title() {
    return this.createEventForm.get("title");
  }

  get start_date() {
    return this.createEventForm.get("start_date");
  }
  get end_date() {
    return this.createEventForm.get("end_date");
  }
  get start_time() {
    return this.createEventForm.get("start_time");
  }
  get end_time() {
    return this.createEventForm.get("end_time");
  }
  get details() {
    return this.createEventForm.get("details");
  }
}
