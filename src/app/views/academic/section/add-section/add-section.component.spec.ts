import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSectionComponent } from './add-section.component';
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

describe('AddSectionComponent', () => {
  let component: AddSectionComponent;
  let fixture: ComponentFixture<AddSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSectionComponent ],
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
    fixture = TestBed.createComponent(AddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the section control required',()=>{
    let control = component.createSectionForm.get('section');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  category control required',()=>{
    let control = component.createSectionForm.get('category');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  capacity control required',()=>{
    let control = component.createSectionForm.get('capacity');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the class control required',()=>{
    let control = component.createSectionForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the teacher control required',()=>{
    let control = component.createSectionForm.get('teacher');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });


 
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
