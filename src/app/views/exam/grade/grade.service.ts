import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class GradeService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addGrade = this.apiUrl + "addGrade";
  _getGradeList = this.apiUrl + "getGradeList";
  _editGrade = this.apiUrl + "editGrade";
  _getGradeById = this.apiUrl + "getGradeById";
  _deleteGrade = this.apiUrl + "deleteGrade";
  _getAllGrade = this.apiUrl + "getAllGrade";

  constructor(private http: HttpClient) {}
  addGrade(addGrade: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addGrade, addGrade, {
      headers: this.header
    });
  }

  getGradeList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getGradeList, { headers: this.header });
  }

  editGrade(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editGrade + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getGradeById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getGradeById + "/" + id, {
      headers: this.header
    });
  }

  deleteGrade(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteGrade + "/" + id, {
      headers: this.header
    });
  }

  getAllGrade() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllGrade, { headers: this.header });
  }
}
