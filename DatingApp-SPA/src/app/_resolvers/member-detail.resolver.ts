import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retreiving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}