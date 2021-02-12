import { TestBed,getTestBed } from '@angular/core/testing';
import { AcademicService } from './academic.service';
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

describe('AcademicService', () => {
  let service: AcademicService;
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
      AcademicService,
      ToastrService
    ]});
    service = TestBed.inject(AcademicService);
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
  
  it('getAllTeacher() should  return Teacher data', () => {
    service.getAllTeacher().subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAllTeacher');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('getAllClass() should  return Class data', () => {
    service.getAllClass('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAllClass');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('getAllClass() should  return Class data', () => {
    service.getAllClass('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAllClass');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getAllSubject() should  return Subject data', () => {
    service.getAllSubject('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAllSubject');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getAllSection() should  return Section data', () => {
    service.getAllSection('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAllSection');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getUserInfoByUserId() should  return User data', () => {
    service.getUserInfoByUserId().subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getUserInfoByUserId');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
