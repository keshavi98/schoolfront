import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsViewComponent } from './parents-view.component';

describe('ParentsViewComponent', () => {
  let component: ParentsViewComponent;
  let fixture: ComponentFixture<ParentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
