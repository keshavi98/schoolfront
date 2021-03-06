import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNoticeComponent } from './edit-notice.component';
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

describe('EditNoticeComponent', () => {
  let component: EditNoticeComponent;
  let fixture: ComponentFixture<EditNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoticeComponent ],
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
    fixture = TestBed.createComponent(EditNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the title control required',()=>{
    let control = component.createNoticeForm.get('title');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the date control required',()=>{
    let control = component.createNoticeForm.get('date');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the notice control required',()=>{
    let control = component.createNoticeForm.get('notice');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
