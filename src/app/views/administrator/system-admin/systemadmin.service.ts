import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SystemadminService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addAdmin = this.apiUrl + "addAdmin";
  _getAdminList = this.apiUrl + "getAdminList";
  _editAdmin = this.apiUrl + "editAdmin";
  _getAdminById = this.apiUrl + "getAdminById";
  _addAdminPhoto = this.apiUrl + "addAdminPhoto";
  _deleteAdmin = this.apiUrl + "deleteAdmin";

  constructor(private http: HttpClient) {}

  addAdmin(addParents: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAdmin, addParents, {
      headers: this.header
    });
  }

  getAdminList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAdminList, { headers: this.header });
  }

  editAdmin(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editAdmin + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getAdminById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAdminById + "/" + id, {
      headers: this.header
    });
  }

  uploadPhoto(uploadPhoto) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAdminPhoto, uploadPhoto, {
      headers: this.header
    });
  }

  deleteAdmin(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteAdmin + "/" + id, {
      headers: this.header
    });
  }
}
