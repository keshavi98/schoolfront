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
export class ParentsService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addParents = this.apiUrl + "addParents";
  _getParentsList = this.apiUrl + "getParentsList";
  _editParents = this.apiUrl + "editParents";
  _getParentById = this.apiUrl + "getParentById";
  _addParentPhoto = this.apiUrl + "addParentPhoto";
  _deleteParents = this.apiUrl + "deleteParents";
  _getAllParents = this.apiUrl + "getAllParents";
  _getParentChildrenInfoById = this.apiUrl + "getParentChildrenInfoById";
  _addDocument = this.apiUrl + "addDocument";
  _addParentDocumentFile = this.apiUrl + "addParentDocumentFile";
  _getDocumentListById = this.apiUrl + "getDocumentListById";
  _deleteDocument = this.apiUrl + "deleteDocument";
  _downloadDocument = this.apiUrl + "download";
  _getUserInfoByUserId = this.apiUrl + "getUserInfoByUserId";

  constructor(private http: HttpClient) {}

  addParents(addParents: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addParents, addParents, {
      headers: this.header
    });
  }

  getParentsList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getParentsList, { headers: this.header });
  }

  editParents(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editParents + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getParentById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getParentById + "/" + id, {
      headers: this.header
    });
  }

  uploadPhoto(uploadPhoto) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addParentPhoto, uploadPhoto, {
      headers: this.header
    });
  }

  deleteParents(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteParents + "/" + id, {
      headers: this.header
    });
  }

  getAllParents() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getAllParents, { headers: this.header });
  }

  getParentChildrenInfoById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getParentChildrenInfoById + "/" + id, {
      headers: this.header
    });
  }

  uploadFile(uploadFile) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addParentDocumentFile, uploadFile, {
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
