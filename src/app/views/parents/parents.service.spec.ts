import { TestBed ,getTestBed} from '@angular/core/testing';
import { ParentsService } from './parents.service';
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

describe('ParentsService', () => {
  let service: ParentsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [
      RouterTestingModule,
      HttpClientTestingModule ,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot()
          ],
    providers: [
      ParentsService,
      ToastrService
    ],});
    injector = getTestBed();
    service = TestBed.inject(ParentsService);
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

    it('addParents() should  return Parents data', () => {
      service.addParents('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addParents');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
  
    it('addParentPhoto should return Parents Photo data', () => {
      service.uploadPhoto('a.png').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addParentPhoto');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
  
    it('addParentDocumentFile should return Parents Document data', () => {
      service.uploadFile('a').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addParentDocumentFile');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });
  
    // it('addDocument should return Student Photo data', () => {
    //   service.addDocument('1','a.png').subscribe((res) => {
    //     expect(res).toEqual({});
    //   });
    //   const req = httpMock.expectOne('http://localhost:3000/addDocument');
    //   expect(req.request.method).toBe('POST');
    //   req.flush({ });
    // });
  
    
    it('getParentsList() should return Student data', () => {
      service.getParentsList().subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getParentsList');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
  
   it('getParentById() should return Student data', () => {
        service.getParentById('1').subscribe((res) => {
        expect(res).toEqual(tranformedDummyUserDetails); 
        });
    
        const req = httpMock.expectOne('http://localhost:3000/getParentById/1');
        expect(req.request.method).toBe('GET');
        // Note That we are flushing dummy "http" response
        req.flush(dummyUserDetails); 
    });
    
   
    it('getParentChildrenInfoById() should return Parents data', () => {
      service.getParentChildrenInfoById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getParentChildrenInfoById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
    });
  
    it('getAllParents() should return Timetable data', () => {
      service.getAllParents().subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getAllParents');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
    });
  
    it('getDocumentListById() should return Attendance data', () => {
      service.getDocumentListById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getDocumentListById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
    });
  
    it('should Patch the correct data', () => {
      service.editParents(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editParents/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteParents('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteParents/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
