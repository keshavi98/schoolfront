import { TestBed,getTestBed } from '@angular/core/testing';
import { SyllabusService } from './syllabus.service';
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

describe('SyllabusService', () => {
  let service: SyllabusService;
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
      SyllabusService,
      ToastrService
    ]});
    service = TestBed.inject(SyllabusService);
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
  
  it('addSyllabus() should  return Syllabus data', () => {
    service.addSyllabus('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addSyllabus');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getSyllabusList() should  return Syllaus List data', () => {
    service.getSyllabusList('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getSyllabusList');
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
 
  it('getSyllabusId() should  return Syllabus data', () => {
    service.getSyllabusById('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getSyllabusById/1');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  
  it('should Patch the correct data', () => {
    service.editSyllabus(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editSyllabus/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteSyllabus('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteSyllabus/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
