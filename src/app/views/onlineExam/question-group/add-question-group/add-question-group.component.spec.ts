import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionGroupComponent } from './add-question-group.component';

describe('AddQuestionGroupComponent', () => {
  let component: AddQuestionGroupComponent;
  let fixture: ComponentFixture<AddQuestionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
