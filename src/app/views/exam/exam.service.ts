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
export class ExamService {
  token: any;
  header: any;
  apiUrl = environment.apiUrl;
  _getAllExam = this.apiUrl + "getAllExam";

  constructor(private http: HttpClient) { }
  getAllExam(data) {
    this.token = localStorage.getItem("token");
    this.header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
      Accept: "*/*"
    });
    return this.http.post(this._getAllExam, data, { headers: this.header });
  }
}
