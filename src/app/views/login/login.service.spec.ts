import { TestBed,getTestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
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



describe('LoginService', () => {
  let service: LoginService;
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
      LoginService,
      ToastrService
    ]});
    service = TestBed.inject(LoginService);
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
  
    it('loginUser() should  return Marks data', () => {
      service.loginUser('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/loginUser');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('logoutUser() should  return Marks data', () => {
      service.logoutUser().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/logoutUser');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('checkLogin() should  return Marks data', () => {
      service.checkLogin().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/checkLogin');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
});
