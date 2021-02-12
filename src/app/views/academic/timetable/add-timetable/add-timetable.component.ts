import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TimetableService } from "../timetable.service";
import { AcademicService } from "../../academic.service";
import { AdministratorService } from "../../../administrator/administrator.service";
import { ToastrService } from "ngx-toastr";
declare let $:any;
@Component({
  selector: "app-add-timetable",
  templateUrl: "./add-timetable.component.html",
  styleUrls: ["./add-timetable.component.css"]
})
export class AddTimetableComponent implements OnInit {
  Section: any = "";
  ClassList: any;
  SubjectList: any;
  classSubjectList: any;
  SectionList: any;
  classSectionList: any;
  TeacherList: any;
  subjectTeacherList: any;
  AcademicyearList: any;
  createTimetableForm: FormGroup;
  selectedClassSubject: [];
  role:any;
  userData:any;
  constructor(
    private router: Router,
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
   
    this.role = localStorage.getItem("role");
    this.getAllClass();
    this.getAllSection();
    this.getAllSubject();
    this.getAllTeacher();
    this.getAllAcademicYear();
    this.createTimetableForm = this.formBuilder.group({
      year: ["", Validators.required],
      class: ["", Validators.required],
      section: ["", Validators.required],
      subject: ["", Validators.required],
      day: ["", Validators.required],
      teacher: ["", Validators.required],
      start_time: ["", Validators.required],
      end_time: ["", Validators.required],
      room: ["", Validators.required]
    });
  }
  
  onDateChanged(){
    
    this.createTimetableForm.controls["start_time"].setValue(
        $("#start_time").val()
    );
    this.createTimetableForm.controls["end_time"].setValue(
      $("#end_time").val()
  );
 
}
  addTimetable() {
    this.timetableService
      .addTimetable(this.createTimetableForm.value)
      .subscribe(
        timetable => {
          this.toastr.success("Timetable has been added successfully ");

          this.router.navigate(["academic/timetable/timetable-list"]);
        },
        error => {
          this.toastr.error("Error while adding Timetable", "", {
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
