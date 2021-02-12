import { TestBed,getTestBed } from '@angular/core/testing';
import { EventService } from './event.service';
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

describe('EventService', () => {
  let service: EventService;
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
      EventService,
      ToastrService
    ]});
    service = TestBed.inject(EventService);
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
  
    it('addEvent() should  return Stundent Event data', () => {
      service.addEvent('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addEvent');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('uploadPhoto() should  return Add Event Photo data', () => {
      service.uploadPhoto('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addEventPhoto');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('getEventById() should  return User data', () => {
      service.getEventById('1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getEventById/1');
      expect(req.request.method).toBe('GET');
      req.flush({ });
    });
    
    it('getEventList() should  return Student Event List', () => {
      service.getEventList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getEventList');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should Patch the correct data', () => {
      service.editEvent(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editEvent/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteEvent('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteEvent/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });
  
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
