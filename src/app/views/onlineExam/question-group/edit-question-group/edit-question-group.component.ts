import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuestiongroupService } from "../questiongroup.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-question-group",
  templateUrl: "./edit-question-group.component.html",
  styleUrls: ["./edit-question-group.component.css"]
})
export class EditQuestionGroupComponent implements OnInit {
  createQuestionGroupForm: any;
  groupId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questiongroupService: QuestiongroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.groupId = params.id;
          this.getOnlineExamGroupById(this.groupId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["role/role-list"]);
        }
      }
    );
    this.createQuestionGroupForm = this.formBuilder.group({
      title: ["", Validators.required]
    });
  }

  editOnlineExamGroup() {
    this.questiongroupService
      .editOnlineExamGroup(this.groupId, this.createQuestionGroupForm.value)
      .subscribe(
        group => {
          this.toastr.success("Question Group has been edited successfully ");

          this.router.navigate([
            "online-exam/question-group/question-group-list"
          ]);
        },
        error => {
          this.toastr.error("Error while editing Question Group", "", {
            timeOut: 3000
          });
        }
      );
  }

  getOnlineExamGroupById(id) {
    this.questiongroupService
      .getOnlineExamGroupById(id)
      .subscribe((groupdata: any) => {
        this.createQuestionGroupForm.controls["title"].setValue(
          groupdata.title
        );
      });
  }

  resetGroup() {
    this.createQuestionGroupForm.reset();
  }

  get title() {
    return this.createQuestionGroupForm.get("title");
  }
}
