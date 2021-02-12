import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MarkdistributionService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addMarkDistribution = this.apiUrl + "addMarkDistribution";
  _getMarkDistributionList = this.apiUrl + "getMarkDistributionList";
  _editMarkDistribution = this.apiUrl + "editMarkDistribution";
  _getMarkDistributionById = this.apiUrl + "getMarkDistributionById";
  _deleteMarkDistribution = this.apiUrl + "deleteMarkDistribution";

  constructor(private http: HttpClient) {}

  addMarkDistribution(addRole: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addMarkDistribution, addRole, {
      headers: this.header
    });
  }

  getMarkDistributionList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getMarkDistributionList, {
      headers: this.header
    });
  }

  editMarkDistribution(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editMarkDistribution + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getMarkDistributionById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getMarkDistributionById + "/" + id, {
      headers: this.header
    });
  }

  deleteMarkDistribution(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteMarkDistribution + "/" + id, {
      headers: this.header
    });
  }
}
