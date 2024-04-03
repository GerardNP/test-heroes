import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private notificationsService: NotificationsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        this.notificationsService.show('Se produjo un error, contacte con su administrador');

        return throwError(() => error);
      })
    );
  }
}
