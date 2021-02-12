import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDistributionListComponent } from './mark-distribution-list.component';

describe('MarkDistributionListComponent', () => {
  let component: MarkDistributionListComponent;
  let fixture: ComponentFixture<MarkDistributionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkDistributionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDistributionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
