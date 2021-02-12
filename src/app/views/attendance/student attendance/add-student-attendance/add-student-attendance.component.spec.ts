import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStudentAttendanceComponent } from './add-student-attendance.component';
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

describe('AddStudentAttendanceComponent', () => {
  let component: AddStudentAttendanceComponent;
  let fixture: ComponentFixture<AddStudentAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentAttendanceComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule ,
        FormsModule,
        DataTableModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
            ],
    providers: [FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the date control required',()=>{
    let control = component.getStudentAttendanceForm.get('date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   
  it('should make the class control required',()=>{
    let control = component.getStudentAttendanceForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   
  it('should make the subject control required',()=>{
    let control = component.getStudentAttendanceForm.get('subject');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   
  it('should make the name control required',()=>{
    let control = component.getStudentAttendanceForm.get('subject');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
