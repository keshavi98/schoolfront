import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExamComponent } from './edit-exam.component';
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

describe('EditExamComponent', () => {
  let component: EditExamComponent;
  let fixture: ComponentFixture<EditExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExamComponent ],
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
    fixture = TestBed.createComponent(EditExamComponent);
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
