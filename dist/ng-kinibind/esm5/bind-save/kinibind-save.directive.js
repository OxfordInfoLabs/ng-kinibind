/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KinibindModel } from '../shared/kinibind.model';
import { Router } from '@angular/router';
import { KinibindRequestService } from '../shared/kinibind-request.service';
/**
 *
 * \@name NoJS Bind Save
 * \@docType Directive
 * \@tag [nojsBindSave]
 * \@templateData attributeData
 *
 * \@description The NoJS Bind Save Directive allows for simple saving of data back to the server. This will return the updated contents of either the NojsBindModel.results array or the NojsBindModel.item object to the server for processing.
 *
 * \@attributes-store-description The URL where of the server where the data should be sent for processing.
 * \@attributes-store-type String
 * \@attributes-storeParams-description Additional parameters to send back to the server with the post request.
 * \@attributes-storeParams-type Object
 * \@attributes-storeParams-value {param: value}
 * \@attributes-storeObjectParam-description The name of the parameter to send the data back with.
 * \@attributes-storeObjectParam-type String
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value data
 * \@attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * \@attributes-savedRoute-type String
 * \@attributes-onSave-description This function will be called when the save successfully completes
 * \@attributes-onSave-type method
 * \@attributes-onError-description This function will be called when an error is returned from the service call.
 * \@attributes-onError-type method
 *
 *
 * \@exampleDescription Add the nojsBindSave attribute to any element. The associated click event on that element will cause the data to save.
 * <button nojsBindSave store="https://someservice/save" storeObjectParam="orders" [model]="data"
 *   [storeParams]="{userId: 200}" savedRoute="/views/users"
 *   (onSave)="callMeOnSave()" (onError)="doSomething()">
 *   Save
 * </button>
 *
 */
