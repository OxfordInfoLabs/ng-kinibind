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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJzaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFxQixXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQWMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakQsTUFBTTs7OztJQUlGLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO0tBQ2xFOzs7Ozs7O0lBRU0sZUFBZSxDQUFDLEdBQVcsRUFBRSxNQUFXLEVBQUUsVUFBZSxFQUFFO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0lBR3pDLGNBQWMsQ0FBQyxHQUFXLEVBQUUsVUFBZSxFQUFFO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFHaEMsZ0JBQWdCLENBQUMsR0FBVyxFQUFFLE1BQVc7O1FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQzs7UUFDeEUsTUFBTSxPQUFPLEdBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7O1FBRzFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7UUFFbkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2YsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEdBQXNCLEVBQUUsRUFBRTtZQUV0QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7O2dCQUU3QixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUQ7WUFBQyxJQUFJLENBQUMsQ0FBQzs7O2dCQUdKLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDaEY7WUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEIsQ0FBQyxDQUFDLENBQUM7Ozs7WUEzQ2YsVUFBVTs7OztZQUpGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBqc29ucFJlcXVlc3RFcnJvcjogRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZVBvc3RSZXF1ZXN0KHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSwgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZUdldFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VKc29ucFJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB7IGhlYWRlcnM6IGhlYWRlcnMgfTtcblxuICAgICAgICAvLyBTZXQgY2FsbGJhY2sgcGFyYW0gZm9yIHRoZSBKU09OUCByZXF1ZXN0LlxuICAgICAgICBwYXJhbXMuY2FsbGJhY2sgPSAnSlNPTlBfQ0FMTEJBQ0snO1xuXG4gICAgICAgIG9wdGlvbnMucGFyYW1zID0gcGFyYW1zO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnanNvbnAnLCB1cmwsIG9wdGlvbnMpXG4gICAgICAgICAgICAucGlwZShtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9KSwgY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgY2xpZW50LXNpZGUgb3IgbmV0d29yayBlcnJvciBvY2N1cnJlZC4gSGFuZGxlIGl0IGFjY29yZGluZ2x5LlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZDonLCBlcnIuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGJhY2tlbmQgcmV0dXJuZWQgYW4gdW5zdWNjZXNzZnVsIHJlc3BvbnNlIGNvZGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSByZXNwb25zZSBib2R5IG1heSBjb250YWluIGNsdWVzIGFzIHRvIHdoYXQgd2VudCB3cm9uZyxcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQmFja2VuZCByZXR1cm5lZCBjb2RlICR7ZXJyLnN0YXR1c30sIGJvZHkgd2FzOiAke2Vyci5lcnJvcn1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yLmVtaXQoZXJyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiJdfQ==