import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class EventService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addEvent = this.apiUrl + "addEvent";
  _getEventList = this.apiUrl + "getEventList";
  _editEvent = this.apiUrl + "editEvent";
  _getEventById = this.apiUrl + "getEventById";
  _deleteEvent = this.apiUrl + "deleteEvent";
  _addEventPhoto = this.apiUrl + "addEventPhoto";

  constructor(private http: HttpClient) {}

  addEvent(addEvent: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addEvent, addEvent, {
      headers: this.header
    });
  }

  getEventList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getEventList, { headers: this.header });
  }

  editEvent(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(this._editEvent + "/" + id, editData, {
      headers: this.header
    });
  }

  getEventById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getEventById + "/" + id, {
      headers: this.header
    });
  }

  deleteEvent(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteEvent + "/" + id, {
      headers: this.header
    });
  }

  uploadPhoto(uploadPhoto) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addEventPhoto, uploadPhoto, {
      headers: this.header
    });
  }
}
