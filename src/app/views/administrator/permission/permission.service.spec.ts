import { TestBed,getTestBed } from '@angular/core/testing';
import { PermissionService } from './permission.service';
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



describe('PermissionService', () => {
  let service: PermissionService;
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
      PermissionService,
      ToastrService
    ]});
    service = TestBed.inject(PermissionService);
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
  
  it('setPermission() should  return User Permission data', () => {
    service.setPermission('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/setPermission');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

    it('getPermission() should  return User Permission data', () => {
      service.getPermission('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getPermissionByRole');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

   
    it('getuserRoles() should  return User Roles data', () => {
      service.getuserRoles().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAllRole');
      expect(req.request.method).toBe('GET');
      req.flush({ });
    });
    
    it('getAllPages() should  return All Pages List', () => {
      service.getAllPages().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAllPages');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
