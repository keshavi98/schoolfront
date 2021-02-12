import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SubjectService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addSubject = this.apiUrl + "addSubject";
  _getSubjectList = this.apiUrl + "getSubjectList";
  _editSubject = this.apiUrl + "editSubject";
  _getSubjectId = this.apiUrl + "getSubjectById";
  _deleteSubject = this.apiUrl + "deleteSubject";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";


  constructor(private http: HttpClient) {}

  addSubject(addSubject: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addSubject, addSubject, {
      headers: this.header
    });
  }

  getSubjectList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getSubjectList,data, { headers: this.header });
  }

  editSubject(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editSubject + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getSubjectById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getSubjectId + "/" + id, {
      headers: this.header
    });
  }

  deleteSubject(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteSubject + "/" + id, {
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
