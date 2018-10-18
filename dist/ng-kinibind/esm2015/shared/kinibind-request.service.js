/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
export class KinibindRequestService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.jsonpRequestError = new EventEmitter();
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    makeRequest(method, url, options = {}) {
        return this.http.request(method, url, options);
    }
    /**
     * @param {?} url
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    makePostRequest(url, params, options = {}) {
        return this.http.post(url, params, options);
    }
    /**
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    makeGetRequest(url, options = {}) {
        return this.http.get(url, options);
    }
    /**
     * @param {?} url
     * @param {?} params
     * @return {?}
     */
    makeJsonpRequest(url, params) {
        /** @type {?} */
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        /** @type {?} */
        const options = { headers: headers };
        // Set callback param for the JSONP request.
        params.callback = 'JSONP_CALLBACK';
        options.params = params;
        return this.http.request('jsonp', url, options)
            .pipe(map(data => {
            return data;
        }), catchError((err) => {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', err.error.message);
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
            this.jsonpRequestError.emit(err);
            return EMPTY;
        }));
    }
}
KinibindRequestService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
KinibindRequestService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /** @type {?} */
    KinibindRequestService.prototype.jsonpRequestError;
    /** @type {?} */
    KinibindRequestService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJzaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFxQixXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQWMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakQsTUFBTTs7OztJQUlGLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO0tBQ2xFOzs7Ozs7O0lBRU0sV0FBVyxDQUFDLE1BQWMsRUFBRSxHQUFXLEVBQUUsVUFBZSxFQUFFO1FBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztJQUc1QyxlQUFlLENBQUMsR0FBVyxFQUFFLE1BQVcsRUFBRSxVQUFlLEVBQUU7UUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFHekMsY0FBYyxDQUFDLEdBQVcsRUFBRSxVQUFlLEVBQUU7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztJQUdoQyxnQkFBZ0IsQ0FBQyxHQUFXLEVBQUUsTUFBVzs7UUFDNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDOztRQUN4RSxNQUFNLE9BQU8sR0FBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7UUFHMUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztRQUVuQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7YUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZixDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsR0FBc0IsRUFBRSxFQUFFO1lBRXRDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxRDtZQUFDLElBQUksQ0FBQyxDQUFDOzs7Z0JBR0osT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNoRjtZQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQixDQUFDLENBQUMsQ0FBQzs7OztZQS9DZixVQUFVOzs7O1lBSkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kUmVxdWVzdFNlcnZpY2Uge1xuXG4gICAgcHVibGljIGpzb25wUmVxdWVzdEVycm9yOiBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlUmVxdWVzdChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChtZXRob2QsIHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VQb3N0UmVxdWVzdCh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnksIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VHZXRSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlSnNvbnBSZXF1ZXN0KHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogYW55ID0geyBoZWFkZXJzOiBoZWFkZXJzIH07XG5cbiAgICAgICAgLy8gU2V0IGNhbGxiYWNrIHBhcmFtIGZvciB0aGUgSlNPTlAgcmVxdWVzdC5cbiAgICAgICAgcGFyYW1zLmNhbGxiYWNrID0gJ0pTT05QX0NBTExCQUNLJztcblxuICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHBhcmFtcztcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2pzb25wJywgdXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgLnBpcGUobWFwKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBIGNsaWVudC1zaWRlIG9yIG5ldHdvcmsgZXJyb3Igb2NjdXJyZWQuIEhhbmRsZSBpdCBhY2NvcmRpbmdseS5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQ6JywgZXJyLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBiYWNrZW5kIHJldHVybmVkIGFuIHVuc3VjY2Vzc2Z1bCByZXNwb25zZSBjb2RlLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcmVzcG9uc2UgYm9keSBtYXkgY29udGFpbiBjbHVlcyBhcyB0byB3aGF0IHdlbnQgd3JvbmcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEJhY2tlbmQgcmV0dXJuZWQgY29kZSAke2Vyci5zdGF0dXN9LCBib2R5IHdhczogJHtlcnIuZXJyb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5qc29ucFJlcXVlc3RFcnJvci5lbWl0KGVycik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG59XG4iXX0=