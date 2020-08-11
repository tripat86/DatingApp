import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../_models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  token: string;
  helper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = environment.apiUrl;
  username: string;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + "auth/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token.result);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.currentUser = user.user;
          this.getUsername();
          this.photoUrl.next(this.currentUser.photoUrl);
        }
      })
    );
  }

  getUsername() {
    this.decodedToken = this.helper.decodeToken(localStorage.getItem("token"));
    if (this.decodedToken) {
      this.username = this.decodedToken.unique_name;
    }
  }

  loggedIn(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  register(user: User) {
    return this.http.post(this.baseUrl + "auth/register", user);
  }

  roleMatch(allowedRoles: Array<string>): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
