import { TestBed,getTestBed } from '@angular/core/testing';
import { TeacherAttendanceService } from './teacher-attendance.service';
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

describe('TeacherAttendanceService', () => {
  let service: TeacherAttendanceService;
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
      TeacherAttendanceService,
      ToastrService
    ]});
    service = TestBed.inject(TeacherAttendanceService);
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
  
    it(' getTeacherAttendance() should  return Teacher Attendance data', () => {
      service.getTeacherAttendance('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getTeacherAttendance');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('setTeacherAttendance() should  return Teacher Attendance data', () => {
      service.setTeacherAttendance('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/setTeacherAttendance');
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
    
    it('getTeacherAttendanceList() should  return Teacher Attetndance List', () => {
      service.getTeacherAttendanceList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getTeacherAttendanceList');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

 
    it('getTeacherAttendanceInfoById() should return All Teacher Attendance data', () => {
      service.getTeacherAttendanceInfoById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getTeacherAttendanceInfoById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
