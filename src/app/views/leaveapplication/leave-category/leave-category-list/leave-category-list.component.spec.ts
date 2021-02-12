import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCategoryListComponent } from './leave-category-list.component';

describe('LeaveCategoryListComponent', () => {
  let component: LeaveCategoryListComponent;
  let fixture: ComponentFixture<LeaveCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
