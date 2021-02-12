import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  token;
  header;
  apiUrl = environment.apiUrl;
  _addBooks = this.apiUrl + "addBooks";
  _getBooksList = this.apiUrl + "getBooksList";
  _editBooks = this.apiUrl + "editBooks";
  _getBooksById = this.apiUrl + "getBooksById";
  _deleteBooks = this.apiUrl + "deleteBooks";

  constructor(private http: HttpClient) {}

  addBooks(addBooks: any) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._addBooks, addBooks, {
      headers: this.header
    });
  }

  getBooksList() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(
      this._getBooksList,

      {
        headers: this.header
      }
    );
  }

  editBooks(id, editData) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });

    return this.http.patch(
      this._editBooks + "/" + id,
      editData,

      {
        headers: this.header
      }
    );
  }

  getBooksById(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.get(this._getBooksById + "/" + id, {
      headers: this.header
    });
  }

  deleteBooks(id) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.delete(this._deleteBooks + "/" + id, {
      headers: this.header
    });
  }
}
