import { TestBed,getTestBed } from '@angular/core/testing';
import { HolidayService } from './holiday.service';
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


describe('HolidayService', () => {
  let service: HolidayService;
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
      HolidayService,
      ToastrService
    ]});
    service = TestBed.inject(HolidayService);
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
  
    it('addHoliday() should  return Stundent Holiday data', () => {
      service.addHoliday('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addHoliday');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('uploadPhoto() should  return Add Holiday Photo data', () => {
      service.uploadPhoto('dept-1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/addHolidayPhoto');
      expect(req.request.method).toBe('POST');
      req.flush({ });
    });

    it('getHolidayById() should  return User data', () => {
      service.getHolidayById('1').subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getHolidayById/1');
      expect(req.request.method).toBe('GET');
      req.flush({ });
    });
    
    it('getHolidayList() should  return Student Holiday List', () => {
      service.getHolidayList().subscribe((res) => {
        expect(res).toEqual({});
      });
      const req = httpMock.expectOne('http://localhost:3000/getHolidayList');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should Patch the correct data', () => {
      service.editHoliday(3, { firstname: 'firstname' }).subscribe((data: any) => {
          expect(data.firstname).toBe('firstname');
        });
    
      const req = httpMock.expectOne(
        `http://localhost:3000/editHoliday/3`,
       
      );
      expect(req.request.method).toBe('PATCH');
    
      req.flush({
        firstname: 'firstname'
      });
    });  
  
    it('should delete the correct data', () => {
      service.deleteHoliday('3').subscribe((data: any) => {
        expect(data).toBe(3);
      });
     const req = httpMock.expectOne(
        `http://localhost:3000/deleteHoliday/3`,
      );
      expect(req.request.method).toBe('DELETE');
    
      req.flush(3);
    });
  
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
