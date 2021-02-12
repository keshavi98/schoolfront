import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _getuserRoles = this.apiUrl + "getAllRole";
  _getPermission = this.apiUrl + "getPermissionByRole";
  _getAllPages = this.apiUrl + "getAllPages";
  _setPermission = this.apiUrl + "setPermission";

  constructor(private http: HttpClient) {}

  getuserRoles() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getuserRoles, { headers: this.header });
  }

  getAllPages() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllPages, { headers: this.header });
  }

  setPermission(setPermission: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._setPermission, setPermission, {
      headers: this.header
    });
  }

  getPermission(getPermission: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getPermission, getPermission, {
      headers: this.header
    });
  }
}
