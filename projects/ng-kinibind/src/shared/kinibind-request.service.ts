import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class KinibindRequestService {

    public jsonpRequestError: EventEmitter<HttpErrorResponse>;

    constructor(private http: HttpClient) {
        this.jsonpRequestError = new EventEmitter<HttpErrorResponse>();
    }

    public makeRequest(method: string, url: string, options: any = {}) {
        return this.http.request(method, url, options);
    }

    public makePostRequest(url: string, params: any, options: any = {}) {
        return this.http.post(url, params, options);
    }

    public makeGetRequest(url: string, options: any = {}) {
        return this.http.get(url, options);
    }

    public makeJsonpRequest(url: string, params: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options: any = { headers: headers };

        // Set callback param for the JSONP request.
        params.callback = 'JSONP_CALLBACK';

        options.params = params;

        return this.http.request('jsonp', url, options)
            .pipe(map(data => {
                return data;
            }), catchError((err: HttpErrorResponse) => {

                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
                }

                this.jsonpRequestError.emit(err);

                return EMPTY;
            }));
    }

}