var KinibindSaveDirective = /** @class */ (function () {
    function KinibindSaveDirective(http, router, kbRequest) {
        this.http = http;
        this.router = router;
        this.kbRequest = kbRequest;
        this.onSave = new EventEmitter();
        this.onError = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    KinibindSaveDirective.prototype.onClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.save();
    };
    /**
     * @return {?}
     */
    KinibindSaveDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    KinibindSaveDirective.prototype.save = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var postParams;
        if (this.model) {
            if (this.model.results.length > 0) {
                postParams = this.model.results;
            }
            else if (this.model.item) {
                postParams = this.model.item;
            }
        }
        /** @type {?} */
        var method = this.method || 'POST';
        this.kbRequest.makeRequest(method, this.storeURL, {
            withCredentials: this.withCredentials || false,
            params: postParams
        })
            .toPromise()
            .then(function (results) {
            if (_this.savedRoute) {
                _this.router.navigate([_this.savedRoute]);
            }
            _this.onSave.emit({ results: results });
        })
            .catch(function (error) {
            _this.onError.emit(error);
        });
    };
    KinibindSaveDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbSave]'
                },] },
    ];
    /** @nocollapse */
    KinibindSaveDirective.ctorParameters = function () { return [
        { type: HttpClient },
        { type: Router },
        { type: KinibindRequestService }
    ]; };
    KinibindSaveDirective.propDecorators = {
        model: [{ type: Input, args: ['model',] }],
        storeURL: [{ type: Input, args: ['store',] }],
        method: [{ type: Input, args: ['method',] }],
        savedRoute: [{ type: Input, args: ['savedRoute',] }],
        withCredentials: [{ type: Input, args: ['withCredentials',] }],
        onSave: [{ type: Output, args: ['onSave',] }],
        onError: [{ type: Output, args: ['onError',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return KinibindSaveDirective;
}());
export { KinibindSaveDirective };
if (false) {
    /** @type {?} */
    KinibindSaveDirective.prototype.model;
    /** @type {?} */
    KinibindSaveDirective.prototype.storeURL;
    /** @type {?} */
    KinibindSaveDirective.prototype.method;
    /** @type {?} */
    KinibindSaveDirective.prototype.savedRoute;
    /** @type {?} */
    KinibindSaveDirective.prototype.withCredentials;
    /** @type {?} */
    KinibindSaveDirective.prototype.onSave;
    /** @type {?} */
    KinibindSaveDirective.prototype.onError;
    /** @type {?} */
    KinibindSaveDirective.prototype.http;
    /** @type {?} */
    KinibindSaveDirective.prototype.router;
    /** @type {?} */
    KinibindSaveDirective.prototype.kbRequest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1raW5pYmluZC8iLCJzb3VyY2VzIjpbImJpbmQtc2F2ZS9raW5pYmluZC1zYXZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQy9ELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUR4RSwrQkFBb0IsSUFBZ0IsRUFDaEIsUUFDQTtRQUZBLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUztzQkFUaUIsSUFBSSxZQUFZLEVBQUU7dUJBQ2hCLElBQUksWUFBWSxFQUFFO0tBVWpFOzs7OztJQVJrQyx1Q0FBTzs7OztJQUExQyxVQUEyQyxNQUFNO1FBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNmOzs7O0lBUUQsd0NBQVE7OztJQUFSO0tBRUM7Ozs7SUFFTyxvQ0FBSTs7Ozs7O1FBQ1IsSUFBSSxVQUFVLENBQU07UUFFcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ25DO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ2hDO1NBQ0o7O1FBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7UUFFckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQzVDO1lBQ0ksZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSztZQUM5QyxNQUFNLEVBQUUsVUFBVTtTQUNyQixDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUVULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1lBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUMxQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNSLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCLENBQUMsQ0FBQzs7O2dCQXpEZCxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCOzs7O2dCQTFDUSxVQUFVO2dCQUVWLE1BQU07Z0JBQ04sc0JBQXNCOzs7d0JBMEMxQixLQUFLLFNBQUMsT0FBTzsyQkFDYixLQUFLLFNBQUMsT0FBTzt5QkFDYixLQUFLLFNBQUMsUUFBUTs2QkFDZCxLQUFLLFNBQUMsWUFBWTtrQ0FDbEIsS0FBSyxTQUFDLGlCQUFpQjt5QkFFdkIsTUFBTSxTQUFDLFFBQVE7MEJBQ2YsTUFBTSxTQUFDLFNBQVM7MEJBRWhCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2dDQXpEckM7O1NBOENhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBCaW5kIFNhdmVcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBbbm9qc0JpbmRTYXZlXVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgU2F2ZSBEaXJlY3RpdmUgYWxsb3dzIGZvciBzaW1wbGUgc2F2aW5nIG9mIGRhdGEgYmFjayB0byB0aGUgc2VydmVyLiBUaGlzIHdpbGwgcmV0dXJuIHRoZSB1cGRhdGVkIGNvbnRlbnRzIG9mIGVpdGhlciB0aGUgTm9qc0JpbmRNb2RlbC5yZXN1bHRzIGFycmF5IG9yIHRoZSBOb2pzQmluZE1vZGVsLml0ZW0gb2JqZWN0IHRvIHRoZSBzZXJ2ZXIgZm9yIHByb2Nlc3NpbmcuXG4gKlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtZGVzY3JpcHRpb24gVGhlIFVSTCB3aGVyZSBvZiB0aGUgc2VydmVyIHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBzZW50IGZvciBwcm9jZXNzaW5nLlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLWRlc2NyaXB0aW9uIEFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byBzZW5kIGJhY2sgdG8gdGhlIHNlcnZlciB3aXRoIHRoZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZW5kIHRoZSBkYXRhIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS1kZXNjcmlwdGlvbiBUaGUgcm91dGUgdG8gbmF2aWdhdGUgdG8gb25jZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHJldHVybnMgc3VjY2Vzc2Z1bC5cbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHNhdmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlc1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gQWRkIHRoZSBub2pzQmluZFNhdmUgYXR0cmlidXRlIHRvIGFueSBlbGVtZW50LiBUaGUgYXNzb2NpYXRlZCBjbGljayBldmVudCBvbiB0aGF0IGVsZW1lbnQgd2lsbCBjYXVzZSB0aGUgZGF0YSB0byBzYXZlLlxuICogPGJ1dHRvbiBub2pzQmluZFNhdmUgc3RvcmU9XCJodHRwczovL3NvbWVzZXJ2aWNlL3NhdmVcIiBzdG9yZU9iamVjdFBhcmFtPVwib3JkZXJzXCIgW21vZGVsXT1cImRhdGFcIlxuICogICBbc3RvcmVQYXJhbXNdPVwie3VzZXJJZDogMjAwfVwiIHNhdmVkUm91dGU9XCIvdmlld3MvdXNlcnNcIlxuICogICAob25TYXZlKT1cImNhbGxNZU9uU2F2ZSgpXCIgKG9uRXJyb3IpPVwiZG9Tb21ldGhpbmcoKVwiPlxuICogICBTYXZlXG4gKiA8L2J1dHRvbj5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiU2F2ZV0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ21vZGVsJykgbW9kZWw6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdzdG9yZScpIHN0b3JlVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdtZXRob2QnKSBtZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ3NhdmVkUm91dGUnKSBzYXZlZFJvdXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCdvblNhdmUnKSBvblNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uRXJyb3InKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljaygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICBsZXQgcG9zdFBhcmFtczogYW55O1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5tb2RlbC5yZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsLml0ZW0pIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5tb2RlbC5pdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2QgfHwgJ1BPU1QnO1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy5zdG9yZVVSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcG9zdFBhcmFtc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYXZlZFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnNhdmVkUm91dGVdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZS5lbWl0KHsgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19