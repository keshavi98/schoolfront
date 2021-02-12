import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEventComponent } from './add-event.component';
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

describe('AddEventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventComponent ],
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
    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the title control required',()=>{
    let control = component.createEventForm.get('title');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the start_date control required',()=>{
    let control = component.createEventForm.get('start_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the end_date control required',()=>{
    let control = component.createEventForm.get('end_date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the details control required',()=>{
    let control = component.createEventForm.get('details');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
