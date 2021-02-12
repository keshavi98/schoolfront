import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSyllabusComponent } from './add-syllabus.component';
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

describe('AddSyllabusComponent', () => {
  let component: AddSyllabusComponent;
  let fixture: ComponentFixture<AddSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSyllabusComponent ],
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
    fixture = TestBed.createComponent(AddSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


   it('should make the title control required',()=>{
    let control = component.createSyllabusForm.get('title');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the  file_name control required',()=>{
    let control = component.createSyllabusForm.get('file_name');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the class control required',()=>{
    let control = component.createSyllabusForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
