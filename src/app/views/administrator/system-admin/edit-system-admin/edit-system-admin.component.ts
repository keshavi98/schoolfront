import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SystemadminService } from "../systemadmin.service";
import { ToastrService } from "ngx-toastr";
import { MomentModule } from "ngx-moment";
import * as moment from "moment";
declare let $:any;


@Component({
  selector: "app-edit-system-admin",
  templateUrl: "./edit-system-admin.component.html",
  styleUrls: ["./edit-system-admin.component.css"]
})
export class EditSystemAdminComponent implements OnInit {
  SystemAdminList: any;
  selectedFile: any;
  createSystemAdminForm: FormGroup;
  fileData: any;
  url: any;
  systemAdminId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private systemAdminService: SystemadminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#dob").datepicker();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.systemAdminId = params.id;
          this.getAdminById(this.systemAdminId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/system-admin-list"]);
        }
      }
    );

    this.createSystemAdminForm = this.formBuilder.group({
      photo: [""],
      // photo_name: [""],
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: ["",[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: [""],
      joining_date: ["", Validators.required],
      religion: [""],
      gender: [""],
      dob: ["", Validators.required],

      status: [""]
    });
  }

  onDateChanged(){
    
    this.createSystemAdminForm.controls["dob"].setValue(
        $("#dob").val()
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

  editAdmin() {
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.systemAdminService
        .uploadPhoto(uploadPhoto)
        .subscribe((photo: any) => {
          this.createSystemAdminForm.controls["photo"].setValue(photo.filename);
          this.systemAdminService
            .editAdmin(this.systemAdminId, this.createSystemAdminForm.value)
            .subscribe(
              admin => {
                this.toastr.success(
                  "System Admin has been edit successfully  "
                );
                this.router.navigate([
                  "/administrator/system-admin/system-admin-list"
                ]);
              },
              error => {
                this.toastr.error("error while edit data", "", {
                  timeOut: 3000
                });
              }
            );
        });
    } else {
      this.systemAdminService
        .editAdmin(this.systemAdminId, this.createSystemAdminForm.value)
        .subscribe(
          admin => {
            this.toastr.success("System Admin has been edit successfully ");

            this.router.navigate([
              "/administrator/system-admin/system-admin-list"
            ]);
          },
          error => {
            this.toastr.error("Error while edit System Admin", "", {
              timeOut: 3000
            });
          }
        );
    }
  }

  getAdminById(id) {
    var self = this;
    // console.log(this.ngbDatepicker);
    this.systemAdminService.getAdminById(id).subscribe((admindata: any) => {
      this.createSystemAdminForm.controls["photo"].setValue(admindata.photo);
      this.createSystemAdminForm.controls["name"].setValue(admindata.name);
      admindata.dob = moment(admindata.dob).format("YYYY/MM/DD");
      this.createSystemAdminForm.controls["dob"].setValue(admindata.dob);

      admindata.joining_date = moment(admindata.joining_date).format(
        "YYYY/MM/DD"
      );

      this.createSystemAdminForm.controls["joining_date"].setValue(
        admindata.joining_date
      );

      this.createSystemAdminForm.controls["gender"].setValue(admindata.gender);
      this.createSystemAdminForm.controls["religion"].setValue(
        admindata.religion
      );
      this.createSystemAdminForm.controls["email"].setValue(admindata.email);
      this.createSystemAdminForm.controls["phone"].setValue(admindata.phone);
      this.createSystemAdminForm.controls["address"].setValue(
        admindata.address
      );
      this.createSystemAdminForm.controls["status"].setValue(admindata.status);
    });
  }

  resetSystemAdmin() {
    this.createSystemAdminForm.reset();
  }

  get name() {
    return this.createSystemAdminForm.get("name");
  }

  get email() {
    return this.createSystemAdminForm.get("email");
  }

  get phone() {
    return this.createSystemAdminForm.get("phone");
  }

  get dob() {
    return this.createSystemAdminForm.get("dob");
  }

  get joining_date() {
    return this.createSystemAdminForm.get("joining_date");
  }
}
