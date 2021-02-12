import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExamScheduleComponent } from './edit-exam-schedule.component';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ToastrService } from "ngx-toastr";
import { ToastrModule } from 'ngx-toastr';
declare var $: any;


describe('EditExamScheduleComponent', () => {
  let component: EditExamScheduleComponent;
  let fixture: ComponentFixture<EditExamScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExamScheduleComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule ,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
            ],
    providers: [FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should make the exam_name control required',()=>{
  //   let control = component.createExamscheduleForm.get('exam_name');  
  //    control.setValue('');
  //    expect(control.valid).toBeFalsy();
  //  });

  //  it('should make the section control required',()=>{
  //   let control = component.createExamscheduleForm.get('section');  
  //    control.setValue('');
  //    expect(control.valid).toBeFalsy();
  //  });

  //  it('should make the subject control required',()=>{
  //   let control = component.createExamscheduleForm.get('subject');  
  //    control.setValue('');
  //    expect(control.valid).toBeFalsy();
  //  });

  //  it('should make the date control required',()=>{
  //   let control = component.createExamscheduleForm.get('date');  
  //    control.setValue('');
  //    expect(control.valid).toBeFalsy();
  //  });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
