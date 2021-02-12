import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AssignmentService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addAssignment = this.apiUrl + "addAssignment";
  _getAssignmentList = this.apiUrl + "getAssignmentList";
  _editAssignment = this.apiUrl + "editAssignment";
  _getAssignmetId = this.apiUrl + "getAssignmentById";
  _deleteAssignment = this.apiUrl + "deleteAssignment";
  _addAssignmentFile = this.apiUrl + "addAssigmentFile";
  _downloadDocument = this.apiUrl + "download";
  _addDocument = this.apiUrl + "addDocument";
  _getAssignmetAnsId = this.apiUrl + "getAssignmentAnsById";
  _addAssignmentAnswerFile = this.apiUrl + "addStudentAssignmentAnswerFile";
  _getAssignmentAnswerList = this.apiUrl + "getAssignmentAnswerList";
  _addAssignmentAnswer = this.apiUrl + "addAssignmentAnswer";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  addAssignment(addSubject: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAssignment, addSubject, {
      headers: this.header
    });
  }

  getAssignmentList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getAssignmentList, data,{ headers: this.header });
  }

  editAssignment(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editAssignment + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getAssignmentById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAssignmetId + "/" + id, {
      headers: this.header
    });
  }

  deleteAssignment(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteAssignment + "/" + id, {
      headers: this.header
    });
  }

  uploadFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAssignmentFile, uploadFile, {
      headers: this.header
    });
  }

  downloadDocument(file) {
    window.open(this._downloadDocument + "/" + file);
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

  // upload assignment answer
  uploadAssignmentAnswerFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAssignmentAnswerFile, uploadFile, {
      headers: this.header
    });
  }

  addAssignmentAnswer(addAnswer: any) {
    debugger;
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addAssignmentAnswer, addAnswer, {
      headers: this.header
    });
  }

  // get all submitted asnswer for an assignment
  getAssignmentAnswerList(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(
      this._getAssignmentAnswerList,
      data,

      {
        headers: this.header
      }
    );
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
