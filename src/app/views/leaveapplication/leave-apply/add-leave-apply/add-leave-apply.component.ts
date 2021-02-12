import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveapplyService } from "../leaveapply.service";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { ToastrService } from "ngx-toastr";
import { AdministratorService } from "../../../administrator/administrator.service";
declare let $:any;
@Component({
  selector: "app-add-leave-apply",
  templateUrl: "./add-leave-apply.component.html",
  styleUrls: ["./add-leave-apply.component.css"]
})
export class AddLeaveApplyComponent implements OnInit {
  LeavecategoryList: any;
  userRoles: any;
  createLeaveapplyForm: FormGroup;
  selectedFile: any;
  fileData: any;
  TeacherList: any;
  AdminList: any;
  ToUserList: any = [];
  url: any;
  RoleList: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private LeaveapplyService: LeaveapplyService,
    private LeaveapplicationService: LeaveapplicationService,
    private administratorService: AdministratorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#to_date").datepicker();
    $("#from_date").datepicker();
    
    this.getAllLeavecategoryList();
    this.getuserRoles();
    //this.getAllRole();
    this.getAllTeacher();
    this.getAllAdmin();
    this.createLeaveapplyForm = this.formBuilder.group({
      to_user_role: ["", Validators.required],
      category: ["", Validators.required],
      to_user: ["", Validators.required],
      from_date: ["", Validators.required],
      from_user: [""],
      to_date: ["", Validators.required],
      file: [""],
      file_name: [""],
      on_duty_leave: [""],
      reason: ["", Validators.required]
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

  onDateChanged(){
    
    this.createLeaveapplyForm.controls["to_date"].setValue(
        $("#to_date").val()
    );
    this.createLeaveapplyForm.controls["from_date"].setValue(
      $("#from_date").val()
  );
   
}

  addLeaveapply() {
    if (this.fileData) {
      const uploadFile = new FormData();
      uploadFile.append("file", this.fileData);
      this.LeaveapplyService.uploadFile(uploadFile).subscribe((file: any) => {
        this.createLeaveapplyForm.controls["file"].setValue(file.filename);

        this.createLeaveapplyForm.value.from_user = localStorage.getItem(
          "user_id"
        );
        this.LeaveapplyService.addLeaveapply(
          this.createLeaveapplyForm.value
        ).subscribe(
          leaveapply => {
            this.toastr.success("Leave Apply has been added successfully ");

            this.router.navigate([
              "leaveapplication/leaveapply/leave-apply-list"
            ]);
          },
          error => {
            this.toastr.error("Error while adding leave apply", "", {
              timeOut: 3000
            });
          }
        );
      });
    } else {
      this.createLeaveapplyForm.value.from_user = localStorage.getItem(
        "user_id"
      );
      this.LeaveapplyService.addLeaveapply(
        this.createLeaveapplyForm.value
      ).subscribe(
        leaveapply => {
          this.toastr.success("Leave Apply has been added successfully ");

          this.router.navigate([
            "leaveapplication/leaveapply/leave-apply-list"
          ]);
        },
        error => {
          this.toastr.error("Error while adding leave apply", "", {
            timeOut: 3000
          });
        }
      );
    }
  }

  getAllRole() {
    this.administratorService.getAllRole().subscribe((data: any) => {
      this.RoleList = data;
    });
  }
  getAllTeacher() {
    this.LeaveapplicationService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  getAllAdmin() {
    this.LeaveapplicationService.getAllAdmin().subscribe((data: any) => {
      this.AdminList = data;
    });
  }
  getuserRoles() {
    this.LeaveapplyService.getuserRoles().subscribe((data: any) => {
      this.userRoles = data;
    });
  }
  getAllLeavecategoryList() {
    this.LeaveapplicationService.getAllLeavecategoryList().subscribe(
      (data: any) => {
        this.LeavecategoryList = data;
      }
    );
  }

  resetLeaveapply() {
    this.createLeaveapplyForm.reset();
  }
  get to_user_role() {
    return this.createLeaveapplyForm.get("to_user_role");
  }
  get category() {
    return this.createLeaveapplyForm.get("category");
  }
  get to_user() {
    return this.createLeaveapplyForm.get("to_user");
  }
  get from_date() {
    return this.createLeaveapplyForm.get("from_date");
  }
  get to_date() {
    return this.createLeaveapplyForm.get("to_date");
  }

  get reason() {
    return this.createLeaveapplyForm.get("reason");
  }
  get from_user() {
    return this.createLeaveapplyForm.get("from_user");
  }
}
