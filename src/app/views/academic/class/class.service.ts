import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*"
  })
};
@Injectable({
  providedIn: "root"
})
export class ClassService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addClass = this.apiUrl + "addClass";
  _getClassList = this.apiUrl + "getClassList";
  _editClass = this.apiUrl + "editClass";
  _getclassById = this.apiUrl + "getclassById";
  _deleteClass = this.apiUrl + "deleteClass";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";


  constructor(private http: HttpClient) {}

  addClass(addClass: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addClass, addClass, {
      headers: this.header
    });
  }

  getClassList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getClassList,data ,{ headers: this.header });
  }

  editClass(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editClass + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getClassById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getclassById + "/" + id, {
      headers: this.header
    });
  }

  deleteClass(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteClass + "/" + id, {
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
