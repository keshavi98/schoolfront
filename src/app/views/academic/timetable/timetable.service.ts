import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TimetableService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addTimetable = this.apiUrl + "addTimetable";
  _getTimetableList = this.apiUrl + "getTimetableList";
  _editTimetable = this.apiUrl + "editTimetable";
  _getTimetableId = this.apiUrl + "getTimetableById";
  _deleteTimetable = this.apiUrl + "deleteTimetable";
  _filterClassList = this.apiUrl + "filterClassList";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  addTimetable(addSubject: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addTimetable, addSubject, {
      headers: this.header
    });
  }

  getTimetableList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getTimetableList,data, { headers: this.header });
  }

  editTimetable(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editTimetable + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getTimetableById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTimetableId + "/" + id, {
      headers: this.header
    });
  }

  deleteTimetable(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteTimetable + "/" + id, {
      headers: this.header
    });
  }

  filterClassList(data: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._filterClassList, data, {
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
