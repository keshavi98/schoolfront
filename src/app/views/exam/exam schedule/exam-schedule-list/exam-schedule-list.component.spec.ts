import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamScheduleListComponent } from './exam-schedule-list.component';

describe('ExamScheduleListComponent', () => {
  let component: ExamScheduleListComponent;
  let fixture: ComponentFixture<ExamScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
