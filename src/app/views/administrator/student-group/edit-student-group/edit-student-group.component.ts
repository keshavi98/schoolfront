import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentgroupService } from "../studentgroup.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-student-group",
  templateUrl: "./edit-student-group.component.html",
  styleUrls: ["./edit-student-group.component.css"]
})
export class EditStudentGroupComponent implements OnInit {
  createGroupForm: any;
  groupId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private studentgroupService: StudentgroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.groupId = params.id;
          this.getStudentGroupById(this.groupId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["role/role-list"]);
        }
      }
    );
    this.createGroupForm = this.formBuilder.group({
      group: ["", Validators.required]
    });
  }

  editStudentGroup() {
    this.studentgroupService
      .editStudentGroup(this.groupId, this.createGroupForm.value)
      .subscribe(
        academicyear => {
          this.toastr.success("Student Group has been edited successfully ");

          this.router.navigate([
            "administrator/student-group/student-group-list"
          ]);
        },
        error => {
          this.toastr.error("Error while editing Student Group", "", {
            timeOut: 3000
          });
        }
      );
  }

  getStudentGroupById(id) {
    this.studentgroupService
      .getStudentGroupById(id)
      .subscribe((groupdata: any) => {
        this.createGroupForm.controls["group"].setValue(groupdata.group);
      });
  }

  resetGroup() {
    this.createGroupForm.reset();
  }

  get group() {
    return this.createGroupForm.get("group");
  }
}
