import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AcademicYearService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addAcademicYear = this.apiUrl + "addAcademicYear";
  _getAcademicYearList = this.apiUrl + "getAcademicYearList";
  _editAcademicYear = this.apiUrl + "editAcademicYear";
  _getAcademicYearById = this.apiUrl + "getAcademicYearById";
  _deleteAcademicYear = this.apiUrl + "deleteAcademicYear";

  constructor(private http: HttpClient) {}
  addAcademicYear(addacademicyear: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAcademicYear, addacademicyear, {
      headers: this.header
    });
  }

  getAcademicYearList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAcademicYearList, { headers: this.header });
  }

  editAcademicYear(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editAcademicYear + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getAcademicYearById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAcademicYearById + "/" + id, {
      headers: this.header
    });
  }

  deleteAcademicYear(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteAcademicYear + "/" + id, {
      headers: this.header
    });
  }
}
