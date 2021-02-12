import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplyListComponent } from './leave-apply-list.component';

describe('LeaveApplyListComponent', () => {
  let component: LeaveApplyListComponent;
  let fixture: ComponentFixture<LeaveApplyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
