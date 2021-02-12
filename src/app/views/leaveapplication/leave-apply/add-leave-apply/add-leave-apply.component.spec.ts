import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLeaveApplyComponent } from './add-leave-apply.component';
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

describe('AddLeaveApplyComponent', () => {
  let component: AddLeaveApplyComponent;
  let fixture: ComponentFixture<AddLeaveApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaveApplyComponent ],
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
    fixture = TestBed.createComponent(AddLeaveApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the to_user_role control required',()=>{
    let control = component.createLeaveapplyForm.get('to_user_role');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  category control required',()=>{
    let control = component.createLeaveapplyForm.get('category');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the to_user control required',()=>{
    let control = component.createLeaveapplyForm.get('to_user');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the   from_date control required',()=>{
    let control = component.createLeaveapplyForm.get('from_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the to_date control required',()=>{
    let control = component.createLeaveapplyForm.get('to_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  reason control required',()=>{
    let control = component.createLeaveapplyForm.get('reason');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
