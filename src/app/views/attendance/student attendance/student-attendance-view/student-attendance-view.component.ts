import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgModel } from "@angular/forms";
import * as moment from "moment";
import { environment } from "../../../../../environments/environment";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";
import { AnyARecord } from "dns";
import { StudentService } from "../../../student/student.service";
import { StudentattendanceService } from "../studentattendance.service";
import { HolidayService } from "../../../announcement/holiday/holiday.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-student-attendance-view",
  templateUrl: "./student-attendance-view.component.html",
  styleUrls: ["./student-attendance-view.component.css"]
})
export class StudentAttendanceViewComponent implements OnInit {
  constructor(
    private router: Router,
    private studentService: StudentService,
    private studentattendanceService: StudentattendanceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private holidayService: HolidayService
  ) {}

  StudentList: any;
  StudentId: any;
  StudentAttendanceId: any;
  studentview: any;
  studentAttendanceview: any;
  studentattendanceDataList: any;
  attendanceview: any;
  HolidayList: any;
  HolidayDateList: any;
  studentleaveList: any;
  LeavedayDateList: any;
  holiday = 0;
  present = 0;
  absent = 0;
  le = 0;
  lp = 0;
  weekend = 0;
  leaveapply = 0;
  year = moment().year();
  arrMonth = [
    {
      id: 0,
      month: "Jan"
    },
    {
      id: 1,
      month: "Feb"
    },
    {
      id: 2,
      month: "Mar"
    },
    {
      id: 3,
      month: "Apr"
    },
    {
      id: 4,
      month: "May"
    },
    {
      id: 5,
      month: "Jun"
    },
    {
      id: 6,
      month: "Jul"
    },
    {
      id: 7,
      month: "Aug"
    },
    {
      id: 8,
      month: "Sep"
    },
    {
      id: 9,
      month: "Oct"
    },
    {
      id: 10,
      month: "Nov"
    },
    {
      id: 11,
      month: "Des"
    }
  ];
  arrDate = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];
  arrAttendanceData = {};
  activeTab: 1;
  apiUrl = environment.apiUrl;
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.StudentAttendanceId = params.id;
          this.getStudentById(this.StudentAttendanceId);
          this.getStudentAttendanceInfoById(this.StudentAttendanceId);
          this.getHolidayList();
          this.getLeaveByStudentId(this.StudentAttendanceId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/studnet-attendance-list"]);
        }
      }
    );
  }

  switchTab(tabId) {
    this.activeTab = tabId;
  }
  enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];

    // startDate = startDate.add(1, "days");

    while (startDate.format("M/D/YYYY") !== endDate.format("M/D/YYYY")) {
      //console.log(startDate.toDate());
      dates.push(startDate.format("YYYY/MM/DD"));
      startDate = startDate.add(1, "days");
    }
    dates.push(startDate.format("YYYY/MM/DD"));
    return dates;
  };

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe((studentdata: any) => {
      this.studentview = studentdata;
      studentdata.dob = moment(studentdata.dob).format("YYYY/MM/DD");
      // console.log(this.studentview);
    });
  }

  getStudentAttendanceInfoById(id) {
    this.studentService
      .getStudentAttendanceInfoById(id)
      .subscribe((attendancedata: any) => {
        this.attendanceview = attendancedata;

        for (let k = 0; k < this.attendanceview.length; k++) {
          this.arrAttendanceData[this.attendanceview[k]._id] = {};
          for (let month = 0; month <= 11; month++) {
            for (let day = 1; day <= 31; day++) {
              if (!this.arrAttendanceData[this.attendanceview[k]._id][month]) {
                this.arrAttendanceData[this.attendanceview[k]._id][month] = {};
              }
              let dayNumber = moment()
                .year(this.year)
                .month(month)
                .date(day)
                .weekday();
              if (dayNumber == 0) {
                this.arrAttendanceData[this.attendanceview[k]._id][month][
                  day
                ] = {
                  type: "weekend",
                  label: "w"
                };
                this.weekend++;
              } else {
                this.arrAttendanceData[this.attendanceview[k]._id][month][
                  day
                ] = {
                  type: "na",
                  label: "N/A"
                };
              }
            }
          }

          for (let i = 0; i < this.attendanceview[k].doc.length; i++) {
            let year = moment(this.attendanceview[k].doc[i].date).year();
            let month = moment(this.attendanceview[k].doc[i].date).month();
            let date = moment(this.attendanceview[k].doc[i].date).date();
            if (year == this.year) {
              if (this.attendanceview[k].doc[i].attendance == 1) {
                this.arrAttendanceData[this.attendanceview[k]._id][month][
                  date
                ] = {
                  type: "present",
                  label: "P"
                };
                this.present++;
              } else if (this.attendanceview[k].doc[i].attendance == 2) {
                this.arrAttendanceData[this.attendanceview[k]._id][month][
                  date
                ] = {
                  type: "latewithexcuse",
                  label: "L/E"
                };
                this.le++;
              } else if (this.attendanceview[k].doc[i].attendance == 3) {
                this.arrAttendanceData[this.attendanceview[k]._id][month][
                  date
                ] = {
                  type: "latewithpresent",
                  label: "L"
                };
                this.lp++;
              } else {
                this.attendanceview[k].doc[i].attendance == 4;
                this.arrAttendanceData[this.attendanceview[k]._id][month][
                  date
                ] = {
                  type: "absent",
                  label: "A"
                };
                this.absent++;
              }
            }
          }
        }
      });
  }

  getLeaveByStudentId(id) {
    this.studentService
      .getLeaveByStudentId(id)
      .subscribe((studentleavedata: any) => {
        this.studentleaveList = studentleavedata;
        this.LeavedayDateList = [];

        for (let i = 0; i < this.studentleaveList.length; i++) {
          this.LeavedayDateList = this.LeavedayDateList.concat(
            this.enumerateDaysBetweenDates(
              moment(this.studentleaveList[i].from_date),
              moment(this.studentleaveList[i].to_date)
            ).filter(item => this.LeavedayDateList.indexOf(item) < 0)
          );
        }

        for (let i = 0; i < this.LeavedayDateList.length; i++) {
          let year = moment(this.LeavedayDateList[i]).year();
          let month = moment(this.LeavedayDateList[i]).month();
          let date = moment(this.LeavedayDateList[i]).date();
          if (year == this.year) {
            this.leaveapply++;
            for (let subject in this.arrAttendanceData) {
              this.arrAttendanceData[subject][month][date] = {
                type: "leaveapply",
                label: "L/A"
              };
            }
          }
        }
      });
  }

  getHolidayList() {
    this.holidayService.getHolidayList().subscribe((data: any) => {
      this.HolidayList = data;
      this.HolidayDateList = [];

      for (let i = 0; i < this.HolidayList.length; i++) {
        this.HolidayDateList = this.HolidayDateList.concat(
          this.enumerateDaysBetweenDates(
            moment(this.HolidayList[i].from_date),
            moment(this.HolidayList[i].to_date)
          ).filter(item => this.HolidayDateList.indexOf(item) < 0)
        );
      }

      for (let i = 0; i < this.HolidayDateList.length; i++) {
        let year = moment(this.HolidayDateList[i]).year();
        let month = moment(this.HolidayDateList[i]).month();
        let date = moment(this.HolidayDateList[i]).date();
        if (year == this.year) {
          this.holiday++;

          for (let subject in this.arrAttendanceData) {
            this.arrAttendanceData[subject][month][date] = {
              type: "holiday",
              label: "H"
            };
          }
        }
      }
    });
  }
}
