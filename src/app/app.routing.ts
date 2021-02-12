import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { AuthGuard } from "./helpers/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404"
    }
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page"
    }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page"
    }
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home"
    },
    children: [
      {
        path: "base",
        loadChildren: () =>
          import("./views/base/base.module").then(m => m.BaseModule)
      },
      {
        path: "parents",
        loadChildren: () =>
          import("./views/parents/parents.module").then(m => m.ParentsModule),
        canActivate: [AuthGuard]
      },
      {
        path: "teacher",
        loadChildren: () =>
          import("./views/teacher/teacher.module").then(m => m.TeacherModule),
        canActivate: [AuthGuard]
      },
      {
        path: "academic",
        loadChildren: () =>
          import("./views/academic/academic.module").then(
            m => m.AcademicModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "exam",
        loadChildren: () =>
          import("./views/exam/exam.module").then(m => m.ExamModule),
        canActivate: [AuthGuard]
      },
      {
        path: "attendance",
        loadChildren: () =>
          import("./views/attendance/attendance.module").then(
            m => m.AttendanceModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "leaveapplication",
        loadChildren: () =>
          import("./views/leaveapplication/leaveapplication.module").then(
            m => m.LeaveapplicationModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "online-exam",
        loadChildren: () =>
          import("./views/onlineExam/online-exam.module").then(
            m => m.OnlineExamModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "administrator",
        loadChildren: () =>
          import("./views/administrator/administrator.module").then(
            m => m.AdministratorModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "announcement",
        loadChildren: () =>
          import("./views/announcement/announcement.module").then(
            m => m.AnnouncementModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "library",
        loadChildren: () =>
          import("./views/library/library.module").then(m => m.LibraryModule),
        canActivate: [AuthGuard]
      },
      {
        path: "mark",
        loadChildren: () =>
          import("./views/mark/mark.module").then(m => m.MarkModule),
        canActivate: [AuthGuard]
      },
      {
        path: "student",
        loadChildren: () =>
          import("./views/student/student.module").then(m => m.StudentModule),
        canActivate: [AuthGuard]
      },
      {
        path: "buttons",
        loadChildren: () =>
          import("./views/buttons/buttons.module").then(m => m.ButtonsModule),
        canActivate: [AuthGuard]
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./views/chartjs/chartjs.module").then(m => m.ChartJSModule),
        canActivate: [AuthGuard]
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            m => m.DashboardModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/icons/icons.module").then(m => m.IconsModule)
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./views/notifications/notifications.module").then(
            m => m.NotificationsModule
          )
      },
      {
        path: "theme",
        loadChildren: () =>
          import("./views/theme/theme.module").then(m => m.ThemeModule)
      },
      {
        path: "widgets",
        loadChildren: () =>
          import("./views/widgets/widgets.module").then(m => m.WidgetsModule)
      }
    ]
  },
  { path: "**", component: P404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
