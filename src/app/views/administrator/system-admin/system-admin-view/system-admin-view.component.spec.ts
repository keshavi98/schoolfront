import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminViewComponent } from './system-admin-view.component';

describe('SystemAdminViewComponent', () => {
  let component: SystemAdminViewComponent;
  let fixture: ComponentFixture<SystemAdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
