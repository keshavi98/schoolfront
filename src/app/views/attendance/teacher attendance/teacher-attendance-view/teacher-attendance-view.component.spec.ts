import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceViewComponent } from './teacher-attendance-view.component';

describe('TeacherAttendanceViewComponent', () => {
  let component: TeacherAttendanceViewComponent;
  let fixture: ComponentFixture<TeacherAttendanceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttendanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
