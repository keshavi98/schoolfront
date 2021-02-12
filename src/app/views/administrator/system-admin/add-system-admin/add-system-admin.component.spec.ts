import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSystemAdminComponent } from './add-system-admin.component';
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

describe('AddSystemAdminComponent', () => {
  let component: AddSystemAdminComponent;
  let fixture: ComponentFixture<AddSystemAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemAdminComponent ],
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
    fixture = TestBed.createComponent(AddSystemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the name control required',()=>{
    let control = component.createSystemAdminForm.get('name');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   // it('should make the email control required',()=>{
   //   let control = component.createTeacherForm.get('email');
   //   control.setValue('');
   //   expect(control.valid).toBeFalsy();
   // });
 
   it ('should make the dob control required',()=>{
     let control=component.createSystemAdminForm.get('dob');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
   
   it('should make the email control required',()=>{
    let control = component.createSystemAdminForm.get('email');
    control.setValue('xyz');
    expect(control.valid).toBeFalsy();
  });  

   it('should make the email control required',()=>{
    let control = component.createSystemAdminForm.get('email');
    control.setValue('xyz123@gmail.com');
    expect(control.valid).toBeTruthy();
  });
  it('should make the phone control required',()=>{
    let control = component.createSystemAdminForm.get('phone');
    control.setValue('12345678910');
    expect(control.valid).toBeFalsy();
  });

   it ('should make the joining_date control required',()=>{
     let control=component.createSystemAdminForm.get('joining_date');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the username control required',()=>{
     let control=component.createSystemAdminForm.get('username');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the password control required',()=>{
     let control=component.createSystemAdminForm.get('password');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
