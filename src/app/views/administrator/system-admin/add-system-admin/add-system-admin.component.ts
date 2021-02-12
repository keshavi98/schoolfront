import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SystemadminService } from "../systemadmin.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-system-admin",
  templateUrl: "./add-system-admin.component.html",
  styleUrls: ["./add-system-admin.component.css"]
})
export class AddSystemAdminComponent implements OnInit {
  SystemAdminList: any;
  selectedFile: any;
  createSystemAdminForm: FormGroup;
  fileData: any;
  url: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemAdminService: SystemadminService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    $("#dob").datepicker();
    this.createSystemAdminForm = this.formBuilder.group({
      photo: [""],
      photo_name: [""],
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: ["", [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: [""],
      joining_date: ["", Validators.required],
      religion: [""],
      gender: [""],
      dob: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
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

  addAdmin() {
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.systemAdminService
        .uploadPhoto(uploadPhoto)
        .subscribe((photo: any) => {
          this.createSystemAdminForm.controls["photo"].setValue(photo.filename);

          this.systemAdminService
            .addAdmin(this.createSystemAdminForm.value)
            .subscribe(
              admin => {
                this.toastr.success(
                  "System Admin has been added successfully  "
                );
                this.router.navigate([
                  "/administrator/system-admin/system-admin-list"
                ]);
              },
              error => {
                this.toastr.error("error while adding data", "", {
                  timeOut: 3000
                });
              }
            );
        });
    } else {
      this.systemAdminService
        .addAdmin(this.createSystemAdminForm.value)
        .subscribe(
          admin => {
            this.toastr.success("System Admin has been added successfully ");

            this.router.navigate([
              "/administrator/system-admin/system-admin-list"
            ]);
          },
          error => {
            this.toastr.error("Error while adding System Admin", "", {
              timeOut: 3000
            });
          }
        );
    }
  }

  resetSystemAdmin(){
    this.createSystemAdminForm.reset();
  }
  get name() {
    return this.createSystemAdminForm.get("name");
  }

  get email() {
    return this.createSystemAdminForm.get("email");
  }
  get username() {
    return this.createSystemAdminForm.get("username");
  }
  get password() {
    return this.createSystemAdminForm.get("password");
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
