import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddTeacherAttendanceComponent } from "./teacher attendance/add-teacher-attendance/add-teacher-attendance.component";
import { EditTeacherAttendanceComponent } from "./teacher attendance/edit-teacher-attendance/edit-teacher-attendance.component";
import { TeacherAttendanceListComponent } from "./teacher attendance/teacher-attendance-list/teacher-attendance-list.component";
import { AddStudentAttendanceComponent } from "./student attendance/add-student-attendance/add-student-attendance.component";
import { StudentAttendanceListComponent } from "./student attendance/student-attendance-list/student-attendance-list.component";
import { StudentAttendanceViewComponent } from "./student attendance/student-attendance-view/student-attendance-view.component";
import { TeacherAttendanceViewComponent } from "./teacher attendance/teacher-attendance-view/teacher-attendance-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Attendance"
    },
    children: [
      {
        path: "",
        redirectTo: "teacherattendance/teacher-attendance-list"
      },
      {
        path: "teacherattendance/add-teacher-attendance",
        component: AddTeacherAttendanceComponent,
        data: {
          title: "Add Teacher Attendance"
        }
      },
      {
        path: "teacherattendance/teacher-attendance-list",
        component: TeacherAttendanceListComponent,
        data: {
          title: "Teacher Attendance List"
        }
      },
      {
        path: "teacherattendance/teacher-attendance-view/:id",
        component: TeacherAttendanceViewComponent,
        data: {
          title: "Teacher Attendance View"
        }
      },
      // {
      //   path: "exam/edit-exam/:id",
      //   component: EditExamComponent,
      //   data: {
      //     title: "Edit Exam"
      //   }
      // },
      {
        path: "",
        redirectTo: "studentattendance/student-attendance-list"
      },
      {
        path: "studentattendance/add-student-attendance",
        component: AddStudentAttendanceComponent,
        data: {
          title: "Add Student Attendance"
        }
      },
      {
        path: "studentattendance/student-attendance-list",
        component: StudentAttendanceListComponent,
        data: {
          title: "Student  Attendance List"
        }
      },
      {
        path: "studentattendance/student-attendance-view/:id",
        component: StudentAttendanceViewComponent,
        data: {
          title: "Student  Attendance View"
        }
      }
    ]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AttendanceRoutingModule {}
