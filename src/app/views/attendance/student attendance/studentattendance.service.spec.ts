import { TestBed,getTestBed } from '@angular/core/testing';
import { StudentattendanceService } from './studentattendance.service';
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

describe('StudentattendanceService', () => {
  let service: StudentattendanceService;
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
      StudentattendanceService,
      ToastrService
    ]});
    service = TestBed.inject(StudentattendanceService);
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
  
    it(' getStudentAttendance() should  return Stundent Attendance data', () => {
      service.getStudentAttendance('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getStudentAttendance');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('setStudentAttendance() should  return Student Attendance data', () => {
      service.setStudentAttendance('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/setStudentAttendance');
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
    
    it('getStudentAttendanceList() should  return Student Attetndance List', () => {
      service.getStudentAttendanceList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getStudentAttendanceList');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

   it('getLeaveByStudentId() should return Student Leave data', () => {
        service.getLeaveByStudentId('1').subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getLeaveByStudentId/1');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });


    it('getStudentAttendanceInfoById() should return All Student Attendance data', () => {
      service.getStudentAttendanceInfoById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getStudentAttendanceInfoById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
