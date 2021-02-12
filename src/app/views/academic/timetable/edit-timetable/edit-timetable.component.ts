import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "../../academic.service";
import { ToastrService } from "ngx-toastr";
import { TimetableService } from "../timetable.service";
import { AdministratorService } from "../../../administrator/administrator.service";
declare let $ :any;
@Component({
  selector: "app-edit-timetable",
  templateUrl: "./edit-timetable.component.html",
  styleUrls: ["./edit-timetable.component.css"]
})
export class EditTimetableComponent implements OnInit {
  ClassList: any;
  SubjectList: any;
  SectionList: any;
  allTeacherList: any;
  TeacherList: any;
  timetableId: any;
  AcademicyearList: any;
  createTimetableForm: FormGroup;
  Section: any = "";
  classSubjectList: any;
  classSectionList: any;
  subjectTeacherList: any;
  selectedClassSubject: [];
  role:any;
  userData:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private timetableService: TimetableService,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private administratorService: AdministratorService
  ) {}

  ngOnInit() {
    $(document).ready(function() {
      $('#start_time').timepicker({
        timeFormat: 'hh:mm ',
        interval: 60,
        dynamic: false,
        dropdown: true,
        scrollbar: true
      });
      $("#end_time").timepicker({
        timeFormat: 'hh:mm',
        dynamic: false,
        dropdown: true,
        scrollbar: true
      });
   });
    this.role=localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();
    this.getAllTeacher();
    this.getAllAcademicYear();
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.timetableId = params.id;
          this.getTimetableById(this.timetableId);
        }
      },
      catchError => {
        if (catchError.status && catchError.status == 500) {
          this.router.navigate(["assignment/assignment-list"]);
        }
      }
    );
    this.createTimetableForm = this.formBuilder.group({
      year: ["", Validators.required],
      class: ["", Validators.required],
      section: ["", Validators.required],
      subject: ["", Validators.required],
      day: ["", Validators.required],
      teacher: ["", Validators.required],
      start_time: ["", Validators.required],
      end_time: ["", Validators.required],
      room: ["", Validators.required],
      status: [""]
    });
    
  }

  onDateChanged(){
    
    this.createTimetableForm.controls["start_time"].setValue(
        $("#start_time").val()
    );
    this.createTimetableForm.controls["_time"].setValue(
      $("#end_time").val()
  );
 
}

  editTimetable() {
    this.timetableService
      .editTimetable(this.timetableId, this.createTimetableForm.value)
      .subscribe(
        timetable => {
          this.toastr.success("Timetable has been edited successfully ");

          this.router.navigate(["academic/timetable/timetable-list"]);
        },
        error => {
          this.toastr.error("Error while editing Timetable", "", {
            timeOut: 3000
          });
        }
      );
  }

  getAllClass() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllClass(data).subscribe((data: any) => {
      this.ClassList = data;
    });
  }
  getAllAcademicYear() {
    this.administratorService.getAllAcademicYear().subscribe((data: any) => {
      this.AcademicyearList = data;
    });
  }
  getAllTeacher() {
    this.academicService.getAllTeacher().subscribe((data: any) => {
      this.TeacherList = data;
    });
  }

  getAllSubject() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSubject(data).subscribe((data: any) => {
      this.SubjectList = data;
    });
  }

  getAllSection() {
    let data = {
    
    };
    if (this.role == 4) {
      data["parents"] = this.userData._id;
    } 
    this.academicService.getAllSection(data).subscribe((data: any) => {
      this.SectionList = data;
    });
  }
  getTimetableById(id) {
    this.timetableService
      .getTimetableById(id)
      .subscribe((timetabledata: any) => {
        this.createTimetableForm.controls["year"].setValue(timetabledata.year);
        this.createTimetableForm.controls["day"].setValue(timetabledata.day);
        this.createTimetableForm.controls["class"].setValue(
          timetabledata.class
        );
        this.onClassChanged();

        this.createTimetableForm.controls["subject"].setValue(
          timetabledata.subject
        );
        this.onSubjectChanged();
        this.createTimetableForm.controls["start_time"].setValue(
          timetabledata.start_time
        );
        this.createTimetableForm.controls["section"].setValue(
          timetabledata.section
        );
        this.createTimetableForm.controls["teacher"].setValue(
          timetabledata.teacher
        );
        this.createTimetableForm.controls["room"].setValue(timetabledata.room);
        this.createTimetableForm.controls["end_time"].setValue(
          timetabledata.end_time
        );
        this.createTimetableForm.controls["status"].setValue(
          timetabledata.status
        );
      });
  }

  onClassChanged() {
    this.createTimetableForm.controls["section"].setValue("");
    this.classSectionList = this.SectionList.filter(section => {
      return section.class == this.createTimetableForm.value.class;
    });
    this.createTimetableForm.controls["subject"].setValue("");
    this.classSubjectList = this.SubjectList.filter(subject => {
      return subject.class == this.createTimetableForm.value.class;
    });
    this.createTimetableForm.controls["teacher"].setValue("");
    this.subjectTeacherList = [];
  }
  onSubjectChanged() {
    // this.createTimetableForm.controls["teacher"].setValue("");

    // this.subjectTeacherList = this.TeacherList.filter(teacher => {
    //   return teacher.subject == this.createTimetableForm.value.subject;
    // });
    this.createTimetableForm.controls["teacher"].setValue("");
    let selectedSubjectTeacher = this.SubjectList.filter(subject => {
      return subject._id == this.createTimetableForm.value.subject;
    })[0].teacher;
    this.subjectTeacherList = this.TeacherList.filter(teacher => {
      return teacher._id == selectedSubjectTeacher;
    });
  }

  resetTimetable() {
    this.createTimetableForm.reset();
  }
  get year() {
    return this.createTimetableForm.get("year");
  }

  get day() {
    return this.createTimetableForm.get("day");
  }
  get class() {
    return this.createTimetableForm.get("class");
  }
  get section() {
    return this.createTimetableForm.get("section");
  }
  get subject() {
    return this.createTimetableForm.get("subject");
  }
  get teacher() {
    return this.createTimetableForm.get("teacher");
  }
  get start_time() {
    return this.createTimetableForm.get("start_time");
  }
  get end_time() {
    return this.createTimetableForm.get("end_time");
  }
  get room() {
    return this.createTimetableForm.get("room");
  }
}
