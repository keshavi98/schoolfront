import { TestBed,getTestBed } from '@angular/core/testing';
import { ExamScheduleService } from './exam-schedule.service';
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

describe('ExamScheduleService', () => {
  let service: ExamScheduleService;
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
      ExamScheduleService,
      ToastrService
    ]});
   
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.inject(ExamScheduleService);
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
  
    it('addExamSchedule() should  return Exam Schedule data', () => {
      service.addExamSchedule('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addExamSchedule');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('getExamScheduleList() should  return Exam Schedule data', () => {
      service.getExamScheduleList('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getExamScheduleList');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('filterExamScheduleList() should  return Exam Schedule data', () => {
      service.filterExamScheduleList('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/filterExamScheduleList');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    
    it('getUserInfoByUserId() should  return Exam Schedule data', () => {
      service.getUserInfoByUserId().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getUserInfoByUserId');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

   it('getExamScheduleById() should return Student Exam data', () => {
        service.getExamScheduleById('1').subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getExamScheduleById/1');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });

    it('should Patch the correct data', () => {
      service.editExamSchedule(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editExamSchedule/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteExamSchedule('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteExamSchedule/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
