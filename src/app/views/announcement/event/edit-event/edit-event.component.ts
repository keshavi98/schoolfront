import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "../event.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
declare let $:any;
@Component({
  selector: "app-edit-event",
  templateUrl: "./edit-event.component.html",
  styleUrls: ["./edit-event.component.css"]
})
export class EditEventComponent implements OnInit {
  createEventForm: FormGroup;
  fileData: any;
  url: any;
  eventId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#start_date").datepicker();
    $("#end_date").datepicker();
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

  editEvent() {
    const uploadPhoto = new FormData();
    uploadPhoto.append("photo", this.fileData);
    this.eventService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
      this.createEventForm.controls["photo"].setValue(photo.filename);
      this.eventService
        .editEvent(this.eventId, this.createEventForm.value)
        .subscribe(
          notice => {
            this.toastr.success("Event has been edited successfully ");

            this.router.navigate(["announcement/event/event-list"]);
          },
          error => {
            this.toastr.error("Error while editing event", "", {
              timeOut: 3000
            });
          }
        );
    });
  }

  getEventById(id) {
    this.eventService.getEventById(id).subscribe((eventdata: any) => {
      this.createEventForm.controls["title"].setValue(eventdata.title);
      this.createEventForm.controls["photo"].setValue(eventdata.photo);
      eventdata.start_date = moment(eventdata.start_date).format("YYYY/MM/DD");
      this.createEventForm.controls["start_date"].setValue(
        eventdata.start_date
      );
      eventdata.end_date = moment(eventdata.end_date).format("YYYY/MM/DD");
      this.createEventForm.controls["end_date"].setValue(eventdata.end_date);
      this.createEventForm.controls["start_time"].setValue(
        eventdata.start_time
      );
      this.createEventForm.controls["end_time"].setValue(eventdata.end_time);
      this.createEventForm.controls["details"].setValue(eventdata.details);
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
    return this.createEventForm.get("start_date");
  }
  get end_time() {
    return this.createEventForm.get("end_date");
  }
  get details() {
    return this.createEventForm.get("details");
  }
}
