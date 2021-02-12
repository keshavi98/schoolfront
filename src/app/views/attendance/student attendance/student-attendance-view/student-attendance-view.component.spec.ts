import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceViewComponent } from './student-attendance-view.component';

describe('StudentAttendanceViewComponent', () => {
  let component: StudentAttendanceViewComponent;
  let fixture: ComponentFixture<StudentAttendanceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendanceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
