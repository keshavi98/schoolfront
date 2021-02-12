import { TestBed,getTestBed } from '@angular/core/testing';
import { LeavecategoryService } from './leavecategory.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ToastrService } from "ngx-toastr";
import { ToastrModule } from 'ngx-toastr';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LeavecategoryService', () => {
  let service: LeavecategoryService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      RouterTestingModule,
      HttpClientTestingModule ,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot()
          ],
    providers: [
      LeavecategoryService,
      ToastrService
    ]});
    service = TestBed.inject(LeavecategoryService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  }); 
  
  const dummyStudentListResponse = {
    data: [
      { id: 1,name: 'student',email: 'xyz123@gmail.com'}
    ],
  };  
  
  const dummyUserDetails = {
    data: { id: 1, 
      first_name: 'test1', 
      last_name: 'xxx', 
      email:'xyz123@gmail.com'
    }
  };
  
  const tranformedDummyUserDetails = {
    data: {
      id: 1,
      first_name: 'test1',
      last_name: 'xxx',
      email:'xyz123@gmail.com'
      
    },
  };
  
    it('addLeavecategory() should  return Leave Category data', () => {
      service.addLeavecategory('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addLeaveCategory');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

  
    
    it('getLeavecategoryList() should return Leave Category data', () => {
      service.getLeavecategoryList().subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getLeaveCategoryList');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
  
    it('getLeavecategoryById() should return Leave Category data', () => {
      service.getLeavecategoryById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getLeaveCategoryById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });

  it('should Patch the correct data', () => {
    service.editLeavecategory(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editLeaveCategory/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteLeavecategory('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteLeaveCategory/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });


  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
