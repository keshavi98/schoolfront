import { TestBed, getTestBed } from '@angular/core/testing';
import { TeacherService } from './teacher.service';
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
import { environment } from "../../../environments/environment";



describe('TeacherService', () => {
  let service: TeacherService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule ,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
            ],
      providers: [
        TeacherService,
        ToastrService
      ],
      
    
    });
    injector = getTestBed();
    service = injector.get(TeacherService);
    httpMock = injector.get(HttpTestingController);
    
    //service = TestBed.inject(TeacherService);
  });

  afterEach(() => {
    httpMock.verify();
  });  
 
  const dummyTeacherListResponse = {
    data: [
      { id: 1,name: 'teacher',email: 'xyz123@gmail.com'}
    ],
  };  

  const dummyUserDetails = {
    data: { id: 1, 
      first_name: 'George', 
      last_name: 'Bluth', 
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' 
    }
  };
  
  const tranformedDummyUserDetails = {
    data: {
      id: 1,
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
      
    },
  };

  it('addTeacher() should POST and return data', () => {
    service.addTeacher('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addTeacher');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  it('addTeacherPhoto should POST and return data', () => {
    service.uploadPhoto('a.png').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addTeacherPhoto');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });


  it('addTeacherDocumentFile should POST and return data', () => {
    service.uploadFile('a.txt').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/addTeacherDocumentFile');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  
  // it(' should POST and return data', () => {
  //   service.addDocument('1','a.txt').subscribe((res) => {
  //     expect(res).toEqual({});
  //   });
  //   const req = httpMock.expectOne('http://localhost:3000/addDocument');
  //   expect(req.request.method).toBe('POST');
  //   req.flush({ });
  // });
 

  it('getTeacherList() should return Teacher List data', () => {
    service.getTeacherList().subscribe((res) => {
      expect(res).toEqual(dummyTeacherListResponse);
    });
    const req = httpMock.expectOne('http://localhost:3000/getTeacherList');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTeacherListResponse);
   
  }); 
  
  
 it('getTeacherById() should return Teacher data', () => {
      service.getTeacherById('1').subscribe((res) => {
      expect(res).toEqual(tranformedDummyUserDetails); 
      });
  
      const req = httpMock.expectOne('http://localhost:3000/getTeacherById/1');
      expect(req.request.method).toBe('GET');
      // Note That we are flushing dummy "http" response
      req.flush(dummyUserDetails); 
  });
  
 
  it('getTeacherTimeTableInfoById() should return Timetable data', () => {
    service.getTeacherTimeTableInfoById('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getTeacherTimeTableInfoById/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
  });

  it('getTeacherAttendanceInfoById() should return Attendance data', () => {
    service.getTeacherAttendanceInfoById('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getTeacherAttendanceInfoById/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
  });

  it('getLeaveByTeacherId() should return Teacher Leave data', () => {
    service.getLeaveByTeacherId('1').subscribe((res) => {
    expect(res).toEqual(tranformedDummyUserDetails); 
    });

    const req = httpMock.expectOne('http://localhost:3000/getLeaveByTeacherId/1');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyUserDetails); 
  });

  it('should Patch the correct data', () => {
    service.editTeacher(3, { name: 'firstname' }).subscribe((data: any) => {
        expect(data.name).toBe('firstname');
      });
  
    const req = httpMock.expectOne(
      `http://localhost:3000/editTeacher/3`,
     
    );
    expect(req.request.method).toBe('PATCH');
  
    req.flush({
      name: 'name'
    });
  });  

  it('should delete the correct data', () => {
    service.deleteTeacher('3').subscribe((data: any) => {
      expect(data).toBe(3);
    });
   const req = httpMock.expectOne(
      `http://localhost:3000/deleteTeacher/3`,
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  });
  

  // it('should have getTeacherById function', () => {
  //   const service: TeacherService = TestBed.get(TeacherService);
  //   expect(service.getTeacherById).toBeTruthy();
  //  });

 
});
