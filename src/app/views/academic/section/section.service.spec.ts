import { TestBed,getTestBed } from '@angular/core/testing';
import { SectionService } from './section.service';
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


describe('SectionService', () => {
  let service: SectionService;
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
      SectionService,
      ToastrService
    ]});
    service = TestBed.inject(SectionService);
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
  
  it('addSection() should  return Section data', () => {
    service.addSection('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addSection');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('getSectionList() should  return Section List data', () => {
    service.getSectionList('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getSectionList');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  
  it('should Patch the correct data', () => {
    service.editSection(3, { firstname: 'firstname' }).subscribe((data: any) => {
        expect(data.firstname).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editSection/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      firstname: 'firstname'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteSection('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteSection/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });
 
  it('getUserInfoByUserId() should  return User data', () => {
    service.getUserInfoByUserId().subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getUserInfoByUserId');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });


  it('getSectionById() should  return Section  data', () => {
    service.getSectionById('1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getSectionById/1');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
