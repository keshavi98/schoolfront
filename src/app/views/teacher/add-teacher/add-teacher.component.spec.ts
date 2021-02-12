import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTeacherComponent } from './add-teacher.component';
//import { FormBuilder } from "@angular/forms";
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

describe('AddTeacherComponent', () => {
  let component: AddTeacherComponent;
  let fixture: ComponentFixture<AddTeacherComponent>;
   beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      declarations: [ AddTeacherComponent ],
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
    fixture = TestBed.createComponent(AddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with 6 controls',()=>{
    expect(component.createTeacherForm.contains('name')).toBeTruthy();
    expect(component.createTeacherForm.contains('email')).toBeTruthy();
    expect(component.createTeacherForm.contains('dob')).toBeTruthy();
    expect(component.createTeacherForm.contains('designation')).toBeTruthy(); 
    expect(component.createTeacherForm.contains('username')).toBeTruthy();
    expect(component.createTeacherForm.contains('password')).toBeTruthy();
    expect(component.createTeacherForm.contains('phone')).toBeTruthy();
    
  });

  it('should make the name control required',()=>{
    let control = component.createTeacherForm.get('name');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
  //  it('should make the email control required',()=>{
  //    let control = component.createTeacherForm.get('email');
  //    control.setValue('');
  //    expect(control.valid).toBeFalsy();
  //  });

   it('should make the email control required',()=>{
    let control = component.createTeacherForm.get('email');
    control.setValue('xyz');
    expect(control.valid).toBeFalsy();
  });  

   it('should make the email control required',()=>{
    let control = component.createTeacherForm.get('email');
    control.setValue('xyz123@gmail.com');
    expect(control.valid).toBeTruthy();
  });
 
   it ('should make the dob control required',()=>{
     let control=component.createTeacherForm.get('dob');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the designation control required',()=>{
     let control=component.createTeacherForm.get('designation');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it('should make the phone control required',()=>{
    let control = component.createTeacherForm.get('phone');  
     control.setValue('1234567832');
     expect(control.valid).toBeFalsy();
   });
 
   it ('should make the username control required',()=>{
     let control=component.createTeacherForm.get('username');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the password control required',()=>{
     let control=component.createTeacherForm.get('password');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
  
 

  // it(`should have a title 'I love pizza!'`, async(() => {
  //   fixture = TestBed.createComponent(AddTeacherComponent);
  //   component = fixture.debugElement.componentInstance;
  //   expect(component.title).toEqual('I love pizza!');
  // }));
});
