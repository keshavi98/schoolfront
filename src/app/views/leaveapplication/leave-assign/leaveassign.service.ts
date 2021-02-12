import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LeaveassignService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addLeaveassign = this.apiUrl + "addLeaveAssign";
  _getLeaveassignList = this.apiUrl + "getLeaveAssignList";
  _editLeaveassign = this.apiUrl + "editLeaveAssign";
  _getLeaveassignById = this.apiUrl + "getLeaveAssignById";
  _deleteLeaveassign = this.apiUrl + "deleteLeaveAssign";
  _getuserRoles = this.apiUrl + "getAllRole";

  constructor(private http: HttpClient) {}

  addLeaveassign(addLeaveassign: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addLeaveassign, addLeaveassign, {
      headers: this.header
    });
  }

  getuserRoles() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getuserRoles, { headers: this.header });
  }

  getLeaveassignList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveassignList, { headers: this.header });
  }
  editLeaveassign(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editLeaveassign + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getLeaveassignById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveassignById + "/" + id, {
      headers: this.header
    });
  }

  deleteLeaveassign(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteLeaveassign + "/" + id, {
      headers: this.header
    });
  }
}
