import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgModel } from "@angular/forms";
import { StudentService } from "./../student.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { environment } from "../../../../environments/environment";
import { HolidayService } from "../../announcement/holiday/holiday.service";
import { MarkdistributionService } from "../../mark/mark-distribution/markdistribution.service";
import { MarksService } from "../../mark/marks/marks.service";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActionCellRendererComponent } from "../../agGridComponents/actionCellRendererComponent";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";
declare var $: any;

@Component({
  selector: "app-student-view",
  templateUrl: "./student-view.component.html",
  styleUrls: ["./student-view.component.css"]
})
export class StudentViewComponent implements OnInit {
  studentview: any;
  StudentId: any;
  parentsview: any;
  timetableview: any;
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
  createDocumentForm: FormGroup;
  DocumentList: any;
  marksview: any;
  marksDataList: any;
  MarkDistributionList: any;
  role: any;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private holidayService: HolidayService,
    private marksService: MarksService,
    private markdistributionService: MarkdistributionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.StudentId = params.id;
          this.getStudentById(this.StudentId);
          this.getStudentParentInfoById(this.StudentId);
          this.getStudentTimeTableInfoById(this.StudentId);
          this.getStudentAttendanceInfoById(this.StudentId);
          this.getHolidayList();
          this.getLeaveByStudentId(this.StudentId);
          this.getStudentMarkInfoById(this.StudentId);
          this.getDocumentListById(this.StudentId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/studnet-list"]);
        }
      }
    );
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
    this.studentService.uploadFile(uploadFile).subscribe((file: any) => {
      this.createDocumentForm.controls["file"].setValue(file.filename);

      this.studentService
        .addDocument(this.StudentId, this.createDocumentForm.value)
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

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe((studentdata: any) => {
      this.studentview = studentdata;

      studentdata.dob = moment(studentdata.dob).format("YYYY/MM/DD");
      // console.log(this.studentview);
    });
  }

  getStudentParentInfoById(id) {
    this.studentService
      .getStudentParentInfoById(id)
      .subscribe((parentsdata: any) => {
        this.parentsview = parentsdata;
        //  console.log(this.parentsview);
      });
  }

  getStudentTimeTableInfoById(id) {
    this.studentService
      .getStudentTimeTableInfoById(id)
      .subscribe((timetabledata: any) => {
        this.timetableview = timetabledata;
        this.timetableview = this.mapOrder(
          this.timetableview,
          this.day_order,
          "day"
        );
        console.log(this.timetableview);
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

  getMarkDistributionList() {
    this.markdistributionService
      .getMarkDistributionList()
      .subscribe((data: any) => {
        this.MarkDistributionList = data;
        this.marksDataList = [];
        //  this.marksDataList = this.marksview;

        for (let i = 0; i < this.marksview.length; i++) {
          let semObj = {};
          semObj["exam"] = this.marksview[i]._id;
          semObj["subjects"] = [];
          semObj["totalMarks"] = 0;
          semObj["totalObtainedMarks"] = 0;

          for (let j = 0; j < this.marksview[i].doc.length; j++) {
            let obj = {};
            let index = semObj["subjects"].findIndex(obj => {
              return obj.subject == this.marksview[i].doc[j].subject;
            });
            if (index > -1) {
              obj = semObj["subjects"][index];
            } else {
              obj["subject"] = this.marksview[i].doc[j].subject;
              obj["marks"] = [];
              obj["totalsubmark"] = 0;
            }

            for (let k = 0; k < this.MarkDistributionList.length; k++) {
              let markObj = {};

              let index = obj["marks"].findIndex(obj => {
                return obj._id == this.MarkDistributionList[k]._id;
              });
              if (index > -1) {
                markObj = obj["marks"][index];
              }

              if (
                this.MarkDistributionList[k]._id ==
                this.marksview[i].doc[j].markdistribution_info[0]._id
              ) {
                markObj["_id"] = this.MarkDistributionList[k]._id;
                markObj["val"] = this.marksview[i].doc[j].mark;
                markObj["maxval"] = this.MarkDistributionList[k].mark_value;

                semObj["totalMarks"] = semObj["totalMarks"] + markObj["val"];
                semObj["totalObtainedMarks"] =
                  semObj["totalObtainedMarks"] + markObj["maxval"];
                obj["totalsubmark"] = obj["totalsubmark"] + markObj["val"];

                console.log(obj["totalsubmark"]);
              } else {
                if (!markObj["_id"]) {
                  markObj["_id"] = this.MarkDistributionList[k]._id;
                  markObj["val"] = 0;
                  markObj["maxval"] = this.MarkDistributionList[k].mark_value;
                }
              }
              if (index == -1) {
                obj["marks"].push(markObj);
              }
            }
            if (index == -1) {
              semObj["subjects"].push(obj);
            }

            //console.log("#########", this.marksDataList);
          }

          this.marksDataList.push(semObj);
        }

        //console.log(this.marksDataList);
        // }
      });
  }

  printPage() {
    window.print();
  }

  getStudentMarkInfoById(id) {
    this.marksService.getStudentMarkInfoById(id).subscribe((marksdata: any) => {
      this.marksview = marksdata;
      this.getMarkDistributionList();
    });
  }

  open(content) {
    debugger;
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
    this.studentService.getDocumentListById(id).subscribe((data: any) => {
      this.DocumentList = data;
      //  console.log(this.DocumentList);

      this.agGrid.api.sizeColumnsToFit();
    });
  }

  deleteDocument = params => {
    this.studentService
      .deleteDocument(params.data._id)
      .subscribe((data: any) => {
        this.getDocumentListById(this.StudentId);
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
    this.studentService.downloadDocument(params.data.file);
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
