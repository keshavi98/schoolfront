import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuestionlevelService } from "../questionlevel.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-question-level",
  templateUrl: "./edit-question-level.component.html",
  styleUrls: ["./edit-question-level.component.css"]
})
export class EditQuestionLevelComponent implements OnInit {
  createQuestionLevelForm: any;
  levelId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionlevelService: QuestionlevelService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.levelId = params.id;
          this.getQuestionLevelById(this.levelId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate([
            "online-exam/question-group/question-group-list"
          ]);
        }
      }
    );
    this.createQuestionLevelForm = this.formBuilder.group({
      title: ["", Validators.required]
    });
  }

  editQuestionLevel() {
    this.questionlevelService
      .editQuestionLevel(this.levelId, this.createQuestionLevelForm.value)
      .subscribe(
        level => {
          this.toastr.success("Question Level has been edited successfully ");

          this.router.navigate([
            "online-exam/question-level/question-level-list"
          ]);
        },
        error => {
          this.toastr.error("Error while editing Question Level", "", {
            timeOut: 3000
          });
        }
      );
  }

  getQuestionLevelById(id) {
    this.questionlevelService
      .getQuestionLevelById(id)
      .subscribe((groupdata: any) => {
        this.createQuestionLevelForm.controls["title"].setValue(
          groupdata.title
        );
      });
  }

  resetLevel() {
    this.createQuestionLevelForm.reset();
  }

  get title() {
    return this.createQuestionLevelForm.get("title");
  }
}
