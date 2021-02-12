import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplictionListComponent } from './leave-appliction-list.component';

describe('LeaveApplictionListComponent', () => {
  let component: LeaveApplictionListComponent;
  let fixture: ComponentFixture<LeaveApplictionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplictionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplictionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
