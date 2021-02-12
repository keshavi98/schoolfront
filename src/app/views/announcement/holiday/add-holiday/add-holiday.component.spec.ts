import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHolidayComponent } from './add-holiday.component';
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

describe('AddHolidayComponent', () => {
  let component: AddHolidayComponent;
  let fixture: ComponentFixture<AddHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHolidayComponent ],
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
    fixture = TestBed.createComponent(AddHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should make the title control required',()=>{
    let control = component.createHolidayForm.get('title');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the from_date control required',()=>{
    let control = component.createHolidayForm.get('from_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the to_date control required',()=>{
    let control = component.createHolidayForm.get('to_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the details control required',()=>{
    let control = component.createHolidayForm.get('details');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
