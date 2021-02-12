import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherAttendanceComponent } from './edit-teacher-attendance.component';

describe('EditTeacherAttendanceComponent', () => {
  let component: EditTeacherAttendanceComponent;
  let fixture: ComponentFixture<EditTeacherAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeacherAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
