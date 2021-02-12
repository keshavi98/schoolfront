import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AddStudentComponent } from './add-student.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ToastrService } from "ngx-toastr";
import { ToastrModule } from 'ngx-toastr';
declare var $: any;

describe('AddStudentComponent', () => {
  let component: AddStudentComponent;
  let fixture: ComponentFixture<AddStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentComponent ],
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
    fixture = TestBed.createComponent(AddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create a form with 9 controls',()=>{
  //   expect(component.createStudentForm.contains('studet_name')).toBeTruthy();
  //   expect(component.createStudentForm.contains('register_no')).toBeTruthy();
  //   expect(component.createStudentForm.contains('dob')).toBeTruthy();
  //   expect(component.createStudentForm.contains('roll_no')).toBeTruthy(); 
  //   expect(component.createStudentForm.contains('email')).toBeTruthy();
  //   expect(component.createStudentForm.contains('class')).toBeTruthy();
  //   expect(component.createStudentForm.contains('section')).toBeTruthy(); 
  //   expect(component.createStudentForm.contains('username')).toBeTruthy();
  //   expect(component.createStudentForm.contains('password')).toBeTruthy();
  //   expect(component.createStudentForm.contains('parents')).toBeTruthy();
  // });

  

  it('should make the student_name control required',()=>{
    let control = component.createStudentForm.get('student_name');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   it('should make the email control required',()=>{
    let control = component.createStudentForm.get('email');
    control.setValue('xyz');
    expect(control.valid).toBeFalsy();
  });  

   it('should make the email control required',()=>{
    let control = component.createStudentForm.get('email');
    control.setValue('xyz123@gmail.com');
    expect(control.valid).toBeTruthy();
  });

   it('should make the phone control required',()=>{
    let control = component.createStudentForm.get('phone');  
     control.setValue('1234567832');
     expect(control.valid).toBeFalsy();
   });
 
   it ('should make the dob control required',()=>{
     let control=component.createStudentForm.get('dob');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })

 
   it ('should make the username control required',()=>{
     let control=component.createStudentForm.get('username');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
  
   it ('should make the password control required',()=>{
     let control=component.createStudentForm.get('password');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })

   it ('should make the register_no control required',()=>{
    let control=component.createStudentForm.get('register_no');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })

  it ('should make the roll_no control required',()=>{
    let control=component.createStudentForm.get('roll_no');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })

  it ('should make the class control required',()=>{
    let control=component.createStudentForm.get('class');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })
  
  it ('should make the section control required',()=>{
    let control=component.createStudentForm.get('section');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })
  
  it ('should make the parents control required',()=>{
    let control=component.createStudentForm.get('parents');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  })
  
 
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
