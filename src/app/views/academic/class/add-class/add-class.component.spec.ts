import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClassComponent } from './add-class.component';
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

describe('AddClassComponent', () => {
  let component: AddClassComponent;
  let fixture: ComponentFixture<AddClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassComponent ],
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
    fixture = TestBed.createComponent(AddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the class control required',()=>{
    let control = component.createClassForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   it('should make the class_numeric control required',()=>{
    let control = component.createClassForm.get('class_numeric');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   it('should make the teacher control required',()=>{
    let control = component.createClassForm.get('teacher');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
 
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
