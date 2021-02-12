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
export class StudentService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addStudent = this.apiUrl + "addStudent";
  _getStudentList = this.apiUrl + "getStudentList";
  _addStudentPhoto = this.apiUrl + "addStudentPhoto";
  _editStudent = this.apiUrl + "editStudent";
  _getStudentById = this.apiUrl + "getStudentById";
  _deleteStudent = this.apiUrl + "deleteStudent";
  _getStudentParentInfoById = this.apiUrl + "getStudentParentInfoById";
  _getStudentTimeTableInfoById = this.apiUrl + "getStudentTimeTableInfoById";
  _getStudentAttendanceInfoById = this.apiUrl + "getStudentAttendanceInfoById";
  _getLeaveByStudentId = this.apiUrl + "getLeaveByStudentId";
  _addDocument = this.apiUrl + "addDocument";
  _addStudentFile = this.apiUrl + "addStudentDocumentFile";
  _getDocumentListById = this.apiUrl + "getDocumentListById";
  _deleteDocument = this.apiUrl + "deleteDocument";
  _downloadDocument = this.apiUrl + "download";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  addStudent(addStudent: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*"
    });
    return this.http.post(this._addStudent, addStudent, {
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

  // downloadFile() {
  //   this.token = localStorage.getItem("token");
  //   this.header = new HttpHeaders({
  //     Authorization: "Bearer " + this.token,
  //     Accept: "*/*"
  //   });
  //   return this.http.get(this._downloadFile, {
  //     headers: this.header
  //   });
  // }

  getStudentList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getStudentList,data,{
      headers: this.header
    });
  }

  uploadPhoto(uploadPhoto) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addStudentPhoto, uploadPhoto, {
      headers: this.header
    });
  }

  uploadFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addStudentFile, uploadFile, {
      headers: this.header
    });
  }

  editStudent(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editStudent + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getStudentById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentById + "/" + id, {
      headers: this.header
    });
  }

  deleteStudent(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteStudent + "/" + id, {
      headers: this.header
    });
  }

  getStudentParentInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentParentInfoById + "/" + id, {
      headers: this.header
    });
  }

  getStudentTimeTableInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentTimeTableInfoById + "/" + id, {
      headers: this.header
    });
  }

  getStudentAttendanceInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getStudentAttendanceInfoById + "/" + id, {
      headers: this.header
    });
  }

  getLeaveByStudentId(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeaveByStudentId + "/" + id, {
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
