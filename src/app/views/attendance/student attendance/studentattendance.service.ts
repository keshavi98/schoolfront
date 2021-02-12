import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StudentattendanceService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _getStudentAttendance = this.apiUrl + "getStudentAttendance";
  _setStudentAttendance = this.apiUrl + "setStudentAttendance";
  _getStudentAttendanceList = this.apiUrl + "getStudentAttendanceList";
  _getStudentAttendanceInfoById = this.apiUrl + "getStudentAttendanceInfoById";
  _getLeaveByStudentId = this.apiUrl + "getLeaveByStudentId";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  getStudentAttendanceInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentAttendanceInfoById + "/" + id, {
      headers: this.header
    });
  }

  getStudentAttendance(getStudentAttendance: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getStudentAttendance, getStudentAttendance, {
      headers: this.header
    });
  }

  setStudentAttendance(setStudentAttendance: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._setStudentAttendance, setStudentAttendance, {
      headers: this.header
    });
  }

  getLeaveByStudentId(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveByStudentId + "/" + id, {
      headers: this.header
    });
  }

  getStudentAttendanceList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentAttendanceList, {
      headers: this.header
    });
  }

  getUserInfoByUserId() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(
      this._getUserInfoByUserId,
      {
        role: localStorage.getItem("role"),
        user_id: localStorage.getItem("user_id")
      },
      {
        headers: this.header
      }
    );
  }
}
