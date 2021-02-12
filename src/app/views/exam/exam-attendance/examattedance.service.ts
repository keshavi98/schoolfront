import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ExamattedanceService {
  token;
  header;
  apiUrl = environment.apiUrl;

  _getExamAttendanceList = this.apiUrl + "getExamAttendanceList";
  _filterExamAttendanceList = this.apiUrl + "filterExamAttendanceList";
  _getExamAttendance = this.apiUrl + "getExamAttendance";
  _setExamAttendance = this.apiUrl + "setExamAttendance";

  constructor(private http: HttpClient) {}

  getExamAttendance(getStudentAttendance: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getExamAttendance, getStudentAttendance, {
      headers: this.header
    });
  }

  setExamAttendance(setExamAttendance: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._setExamAttendance, setExamAttendance, {
      headers: this.header
    });
  }

  getExamAttendanceList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getExamAttendanceList, { headers: this.header });
  }

  filterExamAttendanceList(data: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._filterExamAttendanceList, data, {
      headers: this.header
    });
  }
}
