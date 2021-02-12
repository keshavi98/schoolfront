import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExamAttendanceComponent } from './edit-exam-attendance.component';

describe('EditExamAttendanceComponent', () => {
  let component: EditExamAttendanceComponent;
  let fixture: ComponentFixture<EditExamAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExamAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
