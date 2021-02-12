import { INavData } from "@coreui/angular";
import { AuthGuard } from "./helpers/auth.guard";
export const navItems = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
    // badge: {
    //   variant: "info",
    //    text: "NEW"
    // }
  },
  {
    name: "Student",
    url: "/student",
    page: "STUDENT",
    icon: "icon-graduation"
  },
  {
    name: "Parents",
    page: "PARENT",
    url: "/parents",
    icon: "icon-user"
  },
  {
    name: "Teacher",
    page: "TEACHER",
    url: "/teacher",
    icon: "icon-people"
  },
  {
    name: "Academic",
    url: "/academic",
    icon: "fa fa-institution fa-lg",
    children: [
      {
        name: "Class",
        url: "/academic/class/class-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "CLASS"
      },
      {
        name: "Section",
        url: "/academic/section/section-list",
        icon: "fa fa-star fa-lg",
        page: "SECTION"
      },
      {
        name: "Subject",
        url: "/academic/subject/subject-list",
        icon: "fa fa-book fa-lg",
        page: "SUBJECT"
      },
      {
        name: "Syllabus",
        url: "/academic/syllabus/syllabus-list",
        icon: "fa fa-folder-o fa-lg",
        page: "SYLLABUS"
      },
      {
        name: "Assignment",
        url: "/academic/assignment/assignment-list",
        icon: "fa fa-tasks fa-lg",
        page: "ASSIGNMENT"
      },
      {
        name: "Timetable",
        url: "/academic/timetable/timetable-list",
        icon: "icon-clock",
        page: "TIMETABLE"
      }
    ]
  },
  {
    name: "Attendance",
    url: "/attendance",
    icon: "icon-people",

    children: [
      {
        name: "Student Attendance",
        url: "/attendance/studentattendance/student-attendance-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "STUDENT_ATTENDANCE"
      },
      {
        name: "Teacher Attendance",
        url: "/attendance/teacherattendance/teacher-attendance-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "TEACHER_ATTENDANCE"
      }
    ]
  },
  {
    name: "Exam",
    url: "/exam",
    icon: "fa fa-hourglass-half ",

    children: [
      {
        name: "Exam",
        url: "/exam/exam/exam-list",
        icon: "fa fa-pencil ",
        page: "EXAM"
      },
      {
        name: "Exam Schedule",
        url: "/exam/examschedule/exam-schedule-list",
        icon: "fa fa-puzzle-piece ",
        page: "EXAMSCHEDULE"
      },
      {
        name: "Grade",
        url: "/exam/grade/grade-list",
        icon: "fa fa-signal ",
        page: "GRADE"
      },
      {
        name: "Exam Attendane",
        url: "/exam/exam-attendance/exam-attendance-list",
        icon: "fa fa-signal ",
        page: "EXAM_ATTENDANCE"
      }
    ]
  },
  {
    name: "Leave Application",
    url: "/leaveappication",
    icon: "icon-people",

    children: [
      {
        name: "Leave Category ",
        url: "/leaveapplication/leavecategory/leave-category-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "LEAVE_CATEGORY"
      },
      {
        name: "Leave Assign",
        url: "/leaveapplication/leaveassign/leave-assign-list",
        icon: "fa fa-sliders   ",
        page: "LEAVE_ASSIGN"
      },
      {
        name: "Leave Apply",
        url: "/leaveapplication/leaveapply/leave-apply-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "LEAVE_APPLY"
      },
      {
        name: "Leave Application",
        url: "/leaveapplication/leaveapplications/leave-application-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "LEAVE_APPLICATION"
      }
    ]
  },
  {
    name: "Online Exam",
    url: "/online-exam",
    icon: "fa fa-graduation-cap",

    children: [
      {
        name: "Question Group ",
        url: "/online-exam/question-group/question-group-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "QUESTION_GROUP"
      },
      {
        name: "Question Level ",
        url: "/online-exam/question-level/question-level-list",
        icon: "fa fa-sitemap fa-lg ",
        page: "QUESTION_LEVEL"
      }
    ]
  },
  {
    name: "Announcement",
    url: "/announcement",
    icon: "icon-puzzle",
    children: [
      {
        name: "Notice",
        url: "/announcement/notice/notice-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "NOTICE"
      },
      {
        name: "Event",
        url: "/announcement/event/event-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "EVENT"
      },
      {
        name: "Holiday",
        url: "/announcement/holiday/holiday-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "HOLIDAY"
      }
    ]
  },
  {
    name: "Administrator",
    url: "/administrator",
    icon: "icon-puzzle",
    children: [
      {
        name: "Academic Year",
        url: "/administrator/academic-year/academic-year-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "ACADEMIC_YEAR"
      },
      // {
      //   name: "Role",
      //   url: "/administrator/role/role-list",
      //   icon: "fa fa-calendar-plus-o fa-lg"
      // },
      {
        name: "Student Group",
        url: "/administrator/student-group/student-group-list",
        icon: "fa fa-object-group",
        page: "STUDENT_GROUP"
      },
      {
        name: "Permission",
        url: "/administrator/permission/add-permission",
        icon: "fa fa-object-group",
        page: "PERMISSION"
      },
      {
        name: "System Admin",
        url: "/administrator/system-admin/system-admin-list",
        icon: "fa fa-object-group",
        page: "System_Admin"
      }
    ]
  },
  {
    name: "Mark",
    url: "/mark",
    icon: "fa fa-book fa-lg",
    children: [
      {
        name: "Mark",
        url: "/mark/marks/mark-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "MARK"
      },
      {
        name: "Mark Disribution",
        url: "/mark/mark-distribution/mark-distribution-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "MARK_DISTRIBUTION"
      }
    ]
  },
  {
    name: "Library",
    url: "/library",
    icon: "fa fa-book fa-lg",
    children: [
      {
        name: "Books",
        url: "/library/books/books-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "BOOKS"
      },
      {
        name: "Issue",
        url: "/library/issue/isssue-list",
        icon: "fa fa-calendar-plus-o fa-lg",
        page: "ISSUE"
      }
    ]
  }
];
