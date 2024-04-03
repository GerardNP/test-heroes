import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";
import { tap } from "rxjs";

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    constructor(private notificationsService: NotificationsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {

            return next.handle(request).pipe(
                tap((res) => {
                    const response = res as HttpResponse<any>;
                    this.notificationsService.show(response.body?.message ?? 'Petición realizada con éxito', undefined, true);
                })
            );
        }

        return next.handle(request);
    }
}