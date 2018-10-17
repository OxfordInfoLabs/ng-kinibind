/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { merge } from 'rxjs';
import { of as observableOf } from 'rxjs';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KinibindModel } from '../shared/kinibind.model';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
/**
 *
 * \@name NoJS Form
 * \@docType Directive
 * \@tag [nojsForm]
 * \@templateData attributeData
 *
 * \@description The Nojs Form directive allows for data to sourced from a URL and bound to a model, which can then be used to bind to form components. Additional form validation can be added to the form inputs. In order to save data back to the server, a store URL and submit button need to be included in the form markup.
 *
 * \@attributes-source-description The URL to load the data asynchronously. Data should be returned in JSON format as either:
 * \@attributes-source-type String
 * \@attributes-source-value https://someservice/results.json
 * \@attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * \@attributes-sourceParams-description Parameters object to send with the Source post request.
 * \@attributes-sourceParams-type Object
 * \@attributes-sourceParams-value {param: value}
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value data
 * \@attributes-store-description The url to send any dirty data back to the server for processing.
 * \@attributes-store-type String
 * \@attributes-storeParams-description Parameters object to send with the Store post request.
 * \@attributes-storeParams-type Object
 * \@attributes-storeParams-value {param: value}
 * \@attributes-storeObjectParam-description The name of the parameter to send the data back with.
 * \@attributes-storeObjectParam-type String
 * \@attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * \@attributes-savedRoute-type String
 * \@attributes-dirtyOnly-description In the case where an array of objects are being edited, only send back the objects where containing fields have been changed.
 * \@attributes-dirtyOnly-type Boolean (default false)
 * \@attributes-onLoad-description Event raised once the data has been loaded successfully.
 * \@attributes-onLoad-type method
 * \@attributes-onLoadError-description Event raised in the scenario where there is an error loading the data.
 * \@attributes-onLoadError-type method
 * \@attributes-onSave-description This function will be called when the save successfully completes
 * \@attributes-onSave-type method
 * \@attributes-onError-description This function will be called when an error is returned from the service call.
 * \@attributes-onError-type method
 *
 *
 * \@exampleDescription This attribute should only be used in conjunction with a <form> element.
 * <form nojsForm [model]="data" source="/POST/Someservice/getOrderData"
 *   [sourceParams]="{orderId: 37}" store="/POST/Someservice/saveOrders"
 *   storeObjectParam="orders" savedRoute="/nojs-core">
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>ID</label>
 *   <input type="text" name="id" [(ngModel)]="data.item.id" required>
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Status</label>
 *   <input type="text" name="status" [(ngModel)]="data.item.status">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Subtotal</label>
 *   <input type="text" name="subtotal" [(ngModel)]="data.item.subtotal">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Taxes</label>
 *   <input type="text" name="taxes" [(ngModel)]="data.item.taxes">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Total</label>
 *   <input type="text" name="total" [(ngModel)]="data.item.total">
 * </div>
 *
 * <button type="submit">Save</button>
 * </form>
 *
 */
