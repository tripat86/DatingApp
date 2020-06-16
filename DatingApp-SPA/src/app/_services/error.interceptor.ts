import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpEvent,
} from '@angular/common/http';
import { catchError, map, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    // Show this spinner for each request
    this.spinner.show();

    return next.handle(req).pipe(
      catchError((error) => {
        // this is used for 401 Unauthorized error
        if (error.status === 401) {
          return throwError(error.statusText);
        }

        if (error instanceof HttpErrorResponse) {
          // This is used for 500 type of errors
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }

          // This is used for Modal State errors
          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateErrors += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(modalStateErrors || serverError || 'serverError');
        }
      }),
      finalize(() => {
        // hide the spinner
        this.spinner.hide();
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
