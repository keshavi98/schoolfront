import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuestiongroupService } from "../questiongroup.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-question-group",
  templateUrl: "./add-question-group.component.html",
  styleUrls: ["./add-question-group.component.css"]
})
export class AddQuestionGroupComponent implements OnInit {
  createQuestionGroupForm: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private questiongroupService: QuestiongroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createQuestionGroupForm = this.formBuilder.group({
      title: ["", Validators.required]
    });
  }

  addOnlineExamGroup() {
    this.questiongroupService
      .addOnlineExamGroup(this.createQuestionGroupForm.value)
      .subscribe(
        group => {
          this.toastr.success("Question Group has been added successfully ");

          this.router.navigate([
            "online-exam/question-group/question-group-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding Question Group", "", {
            timeOut: 3000
          });
        }
      );
  }

  resetGroup() {
    this.createQuestionGroupForm.reset();
  }

  get title() {
    return this.createQuestionGroupForm.get("title");
  }
}
