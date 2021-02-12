import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SyllabusService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addSyllabus = this.apiUrl + "addSyllabus";
  _getSyllabusList = this.apiUrl + "getSyllabusList";
  _editSyllabus = this.apiUrl + "editSyllabus";
  _getSyllabusId = this.apiUrl + "getSyllabusById";
  _deleteSyllabus = this.apiUrl + "deleteSyllabus";
  _addSyllabusFile = this.apiUrl + "addSyllabusFile";
  _downloadDocument = this.apiUrl + "download";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";
  constructor(private http: HttpClient) {}

  addSyllabus(addSubject: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addSyllabus, addSubject, {
      headers: this.header
    });
  }

  getSyllabusList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getSyllabusList,data, { headers: this.header });
  }

  editSyllabus(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editSyllabus + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getSyllabusById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getSyllabusId + "/" + id, {
      headers: this.header
    });
  }

  deleteSyllabus(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteSyllabus + "/" + id, {
      headers: this.header
    });
  }

  uploadFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addSyllabusFile, uploadFile, {
      headers: this.header
    });
  }

  downloadDocument(file) {
    window.open(this._downloadDocument + "/" + file);
    // this.token = localStorage.getItem("token");
    // this.header = new HttpHeaders({
    //   Authorization: "Bearer " + this.token,
    //   Accept: "*/*"
    // });
    // return this.http.get(this._downloadDocument + "/" + file, {
    //   responseType: "arraybuffer",
    //   headers: this.header
    // });
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
