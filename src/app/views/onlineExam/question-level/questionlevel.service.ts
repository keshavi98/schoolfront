import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class QuestionlevelService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addQuestionLevel = this.apiUrl + "addQuestionLevel";
  _getQuestionLevelList = this.apiUrl + "getQuestionLevelList";
  _editQuestionLevelGroup = this.apiUrl + "editQuestionLevel";
  _getQuestionLevelById = this.apiUrl + "getQuestionLevelById";
  _deleteQuestionLevelGroup = this.apiUrl + "deleteQuestionLevel";

  constructor(private http: HttpClient) {}

  addQuestionLevel(addQuestionLevel: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addQuestionLevel, addQuestionLevel, {
      headers: this.header
    });
  }

  getQuestionLevelList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getQuestionLevelList, { headers: this.header });
  }

  editQuestionLevel(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editQuestionLevelGroup + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getQuestionLevelById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getQuestionLevelById + "/" + id, {
      headers: this.header
    });
  }

  deleteQuestionLevelGroup(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteQuestionLevelGroup + "/" + id, {
      headers: this.header
    });
  }
}
