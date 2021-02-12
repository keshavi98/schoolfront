import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplyViewComponent } from './leave-apply-view.component';

describe('LeaveApplyViewComponent', () => {
  let component: LeaveApplyViewComponent;
  let fixture: ComponentFixture<LeaveApplyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
