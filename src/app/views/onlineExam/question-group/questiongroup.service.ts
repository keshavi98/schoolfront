import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class QuestiongroupService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addOnlineExamGroup = this.apiUrl + "addQuestionGroup";
  _getOnlineExamroupList = this.apiUrl + "getQuestionGroupList";
  _editOnlineExamGroup = this.apiUrl + "editQuestionGroup";
  _getOnlineExamGroupById = this.apiUrl + "getQuestionGroupById";
  _deleteOnlineExamGroup = this.apiUrl + "deleteQuestionGroup";

  constructor(private http: HttpClient) {}

  addOnlineExamGroup(addOnlineExamGroup: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addOnlineExamGroup, addOnlineExamGroup, {
      headers: this.header
    });
  }

  getOnlineExamroupList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getOnlineExamroupList, { headers: this.header });
  }

  editOnlineExamGroup(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editOnlineExamGroup + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getOnlineExamGroupById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getOnlineExamGroupById + "/" + id, {
      headers: this.header
    });
  }

  deleteOnlineExamGroup(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteOnlineExamGroup + "/" + id, {
      headers: this.header
    });
  }
}
