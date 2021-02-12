import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MarkdistributionService } from "../markdistribution.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-mark-distribution",
  templateUrl: "./add-mark-distribution.component.html",
  styleUrls: ["./add-mark-distribution.component.css"]
})
export class AddMarkDistributionComponent implements OnInit {
  createMarkDistributionForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private markdistributionService: MarkdistributionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createMarkDistributionForm = this.formBuilder.group({
      mark_distribution_type: ["", Validators.required],
      mark_value: [
        "",
        [Validators.required, Validators.min(1), Validators.max(100)]
      ]
    });
  }

  addMarkDistribution() {
    this.markdistributionService
      .addMarkDistribution(this.createMarkDistributionForm.value)
      .subscribe(
        role => {
          this.toastr.success("Mark Distribution has been added successfully ");

          this.router.navigate([
            "mark/mark-distribution/mark-distribution-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding Mark Distribution", "", {
            timeOut: 3000
          });
        }
      );
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
