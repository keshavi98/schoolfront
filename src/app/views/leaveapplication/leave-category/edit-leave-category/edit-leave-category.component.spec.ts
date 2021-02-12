import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLeaveCategoryComponent } from './edit-leave-category.component';
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

describe('EditLeaveCategoryComponent', () => {
  let component: EditLeaveCategoryComponent;
  let fixture: ComponentFixture<EditLeaveCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeaveCategoryComponent ],
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
    fixture = TestBed.createComponent(EditLeaveCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make the category control required',()=>{
    let control = component.createLeaveCategoryForm.get('category');  
     control.setValue('');
     expect(control.valid).toBeFalsy();
   });

   // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
