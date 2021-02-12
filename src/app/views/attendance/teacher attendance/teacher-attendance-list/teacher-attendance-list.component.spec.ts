import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceListComponent } from './teacher-attendance-list.component';

describe('TeacherAttendanceListComponent', () => {
  let component: TeacherAttendanceListComponent;
  let fixture: ComponentFixture<TeacherAttendanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttendanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
