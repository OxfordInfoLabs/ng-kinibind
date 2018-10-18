/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
var KinibindRequestService = /** @class */ (function () {
    function KinibindRequestService(http) {
        this.http = http;
        this.jsonpRequestError = new EventEmitter();
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    KinibindRequestService.prototype.makeRequest = /**
     * @param {?} method
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    function (method, url, options) {
        if (options === void 0) { options = {}; }
        return this.http.request(method, url, options);
    };
    /**
     * @param {?} url
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    KinibindRequestService.prototype.makePostRequest = /**
     * @param {?} url
     * @param {?} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (options === void 0) { options = {}; }
        return this.http.post(url, params, options);
    };
    /**
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    KinibindRequestService.prototype.makeGetRequest = /**
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    function (url, options) {
        if (options === void 0) { options = {}; }
        return this.http.get(url, options);
    };
    /**
     * @param {?} url
     * @param {?} params
     * @return {?}
     */
    KinibindRequestService.prototype.makeJsonpRequest = /**
     * @param {?} url
     * @param {?} params
     * @return {?}
     */
    function (url, params) {
        var _this = this;
        /** @type {?} */
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        /** @type {?} */
        var options = { headers: headers };
        // Set callback param for the JSONP request.
        params.callback = 'JSONP_CALLBACK';
        options.params = params;
        return this.http.request('jsonp', url, options)
            .pipe(map(function (data) {
            return data;
        }), catchError(function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', err.error.message);
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error("Backend returned code " + err.status + ", body was: " + err.error);
            }
            _this.jsonpRequestError.emit(err);
            return EMPTY;
        }));
    };
    KinibindRequestService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    KinibindRequestService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return KinibindRequestService;
}());
export { KinibindRequestService };
if (false) {
    /** @type {?} */
    KinibindRequestService.prototype.jsonpRequestError;
    /** @type {?} */
    KinibindRequestService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJzaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFxQixXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQWMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBTzdDLGdDQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztLQUNsRTs7Ozs7OztJQUVNLDRDQUFXOzs7Ozs7Y0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7O0lBRzVDLGdEQUFlOzs7Ozs7Y0FBQyxHQUFXLEVBQUUsTUFBVyxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFHekMsK0NBQWM7Ozs7O2NBQUMsR0FBVyxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztJQUdoQyxpREFBZ0I7Ozs7O2NBQUMsR0FBVyxFQUFFLE1BQVc7OztRQUM1QyxJQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7O1FBQ3hFLElBQU0sT0FBTyxHQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOztRQUcxQyxNQUFNLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBRW5DLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQzthQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZixDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQUMsR0FBc0I7WUFFbEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDOztnQkFFN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFEO1lBQUMsSUFBSSxDQUFDLENBQUM7OztnQkFHSixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUF5QixHQUFHLENBQUMsTUFBTSxvQkFBZSxHQUFHLENBQUMsS0FBTyxDQUFDLENBQUM7YUFDaEY7WUFFRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEIsQ0FBQyxDQUFDLENBQUM7OztnQkEvQ2YsVUFBVTs7OztnQkFKRixVQUFVOztpQ0FEbkI7O1NBTWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB7XG5cbiAgICBwdWJsaWMganNvbnBSZXF1ZXN0RXJyb3I6IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5qc29ucFJlcXVlc3RFcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KG1ldGhvZCwgdXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZVBvc3RSZXF1ZXN0KHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSwgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZUdldFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VKc29ucFJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB7IGhlYWRlcnM6IGhlYWRlcnMgfTtcblxuICAgICAgICAvLyBTZXQgY2FsbGJhY2sgcGFyYW0gZm9yIHRoZSBKU09OUCByZXF1ZXN0LlxuICAgICAgICBwYXJhbXMuY2FsbGJhY2sgPSAnSlNPTlBfQ0FMTEJBQ0snO1xuXG4gICAgICAgIG9wdGlvbnMucGFyYW1zID0gcGFyYW1zO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnanNvbnAnLCB1cmwsIG9wdGlvbnMpXG4gICAgICAgICAgICAucGlwZShtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9KSwgY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgY2xpZW50LXNpZGUgb3IgbmV0d29yayBlcnJvciBvY2N1cnJlZC4gSGFuZGxlIGl0IGFjY29yZGluZ2x5LlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZDonLCBlcnIuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGJhY2tlbmQgcmV0dXJuZWQgYW4gdW5zdWNjZXNzZnVsIHJlc3BvbnNlIGNvZGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSByZXNwb25zZSBib2R5IG1heSBjb250YWluIGNsdWVzIGFzIHRvIHdoYXQgd2VudCB3cm9uZyxcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQmFja2VuZCByZXR1cm5lZCBjb2RlICR7ZXJyLnN0YXR1c30sIGJvZHkgd2FzOiAke2Vyci5lcnJvcn1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yLmVtaXQoZXJyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiJdfQ==