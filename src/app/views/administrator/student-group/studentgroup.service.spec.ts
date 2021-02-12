import { TestBed,getTestBed } from '@angular/core/testing';
import { StudentgroupService } from './studentgroup.service';
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

describe('StudentgroupService', () => {
  let service: StudentgroupService;
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
      StudentgroupService,
      ToastrService
    ]});
    service = TestBed.inject(StudentgroupService);
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
  
  it('addStudentGroup() should  return Student Group data', () => {
    service.addStudentGroup('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addStudentGroup');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

   
   
    it('getStudentGroupList() should  return User Student Group List data', () => {
      service.getStudentGroupList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getStudentGroupList');
      expect(req.request.method).toBe('GET');
      req.flush({ });
    });
    
    it(' getStudentGroupById() should  return Student Group data', () => {
      service.getStudentGroupById('1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getStudentGroupById/1');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should Patch the correct data', () => {
      service.editStudentGroup(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editStudentGroup/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteStudentGroup('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteStudentGroup/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });
  
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
