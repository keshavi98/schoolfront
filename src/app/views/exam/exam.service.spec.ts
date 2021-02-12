import { TestBed,getTestBed } from '@angular/core/testing';
import { ExamService } from './exam.service';
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

describe('ExamService', () => {
  let service: ExamService;
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
      ExamService ,
      ToastrService
    ]});
    service = TestBed.inject(ExamService );
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('getAllExam() should  return Exam  data', () => {
    service.getAllExam('dept-1').subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne('http://localhost:3000/getAllExam');
    expect(req.request.method).toBe('POST');
    req.flush({ });
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
