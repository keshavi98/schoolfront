import { TestBed,getTestBed } from '@angular/core/testing';
import { MarksService } from './marks.service';
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

describe('MarksService', () => {
  let service: MarksService;
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
      MarksService,
      ToastrService
    ],});
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.inject(MarksService);
   
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });


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

  it('getMark() should  return Student data', () => {
    service.getMark('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getMark');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('setMark() should  return Student data', () => {
    service.setMark('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/setMark');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('filterStudentByClassSection() should  return Student data', () => {
    service.filterStudentByClassSection('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/filterStudentByClassSection');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getMarkList() should  return Student Marks data', () => {
    service.getMarkList().subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getMarkList');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });
 
 
 it('getStudentMarkInfoById() should return Student data', () => {
      service.getStudentMarkInfoById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getStudentMarkInfoById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });

  
});