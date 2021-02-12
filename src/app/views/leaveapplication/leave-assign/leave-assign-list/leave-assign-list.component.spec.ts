import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAssignListComponent } from './leave-assign-list.component';

describe('LeaveAssignListComponent', () => {
  let component: LeaveAssignListComponent;
  let fixture: ComponentFixture<LeaveAssignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveAssignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
