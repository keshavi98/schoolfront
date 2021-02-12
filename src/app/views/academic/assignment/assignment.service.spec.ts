import { TestBed,getTestBed } from '@angular/core/testing';
import { AssignmentService } from './assignment.service';
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

describe('AssignmentService', () => {
  let service: AssignmentService;
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
      AssignmentService,
      ToastrService
    ]});
    service = TestBed.inject(AssignmentService);
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
  
  it('addAssignment() should  return Assignment data', () => {
    service.addAssignment('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addAssignment');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addAssigmentFile() should  return Assigment Upload data', () => {
    service.uploadFile('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addAssigmentFile');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addDocument() should  return Document  data', () => {
    service.addDocument('1','a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addDocument/1');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('uploadAssignmentAnswerFile() should  return Assigment Answer file data', () => {
    service.uploadAssignmentAnswerFile('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addStudentAssignmentAnswerFile');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addAssignmentAnswer() should  return Assigment Answer  data', () => {
    service.addAssignmentAnswer('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addAssignmentAnswer');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });
 

  it('getAssignmentAnswerList() should  return Assigment Answer List  data', () => {
    service.getAssignmentAnswerList('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAssignmentAnswerList');
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

  it('getAssignmentList() should  return Admin data', () => {
    service.getAssignmentList('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAssignmentList');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

    
    it('getAssignmetId() should  return Assignment  data', () => {
      service.getAssignmentById('1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAssignmentById/1');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    
    it('should Patch the correct data', () => {
      service.editAssignment(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editAssignment/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteAssignment('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteAssignment/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
