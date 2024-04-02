import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private headers = new HttpHeaders();

    constructor(private http: HttpClient) { }

    handleError(error: HttpErrorResponse): Observable<any> {
        return throwError(() => error);
    }

    get<T>(urlService: string, params?: any, forceMock?: boolean, jsonName?: string): Observable<T> {
        const url = environment.baseUrlApi + urlService;
        this.headers = new HttpHeaders();

        const service = forceMock ? this.http.get<T>(`assets/mocks/${jsonName}`, { params }) : this.http.get<T>(url, { headers: this.headers, params });

        return service.pipe(catchError(this.handleError));
    }


    post<T>(urlService: string, params?: any, forceMock?: boolean, jsonName?: string): Observable<T> {
        const url = environment.baseUrlApi + urlService;
        this.headers = new HttpHeaders();

        const service = forceMock ? this.http.get<T>(`assets/mocks/${jsonName}`, { params }) : this.http.post<T>(url, params, { headers: this.headers });

        return service.pipe(catchError(this.handleError));
    }

    put<T>(urlService: string, params?: any): Observable<T> {
        const url = environment.baseUrlApi + urlService;
        this.headers = new HttpHeaders();

        const service = this.http.put<T>(url, params, { headers: this.headers });

        return service.pipe(catchError(this.handleError));
    }

    delete<T>(urlService: string, params?: any): Observable<T> {
        const url = environment.baseUrlApi + urlService;
        this.headers = new HttpHeaders();

        const service = this.http.delete<T>(url, {
            headers: this.headers,
            body: params
        });

        return service.pipe(catchError(this.handleError));
    }
}
