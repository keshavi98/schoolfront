import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGradeComponent } from './edit-grade.component';
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

describe('EditGradeComponent', () => {
  let component: EditGradeComponent;
  let fixture: ComponentFixture<EditGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGradeComponent ],
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
    fixture = TestBed.createComponent(EditGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should make the gradename control required',()=>{
    let control = component.createGradeForm.get('gradename');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   it('should make the gradepoint control required',()=>{
    let control = component.createGradeForm.get('gradepoint');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   it('should make the mark_from control required',()=>{
    let control = component.createGradeForm.get('mark_from');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   it('should make the mark_upto control required',()=>{
    let control = component.createGradeForm.get('mark_upto');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });
   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
