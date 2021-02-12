import { TestBed,getTestBed } from '@angular/core/testing';
import { LeaveapplyService } from './leaveapply.service';
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



describe('LeaveapplyService', () => {
  let service: LeaveapplyService;
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
      LeaveapplyService,
      ToastrService
    ]});
    service = TestBed.inject(LeaveapplyService);
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
  
    it('addLeaveapply() should  return Leave Apply data', () => {
      service.addLeaveapply('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addLeaveApply');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('getLeaveapplyList() should  return Leave Apply data', () => {
      service.getLeaveapplyList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getLeaveApplyList');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
    
  
    it('uploadFile() should  return Leave Apply data', () => {
      service.uploadFile('a.txt').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addLeaveApplyFile');
      expect(req.request.method).toBe('POST');
      req.flush({ });
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

    it('getLeaveapplyById() should return User data', () => {
      service.getLeaveapplyById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getLeaveApplyById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });

  it('should Patch the correct data', () => {
    service.editLeaveapply(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editLeaveapply/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteLeaveapply('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteLeaveapply/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