export class KinibindFormDirective {
    /**
     * @param {?} ngForm
     * @param {?} router
     * @param {?} kbRequest
     */
    constructor(ngForm, router, kbRequest) {
        this.ngForm = ngForm;
        this.router = router;
        this.kbRequest = kbRequest;
        this.onLoad = new EventEmitter();
        this.onLoadError = new EventEmitter();
        this.onSave = new EventEmitter();
        this.onError = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initSourceData();
        this.initSaveData();
    }
    /**
     * @return {?}
     */
    initSourceData() {
        this.data.filters.changes.subscribe(() => this.data.pageOptions.index = 0);
        merge(this.data.filters.changes, this.data.pageOptions.changes)
            .pipe(startWith({}), switchMap(() => {
            return this.getData();
        }), map((data) => {
            if (_.isPlainObject(data)) {
                if (data.results && _.isArray(data.results)) {
                    this.data.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (_.isArray(data)) {
                this.data.totalCount = data.length;
                return data;
            }
        }), catchError((error) => {
            this.onLoadError.emit(error);
            return observableOf([]);
        })).subscribe(data => {
            if (_.isPlainObject(data)) {
                this.data.item = data;
            }
            else {
                this.data.results = data;
            }
            this.onLoad.emit({ success: true });
        });
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const postParams = this.sourceParams || {};
        if (this.data.filters.filterObject) {
            postParams.filters = this.data.filters.filterObject;
        }
        if (this.data.pageOptions.size && this.data.pageOptions.index) {
            /** @type {?} */
            const offset = this.data.pageOptions.size * this.data.pageOptions.index;
            postParams.limit = this.data.pageOptions.size;
            postParams.offset = offset;
        }
        return this.kbRequest.makePostRequest(this.url, postParams);
    }
    /**
     * @return {?}
     */
    initSaveData() {
        if (this.storeURL) {
            this.ngForm.ngSubmit.subscribe(() => {
                if (this.data.results.length > 0) {
                    if (this.dirtyOnly) {
                        /** @type {?} */
                        const dirty = [];
                        _.forEach(this.ngForm.form.controls, (control, key) => {
                            if (control.dirty) {
                                dirty.push(key);
                            }
                        });
                        if (dirty.length > 0) {
                            this.saveData(dirty);
                        }
                    }
                    else {
                        this.saveData();
                    }
                }
                else if (this.data.item && this.ngForm.dirty) {
                    this.saveData();
                }
            });
        }
    }
    /**
     * @param {?=} dirty
     * @return {?}
     */
    saveData(dirty) {
        /** @type {?} */
        const postParams = this.storeParams || {};
        if (dirty) {
            /** @type {?} */
            const dirtyObjects = [];
            dirty.forEach(dirtyKey => {
                /** @type {?} */
                const splitKey = dirtyKey.split('-');
                /** @type {?} */
                const dirtyIndex = _.find(splitKey, key => {
                    return !isNaN(Number(key));
                });
                dirtyObjects.push(this.data.results[dirtyIndex]);
            });
            postParams[this.storeObjectParam || 'results'] = dirtyObjects;
        }
        else {
            if (this.data.results.length > 0) {
                postParams[this.storeObjectParam || 'results'] = this.data.results;
            }
            else if (this.data.item) {
                postParams[this.storeObjectParam || 'object'] = this.data.item;
            }
        }
        this.kbRequest.makePostRequest(this.storeURL, postParams).toPromise()
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
KinibindFormDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbForm]'
            },] },
];
/** @nocollapse */
KinibindFormDirective.ctorParameters = () => [
    { type: NgForm },
    { type: Router },
    { type: KinibindRequestService }
];
KinibindFormDirective.propDecorators = {
    url: [{ type: Input, args: ['source',] }],
    sourceParams: [{ type: Input, args: ['sourceParams',] }],
    data: [{ type: Input, args: ['model',] }],
    storeURL: [{ type: Input, args: ['store',] }],
    storeParams: [{ type: Input, args: ['storeParams',] }],
    storeObjectParam: [{ type: Input, args: ['storeObjectParam',] }],
    savedRoute: [{ type: Input, args: ['savedRoute',] }],
    dirtyOnly: [{ type: Input, args: ['dirtyOnly',] }],
    withCredentials: [{ type: Input, args: ['withCredentials',] }],
    onLoad: [{ type: Output, args: ['onLoad',] }],
    onLoadError: [{ type: Output, args: ['onLoadError',] }],
    onSave: [{ type: Output, args: ['onSave',] }],
    onError: [{ type: Output, args: ['onError',] }]
};
if (false) {
    /** @type {?} */
    KinibindFormDirective.prototype.url;
    /** @type {?} */
    KinibindFormDirective.prototype.sourceParams;
    /** @type {?} */
    KinibindFormDirective.prototype.data;
    /** @type {?} */
    KinibindFormDirective.prototype.storeURL;
    /** @type {?} */
    KinibindFormDirective.prototype.storeParams;
    /** @type {?} */
    KinibindFormDirective.prototype.storeObjectParam;
    /** @type {?} */
    KinibindFormDirective.prototype.savedRoute;
    /** @type {?} */
    KinibindFormDirective.prototype.dirtyOnly;
    /** @type {?} */
    KinibindFormDirective.prototype.withCredentials;
    /** @type {?} */
    KinibindFormDirective.prototype.onLoad;
    /** @type {?} */
    KinibindFormDirective.prototype.onLoadError;
    /** @type {?} */
    KinibindFormDirective.prototype.onSave;
    /** @type {?} */
    KinibindFormDirective.prototype.onError;
    /** @type {?} */
    KinibindFormDirective.prototype.ngForm;
    /** @type {?} */
    KinibindFormDirective.prototype.router;
    /** @type {?} */
    KinibindFormDirective.prototype.kbRequest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtZm9ybS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1raW5pYmluZC8iLCJzb3VyY2VzIjpbImZvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQ2pELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErRXZFLE1BQU07Ozs7OztJQWlCRixZQUFvQixNQUFjLEVBQ2QsUUFDQTtRQUZBLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTTtRQUNOLGNBQVMsR0FBVCxTQUFTO3NCQVBpQixJQUFJLFlBQVksRUFBTzsyQkFDYixJQUFJLFlBQVksRUFBTztzQkFDakMsSUFBSSxZQUFZLEVBQUU7dUJBQ2hCLElBQUksWUFBWSxFQUFFO0tBTWpFOzs7O0lBRUQsUUFBUTtRQUNKLElBQUks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QUNmLE1BQU0sU0FBQyxhQUFhO3FCQUNwQixNQUFNLFNBQUMsUUFBUTtzQkFDZixNQUFNLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgRm9ybVxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRm9ybV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9qcyBGb3JtIGRpcmVjdGl2ZSBhbGxvd3MgZm9yIGRhdGEgdG8gc291cmNlZCBmcm9tIGEgVVJMIGFuZCBib3VuZCB0byBhIG1vZGVsLCB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGJpbmQgdG8gZm9ybSBjb21wb25lbnRzLiBBZGRpdGlvbmFsIGZvcm0gdmFsaWRhdGlvbiBjYW4gYmUgYWRkZWQgdG8gdGhlIGZvcm0gaW5wdXRzLiBJbiBvcmRlciB0byBzYXZlIGRhdGEgYmFjayB0byB0aGUgc2VydmVyLCBhIHN0b3JlIFVSTCBhbmQgc3VibWl0IGJ1dHRvbiBuZWVkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmb3JtIG1hcmt1cC5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBsb2FkIHRoZSBkYXRhIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgb2JqZWN0IHRvIHNlbmQgd2l0aCB0aGUgU291cmNlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSB1cmwgdG8gc2VuZCBhbnkgZGlydHkgZGF0YSBiYWNrIHRvIHRoZSBzZXJ2ZXIgZm9yIHByb2Nlc3NpbmcuXG4gKiBAYXR0cmlidXRlcy1zdG9yZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyBvYmplY3QgdG8gc2VuZCB3aXRoIHRoZSBTdG9yZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZW5kIHRoZSBkYXRhIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1kaXJ0eU9ubHktZGVzY3JpcHRpb24gSW4gdGhlIGNhc2Ugd2hlcmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhcmUgYmVpbmcgZWRpdGVkLCBvbmx5IHNlbmQgYmFjayB0aGUgb2JqZWN0cyB3aGVyZSBjb250YWluaW5nIGZpZWxkcyBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS10eXBlIEJvb2xlYW4gKGRlZmF1bHQgZmFsc2UpXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIG9uY2UgdGhlIGRhdGEgaGFzIGJlZW4gbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIGluIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGVyZSBpcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBkYXRhLlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHNhdmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlc1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gVGhpcyBhdHRyaWJ1dGUgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGEgPGZvcm0+IGVsZW1lbnQuXG4gKiA8Zm9ybSBub2pzRm9ybSBbbW9kZWxdPVwiZGF0YVwiIHNvdXJjZT1cIi9QT1NUL1NvbWVzZXJ2aWNlL2dldE9yZGVyRGF0YVwiXG4gKiAgIFtzb3VyY2VQYXJhbXNdPVwie29yZGVySWQ6IDM3fVwiIHN0b3JlPVwiL1BPU1QvU29tZXNlcnZpY2Uvc2F2ZU9yZGVyc1wiXG4gKiAgIHN0b3JlT2JqZWN0UGFyYW09XCJvcmRlcnNcIiBzYXZlZFJvdXRlPVwiL25vanMtY29yZVwiPlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5JRDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLmlkXCIgcmVxdWlyZWQ+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3RhdHVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN0YXR1c1wiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnN0YXR1c1wiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlN1YnRvdGFsPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN1YnRvdGFsXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uc3VidG90YWxcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5UYXhlczwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YXhlc1wiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnRheGVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+VG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidG90YWxcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS50b3RhbFwiPlxuICogPC9kaXY+XG4gKlxuICogPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICogPC9mb3JtPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGb3JtXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdzb3VyY2VQYXJhbXMnKSBzb3VyY2VQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ21vZGVsJykgZGF0YTogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3N0b3JlJykgc3RvcmVVUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ3N0b3JlUGFyYW1zJykgc3RvcmVQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ3N0b3JlT2JqZWN0UGFyYW0nKSBzdG9yZU9iamVjdFBhcmFtOiBzdHJpbmc7XG4gICAgQElucHV0KCdzYXZlZFJvdXRlJykgc2F2ZWRSb3V0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnZGlydHlPbmx5JykgZGlydHlPbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uTG9hZEVycm9yJykgb25Mb2FkRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25TYXZlJykgb25TYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkVycm9yJykgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRTb3VyY2VEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFNhdmVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U291cmNlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMCk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRzICYmIF8uaXNBcnJheShkYXRhLnJlc3VsdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLnRvdGFsQ291bnQgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS50b3RhbENvdW50ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbSA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5yZXN1bHRzID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc291cmNlUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMuZmlsdGVycyA9IHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucGFnZU9wdGlvbnMuc2l6ZSAmJiB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplICogdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4O1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5saW1pdCA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplO1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMudXJsLCBwb3N0UGFyYW1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTYXZlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVVUkwpIHtcbiAgICAgICAgICAgIHRoaXMubmdGb3JtLm5nU3VibWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlydHlPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJ0eSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMubmdGb3JtLmZvcm0uY29udHJvbHMsIChjb250cm9sLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbC5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJ0eS5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlydHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoZGlydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5pdGVtICYmIHRoaXMubmdGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZURhdGEoZGlydHk/KSB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc3RvcmVQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKGRpcnR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpcnR5T2JqZWN0cyA9IFtdO1xuXG4gICAgICAgICAgICBkaXJ0eS5mb3JFYWNoKGRpcnR5S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdEtleSA9IGRpcnR5S2V5LnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlydHlJbmRleCA9IF8uZmluZChzcGxpdEtleSwga2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc05hTihOdW1iZXIoa2V5KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGlydHlPYmplY3RzLnB1c2godGhpcy5kYXRhLnJlc3VsdHNbZGlydHlJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBvc3RQYXJhbXNbdGhpcy5zdG9yZU9iamVjdFBhcmFtIHx8ICdyZXN1bHRzJ10gPSBkaXJ0eU9iamVjdHM7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtc1t0aGlzLnN0b3JlT2JqZWN0UGFyYW0gfHwgJ3Jlc3VsdHMnXSA9IHRoaXMuZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXNbdGhpcy5zdG9yZU9iamVjdFBhcmFtIHx8ICdvYmplY3QnXSA9IHRoaXMuZGF0YS5pdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMuc3RvcmVVUkwsIHBvc3RQYXJhbXMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc2F2ZWRSb3V0ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlLmVtaXQoe3Jlc3VsdHM6IHJlc3VsdHN9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==