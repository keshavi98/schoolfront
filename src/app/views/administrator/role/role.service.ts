import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class RoleService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addRole = this.apiUrl + "addRole";
  _getRoleList = this.apiUrl + "getRoleList";
  _editRole = this.apiUrl + "editRole";
  _getRoleById = this.apiUrl + "getRoleById";
  _deleteRole = this.apiUrl + "deleteRole";

  constructor(private http: HttpClient) {}
  addRole(addRole: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addRole, addRole, {
      headers: this.header
    });
  }

  getRoleList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getRoleList, { headers: this.header });
  }

  editRole(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editRole + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getRoleById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getRoleById + "/" + id, {
      headers: this.header
    });
  }

  deleteRole(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteRole + "/" + id, {
      headers: this.header
    });
  }
}
