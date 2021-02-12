import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAcademicYearComponent } from './add-academic-year.component';
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

describe('AddAcademicYearComponent', () => {
  let component: AddAcademicYearComponent;
  let fixture: ComponentFixture<AddAcademicYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcademicYearComponent ],
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
    fixture = TestBed.createComponent(AddAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the year control required',()=>{
    let control = component.createAcademicYearForm.get('year');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the start_date control required',()=>{
    let control = component.createAcademicYearForm.get('start_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the end_date control required',()=>{
    let control = component.createAcademicYearForm.get('end_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   })

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
