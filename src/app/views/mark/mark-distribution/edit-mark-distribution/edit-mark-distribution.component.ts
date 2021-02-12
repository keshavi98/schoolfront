import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MarkdistributionService } from "../markdistribution.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-mark-distribution",
  templateUrl: "./edit-mark-distribution.component.html",
  styleUrls: ["./edit-mark-distribution.component.css"]
})
export class EditMarkDistributionComponent implements OnInit {
  createMarkDistributionForm: FormGroup;
  MarkDistributionId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private markdistributionService: MarkdistributionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.MarkDistributionId = params.id;
          this.getMarkDistributionById(this.MarkDistributionId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["role/role-list"]);
        }
      }
    );

    this.createMarkDistributionForm = this.formBuilder.group({
      mark_distribution_type: ["", Validators.required],
      mark_value: ["", Validators.required]
    });
  }

  editMarkDistribution() {
    this.markdistributionService
      .editMarkDistribution(
        this.MarkDistributionId,
        this.createMarkDistributionForm.value
      )
      .subscribe(
        markdistribution => {
          this.toastr.success("Mark Distribution has been edit successfully ");

          this.router.navigate([
            "mark/mark-distribution/mark-distribution-list"
          ]);
        },
        error => {
          this.toastr.error("Error while editing Mark Distribution", "", {
            timeOut: 3000
          });
        }
      );
  }

  getMarkDistributionById(id) {
    this.markdistributionService
      .getMarkDistributionById(id)
      .subscribe((markdata: any) => {
        this.createMarkDistributionForm.controls[
          "mark_distribution_type"
        ].setValue(markdata.mark_distribution_type);
        this.createMarkDistributionForm.controls["mark_value"].setValue(
          markdata.mark_value
        );
      });
  }

  resetMarkDistribution() {
    this.createMarkDistributionForm.reset();
  }

  get mark_distribution_type() {
    return this.createMarkDistributionForm.get("mark_distribution_type");
  }

  get mark_value() {
    return this.createMarkDistributionForm.get("mark_value");
  }
}
