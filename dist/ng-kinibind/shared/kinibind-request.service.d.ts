import { EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class KinibindRequestService {
    private http;
    jsonpRequestError: EventEmitter<HttpErrorResponse>;
    constructor(http: HttpClient);
    makeRequest(method: string, url: string, options?: any): Observable<ArrayBuffer>;
    makePostRequest(url: string, params: any, options?: any): Observable<ArrayBuffer>;
    makeGetRequest(url: string, options?: any): Observable<ArrayBuffer>;
    makeJsonpRequest(url: string, params: any): Observable<ArrayBuffer>;
}
