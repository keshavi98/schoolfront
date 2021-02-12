import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParentsService } from "./../parents.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-parents",
  templateUrl: "./add-parents.component.html",
  styleUrls: ["./add-parents.component.css"]
})
export class AddParentsComponent implements OnInit {
  ParentsList: any;
  selectedFile: any;
  createParentsForm: FormGroup;
  fileData: any;
  url: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private parentsService: ParentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createParentsForm = this.formBuilder.group({
      photo: [""],
      photo_name: [""],
      guardian_name: ["", Validators.required],
      father_name: [""],
      mother_name: [""],
      father_profession: [""],
      mother_profession: [""],
      email: ["",Validators.email],
      phone: ["", [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: [""],
      dob: [""],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
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

  addParents() {
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.parentsService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
        this.createParentsForm.controls["photo"].setValue(photo.filename);

        this.parentsService.addParents(this.createParentsForm.value).subscribe(
          parents => {
            this.toastr.success("Parent has been added successfully  ");
            this.router.navigate(["/parents/parents-list"]);
          },
          error => {
            this.toastr.error("error while adding data", "", {
              timeOut: 3000
            });
          }
        );
      });
    } else {
      this.parentsService.addParents(this.createParentsForm.value).subscribe(
        parents => {
          this.toastr.success("Parent has been added successfully ");

          this.router.navigate(["/parents/parents-list"]);
        },
        error => {
          this.toastr.error("Error while adding parent", "", {
            timeOut: 3000
          });
        }
      );
    }
  }
  resetParents() {
    this.createParentsForm.reset();
  }
  get guardian_name() {
    return this.createParentsForm.get("guardian_name");
  }

  get email() {
    return this.createParentsForm.get("email");
  }
  get username() {
    return this.createParentsForm.get("username");
  }
  get password() {
    return this.createParentsForm.get("password");
  }
  get phone() {
    return this.createParentsForm.get("phone");
  }
}
