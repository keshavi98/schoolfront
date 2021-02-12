import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class NoticeService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addNotice = this.apiUrl + "addNotice";
  _getNoticeList = this.apiUrl + "getNoticeList";
  _editNotice = this.apiUrl + "editNotice";
  _getNoticeById = this.apiUrl + "getNoticeById";
  _deleteNotice = this.apiUrl + "deleteNotice";

  constructor(private http: HttpClient) {}

  addNotice(addNotice: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addNotice, addNotice, {
      headers: this.header
    });
  }

  getNoticeList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getNoticeList, { headers: this.header });
  }

  editNotice(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(this._editNotice + "/" + id, editData, {
      headers: this.header
    });
  }

  getNoticeById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getNoticeById + "/" + id, {
      headers: this.header
    });
  }

  deleteNotice(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteNotice + "/" + id, {
      headers: this.header
    });
  }
}
