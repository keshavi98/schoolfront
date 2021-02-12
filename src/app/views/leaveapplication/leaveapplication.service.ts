import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LeaveapplicationService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _getAllLeavecategoryList = this.apiUrl + "getAllLeaveCategory";
  _getAllTeacher = this.apiUrl + "getAllTeacher";
  _getAllStudent = this.apiUrl + "getAllStudent";
  _getAllAdmin = this.apiUrl + "getAllAdmin";

  constructor(private http: HttpClient) {}

  getAllLeavecategoryList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllLeavecategoryList, {
      headers: this.header
    });
  }

  getAllTeacher() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllTeacher, { headers: this.header });
  }

  getAllStudent() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllStudent, { headers: this.header });
  }

  getAllAdmin() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllAdmin, { headers: this.header });
  }
}
