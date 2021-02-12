import { TestBed } from '@angular/core/testing';
import { LeaveapplicationService } from './leaveapplication.service';
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

describe('LeaveapplicationService', () => {
  let service: LeaveapplicationService;
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
      LeaveapplicationService,
      ToastrService
    ]});
    service = TestBed.inject(LeaveapplicationService);
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
  
    it('getAllLeavecategoryList() should  return Leave Category List data', () => {
      service.getAllLeavecategoryList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAllLeavecategoryList');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
  
   it('getAllTeacher() should return Teacher List data', () => {
        service.getAllTeacher().subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getAllTeacher');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });

    it('getAllStudent() should  return Student List data', () => {
      service.getAllStudent().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAllStudent');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
  
   it('getAllAdmin() should return Mark List data', () => {
        service.getAllAdmin().subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getAllAdmin');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });


  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
