import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LeaveapplyService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addLeaveapply = this.apiUrl + "addLeaveApply";
  _getLeaveapplyList = this.apiUrl + "getLeaveApplyList";
  _editLeaveapply = this.apiUrl + "editLeaveApply";
  _getLeaveapplyById = this.apiUrl + "getLeaveById";
  _deleteLeaveapply = this.apiUrl + "deleteLeaveApply";
  _getuserRoles = this.apiUrl + "getAllRole";
  _addLeaveapplyFile = this.apiUrl + "addLeaveApplyFile";

  constructor(private http: HttpClient) {}

  addLeaveapply(addLeaveassign: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addLeaveapply, addLeaveassign, {
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

  getLeaveapplyList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(
      this._getLeaveapplyList,
      { from_user: localStorage.getItem("user_id") },
      {
        headers: this.header
      }
    );
  }

  editLeaveapply(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editLeaveapply + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getLeaveapplyById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveapplyById + "/" + id, {
      headers: this.header
    });
  }

  deleteLeaveapply(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteLeaveapply + "/" + id, {
      headers: this.header
    });
  }

  uploadFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addLeaveapplyFile, uploadFile, {
      headers: this.header
    });
  }
}
