import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParentsService } from "./../parents.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-parents",
  templateUrl: "./edit-parents.component.html",
  styleUrls: ["./edit-parents.component.css"]
})
export class EditParentsComponent implements OnInit {
  ParentsList: any;
  createParentsForm: FormGroup;
  parentsId: any;
  updatePhoto: any;
  selectedFile: any;
  fileData: any;
  url: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private parentsService: ParentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.parentsId = params.id;
          this.getParentById(this.parentsId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/parents-list"]);
        }
      }
    );

    this.createParentsForm = this.formBuilder.group({
      photo: [""],
      photo_name: [""],
      guardian_name: ["", Validators.required],
      father_name: [""],
      mother_name: [""],
      father_profession: [""],
      mother_profession: [""],
      email: ["", Validators.email],
      phone: ["",Validators.max(10)],
      address: [""],
      dob: [""],

      status: [""]
    });
  }

  onSelectPhoto(event) {
    // called each time file input changes

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        // called once readAsDataURL is completed

        this.url = event.target.result;
      };
    }
  }

  editParents() {
    if (this.fileData) {
      const uploadPhoto = new FormData();
      uploadPhoto.append("photo", this.fileData);
      this.parentsService.uploadPhoto(uploadPhoto).subscribe((photo: any) => {
        this.createParentsForm.controls["photo"].setValue(photo.filename);

        this.parentsService
          .editParents(this.parentsId, this.createParentsForm.value)
          .subscribe(
            parents => {
              this.toastr.success("Parent has been edited successfully");

              this.router.navigate(["/parents/parents-list"]);
            },
            error => {
              this.toastr.error("Error while editing parent", "", {
                timeOut: 3000
              });
            }
          );
      });
    } else {
      this.parentsService
        .editParents(this.parentsId, this.createParentsForm.value)
        .subscribe(
          parents => {
            this.toastr.success("Parent has been edited successfully");

            this.router.navigate(["/parents/parents-list"]);
          },
          error => {
            this.toastr.error("Error while editing parent", "", {
              timeOut: 3000
            });
          }
        );
    }
  }
  resetParents() {
    this.createParentsForm.reset();
  }
  getParentById(id) {
    this.parentsService.getParentById(id).subscribe((parentsdata: any) => {
      this.createParentsForm.controls["photo"].setValue(parentsdata.photo);
      this.createParentsForm.controls["guardian_name"].setValue(
        parentsdata.guardian_name
      );

      this.createParentsForm.controls["father_name"].setValue(
        parentsdata.father_name
      );
      this.createParentsForm.controls["mother_name"].setValue(
        parentsdata.mother_name
      );
      this.createParentsForm.controls["father_profession"].setValue(
        parentsdata.father_profession
      );
      this.createParentsForm.controls["mother_profession"].setValue(
        parentsdata.mother_profession
      );
      this.createParentsForm.controls["email"].setValue(parentsdata.email);
      this.createParentsForm.controls["phone"].setValue(parentsdata.phone);
      this.createParentsForm.controls["address"].setValue(parentsdata.address);
      this.createParentsForm.controls["photo"].setValue(parentsdata.photo);
      this.createParentsForm.controls["dob"].setValue(parentsdata.dob);

      this.createParentsForm.controls["status"].setValue(parentsdata.status);
    });
  }
  get guardian_name() {
    return this.createParentsForm.get("guardian_name");
  }

  get email() {
    return this.createParentsForm.get("email");
  }
}
