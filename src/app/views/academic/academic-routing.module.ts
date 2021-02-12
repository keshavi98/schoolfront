import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddClassComponent } from "./class/add-class/add-class.component";
import { ClassListComponent } from "./class/class-list/class-list.component";
import { EditClassComponent } from "./class/edit-class/edit-class.component";
import { AddSectionComponent } from "./section/add-section/add-section.component";
import { EditSectionComponent } from "./section/edit-section/edit-section.component";
import { SectionListComponent } from "./section/section-list/section-list.component";
import { AddSubjectComponent } from "./subject/add-subject/add-subject.component";
import { EditSubjectComponent } from "./subject/edit-subject/edit-subject.component";
import { SubjectListComponent } from "./subject/subject-list/subject-list.component";
import { AddSyllabusComponent } from "./syllabus/add-syllabus/add-syllabus.component";
import { EditSyllabusComponent } from "./syllabus/edit-syllabus/edit-syllabus.component";
import { SyllabusListComponent } from "./syllabus/syllabus-list/syllabus-list.component";
import { AddAssignmentComponent } from "./assignment/add-assignment/add-assignment.component";
import { EditAssignmentComponent } from "./assignment/edit-assignment/edit-assignment.component";
import { AssignmentListComponent } from "./assignment/assignment-list/assignment-list.component";
import { AddTimetableComponent } from "./timetable/add-timetable/add-timetable.component";
import { EditTimetableComponent } from "./timetable/edit-timetable/edit-timetable.component";
import { TimetableListComponent } from "./timetable/timetable-list/timetable-list.component";
import { AssignmentViewComponent } from "./assignment/assignment-view/assignment-view.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Academic"
    },
    children: [
      {
        path: "",
        redirectTo: "class/class-list"
      },
      {
        path: "class/add-class",
        component: AddClassComponent,
        data: {
          title: "Add Class"
        }
      },
      {
        path: "class/class-list",
        component: ClassListComponent,
        data: {
          title: "Class List"
        }
      },
      {
        path: "class/edit-class/:id",
        component: EditClassComponent,
        data: {
          title: "Edit Class"
        }
      },
      {
        path: "",
        redirectTo: "section/section-list"
      },
      {
        path: "section/add-section",
        component: AddSectionComponent,
        data: {
          title: "Add Section"
        }
      },
      {
        path: "section/section-list",
        component: SectionListComponent,
        data: {
          title: "Section List"
        }
      },
      {
        path: "section/edit-section/:id",
        component: EditSectionComponent,
        data: {
          title: "Edit section"
        }
      },
      {
        path: "subject/add-subject",
        component: AddSubjectComponent,
        data: {
          title: "Add Subject"
        }
      },
      {
        path: "subject/subject-list",
        component: SubjectListComponent,
        data: {
          title: "Subject List"
        }
      },
      {
        path: "subject/edit-subject/:id",
        component: EditSubjectComponent,
        data: {
          title: "Edit Subject"
        }
      },
      {
        path: "syllabus/add-syllabus",
        component: AddSyllabusComponent,
        data: {
          title: "Add Syllabus"
        }
      },
      {
        path: "syllabus/syllabus-list",
        component: SyllabusListComponent,
        data: {
          title: "Syllabus List"
        }
      },
      {
        path: "syllabus/edit-syllabus/:id",
        component: EditSyllabusComponent,
        data: {
          title: "Edit Syllabus"
        }
      },
      {
        path: "assignment/add-assignment",
        component: AddAssignmentComponent,
        data: {
          title: "Add Assignment"
        }
      },
      {
        path: "assignment/assignment-list",
        component: AssignmentListComponent,
        data: {
          title: "Assignment List"
        }
      },
      {
        path: "assignment/edit-assignment/:id",
        component: EditAssignmentComponent,
        data: {
          title: "Edit Assignment"
        }
      },
      {
        path: "assignment/assignment-view/:id",
        component: AssignmentViewComponent,
        data: {
          title: " Assignment View"
        }
      },
      {
        path: "timetable/add-timetable",
        component: AddTimetableComponent,
        data: {
          title: "Add TimeTable"
        }
      },
      {
        path: "timetable/timetable-list",
        component: TimetableListComponent,
        data: {
          title: "TimeTable List"
        }
      },
      {
        path: "timetable/edit-timetable/:id",
        component: EditTimetableComponent,
        data: {
          title: "Edit TimeTable"
        }
      }
    ]
  }
];

@NgModule({
  //imports: [RouterModule.forChild(routes)],
   imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forRoot([]).forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AcademicRoutingModule {}
