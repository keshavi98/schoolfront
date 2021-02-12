import { TestBed,getTestBed } from '@angular/core/testing';
import { ExamattedanceService } from './examattedance.service';
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

describe('ExamattedanceService', () => {
  let service: ExamattedanceService;
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
      ExamattedanceService,
      ToastrService
    ]});
    service = TestBed.inject(ExamattedanceService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
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
  
    it('filterExamAttendanceList() should  return Exam Schedule data', () => {
      service.filterExamAttendanceList('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/filterExamAttendanceList');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });


    it('setExamAttendance() should  return Exam Schedule data', () => {
      service.setExamAttendance('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/setExamAttendance');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('getExamAttendance() should  return Exam Schedule data', () => {
      service.getExamAttendance('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getExamAttendance');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
  
   it('getExamAttendanceList() should return Student Exam data', () => {
        service.getExamAttendanceList().subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getExamAttendanceList');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });

    
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
