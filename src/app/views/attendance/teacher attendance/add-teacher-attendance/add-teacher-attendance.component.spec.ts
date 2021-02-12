import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTeacherAttendanceComponent } from './add-teacher-attendance.component';
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

describe('AddTeacherAttendanceComponent', () => {
  let component: AddTeacherAttendanceComponent;
  let fixture: ComponentFixture<AddTeacherAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeacherAttendanceComponent ],
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
    fixture = TestBed.createComponent(AddTeacherAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the date control required',()=>{
    let control = component.getTeacherAttendanceForm.get('date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   
  
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
