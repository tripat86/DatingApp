import { Injectable } from "@angular/core";
import { AuthService } from "../_services/Auth.service";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AlertifyService } from "../_services/Alertify.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data["roles"] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(["members"]);
        this.alertify.error("You are not authorised to access this area");
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error("You shall not pass");
    this.router.navigate(["/home"]);
    return false;
  }
}
