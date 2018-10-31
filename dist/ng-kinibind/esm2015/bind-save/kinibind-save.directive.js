/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KinibindModel } from '../shared/kinibind.model';
import { Router } from '@angular/router';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import * as _ from 'lodash';
/**
 *
 * \@name NoJS Bind Save
 * \@docType Directive
 * \@tag [nojsBindSave]
 * \@templateData attributeData
 *
 * \@description The NoJS Bind Save Directive allows for simple saving of model back to the server. This will return the updated contents of either the NojsBindModel.results array or the NojsBindModel.item object to the server for processing.
 *
 * \@attributes-store-description The URL where of the server where the model should be sent for processing.
 * \@attributes-store-type String
 * \@attributes-storeParams-description Additional parameters to send back to the server with the post request.
 * \@attributes-storeParams-type Object
 * \@attributes-storeParams-value {param: value}
 * \@attributes-storeObjectParam-description The name of the parameter to send the model back with.
 * \@attributes-storeObjectParam-type String
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value model
 * \@attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * \@attributes-savedRoute-type String
 * \@attributes-onSave-description This function will be called when the save successfully completes
 * \@attributes-onSave-type method
 * \@attributes-onError-description This function will be called when an error is returned from the service call.
 * \@attributes-onError-type method
 *
 *
 * \@exampleDescription Add the nojsBindSave attribute to any element. The associated click event on that element will cause the model to save.
 * <button nojsBindSave store="https://someservice/save" storeObjectParam="orders" [model]="model"
 *   [storeParams]="{userId: 200}" savedRoute="/views/users"
 *   (onSave)="callMeOnSave()" (onError)="doSomething()">
 *   Save
 * </button>
 *
 */
