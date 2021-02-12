import { TestBed,getTestBed } from '@angular/core/testing';
import { SystemadminService } from './systemadmin.service';
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

describe('SystemadminService', () => {
  let service: SystemadminService;
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
      SystemadminService,
      ToastrService
    ]});
    service = TestBed.inject(SystemadminService);
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
  
  it('addAdmin() should  return Admin data', () => {
    service.addAdmin('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addAdmin');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addAdminPhoto() should  return Admin data', () => {
    service.uploadPhoto('a.png').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addAdminPhoto');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

   
   
    it('getAdminList() should  return Admin List data', () => {
      service.getAdminList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAdminList');
      expect(req.request.method).toBe('GET');
      req.flush({ });
    });
    
    it('getAdminById() should  return Admin  data', () => {
      service.getAdminById('1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getAdminById/1');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should Patch the correct data', () => {
      service.editAdmin(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editAdmin/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteAdmin('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteAdmin/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });
  

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
