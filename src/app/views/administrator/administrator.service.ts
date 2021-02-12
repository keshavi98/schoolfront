import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AdministratorService {
  token: any;
  header: any;
  apiUrl = environment.apiUrl;
  _getAllAcademicYear = this.apiUrl + "getAllAcademicYear";
  _getAllStudentGroup = this.apiUrl + "getAllStudentGroup";
  _getAllRole = this.apiUrl + "getAllRole";

  constructor(private http: HttpClient) {}

  getAllAcademicYear() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllAcademicYear, { headers: this.header });
  }

  getAllStudentGroup() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllStudentGroup, { headers: this.header });
  }

  getAllRole() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllRole, { headers: this.header });
  }
}
