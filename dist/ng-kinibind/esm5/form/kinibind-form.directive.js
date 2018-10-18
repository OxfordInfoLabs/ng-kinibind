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
var KinibindFormDirective = /** @class */ (function () {
    function KinibindFormDirective(ngForm, router, kbRequest) {
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
    KinibindFormDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initSourceData();
        this.initSaveData();
    };
    /**
     * @return {?}
     */
    KinibindFormDirective.prototype.initSourceData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.data.filters.changes.subscribe(function () { return _this.data.pageOptions.index = 0; });
        merge(this.data.filters.changes, this.data.pageOptions.changes)
            .pipe(startWith({}), switchMap(function () {
            return _this.getData();
        }), map(function (data) {
            if (_.isPlainObject(data)) {
                if (data.results && _.isArray(data.results)) {
                    _this.data.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (_.isArray(data)) {
                _this.data.totalCount = data.length;
                return data;
            }
        }), catchError(function (error) {
            _this.onLoadError.emit(error);
            return observableOf([]);
        })).subscribe(function (data) {
            if (_.isPlainObject(data)) {
                _this.data.item = data;
            }
            else {
                _this.data.results = data;
            }
            _this.onLoad.emit({ success: true });
        });
    };
    /**
     * @return {?}
     */
    KinibindFormDirective.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var postParams = this.sourceParams || {};
        if (!_.isEmpty(this.data.filters.filterObject)) {
            postParams.filters = this.data.filters.filterObject;
        }
        if (this.data.pageOptions.size) {
            postParams.pageSize = this.data.pageOptions.size;
            postParams.page = this.data.pageOptions.index;
        }
        /** @type {?} */
        var method = this.sourceMethod ? this.sourceMethod : (this.sourceParams ? 'POST' : 'GET');
        return this.kbRequest.makeRequest(method, this.url, {
            params: this.sourceParams,
            withCredentials: this.withCredentials
        });
    };
    /**
     * @return {?}
     */
    KinibindFormDirective.prototype.initSaveData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.storeURL) {
            this.ngForm.ngSubmit.subscribe(function () {
                if (_this.data.results.length > 0) {
                    if (_this.dirtyOnly) {
                        /** @type {?} */
                        var dirty_1 = [];
                        _.forEach(_this.ngForm.form.controls, function (control, key) {
                            if (control.dirty) {
                                dirty_1.push(key);
                            }
                        });
                        if (dirty_1.length > 0) {
                            _this.saveData(dirty_1);
                        }
                    }
                    else {
                        _this.saveData();
                    }
                }
                else if (_this.data.item && _this.ngForm.dirty) {
                    _this.saveData();
                }
            });
        }
    };
    /**
     * @param {?=} dirty
     * @return {?}
     */
    KinibindFormDirective.prototype.saveData = /**
     * @param {?=} dirty
     * @return {?}
     */
    function (dirty) {
        var _this = this;
        /** @type {?} */
        var postParams = {};
        if (dirty) {
            /** @type {?} */
            var dirtyObjects_1 = [];
            dirty.forEach(function (dirtyKey) {
                /** @type {?} */
                var splitKey = dirtyKey.split('-');
                /** @type {?} */
                var dirtyIndex = _.find(splitKey, function (key) {
                    return !isNaN(Number(key));
                });
                dirtyObjects_1.push(_this.data.results[dirtyIndex]);
            });
            postParams = dirtyObjects_1;
        }
        else {
            if (this.data.results.length > 0) {
                postParams = this.data.results;
            }
            else if (this.data.item) {
                postParams = this.data.item;
            }
        }
        /** @type {?} */
        var method = this.storeMethod ? this.storeMethod : 'POST';
        this.kbRequest.makeRequest(method, this.storeURL, {
            params: postParams,
            withCredentials: this.withCredentials
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
    KinibindFormDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbForm]'
                },] },
    ];
    /** @nocollapse */
    KinibindFormDirective.ctorParameters = function () { return [
        { type: NgForm },
        { type: Router },
        { type: KinibindRequestService }
    ]; };
    KinibindFormDirective.propDecorators = {
        url: [{ type: Input, args: ['source',] }],
        sourceMethod: [{ type: Input, args: ['sourceMethod',] }],
        sourceParams: [{ type: Input, args: ['sourceParams',] }],
        data: [{ type: Input, args: ['model',] }],
        storeURL: [{ type: Input, args: ['store',] }],
        storeMethod: [{ type: Input, args: ['storeMethod',] }],
        savedRoute: [{ type: Input, args: ['savedRoute',] }],
        dirtyOnly: [{ type: Input, args: ['dirtyOnly',] }],
        withCredentials: [{ type: Input, args: ['withCredentials',] }],
        onLoad: [{ type: Output, args: ['onLoad',] }],
        onLoadError: [{ type: Output, args: ['onLoadError',] }],
        onSave: [{ type: Output, args: ['onSave',] }],
        onError: [{ type: Output, args: ['onError',] }]
    };
    return KinibindFormDirective;
}());
export { KinibindFormDirective };
if (false) {
    /** @type {?} */
    KinibindFormDirective.prototype.url;
    /** @type {?} */
    KinibindFormDirective.prototype.sourceMethod;
    /** @type {?} */
    KinibindFormDirective.prototype.sourceParams;
    /** @type {?} */
    KinibindFormDirective.prototype.data;
    /** @type {?} */
    KinibindFormDirective.prototype.storeURL;
    /** @type {?} */
    KinibindFormDirective.prototype.storeMethod;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtZm9ybS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1raW5pYmluZC8iLCJzb3VyY2VzIjpbImZvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQ2pELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0duRSwrQkFBb0IsTUFBYyxFQUNkLFFBQ0E7UUFGQSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUztzQkFQaUIsSUFBSSxZQUFZLEVBQU87MkJBQ2IsSUFBSSxZQUFZLEVBQU87c0JBQ2pDLElBQUksWUFBWSxFQUFFO3VCQUNoQixJQUFJLFlBQVksRUFBRTtLQU1qRTs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxj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QUNiLEtBQUssU0FBQyxhQUFhOzZCQUNuQixLQUFLLFNBQUMsWUFBWTs0QkFDbEIsS0FBSyxTQUFDLFdBQVc7a0NBQ2pCLEtBQUssU0FBQyxpQkFBaUI7eUJBRXZCLE1BQU0sU0FBQyxRQUFROzhCQUNmLE1BQU0sU0FBQyxhQUFhO3lCQUNwQixNQUFNLFNBQUMsUUFBUTswQkFDZixNQUFNLFNBQUMsU0FBUzs7Z0NBeEdyQjs7U0F5RmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBGb3JtXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNGb3JtXVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb2pzIEZvcm0gZGlyZWN0aXZlIGFsbG93cyBmb3IgZGF0YSB0byBzb3VyY2VkIGZyb20gYSBVUkwgYW5kIGJvdW5kIHRvIGEgbW9kZWwsIHdoaWNoIGNhbiB0aGVuIGJlIHVzZWQgdG8gYmluZCB0byBmb3JtIGNvbXBvbmVudHMuIEFkZGl0aW9uYWwgZm9ybSB2YWxpZGF0aW9uIGNhbiBiZSBhZGRlZCB0byB0aGUgZm9ybSBpbnB1dHMuIEluIG9yZGVyIHRvIHNhdmUgZGF0YSBiYWNrIHRvIHRoZSBzZXJ2ZXIsIGEgc3RvcmUgVVJMIGFuZCBzdWJtaXQgYnV0dG9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGZvcm0gbWFya3VwLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHRvIGxvYWQgdGhlIGRhdGEgYXN5bmNocm9ub3VzbHkuIERhdGEgc2hvdWxkIGJlIHJldHVybmVkIGluIEpTT04gZm9ybWF0IGFzIGVpdGhlcjpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvcmVzdWx0cy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSB7aWQ6IDEsIG5hbWU6IHRlc3Rpbmd9IE9SPGJyPlt7aWQ6IDEsIG5hbWU6IHRlc3QxfSwge2lkOiAyLCBuYW1lOiB0ZXN0Mn1dIE9SPGJyPntyZXN1bHRzOiBbe2lkOiAxLi4ufSwge2lkOiAyLi4ufV0sIHRvdGFsQ291bnQ6IDJ9XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyBvYmplY3QgdG8gc2VuZCB3aXRoIHRoZSBTb3VyY2UgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtc3RvcmUtZGVzY3JpcHRpb24gVGhlIHVybCB0byBzZW5kIGFueSBkaXJ0eSBkYXRhIGJhY2sgdG8gdGhlIHNlcnZlciBmb3IgcHJvY2Vzc2luZy5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy1kZXNjcmlwdGlvbiBQYXJhbWV0ZXJzIG9iamVjdCB0byBzZW5kIHdpdGggdGhlIFN0b3JlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHNlbmQgdGhlIGRhdGEgYmFjayB3aXRoLlxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS1kZXNjcmlwdGlvbiBUaGUgcm91dGUgdG8gbmF2aWdhdGUgdG8gb25jZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHJldHVybnMgc3VjY2Vzc2Z1bC5cbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS1kZXNjcmlwdGlvbiBJbiB0aGUgY2FzZSB3aGVyZSBhbiBhcnJheSBvZiBvYmplY3RzIGFyZSBiZWluZyBlZGl0ZWQsIG9ubHkgc2VuZCBiYWNrIHRoZSBvYmplY3RzIHdoZXJlIGNvbnRhaW5pbmcgZmllbGRzIGhhdmUgYmVlbiBjaGFuZ2VkLlxuICogQGF0dHJpYnV0ZXMtZGlydHlPbmx5LXR5cGUgQm9vbGVhbiAoZGVmYXVsdCBmYWxzZSlcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgb25jZSB0aGUgZGF0YSBoYXMgYmVlbiBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgaW4gdGhlIHNjZW5hcmlvIHdoZXJlIHRoZXJlIGlzIGFuIGVycm9yIGxvYWRpbmcgdGhlIGRhdGEuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25TYXZlLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgc2F2ZSBzdWNjZXNzZnVsbHkgY29tcGxldGVzXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGVycm9yIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZpY2UgY2FsbC5cbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItdHlwZSBtZXRob2RcbiAqXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBUaGlzIGF0dHJpYnV0ZSBzaG91bGQgb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYSA8Zm9ybT4gZWxlbWVudC5cbiAqIDxmb3JtIG5vanNGb3JtIFttb2RlbF09XCJkYXRhXCIgc291cmNlPVwiL1BPU1QvU29tZXNlcnZpY2UvZ2V0T3JkZXJEYXRhXCJcbiAqICAgW3NvdXJjZVBhcmFtc109XCJ7b3JkZXJJZDogMzd9XCIgc3RvcmU9XCIvUE9TVC9Tb21lc2VydmljZS9zYXZlT3JkZXJzXCJcbiAqICAgc3RvcmVPYmplY3RQYXJhbT1cIm9yZGVyc1wiIHNhdmVkUm91dGU9XCIvbm9qcy1jb3JlXCI+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPklEPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uaWRcIiByZXF1aXJlZD5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5TdGF0dXM8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhdHVzXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uc3RhdHVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3VidG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3VidG90YWxcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS5zdWJ0b3RhbFwiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlRheGVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRheGVzXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0udGF4ZXNcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5Ub3RhbDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0b3RhbFwiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnRvdGFsXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TYXZlPC9idXR0b24+XG4gKiA8L2Zvcm0+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkZvcm1dJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZvcm1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdzb3VyY2UnKSB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZU1ldGhvZCcpIHNvdXJjZU1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc291cmNlUGFyYW1zJykgc291cmNlUGFyYW1zOiBhbnk7XG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdzdG9yZScpIHN0b3JlVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdzdG9yZU1ldGhvZCcpIHN0b3JlTWV0aG9kOiBzdHJpbmc7XG4gICAgQElucHV0KCdzYXZlZFJvdXRlJykgc2F2ZWRSb3V0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnZGlydHlPbmx5JykgZGlydHlPbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uTG9hZEVycm9yJykgb25Mb2FkRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25TYXZlJykgb25TYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkVycm9yJykgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRTb3VyY2VEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFNhdmVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U291cmNlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMCk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRzICYmIF8uaXNBcnJheShkYXRhLnJlc3VsdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLnRvdGFsQ291bnQgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS50b3RhbENvdW50ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbSA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5yZXN1bHRzID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5zb3VyY2VQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKCFfLmlzRW1wdHkodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5maWx0ZXJzID0gdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemU7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2UgPSB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLnNvdXJjZU1ldGhvZCA/IHRoaXMuc291cmNlTWV0aG9kIDogKHRoaXMuc291cmNlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMudXJsLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuc291cmNlUGFyYW1zLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTYXZlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVVUkwpIHtcbiAgICAgICAgICAgIHRoaXMubmdGb3JtLm5nU3VibWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlydHlPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJ0eSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMubmdGb3JtLmZvcm0uY29udHJvbHMsIChjb250cm9sLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbC5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJ0eS5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlydHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoZGlydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5pdGVtICYmIHRoaXMubmdGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZURhdGEoZGlydHk/KSB7XG4gICAgICAgIGxldCBwb3N0UGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKGRpcnR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpcnR5T2JqZWN0cyA9IFtdO1xuXG4gICAgICAgICAgICBkaXJ0eS5mb3JFYWNoKGRpcnR5S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdEtleSA9IGRpcnR5S2V5LnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlydHlJbmRleCA9IF8uZmluZChzcGxpdEtleSwga2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc05hTihOdW1iZXIoa2V5KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGlydHlPYmplY3RzLnB1c2godGhpcy5kYXRhLnJlc3VsdHNbZGlydHlJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBvc3RQYXJhbXMgPSBkaXJ0eU9iamVjdHM7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtcyA9IHRoaXMuZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLmRhdGEuaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMuc3RvcmVNZXRob2QgPyB0aGlzLnN0b3JlTWV0aG9kIDogJ1BPU1QnO1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy5zdG9yZVVSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBvc3RQYXJhbXMsXG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYXZlZFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnNhdmVkUm91dGVdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZS5lbWl0KHsgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==