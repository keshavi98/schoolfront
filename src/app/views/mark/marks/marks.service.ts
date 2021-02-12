import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MarksService {
  token;
  header;
  apiUrl = environment.apiUrl;

  _getMarkList = this.apiUrl + "getMarkList";
  _filterStudentByClassSection = this.apiUrl + "filterStudentByClassSection";
  _getMark = this.apiUrl + "getMark";
  _setMark = this.apiUrl + "setMark";
  _getStudentMarkInfoById = this.apiUrl + "getStudentMarkInfoById";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  getMark(getMark: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getMark, getMark, {
      headers: this.header
    });
  }

  setMark(setMark: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._setMark, setMark, {
      headers: this.header
    });
  }

  getMarkList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getMarkList, { headers: this.header });
  }

  filterStudentByClassSection(data: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._filterStudentByClassSection, data, {
      headers: this.header
    });
  }

  getStudentMarkInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentMarkInfoById + "/" + id, {
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
