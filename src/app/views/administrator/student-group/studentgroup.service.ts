import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StudentgroupService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addStudentGroup = this.apiUrl + "addStudentGroup";
  _getStudentGroupList = this.apiUrl + "getStudentGroupList";
  _editStudentGroup = this.apiUrl + "editStudentGroup";
  _getStudentGroupById = this.apiUrl + "getStudentGroupById";
  _deleteStudentGroup = this.apiUrl + "deleteStudentGroup";

  constructor(private http: HttpClient) {}

  addStudentGroup(addStudentGroup: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addStudentGroup, addStudentGroup, {
      headers: this.header
    });
  }

  getStudentGroupList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentGroupList, { headers: this.header });
  }

  editStudentGroup(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editStudentGroup + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getStudentGroupById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentGroupById + "/" + id, {
      headers: this.header
    });
  }

  deleteStudentGroup(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteStudentGroup + "/" + id, {
      headers: this.header
    });
  }
}
