import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupListComponent } from './student-group-list.component';

describe('StudentGroupListComponent', () => {
  let component: StudentGroupListComponent;
  let fixture: ComponentFixture<StudentGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
