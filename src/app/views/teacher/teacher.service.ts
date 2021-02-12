import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: "root"
})
export class TeacherService {
  token;
  header;
  apiUrl = environment.apiUrl;

  _addTeacher = this.apiUrl + "addTeacher";
  _addTeacherPhoto = this.apiUrl + "addTeacherPhoto";
  _getTeacherList = this.apiUrl + "getTeacherList";
  _getTeacherById = this.apiUrl + "getTeacherById";
  _editTeacher = this.apiUrl + "editTeacher";
  _deleteTeacher = this.apiUrl + "deleteTeacher";
  _getTeacherTimeTableInfoById = this.apiUrl + "getTeacherTimeTableInfoById";
  _getTeacherAttendanceInfoById = this.apiUrl + "getTeacherAttendanceInfoById";
  _getLeaveByTeacherId = this.apiUrl + "getLeaveByTeacherId";
  _addDocument = this.apiUrl + "addDocument";
  _addTeacherDocumentFile = this.apiUrl + "addTeacherDocumentFile";
  _getDocumentListById = this.apiUrl + "getDocumentListById";
  _deleteDocument = this.apiUrl + "deleteDocument";
  _downloadDocument = this.apiUrl + "download";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  addTeacher(addTeacher: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addTeacher, addTeacher, {
      headers: this.header
    });
  }

  uploadPhoto(uploadPhoto) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addTeacherPhoto, uploadPhoto, {
      headers: this.header
    });
  }

  getTeacherList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTeacherList, { headers: this.header });
  }

  getTeacherById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTeacherById + "/" + id, {
      headers: this.header
    });
  }

  editTeacher(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editTeacher + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  deleteTeacher(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteTeacher + "/" + id, {
      headers: this.header
    });
  }

  getTeacherTimeTableInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTeacherTimeTableInfoById + "/" + id, {
      headers: this.header
    });
  }

  getTeacherAttendanceInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getTeacherAttendanceInfoById + "/" + id, {
      headers: this.header
    });
  }

  getLeaveByTeacherId(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveByTeacherId + "/" + id, {
      headers: this.header
    });
  }

  uploadFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addTeacherDocumentFile, uploadFile, {
      headers: this.header
    });
  }
  
  addDocument(id, adddocument: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*"
    });
    return this.http.post(this._addDocument + "/" + id, adddocument, {
      headers: this.header
    });
    
  }

  getDocumentListById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getDocumentListById + "/" + id, {
      headers: this.header
    });
  }

  deleteDocument(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteDocument + "/" + id, {
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
