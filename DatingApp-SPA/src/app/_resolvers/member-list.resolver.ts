import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/Alertify.service';
import { PaginatedResult } from '../_models/pagination';

@Injectable()

export class MemberListResolver implements Resolve<PaginatedResult<User[]>> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retreiving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}