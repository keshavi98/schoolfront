import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddParentsComponent } from './add-parents.component';
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

describe('AddParentsComponent', () => {
  let component: AddParentsComponent;
  let fixture: ComponentFixture<AddParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentsComponent ],
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
    fixture = TestBed.createComponent(AddParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the phone control required',()=>{
    let control = component.createParentsForm.get('phone');  
     control.setValue('123456789');
     expect(control.valid).toBeFalsy();
   });
 
 
  it('should make the email control required',()=>{
    let control = component.createParentsForm.get('email');
    control.setValue('xyz');
    expect(control.valid).toBeFalsy();
  });  

   it('should make the email control required',()=>{
    let control = component.createParentsForm.get('email');
    control.setValue('xyz123@gmail.com');
    expect(control.valid).toBeTruthy();
  });

 
   it ('should make the guardian_name control required',()=>{
     let control=component.createParentsForm.get('guardian_name');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
   
 
   it ('should make the username control required',()=>{
     let control=component.createParentsForm.get('username');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the password control required',()=>{
     let control=component.createParentsForm.get('password');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
  
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
