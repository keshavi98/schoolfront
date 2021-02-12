import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ExamScheduleService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addExamSchedule = this.apiUrl + "addExamSchedule";
  _getExamScheduleList = this.apiUrl + "getExamScheduleList";
  _editExamSchedule = this.apiUrl + "editExamSchedule";
  _getExamScheduleById = this.apiUrl + "getExamScheduleById";
  _deleteExamSchedule = this.apiUrl + "deleteExamSchedule";
  _filterExamScheduleList = this.apiUrl + "filterExamScheduleList";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  addExamSchedule(addExamSchedule: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addExamSchedule, addExamSchedule, {
      headers: this.header
    });
  }

  getExamScheduleList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getExamScheduleList,data, { headers: this.header });
  }

  editExamSchedule(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editExamSchedule + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getExamScheduleById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getExamScheduleById + "/" + id, {
      headers: this.header
    });
  }

  deleteExamSchedule(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteExamSchedule + "/" + id, {
      headers: this.header
    });
  }

  filterExamScheduleList(data: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._filterExamScheduleList, data, {
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
