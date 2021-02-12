import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeacherService } from "./../teacher.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { environment } from "../../../../environments/environment";
import { HolidayService } from "../../announcement/holiday/holiday.service";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActionCellRendererComponent } from "../../agGridComponents/actionCellRendererComponent";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";

@Component({
  selector: "app-teacher-view",
  templateUrl: "./teacher-view.component.html",
  styleUrls: ["./teacher-view.component.css"]
})
export class TeacherViewComponent implements OnInit {
  teacherview: any;
  TeacherId: any;
  timetableview: any;
  attendanceview: any;
  HolidayList: any;
  HolidayDateList: any;
  teacherleaveList: any;
  LeavedayDateList: any;

  holiday = 0;
  present = 0;
  absent = 0;
  le = 0;
  lp = 0;
  weekend = 0;
  leaveapply = 0;
  activeTab = 1;
  apiUrl = environment.apiUrl;
  year = moment().year();

  day_order = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THUSRDAY",
    "FRIDAY",
    "SATURDAY"
  ];

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
  closeResult: string;
  fileData: any;
  url: any;
  role: any;
  createDocumentForm: FormGroup;
  DocumentList: any;
  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private holidayService: HolidayService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.route.params.subscribe(params => {
      if (params.id) {
        for (let month = 0; month <= 11; month++) {
          for (let day = 1; day <= 31; day++) {
            if (!this.arrAttendanceData[month]) {
              this.arrAttendanceData[month] = {};
            }
            let dayNumber = moment()
              .year(this.year)
              .month(month)
              .date(day)
              .weekday();
            if (dayNumber == 0) {
              this.arrAttendanceData[month][day] = {
                type: "weekend",
                label: "w"
              };
              this.weekend++;
            } else {
              this.arrAttendanceData[month][day] = {
                type: "na",
                label: "N/A"
              };
            }
          }
        }

        this.TeacherId = params.id;
        this.getTeacherById(this.TeacherId);
        this.getTeacherTimeTableInfoById(this.TeacherId);
        this.getTeacherAttendanceInfoById(this.TeacherId);
        this.getHolidayList();
        this.getLeaveByTeacherId(this.TeacherId);
        this.getDocumentListById(this.TeacherId);
      }
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/teacher-list"]);
        }
      };
    });
    this.createDocumentForm = this.formBuilder.group({
      file: [""],
      file_name: ["", Validators.required],
      title: ["", Validators.required]
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

  addDocument(id) {
    const uploadFile = new FormData();
    uploadFile.append("file", this.fileData);
    this.teacherService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createDocumentForm.controls["file"].setValue(file.filename);

      this.teacherService
        .addDocument(this.TeacherId, this.createDocumentForm.value)
        .subscribe(
          assignment => {
            this.toastr.success("Document has been added successfully ");

            // this.router.navigate(["/student/student-list"]);
          },
          error => {
            this.toastr.error("Error while adding Document", "", {
              timeOut: 3000
            });
          }
        );
    });
  }

  getTeacherById(id) {
    this.teacherService.getTeacherById(id).subscribe((teacherdata: any) => {
      this.teacherview = teacherdata;
      teacherdata.dob = moment(teacherdata.dob).format("YYYY/MM/DD");
      teacherdata.joining_date = moment(teacherdata.joining_date).format(
        "YYYY/MM/DD"
      );
      // console.log(this.teacherview);
    });
  }

  getTeacherTimeTableInfoById(id) {
    this.teacherService
      .getTeacherTimeTableInfoById(id)
      .subscribe((timetabledata: any) => {
        this.timetableview = timetabledata;
        this.timetableview = this.mapOrder(
          this.timetableview,
          this.day_order,
          "day"
        );
        //console.log(this.timetableview);
      });
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
          this.arrAttendanceData[month][date] = { type: "holiday", label: "H" };
        }
      }
    });
  }

  getTeacherAttendanceInfoById(id) {
    this.teacherService
      .getTeacherAttendanceInfoById(id)
      .subscribe((attendancedata: any) => {
        this.attendanceview = attendancedata;
        // console.log(this.attendanceview);

        for (let i = 0; i < this.attendanceview.length; i++) {
          let year = moment(this.attendanceview[i].date).year();
          let month = moment(this.attendanceview[i].date).month();
          let date = moment(this.attendanceview[i].date).date();
          if (year == this.year) {
            if (this.attendanceview[i].attendance == 1) {
              this.arrAttendanceData[month][date] = {
                type: "present",
                label: "P"
              };
              this.present++;
            } else if (this.attendanceview[i].attendance == 2) {
              this.arrAttendanceData[month][date] = {
                type: "latewithexcuse",
                label: "L/E"
              };
              this.le++;
            } else if (this.attendanceview[i].attendance == 3) {
              this.arrAttendanceData[month][date] = {
                type: "latewithpresent",
                label: "L"
              };
              this.lp++;
            } else {
              this.attendanceview[i].attendance == 4;
              this.arrAttendanceData[month][date] = {
                type: "absent",
                label: "A"
              };
              this.absent++;
            }
          }
        }
      });
  }

  getLeaveByTeacherId(id) {
    this.teacherService
      .getLeaveByTeacherId(id)
      .subscribe((teacherleavedata: any) => {
        this.teacherleaveList = teacherleavedata;
        this.LeavedayDateList = [];

        for (let i = 0; i < this.teacherleaveList.length; i++) {
          this.LeavedayDateList = this.LeavedayDateList.concat(
            this.enumerateDaysBetweenDates(
              moment(this.teacherleaveList[i].from_date),
              moment(this.teacherleaveList[i].to_date)
            ).filter(item => this.LeavedayDateList.indexOf(item) < 0)
          );
        }

        for (let i = 0; i < this.LeavedayDateList.length; i++) {
          let year = moment(this.LeavedayDateList[i]).year();
          let month = moment(this.LeavedayDateList[i]).month();
          let date = moment(this.LeavedayDateList[i]).date();
          if (year == this.year) {
            this.leaveapply++;
            this.arrAttendanceData[month][date] = {
              type: "leaveapply",
              label: "L/A"
            };
          }
        }
      });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
  }

  mapOrder(array, order, key) {
    array.sort(function(a, b) {
      var A = a[key],
        B = b[key];

      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });

    return array;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  get title() {
    return this.createDocumentForm.get("title");
  }

  get file_name() {
    return this.createDocumentForm.get("file_name");
  }

  dateCellRenderer(params) {
    return moment(params.value).format("MM/DD/YYYY");
  }

  getDocumentListById(id) {
    this.teacherService.getDocumentListById(id).subscribe((data: any) => {
      this.DocumentList = data;

      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteDocument = params => {
    this.teacherService
      .deleteDocument(params.data._id)
      .subscribe((data: any) => {
        this.getDocumentListById(this.TeacherId);
        this.toastr.success("Document has been deteted successfully");
        //this.router.navigate(["/student/student-list"]);
      }),
      error => {
        this.toastr.error("Error while deleting Document", "", {
          timeOut: 3000
        });
      };
  };

  downloadDocument = params => {
    this.teacherService.downloadDocument(params.data.file);
    // .subscribe((data: any) => {
    //   // const blob = new Blob([data], { type: "text/csv" });

    //   let blob = new Blob([data], { type: "text/csv" });
    //   let url = window.URL.createObjectURL(blob);
    //   let pwa = window.open(url);
    //   if (!pwa || pwa.closed || typeof pwa.closed == "undefined") {
    //     this.toastr.error(
    //       "Please disable your Pop-up blocker and try again."
    //     );
    //   } else {
    //     this.toastr.success("Document has been Download successfully");
    //   }

    //   //this.router.navigate(["/student/student-list"]);
    // }),
    // error => {
    //   this.toastr.error("Error while deleting Download", "", {
    //     timeOut: 3000
    //   });
    // };
  };

  columnDefs = [
    {
      headerName: "",
      field: "rowSelect",
      colId: "rowSelect",
      width: 40,
      suppressMenu: true,
      suppressMovable: true,
      suppressNavigable: true,
      suppressResize: true,
      suppressSorting: true,
      pinned: "left",
      lockPosition: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      lockPinned: true,
      lockVisible: true,
      suppressToolPanel: true
    },

    { headerName: "title", field: "title", sortable: true, filter: true },

    {
      headerName: "Date",
      field: "created_at",
      sortable: true,
      filter: true,
      cellRenderer: this.dateCellRenderer
    },

    {
      headerName: "Action",
      field: "",
      cellRendererFramework: ActionCellRendererComponent,
      cellRendererParams: {
        //icon1: "cui-pencil",
        icon2: "cui-trash",
        icon4: "fa fa-download fa-lg ",
        // action1: params => {
        //   this.router.navigate(["/student/edit-student/", params.data._id]);
        // },
        action2: this.deleteDocument,
        action4: this.downloadDocument
      }
    }
  ];
}
