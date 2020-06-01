import { Injectable } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { Router, CanActivate } from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        }
        this.alertify.error('You shall not pass');
        this.router.navigate(['/home']);
        return false;
    }
}