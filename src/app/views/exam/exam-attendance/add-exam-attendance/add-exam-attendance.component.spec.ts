import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExamAttendanceComponent } from './add-exam-attendance.component';
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
import { DataTableModule } from "ng-angular8-datatable";
declare var $: any;

describe('AddExamAttendanceComponent', () => {
  let component: AddExamAttendanceComponent;
  let fixture: ComponentFixture<AddExamAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamAttendanceComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule ,
        FormsModule,
        ReactiveFormsModule,
        DataTableModule,
        ToastrModule.forRoot()
            ],
    providers: [FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should make the class control required',()=>{
    let control = component.getExamAttendanceForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the examname control required',()=>{
    let control = component.getExamAttendanceForm.get('examname');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the section control required',()=>{
    let control = component.getExamAttendanceForm.get('section');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the subject control required',()=>{
    let control = component.getExamAttendanceForm.get('subject');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });


   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
