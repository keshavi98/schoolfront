import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLeaveAssignComponent } from './add-leave-assign.component';
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

describe('AddLeaveAssignComponent', () => {
  let component: AddLeaveAssignComponent;
  let fixture: ComponentFixture<AddLeaveAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaveAssignComponent ],
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
    fixture = TestBed.createComponent(AddLeaveAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the role control required',()=>{
    let control = component.createLeaveassignForm.get('role');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  category control required',()=>{
    let control = component.createLeaveassignForm.get('category');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the no_of_day control required',()=>{
    let control = component.createLeaveassignForm.get('no_of_day');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
