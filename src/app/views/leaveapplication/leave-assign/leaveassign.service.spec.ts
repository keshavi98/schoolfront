import { TestBed,getTestBed } from '@angular/core/testing';
import { LeaveassignService } from './leaveassign.service';
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

describe('LeaveassignService', () => {
  let service: LeaveassignService;
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
      LeaveassignService,
      ToastrService
    ]});
    service = TestBed.inject(LeaveassignService);
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
  
    it('addLeaveassign() should  return Leave Assign data', () => {
      service.addLeaveassign('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addLeaveAssign');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('getLeaveassignList() should return User data', () => {
      service.getLeaveassignList().subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getLeaveAssignList');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
    

   it('getuserRoles() should return User data', () => {
        service.getuserRoles().subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getAllRole');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });

    it('getLeaveassignById() should return Student Leave Assign data', () => {
      service.getLeaveassignById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getLeaveAssignById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });

  it('should Patch the correct data', () => {
    service.editLeaveassign(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editLeaveAssign/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteLeaveassign('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteLeaveAssign/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
