import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  constructor() {}
  private permission = new BehaviorSubject([]);
  permissionData = this.permission.asObservable();

  setPermissionData(permissionData) {
    //  debugger;
    this.permission.next(permissionData);
  }
}
