import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionLevelComponent } from './edit-question-level.component';

describe('EditQuestionLevelComponent', () => {
  let component: EditQuestionLevelComponent;
  let fixture: ComponentFixture<EditQuestionLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
