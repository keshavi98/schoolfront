import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LeaveApplictionService {
  token;
  header;
  apiUrl = environment.apiUrl;

  _getLeaveApplicationList = this.apiUrl + "getLeaveApplicationList";
  _getuserRoles = this.apiUrl + "getAllRole";
  _getLeaveapplicationById = this.apiUrl + "getLeaveById";

  constructor(private http: HttpClient) {}

  getuserRoles() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getuserRoles, { headers: this.header });
  }

  getLeaveApplicationList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(
      this._getLeaveApplicationList,
      { to_user: localStorage.getItem("user_id") },
      {
        headers: this.header
      }
    );
  }

  getLeaveapplicationById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveapplicationById + "/" + id, {
      headers: this.header
    });
  }
}
