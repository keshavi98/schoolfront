import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSubjectComponent } from './edit-subject.component';
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

describe('EditSubjectComponent', () => {
  let component: EditSubjectComponent;
  let fixture: ComponentFixture<EditSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubjectComponent ],
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
    fixture = TestBed.createComponent(EditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should make the pass_mark control required',()=>{
    let control = component.createSubjectForm.get('pass_mark');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the final_mark control required',()=>{
    let control = component.createSubjectForm.get('final_mark');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the   subject_name control required',()=>{
    let control = component.createSubjectForm.get('subject_name');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the   subject_code control required',()=>{
    let control = component.createSubjectForm.get('subject_code');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the class control required',()=>{
    let control = component.createSubjectForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the teacher control required',()=>{
    let control = component.createSubjectForm.get('teacher');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
