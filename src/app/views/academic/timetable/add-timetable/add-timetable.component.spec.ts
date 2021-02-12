import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTimetableComponent } from './add-timetable.component';
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

describe('AddTimetableComponent', () => {
  let component: AddTimetableComponent;
  let fixture: ComponentFixture<AddTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimetableComponent ],
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
    fixture = TestBed.createComponent(AddTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the  start_time control required',()=>{
    let control = component.createTimetableForm.get('start_time');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

  it('should make the year control required',()=>{
    let control = component.createTimetableForm.get('year');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  class control required',()=>{
    let control = component.createTimetableForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the section control required',()=>{
    let control = component.createTimetableForm.get('section');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the subject control required',()=>{
    let control = component.createTimetableForm.get('subject');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  day control required',()=>{
    let control = component.createTimetableForm.get('day');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the teacher control required',()=>{
    let control = component.createTimetableForm.get('teacher');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   

   it('should make the end_time control required',()=>{
    let control = component.createTimetableForm.get('end_time');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
