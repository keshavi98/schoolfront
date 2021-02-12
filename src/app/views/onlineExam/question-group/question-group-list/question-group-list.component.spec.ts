import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupListComponent } from './question-group-list.component';

describe('QuestionGroupListComponent', () => {
  let component: QuestionGroupListComponent;
  let fixture: ComponentFixture<QuestionGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
