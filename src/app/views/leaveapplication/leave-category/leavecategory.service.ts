import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LeavecategoryService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addLeavecategory = this.apiUrl + "addLeaveCategory";
  _getLeavecategoryList = this.apiUrl + "getLeaveCategoryList";
  _editLeavecategory = this.apiUrl + "editLeaveCategory";
  _getLeavecategoryById = this.apiUrl + "getLeaveCategoryById";
  _deleteLeavecategory = this.apiUrl + "deleteLeaveCategory";

  constructor(private http: HttpClient) {}

  addLeavecategory(addLeavecategory: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addLeavecategory, addLeavecategory, {
      headers: this.header
    });
  }

  getLeavecategoryList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeavecategoryList, { headers: this.header });
  }

  editLeavecategory(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editLeavecategory + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getLeavecategoryById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getLeavecategoryById + "/" + id, {
      headers: this.header
    });
  }

  deleteLeavecategory(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteLeavecategory + "/" + id, {
      headers: this.header
    });
  }
}
