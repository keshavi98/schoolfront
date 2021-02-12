import { TestBed,getTestBed } from '@angular/core/testing';
import { ClassService } from './class.service';
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

describe('ClassService', () => {
  let service: ClassService;
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
      ClassService,
      ToastrService
    ]});
    service = TestBed.inject(ClassService);
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
  
  it('addClass() should  return Class data', () => {
    service.addClass('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addClass');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getClassList() should  return Class List data', () => {
    service.getClassList('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getClassList');
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

  it('getUserInfoByUserId() should  return User data', () => {
    service.getUserInfoByUserId().subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getUserInfoByUserId');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getClassById() should  return Class  data', () => {
    service.getClassById('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getclassById/1');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });


  
  it('should Patch the correct data', () => {
    service.editClass(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editClass/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteClass('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteClass/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });


  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
