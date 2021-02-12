import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLeaveCategoryComponent } from './add-leave-category.component';
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
import { DataTableModule } from "ng-angular8-datatable";
import { AgGridModule } from 'ag-grid-angular';
declare var $: any;

describe('AddLeaveCategoryComponent', () => {
  let component: AddLeaveCategoryComponent;
  let fixture: ComponentFixture<AddLeaveCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaveCategoryComponent ],
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
    fixture = TestBed.createComponent(AddLeaveCategoryComponent);
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
