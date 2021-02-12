import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLevelListComponent } from './question-level-list.component';

describe('QuestionLevelListComponent', () => {
  let component: QuestionLevelListComponent;
  let fixture: ComponentFixture<QuestionLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
