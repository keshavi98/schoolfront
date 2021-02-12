import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionLevelComponent } from './add-question-level.component';

describe('AddQuestionLevelComponent', () => {
  let component: AddQuestionLevelComponent;
  let fixture: ComponentFixture<AddQuestionLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
