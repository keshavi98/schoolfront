import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAssignmentComponent } from './add-assignment.component';
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


describe('AddAssignmentComponent', () => {
  let component: AddAssignmentComponent;
  let fixture: ComponentFixture<AddAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignmentComponent ],
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
    fixture = TestBed.createComponent(AddAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the title control required',()=>{
    let control = component.createAssigmentForm.get('title');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   // it('should make the email control required',()=>{
   //   let control = component.createTeacherForm.get('email');
   //   control.setValue('');
   //   expect(control.valid).toBeFalsy();
   // });
 
   it ('should make the description control required',()=>{
     let control=component.createAssigmentForm.get('description');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the class control required',()=>{
     let control=component.createAssigmentForm.get('class');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the subject control required',()=>{
     let control=component.createAssigmentForm.get('subject');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
 
   it ('should make the deadline control required',()=>{
     let control=component.createAssigmentForm.get('deadline');
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })
  

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
