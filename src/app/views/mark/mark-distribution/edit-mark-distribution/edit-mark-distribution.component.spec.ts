import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMarkDistributionComponent } from './edit-mark-distribution.component';
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


describe('EditMarkDistributionComponent', () => {
  let component: EditMarkDistributionComponent;
  let fixture: ComponentFixture<EditMarkDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMarkDistributionComponent ],
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
    fixture = TestBed.createComponent(EditMarkDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the mark_distribution_type control required',()=>{
    let control = component.createMarkDistributionForm.get('mark_distribution_type');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   it('should make the mark_value control required',()=>{
    let control = component.createMarkDistributionForm.get('mark_value');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
