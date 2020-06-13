import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';
import { UserService } from '../_services/user.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/Alertify.service';
import { PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/Auth.service';

@Injectable()

export class MessageListResolver implements Resolve<PaginatedResult<Message[]>> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private authService: AuthService, private userService: UserService,
                private alertify: AlertifyService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retreiving messages');
                this.router.navigate(['/home']);
                
                return of(null);
            })
        );
    }
}