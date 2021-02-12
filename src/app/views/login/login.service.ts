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
export class LoginService {
  apiUrl = environment.apiUrl;
  _loginUser = this.apiUrl + "loginUser";
  _logoutUser = this.apiUrl + "logoutUser";
  _checkLogin = this.apiUrl + "checkLogin";

  constructor(private http: HttpClient) {}
  token: any;
  header: any;
  loginUser(login: any) {
    var token = localStorage.getItem("token");

    return this.http.post(this._loginUser, login);
  }

  logoutUser() {
    //var token = localStorage.getItem("token");
    // console.log(token);
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._logoutUser, {}, { headers: this.header });
  }

  checkLogin() {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._checkLogin, {}, { headers: this.header });
  }
}
