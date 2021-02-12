import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAttendanceListComponent } from './exam-attendance-list.component';

describe('ExamAttendanceListComponent', () => {
  let component: ExamAttendanceListComponent;
  let fixture: ComponentFixture<ExamAttendanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAttendanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAttendanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
