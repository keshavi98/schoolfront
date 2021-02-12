import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationViewComponent } from './leave-application-view.component';

describe('LeaveApplicationViewComponent', () => {
  let component: LeaveApplicationViewComponent;
  let fixture: ComponentFixture<LeaveApplicationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplicationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
