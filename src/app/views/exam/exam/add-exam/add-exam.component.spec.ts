import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExamComponent } from './add-exam.component';
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

describe('AddExamComponent', () => {
  let component: AddExamComponent;
  let fixture: ComponentFixture<AddExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamComponent ],
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
    fixture = TestBed.createComponent(AddExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should make the examname control required',()=>{
    let control = component.createExamForm.get('examname');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   
  it('should make the date control required',()=>{
    let control = component.createExamForm.get('date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
