import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HolidayService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addHoliday = this.apiUrl + "addHoliday";
  _getHolidayList = this.apiUrl + "getHolidayList";
  _editHoliday = this.apiUrl + "editHoliday";
  _getHolidayById = this.apiUrl + "getHolidayById";
  _deleteHoliday = this.apiUrl + "deleteHoliday";
  _addHolidayPhoto = this.apiUrl + "addHolidayPhoto";

  constructor(private http: HttpClient) {}

  addHoliday(addHoliday: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addHoliday, addHoliday, {
      headers: this.header
    });
  }

  getHolidayList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getHolidayList, { headers: this.header });
  }

  editHoliday(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(this._editHoliday + "/" + id, editData, {
      headers: this.header
    });
  }

  getHolidayById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getHolidayById + "/" + id, {
      headers: this.header
    });
  }

  deleteHoliday(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteHoliday + "/" + id, {
      headers: this.header
    });
  }

  uploadPhoto(uploadPhoto) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addHolidayPhoto, uploadPhoto, {
      headers: this.header
    });
  }
}
