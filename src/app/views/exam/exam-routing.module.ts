import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddExamComponent } from "./exam/add-exam/add-exam.component";
import { EditExamComponent } from "./exam/edit-exam/edit-exam.component";
import { ExamListComponent } from "./exam/exam-list/exam-list.component";
import { AddExamScheduleComponent } from "./exam schedule/add-exam-schedule/add-exam-schedule.component";
import { EditExamScheduleComponent } from "./exam schedule/edit-exam-schedule/edit-exam-schedule.component";
import { ExamScheduleListComponent } from "./exam schedule/exam-schedule-list/exam-schedule-list.component";
import { AddGradeComponent } from "./grade/add-grade/add-grade.component";
import { EditGradeComponent } from "./grade/edit-grade/edit-grade.component";
import { GradeListComponent } from "./grade/grade-list/grade-list.component";
import { AddExamAttendanceComponent } from "./exam-attendance/add-exam-attendance/add-exam-attendance.component";
import { EditExamAttendanceComponent } from "./exam-attendance/edit-exam-attendance/edit-exam-attendance.component";
import { ExamAttendanceListComponent } from "./exam-attendance/exam-attendance-list/exam-attendance-list.component";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Exam"
    },
    children: [
      {
        path: "",
        redirectTo: "exam/exam-list"
      },
      {
        path: "exam/add-exam",
        component: AddExamComponent,
        data: {
          title: "Add Exam"
        }
      },
      {
        path: "exam/exam-list",
        component: ExamListComponent,
        data: {
          title: "Exam List"
        }
      },
      {
        path: "exam/edit-exam/:id",
        component: EditExamComponent,
        data: {
          title: "Edit Exam"
        }
      },
      {
        path: "",
        redirectTo: "examschedule/exam-schedule-list"
      },
      {
        path: "examschedule/add-exam-schedule",
        component: AddExamScheduleComponent,
        data: {
          title: "Add Exam Schedule"
        }
      },
      {
        path: "examschedule/exam-schedule-list",
        component: ExamScheduleListComponent,
        data: {
          title: "Exam Schedule List"
        }
      },
      {
        path: "examschedule/edit-exam-schedule/:id",
        component: EditExamScheduleComponent,
        data: {
          title: "Edit Exam Schedule"
        }
      },
      {
        path: "",
        redirectTo: "grade/grade-list"
      },
      {
        path: "grade/add-grade",
        component: AddGradeComponent,
        data: {
          title: "Add Grade"
        }
      },
      {
        path: "grade/grade-list",
        component: GradeListComponent,
        data: {
          title: "Grade List"
        }
      },
      {
        path: "grade/edit-grade/:id",
        component: EditGradeComponent,
        data: {
          title: "Edit Grade"
        }
      },
      {
        path: "",
        redirectTo: "exam-attendance/exam-attendance-list"
      },
      {
        path: "exam-attendance/add-exam-attendance",
        component: AddExamAttendanceComponent,
        data: {
          title: "Add Exam Attendance"
        }
      },
      {
        path: "exam-attendance/exam-attendance-list",
        component: ExamAttendanceListComponent,
        data: {
          title: "Exam Attendance List"
        }
      },
      {
        path: "exam-attendance/edit-exam-attendance/:id",
        component: EditExamAttendanceComponent,
        data: {
          title: "Edit Exam Attendance"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class ExamRoutingModule {}
