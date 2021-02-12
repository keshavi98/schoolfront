import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMarkComponent } from './add-mark.component';
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
import { AgGridModule } from 'ag-grid-angular';
import { DataTableModule } from "ng-angular8-datatable";

describe('AddMarkComponent', () => {
  let component: AddMarkComponent;
  let fixture: ComponentFixture<AddMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarkComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule ,
        FormsModule,
        DataTableModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        AgGridModule.withComponents([])
            ],
    providers: [FormBuilder,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the class control required',()=>{
    let control = component.getMarkForm.get('class');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the examname control required',()=>{
    let control = component.getMarkForm.get('examname');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });


   it('should make the section control required',()=>{
    let control = component.getMarkForm.get('section');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the subject control required',()=>{
    let control = component.getMarkForm.get('subject');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
