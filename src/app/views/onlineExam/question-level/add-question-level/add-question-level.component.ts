import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuestionlevelService } from "../questionlevel.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-question-level",
  templateUrl: "./add-question-level.component.html",
  styleUrls: ["./add-question-level.component.css"]
})
export class AddQuestionLevelComponent implements OnInit {
  createQuestionLevelForm: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private questionlevelService: QuestionlevelService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createQuestionLevelForm = this.formBuilder.group({
      title: ["", Validators.required]
    });
  }

  addQuestionLevel() {
    this.questionlevelService
      .addQuestionLevel(this.createQuestionLevelForm.value)
      .subscribe(
        level => {
          this.toastr.success("Question Level has been added successfully ");

          this.router.navigate([
            "online-exam/question-level/question-level-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding Question Level", "", {
            timeOut: 3000
          });
        }
      );
  }

  resetLevel() {
    this.createQuestionLevelForm.reset();
  }

  get title() {
    return this.createQuestionLevelForm.get("title");
  }
}
