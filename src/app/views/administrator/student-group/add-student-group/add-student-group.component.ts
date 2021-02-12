import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentgroupService } from "../studentgroup.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-student-group",
  templateUrl: "./add-student-group.component.html",
  styleUrls: ["./add-student-group.component.css"]
})
export class AddStudentGroupComponent implements OnInit {
  createGroupForm: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private studentgroupService: StudentgroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createGroupForm = this.formBuilder.group({
      group: ["", Validators.required]
    });
  }

  addStudentGroup() {
    this.studentgroupService
      .addStudentGroup(this.createGroupForm.value)
      .subscribe(
        academicyear => {
          this.toastr.success("Student Group has been added successfully ");

          this.router.navigate([
            "administrator/student-group/student-group-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding Student Group", "", {
            timeOut: 3000
          });
        }
      );
  }

  resetGroup() {
    this.createGroupForm.reset();
  }

  get group() {
    return this.createGroupForm.get("group");
  }
}