export class KinibindSaveDirective {
    /**
     * @param {?} http
     * @param {?} router
     * @param {?} kbRequest
     */
    constructor(http, router, kbRequest) {
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
    onClick($event) {
        this.save();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    save() {
        /** @type {?} */
        let postParams;
        if (this.model) {
            if (_.isArray(this.model.data) && this.model.data.length > 0) {
                postParams = this.model.data;
            }
            else if (_.isObject(this.model.data)) {
                postParams = this.model.data;
            }
        }
        /** @type {?} */
        const method = this.method || 'POST';
        this.kbRequest.makeRequest(method, this.storeURL, {
            body: method === 'GET' ? null : postParams,
            params: method === 'GET' ? postParams : null,
            withCredentials: this.withCredentials || false
        })
            .toPromise()
            .then(results => {
            if (this.savedRoute) {
                this.router.navigate([this.savedRoute]);
            }
            this.onSave.emit({ results: results });
        })
            .catch(error => {
            this.onError.emit(error);
        });
    }
}
KinibindSaveDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbSave]'
            },] },
];
/** @nocollapse */
KinibindSaveDirective.ctorParameters = () => [
    { type: HttpClient },
    { type: Router },
    { type: KinibindRequestService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1raW5pYmluZC8iLCJzb3VyY2VzIjpbImJpbmQtc2F2ZS9raW5pYmluZC1zYXZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQy9ELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QzVCLE1BQU07Ozs7OztJQWVGLFlBQW9CLElBQWdCLEVBQ2hCLFFBQ0E7UUFGQSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNO1FBQ04sY0FBUyxHQUFULFNBQVM7c0JBVGlCLElBQUksWUFBWSxFQUFFO3VCQUNoQixJQUFJLFlBQVksRUFBRTtLQVVqRTs7Ozs7SUFSa0MsT0FBTyxDQUFDLE1BQU07UUFDN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2Y7Ozs7SUFRRCxRQUFRO0tBRVA7Ozs7SUFFTyxJQUFJOztRQUNSLElBQUksVUFBVSxDQUFNO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDaEM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ2hDO1NBQ0o7O1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7UUFFckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQzVDO1lBQ0ksSUFBSSxFQUFFLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVTtZQUMxQyxNQUFNLEVBQUUsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUs7U0FDakQsQ0FBQzthQUNELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUVaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUMxQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDOzs7O1lBMURkLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTthQUN2Qjs7OztZQTNDUSxVQUFVO1lBRVYsTUFBTTtZQUNOLHNCQUFzQjs7O29CQTJDMUIsS0FBSyxTQUFDLE9BQU87dUJBQ2IsS0FBSyxTQUFDLE9BQU87cUJBQ2IsS0FBSyxTQUFDLFFBQVE7eUJBQ2QsS0FBSyxTQUFDLFlBQVk7OEJBQ2xCLEtBQUssU0FBQyxpQkFBaUI7cUJBRXZCLE1BQU0sU0FBQyxRQUFRO3NCQUNmLE1BQU0sU0FBQyxTQUFTO3NCQUVoQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqXG4gKiBAbmFtZSBOb0pTIEJpbmQgU2F2ZVxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzQmluZFNhdmVdXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gVGhlIE5vSlMgQmluZCBTYXZlIERpcmVjdGl2ZSBhbGxvd3MgZm9yIHNpbXBsZSBzYXZpbmcgb2YgbW9kZWwgYmFjayB0byB0aGUgc2VydmVyLiBUaGlzIHdpbGwgcmV0dXJuIHRoZSB1cGRhdGVkIGNvbnRlbnRzIG9mIGVpdGhlciB0aGUgTm9qc0JpbmRNb2RlbC5yZXN1bHRzIGFycmF5IG9yIHRoZSBOb2pzQmluZE1vZGVsLml0ZW0gb2JqZWN0IHRvIHRoZSBzZXJ2ZXIgZm9yIHByb2Nlc3NpbmcuXG4gKlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtZGVzY3JpcHRpb24gVGhlIFVSTCB3aGVyZSBvZiB0aGUgc2VydmVyIHdoZXJlIHRoZSBtb2RlbCBzaG91bGQgYmUgc2VudCBmb3IgcHJvY2Vzc2luZy5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy1kZXNjcmlwdGlvbiBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gc2VuZCBiYWNrIHRvIHRoZSBzZXJ2ZXIgd2l0aCB0aGUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdHlwZSBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gc2VuZCB0aGUgbW9kZWwgYmFjayB3aXRoLlxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBtb2RlbFxuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS1kZXNjcmlwdGlvbiBUaGUgcm91dGUgdG8gbmF2aWdhdGUgdG8gb25jZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHJldHVybnMgc3VjY2Vzc2Z1bC5cbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHNhdmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlc1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gQWRkIHRoZSBub2pzQmluZFNhdmUgYXR0cmlidXRlIHRvIGFueSBlbGVtZW50LiBUaGUgYXNzb2NpYXRlZCBjbGljayBldmVudCBvbiB0aGF0IGVsZW1lbnQgd2lsbCBjYXVzZSB0aGUgbW9kZWwgdG8gc2F2ZS5cbiAqIDxidXR0b24gbm9qc0JpbmRTYXZlIHN0b3JlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9zYXZlXCIgc3RvcmVPYmplY3RQYXJhbT1cIm9yZGVyc1wiIFttb2RlbF09XCJtb2RlbFwiXG4gKiAgIFtzdG9yZVBhcmFtc109XCJ7dXNlcklkOiAyMDB9XCIgc2F2ZWRSb3V0ZT1cIi92aWV3cy91c2Vyc1wiXG4gKiAgIChvblNhdmUpPVwiY2FsbE1lT25TYXZlKClcIiAob25FcnJvcik9XCJkb1NvbWV0aGluZygpXCI+XG4gKiAgIFNhdmVcbiAqIDwvYnV0dG9uPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JTYXZlXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRTYXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnbW9kZWwnKSBtb2RlbDogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3N0b3JlJykgc3RvcmVVUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc2F2ZWRSb3V0ZScpIHNhdmVkUm91dGU6IHN0cmluZztcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoJ29uU2F2ZScpIG9uU2F2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnb25FcnJvcicpIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmUoKSB7XG4gICAgICAgIGxldCBwb3N0UGFyYW1zOiBhbnk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGlmIChfLmlzQXJyYXkodGhpcy5tb2RlbC5kYXRhKSAmJiB0aGlzLm1vZGVsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLm1vZGVsLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QodGhpcy5tb2RlbC5kYXRhKSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLm1vZGVsLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCB8fCAnUE9TVCc7XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnN0b3JlVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJvZHk6IG1ldGhvZCA9PT0gJ0dFVCcgPyBudWxsIDogcG9zdFBhcmFtcyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG1ldGhvZCA9PT0gJ0dFVCcgPyBwb3N0UGFyYW1zIDogbnVsbCxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzIHx8IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc2F2ZWRSb3V0ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlLmVtaXQoeyByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=