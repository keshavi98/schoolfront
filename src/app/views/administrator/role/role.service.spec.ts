import { TestBed,getTestBed } from '@angular/core/testing';
import { RoleService } from './role.service';
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

describe('RoleService', () => {
  let service: RoleService;
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
      RoleService,
      ToastrService
    ]});
    service = TestBed.inject(RoleService);
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
  
  it('addRole() should  return User Role data', () => {
    service.addRole('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addRole');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

   
   
    it('getRoleList() should  return User Roles List data', () => {
      service.getRoleList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getRoleList');
      expect(req.request.method).toBe('GET');
      req.flush({ });
    });
    
    it('getRoleById() should  return Role data', () => {
      service.getRoleById('1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getRoleById/1');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should Patch the correct data', () => {
      service.editRole(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editRole/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteRole('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteRole/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
