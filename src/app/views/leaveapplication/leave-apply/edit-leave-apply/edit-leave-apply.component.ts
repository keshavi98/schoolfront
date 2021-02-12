import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeaveapplyService } from "../leaveapply.service";
import { LeaveapplicationService } from "../../leaveapplication.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
declare let $:any;
@Component({
  selector: "app-edit-leave-apply",
  templateUrl: "./edit-leave-apply.component.html",
  styleUrls: ["./edit-leave-apply.component.css"]
})
export class EditLeaveApplyComponent implements OnInit {
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
  LeaveApplyId: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private LeaveapplyService: LeaveapplyService,
    private LeaveapplicationService: LeaveapplicationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $("#to_date").datepicker();
    $("#from_date").datepicker();
    this.getAllLeavecategoryList();
    this.getuserRoles();
    this.getAllTeacher();
    this.getAllAdmin();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.LeaveApplyId = params.id;
          this.getLeaveapplyById(this.LeaveApplyId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["leaveassign/leave-apply-list"]);
        }
      }
    );
    this.createLeaveapplyForm = this.formBuilder.group({
      to_user_role: ["", Validators.required],
      category: ["", Validators.required],
      to_user: ["", Validators.required],
      from_date: ["", Validators.required],
      from_user: [""],
      to_date: ["", Validators.required],
      file: [""],
      file_name: [""],
      on_duty_leave: ["", Validators.required],
      reason: ["", Validators.required],
      status: [""]
    });
  }

  onDateChanged(){
    
    this.createLeaveapplyForm.controls["to_date"].setValue(
        $("#to_date").val()
    );
    this.createLeaveapplyForm.controls["from_date"].setValue(
      $("#from_date").val()
  );
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

  editLeaveapply() {
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.LeaveapplyService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createLeaveapplyForm.controls["file"].setValue(file.filename);

      this.createLeaveapplyForm.value.from_user = localStorage.getItem(
        "user_id"
      );
      this.LeaveapplyService.editLeaveapply(
        this.LeaveApplyId,
        this.createLeaveapplyForm.value
      ).subscribe(
        leaveapply => {
          this.toastr.success("Leave Apply has been edit successfully ");

          this.router.navigate([
            "leaveapplication/leaveapply/leave-apply-list"
          ]);
        },
        error => {
          this.toastr.error("Error while editing leave apply", "", {
            timeOut: 3000
          });
        }
      );
    });
  }

  getLeaveapplyById(id) {
    this.LeaveapplyService.getLeaveapplyById(id).subscribe(
      (leaveapply: any) => {
        this.createLeaveapplyForm.controls["category"].setValue(
          leaveapply.category
        );
        this.createLeaveapplyForm.controls["to_user_role"].setValue(
          leaveapply.to_user_role
        );

        this.createLeaveapplyForm.controls["to_user"].setValue(
          leaveapply.to_user
        );
        this.createLeaveapplyForm.controls["from_user"].setValue(
          leaveapply.from_user
        );
        leaveapply.from_date = moment(leaveapply.from_date).format(
          "YYYY/MM/DD"
        );
        this.createLeaveapplyForm.controls["from_date"].setValue(
          leaveapply.from_date
        );
        leaveapply.to_date = moment(leaveapply.to_date).format("YYYY/MM/DD");
        this.createLeaveapplyForm.controls["to_date"].setValue(
          leaveapply.to_date
        );
        this.createLeaveapplyForm.controls["file_name"].setValue(
          leaveapply.file_name
        );
        this.createLeaveapplyForm.controls["on_duty_leave"].setValue(
          leaveapply.on_duty_leave
        );
        this.createLeaveapplyForm.controls["reason"].setValue(
          leaveapply.reason
        );
        this.createLeaveapplyForm.controls["status"].setValue(
          leaveapply.status
        );
      }
    );
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
  get file_name() {
    return this.createLeaveapplyForm.get("file_name");
  }
  get on_duty_leave() {
    return this.createLeaveapplyForm.get("on_duty_leave");
  }
  get reason() {
    return this.createLeaveapplyForm.get("reason");
  }
  get from_user() {
    return this.createLeaveapplyForm.get("from_user");
  }
}
