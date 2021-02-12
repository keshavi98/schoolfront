import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { LoginService } from "../views/login/login.service";
import { SharedService } from "../shared.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  permissionData: any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.permissionData.subscribe(permissionData => {
      //debugger;
      this.permissionData = permissionData;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // const currentUser = this.loginService;
    // if (currentUser) {
    //   // check if route is restricted by role
    //   if (
    //     route.data.roles &&
    //     route.data.roles.indexOf(currentUser.role) === -1
    //   ) {
    //     // role not authorised so redirect to home page
    //     this.router.navigate(["/"]);
    //     return false;
    //   }

    //   // authorised so return true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    // return false;
  }
}
