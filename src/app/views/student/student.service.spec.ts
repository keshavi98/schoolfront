import { TestBed,getTestBed } from '@angular/core/testing';
import { StudentService } from './student.service';
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

describe('StudentService', () => {
  let service: StudentService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      RouterTestingModule,
      HttpClientTestingModule ,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot()
          ],
    providers: [
      StudentService,
      ToastrService
    ],
  });
  injector = getTestBed();
  service = injector.get(StudentService);
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

  it('addStudent() should  return student data', () => {
    service.addStudent('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addStudent');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addStudentPhoto should return Student Photo data', () => {
    service.uploadPhoto('a.png').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addStudentPhoto');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addStudentDocumentFile should return Student Document data', () => {
    service.uploadFile('a').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addStudentDocumentFile');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  // it('addDocument should return Student Photo data', () => {
  //   service.addDocument('1','a.png').subscribe((res) => {
  //     expect(res).toEqual({});
  //   });
  //   const req = httpMock.expectOne('http://localhost:3000/addDocument');
  //   expect(req.request.method).toBe('POST');
  //   req.flush({ });
  // });

  
  // it('getStudentList should return Student Photo data', () => {
  //   service.addDocument('1','xxx').subscribe((res) => {
  //     expect(res).toEqual({});
  //   });
  //   const req = httpMock.expectOne('http://localhost:3000/getStudentList');
  //   expect(req.request.method).toBe('POST');
  //   req.flush({ });
  // });


 it('getStudentById() should return Student data', () => {
      service.getStudentById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getStudentById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
  
 
  it('getStudentParentInfoById() should return Parents data', () => {
    service.getStudentParentInfoById('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getStudentParentInfoById/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
  });

  it('getStudentTimeTableInfoById() should return Timetable data', () => {
    service.getStudentTimeTableInfoById('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getStudentTimeTableInfoById/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
  });

  it('getStudentAttendanceInfoById() should return Attendance data', () => {
    service.getStudentAttendanceInfoById('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getStudentAttendanceInfoById/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
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

  
  it('getDocumentListById() should return DocumentList data', () => {
    service.getDocumentListById('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getDocumentListById/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
  });

  it('should Patch the correct data', () => {
    service.editStudent(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editStudent/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteStudent('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteStudent/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });

});
