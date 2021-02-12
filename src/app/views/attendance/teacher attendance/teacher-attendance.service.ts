import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TeacherAttendanceService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _getTeacherAttendance = this.apiUrl + "getTeacherAttendance";
  _setTeacherAttendance = this.apiUrl + "setTeacherAttendance";
  _getTeacherAttendanceList = this.apiUrl + "getTeacherAttendanceList";
  _getTeacherAttendanceInfoById = this.apiUrl + "getTeacherAttendanceInfoById";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  getTeacherAttendance(getTeacherAttendance: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getTeacherAttendance, getTeacherAttendance, {
      headers: this.header
    });
  }

  setTeacherAttendance(setTeacherAttendance: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._setTeacherAttendance, setTeacherAttendance, {
      headers: this.header
    });
  }

  getTeacherAttendanceList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTeacherAttendanceList, {
      headers: this.header
    });
  }

  getTeacherAttendanceInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTeacherAttendanceInfoById + "/" + id, {
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
