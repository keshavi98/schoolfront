import { Component, OnInit, ViewChild } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgModel } from "@angular/forms";
import { MarksService } from "../marks.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { StudentService } from "../../../student/student.service";
import { MarkdistributionService } from "../../mark-distribution/markdistribution.service";
import { environment } from "../../../../../environments/environment";
import { AgGridAngular } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActionCellRendererComponent } from "../../../agGridComponents/actionCellRendererComponent";
import "ag-grid-enterprise";
import { CellRendererFactory } from "ag-grid-community";
import { AnyARecord } from "dns";
import { GradeService } from '../../../exam/grade/grade.service';

@Component({
  selector: "app-mark-view",
  templateUrl: "./mark-view.component.html",
  styleUrls: ["./mark-view.component.css"]
})
export class MarkViewComponent implements OnInit {
  constructor(
    private router: Router,
    private studentService: StudentService,
    private marksService: MarksService,
    private markdistributionService: MarkdistributionService,
    private GradeService:GradeService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  StudentList: any;
  StudentId: any;
  MarkId: any;
  studentview: any;
  marksview: any;
  marksDataList: any;
  activeTab: 1;
  MarkDistributionList: any;
  gradeList:any;
  apiUrl = environment.apiUrl;

  @ViewChild("agGrid") agGrid: AgGridAngular;
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.MarkId = params.id;
          this.getStudentById(this.MarkId);
          this.getStudentMarkInfoById(this.MarkId);
          this.getAllGrade();
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["/mark-list"]);
        }
      }
    );
  }

  switchTab(tabId) {
    this.activeTab = tabId;
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe((studentdata: any) => {
      this.studentview = studentdata;
      studentdata.dob = moment(studentdata.dob).format("YYYY/MM/DD");
      // console.log(this.studentview);
    });
  }

  getMarkDistributionList() {
    this.markdistributionService
      .getMarkDistributionList()
      .subscribe((data: any) => {
        this.MarkDistributionList = data;
        this.marksDataList = [];
        

        for (let i = 0; i < this.marksview.length; i++) {
          let semObj = {};
          semObj["exam"] = this.marksview[i]._id;
          semObj["subjects"] = [];
          semObj["totalMarks"] = 0;
          semObj["totalObtainedMarks"] = 0;
          semObj["grade"]=[];
          semObj["grade1"]=this.gradeList;
          console.log(semObj["grade1"]);
          
          semObj["point"]=0;
        
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
              obj["grade"]=[]
              obj["point"]=0;
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

                for(let g =0;g<this.gradeList.length;g++){
                  if(obj["totalsubmark"]>=this.gradeList[g].mark_from && obj["totalsubmark"]<this.gradeList[g].mark_upto)
                  {
                  obj["grade"]=this.gradeList[g].gradename;
                  obj["point"]=this.gradeList[g].gradepoint;
                 
                  }
               
                }
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
          }
          this.marksDataList.push(semObj);
        }
      });
  }

  getStudentMarkInfoById(id) {
    this.marksService.getStudentMarkInfoById(id).subscribe((marksdata: any) => {
      this.marksview = marksdata;
      
      this.getMarkDistributionList();
    });
  }

  getAllGrade() {
    this.GradeService.getAllGrade().subscribe((data: any) => {
      this.gradeList = data;
     // this.getMarkDistributionList();
    });
  }
}
