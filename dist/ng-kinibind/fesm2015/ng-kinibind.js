import { EventEmitter, Injectable, Directive, Input, Output, Component, HostListener, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { EMPTY, Subject, merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { isArray, isObject, isPlainObject, isEmpty, extend, forEach, find } from 'lodash';
import { Router } from '@angular/router';
import { NgForm, NG_VALIDATORS, NG_ASYNC_VALIDATORS, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class KinibindRequestService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@name KinibindModel
 * \@docType Model
 * \@description This is the Model that nojs-bind, nojs-filter, nojs-paginator, and nojs-filter-element bind to. It provides a structure that allows for each of these nojs components to manage their own state and model handling.
 * \@templateData memberData
 *
 * \@members-results-type property: any[]
 * \@members-results-description This property will be populated in the event that the results from the service call are in array form.
 * \@members-results-defaultValue Array
 * \@members-item-type property: any
 * \@members-item-description This property will be populated when the returning value from the service call is in object form.
 * \@members-item-defaultValue Object
 * \@members-totalCount-type property: number
 * \@members-totalCount-description Count of the total results
 * \@members-totalCount-defaultValue 0
 * \@members-offset-type property: number
 * \@members-offset-description When limiting results returned from server this values store the current offset.
 * \@members-offset-defaultValue 0
 * \@members-filters-type property: NojsFilters
 * \@members-filters-description This object stores the current filter values used for filtering results on the server.
 * \@members-filters-defaultValue { changes: new Subject<any>(), filterObject: {} }
 * \@members-pageOptions-type property: NojsPageOptions
 * \@members-pageOptions-description This object stores the values used to page the results on the server.
 * \@members-pageOptions-defaultValue { changes: new Subject<any>(), size: 10, index: 0, options: [10, 25, 50, 100] }
 * \@members-setPageOptions-type method
 * \@members-setPageOptions-description This function should be called when paging results need to be updated.
 *
 * \@exampleDescription Simply create a new instance of NojsBindModel to make use of this object.
 * const bindModel = new NojsBindModel();
 */
class KinibindModel {
    /**
     * @param {?=} data
     * @param {?=} pageSize
     * @param {?=} page
     */
    constructor(data, pageSize, page) {
        this.data = data;
        this.totalCount = 0;
        this.offset = pageSize || 0;
        this.filters = {
            changes: new Subject(),
            filterObject: {}
        };
        this.pageOptions = {
            changes: new Subject(),
            size: pageSize,
            index: page || 1,
            options: [10, 25, 50, 100]
        };
    }
    /**
     * @param {?} pageSize
     * @param {?} pageIndex
     * @return {?}
     */
    setPageOptions(pageSize, pageIndex) {
        this.pageOptions.size = pageSize;
        this.pageOptions.index = pageIndex;
        this.offset = pageSize * pageIndex;
        this.pageOptions.changes.next(true);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 *
 * \@name NoJS Bind
 * \@docType Directive
 * \@tag nojs-bind
 * \@templateData attributeData
 *
 * \@description The NoJS Bind Directive allows for rapid binding of a JSON model source to a model. This should primarily be used for drawing lists of model, where the model does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 * \@attributes-source-description The URL to load the model asynchronously. Data should be returned in JSON format as either:
 * \@attributes-source-type String
 * \@attributes-source-value https://someservice/results.json
 * \@attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * \@attributes-sourceParams-description Parameters used to send back to the server in the post request.
 * \@attributes-sourceParams-type Object.
 * \@attributes-sourceParams-value {param: value}
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value model
 * \@attributes-onLoad-description Event raised once the model has been loaded successfully.
 * \@attributes-onLoad-type method
 * \@attributes-onLoadError-description Event raised in the scenario where there is an error loading the model.
 * \@attributes-onLoadError-type method
 *
 *
 * \@exampleDescription Create an element using the <nojs-bind> tag
 * <nojs-bind source="https://someservice/results.json" [sourceParams]="{userId: 100}"
 *   [model]="model">
 *
 *   <div *ngFor="let item of model.model">
 *     <span>{{item.id}}</span>
 *     <span>{item.name}}</span>
 *     <span>{{item.date}}</span>
 *     <span>{{item.address}}</span>
 *   </div>
 *
 * </nojs-bind>
 *
 */
class KinibindBindDirective {
    /**
     * @param {?} http
     * @param {?} kbRequest
     */
    constructor(http, kbRequest) {
        this.http = http;
        this.kbRequest = kbRequest;
        this.reloadTrigger = new EventEmitter();
        this.onLoad = new EventEmitter();
        this.onLoadError = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // If we have a reload trigger listen for changes and reset the model model.
        this.reloadTrigger.subscribe(() => {
            this.model.filters.filterObject = {};
            this.model.pageOptions.index = 1;
        });
        this.model.filters.changes.subscribe(() => this.model.pageOptions.index = 1);
        merge(this.model.filters.changes, this.model.pageOptions.changes, this.reloadTrigger)
            .pipe(startWith({}), switchMap(() => {
            return this.getData();
        }), map((data) => {
            if (isPlainObject(data)) {
                if (data.results && isArray(data.results)) {
                    this.model.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
            }
            else if (isArray(data)) {
                this.model.totalCount = data.length;
            }
            return data;
        }), catchError((error) => {
            this.onLoadError.emit(error);
            return of([]);
        })).subscribe(data => {
            this.model.data = data;
            this.onLoad.emit({ success: true });
        });
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const postParams = this.sourceParams || {};
        if (!isEmpty(this.model.filters.filterObject)) {
            postParams.filters = this.model.filters.filterObject;
        }
        if (this.model.pageOptions.size) {
            postParams.pageSize = this.model.pageOptions.size;
            postParams.page = this.model.pageOptions.index;
        }
        /** @type {?} */
        const method = this.method ? this.method : (this.sourceParams ? 'POST' : 'GET');
        return this.kbRequest.makeRequest(method, this.url, { params: postParams });
    }
}
KinibindBindDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kb-bind'
            },] },
];
/** @nocollapse */
KinibindBindDirective.ctorParameters = () => [
    { type: HttpClient },
    { type: KinibindRequestService }
];
KinibindBindDirective.propDecorators = {
    url: [{ type: Input, args: ['source',] }],
    method: [{ type: Input, args: ['method',] }],
    sourceParams: [{ type: Input, args: ['sourceParams',] }],
    model: [{ type: Input, args: ['model',] }],
    withCredentials: [{ type: Input, args: ['withCredentials',] }],
    reloadTrigger: [{ type: Input, args: ['reloadTrigger',] }],
    onLoad: [{ type: Output, args: ['onLoad',] }],
    onLoadError: [{ type: Output, args: ['onLoadError',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@name NoJS Filter
 * \@docType Component
 * \@tag nojs-filter
 * \@templateData attributeData
 *
 * \@description Filtering component that generates filter options based on the passed in source. Selecting any of these options will update the filter object from [model] which will trigger a server side filter of the model.
 *
 * \@attributes-source-description The URL to call to retrieve the filter options from the server. Return model expected in the following format:
 * \@attributes-source-type String
 * \@attributes-source-value https://someservice/filters.json
 * \@attributes-source-code [{count: 2, label: Option1: value: 1},<br>{count: 4, label: Option2: value: 2}]
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value model
 * \@attributes-multiple-description Allow multiple filter options to be selected at the same time.
 * \@attributes-multiple-type Boolean
 * \@attributes-filter-description The name of the database field that the filter will be applied to.
 * \@attributes-filter-type String
 * \@attributes-showCount-description Toggle that shows the count of results for the given filter.
 * \@attributes-showCount-type Boolean
 * \@attributes-initialFilterValues-description Set filter values upon component initialisation.
 * \@attributes-initialFilterValues-type JSON Object
 * \@attributes-initialFilterValues-value {someValue: true}
 *
 * <nojs-filter source="https://someservice/filters.json"
 * [initialFilterValues]="{complete: true}"
 * [model]="model" multiple="true" filter="total" showCount="true">
 * </nojs-filter>
 */
class KinibindFilterComponent {
    /**
     * @param {?} kbRequest
     */
    constructor(kbRequest) {
        this.kbRequest = kbRequest;
        this.filterValues = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.initialFilterValues) {
            this.model.filters.filterObject = extend(this.initialFilterValues, this.model.filters.filterObject);
        }
        this.getData(this.model.filters.filterObject).subscribe(data => {
            this.filterValues = data;
        });
    }
    /**
     * @param {?} filterObject
     * @return {?}
     */
    updateFilter(filterObject) {
        filterObject.selected = !filterObject.selected;
        if (!this.model.filters.filterObject) {
            this.model.filters.filterObject = {};
        }
        if (this.multiple) {
            if (filterObject.selected) {
                if (!Array.isArray(this.model.filters.filterObject[this.filter])) {
                    this.model.filters.filterObject[this.filter] = [filterObject.value];
                }
                else {
                    this.model.filters.filterObject[this.filter].push(filterObject.value);
                }
            }
            else {
                /** @type {?} */
                const index = this.model.filters.filterObject[this.filter].indexOf(filterObject.value);
                if (index > -1) {
                    this.model.filters.filterObject[this.filter].splice(index, 1);
                }
                if (!this.model.filters.filterObject[this.filter].length) {
                    delete this.model.filters.filterObject[this.filter];
                }
            }
        }
        else {
            if (filterObject.selected) {
                this.model.filters.filterObject[this.filter] = filterObject.value;
            }
            else {
                delete this.model.filters.filterObject[this.filter];
            }
        }
        this.getData(this.model.filters.filterObject);
        this.model.filters.changes.next(true);
    }
    /**
     * @param {?} filters
     * @return {?}
     */
    getData(filters) {
        /** @type {?} */
        const postParams = {
            seedColumn: this.filter,
            filters: filters
        };
        return this.kbRequest.makePostRequest(this.url, postParams);
    }
}
KinibindFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'kb-filter',
                template: `<div *ngFor="let filterValue of filterValues">
    <div *ngIf="multiple">
        <input type="checkbox" (change)="updateFilter(filterValue)"/>
        {{filterValue.label}}
        <span *ngIf="showCount">({{filterValue.count}})</span>
    </div>

    <a *ngIf="!multiple" href="javascript:void(0)"
       [style.font-weight]="filterValue.selected ? 'bold' : 'normal'" (click)="updateFilter(filterValue)">
        {{filterValue.label}}
        <span *ngIf="showCount">({{filterValue.count}})</span>
    </a>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
KinibindFilterComponent.ctorParameters = () => [
    { type: KinibindRequestService }
];
KinibindFilterComponent.propDecorators = {
    url: [{ type: Input, args: ['source',] }],
    model: [{ type: Input, args: ['model',] }],
    multiple: [{ type: Input, args: ['multiple',] }],
    showCount: [{ type: Input, args: ['showCount',] }],
    filter: [{ type: Input, args: ['filter',] }],
    initialFilterValues: [{ type: Input, args: ['initialFilterValues',] }],
    withCredentials: [{ type: Input, args: ['withCredentials',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@name NoJS Filter Element
 * \@docType Directive
 * \@tag [nojsFilterElement]
 * \@templateData attributeData
 *
 * \@description Allow for an input element to perform custom filtering on the associated bound model.
 *
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value model
 * \@attributes-filter-description The name of the type of filtering applied to this element. (Currently only 'search' is supported)
 * \@attributes-filter-type String
 * \@attributes-prefix-description Specify a prefix to apply to the filter
 * \@attributes-prefix-type String
 * \@attributes-suffix-desription Specify a suffix to apply to the filter
 * \@attributes-suffix-type String
 * \@attributes-columns-description Specify the columns in the table that this filter is associated with. (comma separated list 'id,name,description')
 * \@attributes-columns-type String
 *
 *
 * <input type='text' #element filterElement [model]='model' filter='search'
 * columns='id,buyer_name' prefix='*' suffix='*' placeholder='Search Orders'>
 */
class KinibindFilterElementDirective {
    constructor() {
    }
    /**
     * This is exposed to the element we are attached to as a template variable,
     * so that we can update the filters with the new filter value.
     *
     * @param {?} filterValue
     * @return {?}
     */
    updateFilter(filterValue) {
        this.constructFilterObject(filterValue);
    }
    /**
     * @param {?} filterValue
     * @return {?}
     */
    constructFilterObject(filterValue) {
        if (filterValue === null) {
            delete this.model.filters.filterObject[this.filter];
        }
        else {
            /** @type {?} */
            let newValue = filterValue;
            if (this.prefix) {
                newValue = this.prefix + newValue;
            }
            if (this.suffix) {
                newValue = newValue + this.suffix;
            }
            this.model.filters.filterObject[this.filter] = {
                filterValue: newValue,
                filterColumns: this.columns ? this.columns.split(',') : []
            };
            if (this.mode) {
                this.model.filters.filterObject[this.filter].filterMode = this.mode;
            }
            if (this.dateFormat) {
                this.model.filters.filterObject[this.filter].filterDateFormat = this.dateFormat;
            }
        }
        this.model.filters.changes.next(true);
    }
}
KinibindFilterElementDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbFilterElement]',
                exportAs: 'filterElement'
            },] },
];
/** @nocollapse */
KinibindFilterElementDirective.ctorParameters = () => [];
KinibindFilterElementDirective.propDecorators = {
    model: [{ type: Input, args: ['model',] }],
    filter: [{ type: Input, args: ['filter',] }],
    prefix: [{ type: Input, args: ['prefix',] }],
    suffix: [{ type: Input, args: ['suffix',] }],
    columns: [{ type: Input, args: ['columns',] }],
    filterClass: [{ type: Input, args: ['filterClass',] }],
    mode: [{ type: Input, args: ['mode',] }],
    dateFormat: [{ type: Input, args: ['dateFormat',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
class KinibindSaveDirective {
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
            if (isArray(this.model.data) && this.model.data.length > 0) {
                postParams = this.model.data;
            }
            else if (isObject(this.model.data)) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 *
 * \@name NoJS Form
 * \@docType Directive
 * \@tag [nojsForm]
 * \@templateData attributeData
 *
 * \@description The Nojs Form directive allows for model to sourced from a URL and bound to a model, which can then be used to bind to form components. Additional form validation can be added to the form inputs. In order to save model back to the server, a store URL and submit button need to be included in the form markup.
 *
 * \@attributes-source-description The URL to load the model asynchronously. Data should be returned in JSON format as either:
 * \@attributes-source-type String
 * \@attributes-source-value https://someservice/results.json
 * \@attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * \@attributes-sourceParams-description Parameters object to send with the Source post request.
 * \@attributes-sourceParams-type Object
 * \@attributes-sourceParams-value {param: value}
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value model
 * \@attributes-store-description The url to send any dirty model back to the server for processing.
 * \@attributes-store-type String
 * \@attributes-storeParams-description Parameters object to send with the Store post request.
 * \@attributes-storeParams-type Object
 * \@attributes-storeParams-value {param: value}
 * \@attributes-storeObjectParam-description The name of the parameter to send the model back with.
 * \@attributes-storeObjectParam-type String
 * \@attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * \@attributes-savedRoute-type String
 * \@attributes-dirtyOnly-description In the case where an array of objects are being edited, only send back the objects where containing fields have been changed.
 * \@attributes-dirtyOnly-type Boolean (default false)
 * \@attributes-onLoad-description Event raised once the model has been loaded successfully.
 * \@attributes-onLoad-type method
 * \@attributes-onLoadError-description Event raised in the scenario where there is an error loading the model.
 * \@attributes-onLoadError-type method
 * \@attributes-onSave-description This function will be called when the save successfully completes
 * \@attributes-onSave-type method
 * \@attributes-onError-description This function will be called when an error is returned from the service call.
 * \@attributes-onError-type method
 *
 *
 * \@exampleDescription This attribute should only be used in conjunction with a <form> element.
 * <form nojsForm [model]="model" source="/POST/Someservice/getOrderData"
 *   [sourceParams]="{orderId: 37}" store="/POST/Someservice/saveOrders"
 *   storeObjectParam="orders" savedRoute="/nojs-core">
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>ID</label>
 *   <input type="text" name="id" [(ngModel)]="model.item.id" required>
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Status</label>
 *   <input type="text" name="status" [(ngModel)]="model.item.status">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Subtotal</label>
 *   <input type="text" name="subtotal" [(ngModel)]="model.item.subtotal">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Taxes</label>
 *   <input type="text" name="taxes" [(ngModel)]="model.item.taxes">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Total</label>
 *   <input type="text" name="total" [(ngModel)]="model.item.total">
 * </div>
 *
 * <button type="submit">Save</button>
 * </form>
 *
 */
class KinibindFormDirective {
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
        this.model.filters.changes.subscribe(() => this.model.pageOptions.index = 0);
        merge(this.model.filters.changes, this.model.pageOptions.changes)
            .pipe(startWith({}), switchMap(() => {
            return this.getData();
        }), map((data) => {
            if (isPlainObject(data)) {
                if (data.results && isArray(data.results)) {
                    this.model.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (isArray(data)) {
                this.model.totalCount = data.length;
                return data;
            }
        }), catchError((error) => {
            this.onLoadError.emit(error);
            return of([]);
        })).subscribe(data => {
            this.model.data = data;
            this.onLoad.emit({ success: true });
        });
    }
    /**
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const postParams = this.sourceParams || {};
        if (!isEmpty(this.model.filters.filterObject)) {
            postParams.filters = this.model.filters.filterObject;
        }
        if (this.model.pageOptions.size) {
            postParams.pageSize = this.model.pageOptions.size;
            postParams.page = this.model.pageOptions.index;
        }
        /** @type {?} */
        const method = this.sourceMethod ? this.sourceMethod : (this.sourceParams ? 'POST' : 'GET');
        return this.kbRequest.makeRequest(method, this.url, {
            params: this.sourceParams,
            withCredentials: this.withCredentials
        });
    }
    /**
     * @return {?}
     */
    initSaveData() {
        if (this.storeURL) {
            this.ngForm.ngSubmit.subscribe(() => {
                if (isArray(this.model.data) && this.model.data.length > 0) {
                    if (this.dirtyOnly) {
                        /** @type {?} */
                        const dirty = [];
                        forEach(this.ngForm.form.controls, (control, key) => {
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
                else if (isObject(this.model.data) && this.ngForm.dirty) {
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
        let postParams = {};
        if (dirty) {
            /** @type {?} */
            const dirtyObjects = [];
            dirty.forEach(dirtyKey => {
                /** @type {?} */
                const splitKey = dirtyKey.split('-');
                /** @type {?} */
                const dirtyIndex = find(splitKey, key => {
                    return !isNaN(Number(key));
                });
                dirtyObjects.push(this.model.data[dirtyIndex]);
            });
            postParams = dirtyObjects;
        }
        else {
            if (isArray(this.model.data) && this.model.data.length > 0) {
                postParams = this.model.data;
            }
            else if (isObject(this.model.data)) {
                postParams = this.model.data;
            }
        }
        /** @type {?} */
        const method = this.storeMethod ? this.storeMethod : 'POST';
        this.kbRequest.makeRequest(method, this.storeURL, {
            body: method === 'GET' ? null : postParams,
            params: method === 'GET' ? postParams : null,
            withCredentials: this.withCredentials
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
    sourceMethod: [{ type: Input, args: ['sourceMethod',] }],
    sourceParams: [{ type: Input, args: ['sourceParams',] }],
    model: [{ type: Input, args: ['model',] }],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} match
 * @return {?}
 */
function matchRegexValidator(match) {
    return (control) => {
        /** @type {?} */
        const matched = match.test(control.value);
        return !matched ? { 'matchRegex': { value: control.value } } : null;
    };
}
class MatchRegexDirective {
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.matchRegex ? matchRegexValidator(new RegExp(this.matchRegex, 'i'))(control)
            : null;
    }
}
MatchRegexDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbMatchRegex]',
                providers: [{ provide: NG_VALIDATORS, useExisting: MatchRegexDirective, multi: true }]
            },] },
];
MatchRegexDirective.propDecorators = {
    matchRegex: [{ type: Input, args: ['kbMatchRegex',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NojsRemoteValidateDirective {
    /**
     * @param {?} kbRequest
     */
    constructor(kbRequest) {
        this.kbRequest = kbRequest;
        this.withCredentials = false;
        this.remoteParams = {};
    }
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.remoteValidate ? this.remoteValidateValidator(this.remoteValidate)(control)
            : null;
    }
    /**
     * @param {?} remoteURL
     * @return {?}
     */
    remoteValidateValidator(remoteURL) {
        return (control) => {
            if (control.value) {
                /** @type {?} */
                const method = this.method ? this.method : (this.remoteParams ? 'POST' : 'GET');
                /** @type {?} */
                let url;
                if (remoteURL.includes('?')) {
                    url = remoteURL + `&${this.key}=${control.value}`;
                }
                else {
                    url = remoteURL + `?${this.key}=${control.value}`;
                }
                return this.kbRequest.makeRequest(method, url, {
                    withCredentials: this.withCredentials,
                    params: this.remoteParams
                }).toPromise()
                    .then(valid => {
                    return !valid ? { 'remoteValidate': false } : null;
                });
            }
            return Promise.resolve(null);
        };
    }
}
NojsRemoteValidateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbRemoteValidate]',
                providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
            },] },
];
/** @nocollapse */
NojsRemoteValidateDirective.ctorParameters = () => [
    { type: KinibindRequestService }
];
NojsRemoteValidateDirective.propDecorators = {
    remoteValidate: [{ type: Input, args: ['kbRemoteValidate',] }],
    method: [{ type: Input, args: ['method',] }],
    key: [{ type: Input, args: ['key',] }],
    withCredentials: [{ type: Input, args: ['withCredentials',] }],
    remoteParams: [{ type: Input, args: ['remoteParams',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 *
 * \@name NoJS Action
 * \@docType Directive
 * \@tag nojs-action
 * \@templateData attributeData
 *
 * \@description The NoJS Bind Directive allows for rapid binding of a JSON model source to a model. This should primarily be used for drawing lists of model, where the model does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 *
 *
 */
class KinibindActionDirective {
    /**
     * @param {?} kbRequest
     * @param {?} router
     */
    constructor(kbRequest, router) {
        this.kbRequest = kbRequest;
        this.router = router;
        this.started = new EventEmitter();
        this.completed = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.started.emit(true);
        /** @type {?} */
        const method = this.method ? this.method : (this.actionParams ? 'POST' : 'GET');
        this.kbRequest.makeRequest(method, this.actionURL, {
            params: this.actionParams
        })
            .toPromise()
            .then(result => {
            if (this.successRoute) {
                this.router.navigate([this.successRoute]);
            }
            else {
                this.completed.emit(result);
            }
        })
            .catch(error => {
            this.error.emit(error);
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
KinibindActionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbAction]'
            },] },
];
/** @nocollapse */
KinibindActionDirective.ctorParameters = () => [
    { type: KinibindRequestService },
    { type: Router }
];
KinibindActionDirective.propDecorators = {
    actionURL: [{ type: Input, args: ['actionURL',] }],
    method: [{ type: Input, args: ['method',] }],
    actionParams: [{ type: Input, args: ['actionParams',] }],
    successRoute: [{ type: Input, args: ['successRoute',] }],
    started: [{ type: Output, args: ['started',] }],
    completed: [{ type: Output, args: ['completed',] }],
    error: [{ type: Output, args: ['error',] }],
    clickEvent: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgKinibindModule {
}
NgKinibindModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    FormsModule,
                    HttpClientJsonpModule
                ],
                declarations: [
                    KinibindBindDirective,
                    KinibindFilterComponent,
                    KinibindSaveDirective,
                    KinibindFilterElementDirective,
                    KinibindFormDirective,
                    MatchRegexDirective,
                    NojsRemoteValidateDirective,
                    KinibindActionDirective
                ],
                exports: [
                    KinibindBindDirective,
                    KinibindSaveDirective,
                    KinibindFilterComponent,
                    KinibindFilterElementDirective,
                    KinibindFormDirective,
                    MatchRegexDirective,
                    NojsRemoteValidateDirective,
                    KinibindActionDirective
                ],
                providers: [
                    KinibindRequestService
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgKinibindModule, KinibindRequestService, KinibindModel, KinibindActionDirective as ɵh, KinibindSaveDirective as ɵc, KinibindBindDirective as ɵa, KinibindFilterElementDirective as ɵd, KinibindFilterComponent as ɵb, KinibindFormDirective as ɵe, MatchRegexDirective as ɵf, NojsRemoteValidateDirective as ɵg };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC5tb2RlbC50cyIsIm5nOi8vbmcta2luaWJpbmQvYmluZC9raW5pYmluZC1iaW5kLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL25nLWtpbmliaW5kL2ZpbHRlci1lbGVtZW50L2tpbmliaW5kLWZpbHRlci1lbGVtZW50LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvYmluZC1zYXZlL2tpbmliaW5kLXNhdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9mb3JtL2tpbmliaW5kLWZvcm0uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC92YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvdmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9hY3Rpb24va2luaWJpbmQtYWN0aW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvbmcta2luaWJpbmQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kUmVxdWVzdFNlcnZpY2Uge1xuXG4gICAgcHVibGljIGpzb25wUmVxdWVzdEVycm9yOiBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlUmVxdWVzdChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChtZXRob2QsIHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VQb3N0UmVxdWVzdCh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnksIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VHZXRSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlSnNvbnBSZXF1ZXN0KHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogYW55ID0geyBoZWFkZXJzOiBoZWFkZXJzIH07XG5cbiAgICAgICAgLy8gU2V0IGNhbGxiYWNrIHBhcmFtIGZvciB0aGUgSlNPTlAgcmVxdWVzdC5cbiAgICAgICAgcGFyYW1zLmNhbGxiYWNrID0gJ0pTT05QX0NBTExCQUNLJztcblxuICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHBhcmFtcztcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2pzb25wJywgdXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgLnBpcGUobWFwKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBIGNsaWVudC1zaWRlIG9yIG5ldHdvcmsgZXJyb3Igb2NjdXJyZWQuIEhhbmRsZSBpdCBhY2NvcmRpbmdseS5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQ6JywgZXJyLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBiYWNrZW5kIHJldHVybmVkIGFuIHVuc3VjY2Vzc2Z1bCByZXNwb25zZSBjb2RlLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcmVzcG9uc2UgYm9keSBtYXkgY29udGFpbiBjbHVlcyBhcyB0byB3aGF0IHdlbnQgd3JvbmcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEJhY2tlbmQgcmV0dXJuZWQgY29kZSAke2Vyci5zdGF0dXN9LCBib2R5IHdhczogJHtlcnIuZXJyb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5qc29ucFJlcXVlc3RFcnJvci5lbWl0KGVycik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRGaWx0ZXJzIHtcbiAgICBjaGFuZ2VzOiBTdWJqZWN0PGFueT47XG4gICAgZmlsdGVyT2JqZWN0PzogYW55O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRQYWdlT3B0aW9ucyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgaW5kZXg/OiBudW1iZXI7XG4gICAgb3B0aW9ucz86IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEBuYW1lIEtpbmliaW5kTW9kZWxcbiAqIEBkb2NUeXBlIE1vZGVsXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB0aGUgTW9kZWwgdGhhdCBub2pzLWJpbmQsIG5vanMtZmlsdGVyLCBub2pzLXBhZ2luYXRvciwgYW5kIG5vanMtZmlsdGVyLWVsZW1lbnQgYmluZCB0by4gSXQgcHJvdmlkZXMgYSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgZm9yIGVhY2ggb2YgdGhlc2Ugbm9qcyBjb21wb25lbnRzIHRvIG1hbmFnZSB0aGVpciBvd24gc3RhdGUgYW5kIG1vZGVsIGhhbmRsaW5nLlxuICogQHRlbXBsYXRlRGF0YSBtZW1iZXJEYXRhXG4gKlxuICogQG1lbWJlcnMtcmVzdWx0cy10eXBlIHByb3BlcnR5OiBhbnlbXVxuICogQG1lbWJlcnMtcmVzdWx0cy1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIGluIHRoZSBldmVudCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBhcmUgaW4gYXJyYXkgZm9ybS5cbiAqIEBtZW1iZXJzLXJlc3VsdHMtZGVmYXVsdFZhbHVlIEFycmF5XG4gKiBAbWVtYmVycy1pdGVtLXR5cGUgcHJvcGVydHk6IGFueVxuICogQG1lbWJlcnMtaXRlbS1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIHdoZW4gdGhlIHJldHVybmluZyB2YWx1ZSBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwgaXMgaW4gb2JqZWN0IGZvcm0uXG4gKiBAbWVtYmVycy1pdGVtLWRlZmF1bHRWYWx1ZSBPYmplY3RcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlc2NyaXB0aW9uIENvdW50IG9mIHRoZSB0b3RhbCByZXN1bHRzXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1vZmZzZXQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy1vZmZzZXQtZGVzY3JpcHRpb24gV2hlbiBsaW1pdGluZyByZXN1bHRzIHJldHVybmVkIGZyb20gc2VydmVyIHRoaXMgdmFsdWVzIHN0b3JlIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIEBtZW1iZXJzLW9mZnNldC1kZWZhdWx0VmFsdWUgMFxuICogQG1lbWJlcnMtZmlsdGVycy10eXBlIHByb3BlcnR5OiBOb2pzRmlsdGVyc1xuICogQG1lbWJlcnMtZmlsdGVycy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlcyB1c2VkIGZvciBmaWx0ZXJpbmcgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtZmlsdGVycy1kZWZhdWx0VmFsdWUgeyBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksIGZpbHRlck9iamVjdDoge30gfVxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtdHlwZSBwcm9wZXJ0eTogTm9qc1BhZ2VPcHRpb25zXG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIHZhbHVlcyB1c2VkIHRvIHBhZ2UgdGhlIHJlc3VsdHMgb24gdGhlIHNlcnZlci5cbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgc2l6ZTogMTAsIGluZGV4OiAwLCBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXSB9XG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy10eXBlIG1ldGhvZFxuICogQG1lbWJlcnMtc2V0UGFnZU9wdGlvbnMtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcGFnaW5nIHJlc3VsdHMgbmVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gU2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBOb2pzQmluZE1vZGVsIHRvIG1ha2UgdXNlIG9mIHRoaXMgb2JqZWN0LlxuICogY29uc3QgYmluZE1vZGVsID0gbmV3IE5vanNCaW5kTW9kZWwoKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEtpbmliaW5kTW9kZWwge1xuXG4gICAgcHVibGljIGRhdGE6IGFueTtcbiAgICBwdWJsaWMgdG90YWxDb3VudDogbnVtYmVyO1xuICAgIHB1YmxpYyBvZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZmlsdGVyczogS2luaWJpbmRGaWx0ZXJzO1xuICAgIHB1YmxpYyBwYWdlT3B0aW9uczogS2luaWJpbmRQYWdlT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE/OiBhbnksIHBhZ2VTaXplPzogbnVtYmVyLCBwYWdlPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gcGFnZVNpemUgfHwgMDtcbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge1xuICAgICAgICAgICAgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLFxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0OiB7fVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zID0ge1xuICAgICAgICAgICAgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLFxuICAgICAgICAgICAgc2l6ZTogcGFnZVNpemUsXG4gICAgICAgICAgICBpbmRleDogcGFnZSB8fCAxLFxuICAgICAgICAgICAgb3B0aW9uczogWzEwLCAyNSwgNTAsIDEwMF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGFnZU9wdGlvbnMocGFnZVNpemUsIHBhZ2VJbmRleCkge1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLnNpemUgPSBwYWdlU2l6ZTtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5pbmRleCA9IHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBwYWdlU2l6ZSAqIHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQmluZFxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIG5vanMtYmluZFxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgRGlyZWN0aXZlIGFsbG93cyBmb3IgcmFwaWQgYmluZGluZyBvZiBhIEpTT04gbW9kZWwgc291cmNlIHRvIGEgbW9kZWwuIFRoaXMgc2hvdWxkIHByaW1hcmlseSBiZSB1c2VkIGZvciBkcmF3aW5nIGxpc3RzIG9mIG1vZGVsLCB3aGVyZSB0aGUgbW9kZWwgZG9lcyBub3QgY2hhbmdlIGFzIHRoZSByZXN1bHQgb2YgdXNlciBpbnB1dC4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG5vanNCaW5kU2F2ZSB0byBzZW5kIGFueSBtb2RlbCBjaGFuZ2VzIGJhY2sgdG8gdGhlIHNlcnZlci4gSWYgeW91IGFyZSBsb29raW5nIHRvIGltcGxlbWVudCBGb3JtIGJlaGF2aW91ciwgdGhlbiB1c2Ugbm9qc0Zvcm0uXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gbG9hZCB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkuIERhdGEgc2hvdWxkIGJlIHJldHVybmVkIGluIEpTT04gZm9ybWF0IGFzIGVpdGhlcjpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvcmVzdWx0cy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSB7aWQ6IDEsIG5hbWU6IHRlc3Rpbmd9IE9SPGJyPlt7aWQ6IDEsIG5hbWU6IHRlc3QxfSwge2lkOiAyLCBuYW1lOiB0ZXN0Mn1dIE9SPGJyPntyZXN1bHRzOiBbe2lkOiAxLi4ufSwge2lkOiAyLi4ufV0sIHRvdGFsQ291bnQ6IDJ9XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyB1c2VkIHRvIHNlbmQgYmFjayB0byB0aGUgc2VydmVyIGluIHRoZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdHlwZSBPYmplY3QuXG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgbW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgb25jZSB0aGUgbW9kZWwgaGFzIGJlZW4gbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIGluIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGVyZSBpcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBtb2RlbC5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gQ3JlYXRlIGFuIGVsZW1lbnQgdXNpbmcgdGhlIDxub2pzLWJpbmQ+IHRhZ1xuICogPG5vanMtYmluZCBzb3VyY2U9XCJodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblwiIFtzb3VyY2VQYXJhbXNdPVwie3VzZXJJZDogMTAwfVwiXG4gKiAgIFttb2RlbF09XCJtb2RlbFwiPlxuICpcbiAqICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbC5tb2RlbFwiPlxuICogICAgIDxzcGFuPnt7aXRlbS5pZH19PC9zcGFuPlxuICogICAgIDxzcGFuPntpdGVtLm5hbWV9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uZGF0ZX19PC9zcGFuPlxuICogICAgIDxzcGFuPnt7aXRlbS5hZGRyZXNzfX08L3NwYW4+XG4gKiAgIDwvZGl2PlxuICpcbiAqIDwvbm9qcy1iaW5kPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdrYi1iaW5kJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEJpbmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdzb3VyY2UnKSB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc291cmNlUGFyYW1zJykgc291cmNlUGFyYW1zOiBhbnk7XG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuICAgIEBJbnB1dCgncmVsb2FkVHJpZ2dlcicpIHJlbG9hZFRyaWdnZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCdvbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25Mb2FkRXJyb3InKSBvbkxvYWRFcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSByZWxvYWQgdHJpZ2dlciBsaXN0ZW4gZm9yIGNoYW5nZXMgYW5kIHJlc2V0IHRoZSBtb2RlbCBtb2RlbC5cbiAgICAgICAgdGhpcy5yZWxvYWRUcmlnZ2VyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0ID0ge307XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLmluZGV4ID0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kZWwucGFnZU9wdGlvbnMuaW5kZXggPSAxKTtcblxuICAgICAgICBtZXJnZSh0aGlzLm1vZGVsLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5tb2RlbC5wYWdlT3B0aW9ucy5jaGFuZ2VzLCB0aGlzLnJlbG9hZFRyaWdnZXIpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRzICYmIF8uaXNBcnJheShkYXRhLnJlc3VsdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50b3RhbENvdW50ID0gZGF0YS50b3RhbENvdW50IHx8IGRhdGEucmVzdWx0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudG90YWxDb3VudCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRFcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB0aGlzLnNvdXJjZVBhcmFtcyB8fCB7fTtcblxuICAgICAgICBpZiAoIV8uaXNFbXB0eSh0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5maWx0ZXJzID0gdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLnNpemUpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLnNpemU7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2UgPSB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLmluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2QgPyB0aGlzLm1ldGhvZCA6ICh0aGlzLnNvdXJjZVBhcmFtcyA/ICdQT1NUJyA6ICdHRVQnKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnVybCwge3BhcmFtczogcG9zdFBhcmFtc30pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbi8qKlxuICogQG5hbWUgTm9KUyBGaWx0ZXJcbiAqIEBkb2NUeXBlIENvbXBvbmVudFxuICogQHRhZyBub2pzLWZpbHRlclxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIEZpbHRlcmluZyBjb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgZmlsdGVyIG9wdGlvbnMgYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBzb3VyY2UuIFNlbGVjdGluZyBhbnkgb2YgdGhlc2Ugb3B0aW9ucyB3aWxsIHVwZGF0ZSB0aGUgZmlsdGVyIG9iamVjdCBmcm9tIFttb2RlbF0gd2hpY2ggd2lsbCB0cmlnZ2VyIGEgc2VydmVyIHNpZGUgZmlsdGVyIG9mIHRoZSBtb2RlbC5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBjYWxsIHRvIHJldHJpZXZlIHRoZSBmaWx0ZXIgb3B0aW9ucyBmcm9tIHRoZSBzZXJ2ZXIuIFJldHVybiBtb2RlbCBleHBlY3RlZCBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvZmlsdGVycy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSBbe2NvdW50OiAyLCBsYWJlbDogT3B0aW9uMTogdmFsdWU6IDF9LDxicj57Y291bnQ6IDQsIGxhYmVsOiBPcHRpb24yOiB2YWx1ZTogMn1dXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIG1vZGVsXG4gKiBAYXR0cmlidXRlcy1tdWx0aXBsZS1kZXNjcmlwdGlvbiBBbGxvdyBtdWx0aXBsZSBmaWx0ZXIgb3B0aW9ucyB0byBiZSBzZWxlY3RlZCBhdCB0aGUgc2FtZSB0aW1lLlxuICogQGF0dHJpYnV0ZXMtbXVsdGlwbGUtdHlwZSBCb29sZWFuXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIGRhdGFiYXNlIGZpZWxkIHRoYXQgdGhlIGZpbHRlciB3aWxsIGJlIGFwcGxpZWQgdG8uXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNob3dDb3VudC1kZXNjcmlwdGlvbiBUb2dnbGUgdGhhdCBzaG93cyB0aGUgY291bnQgb2YgcmVzdWx0cyBmb3IgdGhlIGdpdmVuIGZpbHRlci5cbiAqIEBhdHRyaWJ1dGVzLXNob3dDb3VudC10eXBlIEJvb2xlYW5cbiAqIEBhdHRyaWJ1dGVzLWluaXRpYWxGaWx0ZXJWYWx1ZXMtZGVzY3JpcHRpb24gU2V0IGZpbHRlciB2YWx1ZXMgdXBvbiBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uXG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLXR5cGUgSlNPTiBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLWluaXRpYWxGaWx0ZXJWYWx1ZXMtdmFsdWUge3NvbWVWYWx1ZTogdHJ1ZX1cbiAqXG4gKiA8bm9qcy1maWx0ZXIgc291cmNlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9maWx0ZXJzLmpzb25cIlxuICogW2luaXRpYWxGaWx0ZXJWYWx1ZXNdPVwie2NvbXBsZXRlOiB0cnVlfVwiXG4gKiBbbW9kZWxdPVwibW9kZWxcIiBtdWx0aXBsZT1cInRydWVcIiBmaWx0ZXI9XCJ0b3RhbFwiIHNob3dDb3VudD1cInRydWVcIj5cbiAqIDwvbm9qcy1maWx0ZXI+XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna2ItZmlsdGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nRm9yPVwibGV0IGZpbHRlclZhbHVlIG9mIGZpbHRlclZhbHVlc1wiPlxuICAgIDxkaXYgKm5nSWY9XCJtdWx0aXBsZVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJ1cGRhdGVGaWx0ZXIoZmlsdGVyVmFsdWUpXCIvPlxuICAgICAgICB7e2ZpbHRlclZhbHVlLmxhYmVsfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRcIj4oe3tmaWx0ZXJWYWx1ZS5jb3VudH19KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxhICpuZ0lmPVwiIW11bHRpcGxlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgW3N0eWxlLmZvbnQtd2VpZ2h0XT1cImZpbHRlclZhbHVlLnNlbGVjdGVkID8gJ2JvbGQnIDogJ25vcm1hbCdcIiAoY2xpY2spPVwidXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKVwiPlxuICAgICAgICB7e2ZpbHRlclZhbHVlLmxhYmVsfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRcIj4oe3tmaWx0ZXJWYWx1ZS5jb3VudH19KTwvc3Bhbj5cbiAgICA8L2E+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnbXVsdGlwbGUnKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3Nob3dDb3VudCcpIHNob3dDb3VudDogYm9vbGVhbjtcbiAgICBASW5wdXQoJ2ZpbHRlcicpIGZpbHRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgnaW5pdGlhbEZpbHRlclZhbHVlcycpIGluaXRpYWxGaWx0ZXJWYWx1ZXM6IGFueTtcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBmaWx0ZXJWYWx1ZXM6IGFueSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbEZpbHRlclZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCA9IF8uZXh0ZW5kKHRoaXMuaW5pdGlhbEZpbHRlclZhbHVlcywgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWVzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihmaWx0ZXJPYmplY3QpIHtcbiAgICAgICAgZmlsdGVyT2JqZWN0LnNlbGVjdGVkID0gIWZpbHRlck9iamVjdC5zZWxlY3RlZDtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdID0gW2ZpbHRlck9iamVjdC52YWx1ZV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0ucHVzaChmaWx0ZXJPYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5pbmRleE9mKGZpbHRlck9iamVjdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpbHRlck9iamVjdC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdID0gZmlsdGVyT2JqZWN0LnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCk7XG4gICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKGZpbHRlcnMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB7XG4gICAgICAgICAgICBzZWVkQ29sdW1uOiB0aGlzLmZpbHRlcixcbiAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlcnNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMudXJsLCBwb3N0UGFyYW1zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcblxuLyoqXG4gKiBAbmFtZSBOb0pTIEZpbHRlciBFbGVtZW50XG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNGaWx0ZXJFbGVtZW50XVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIEFsbG93IGZvciBhbiBpbnB1dCBlbGVtZW50IHRvIHBlcmZvcm0gY3VzdG9tIGZpbHRlcmluZyBvbiB0aGUgYXNzb2NpYXRlZCBib3VuZCBtb2RlbC5cbiAqXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIG1vZGVsXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHR5cGUgb2YgZmlsdGVyaW5nIGFwcGxpZWQgdG8gdGhpcyBlbGVtZW50LiAoQ3VycmVudGx5IG9ubHkgJ3NlYXJjaCcgaXMgc3VwcG9ydGVkKVxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1wcmVmaXgtZGVzY3JpcHRpb24gU3BlY2lmeSBhIHByZWZpeCB0byBhcHBseSB0byB0aGUgZmlsdGVyXG4gKiBAYXR0cmlidXRlcy1wcmVmaXgtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN1ZmZpeC1kZXNyaXB0aW9uIFNwZWNpZnkgYSBzdWZmaXggdG8gYXBwbHkgdG8gdGhlIGZpbHRlclxuICogQGF0dHJpYnV0ZXMtc3VmZml4LXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1jb2x1bW5zLWRlc2NyaXB0aW9uIFNwZWNpZnkgdGhlIGNvbHVtbnMgaW4gdGhlIHRhYmxlIHRoYXQgdGhpcyBmaWx0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLiAoY29tbWEgc2VwYXJhdGVkIGxpc3QgJ2lkLG5hbWUsZGVzY3JpcHRpb24nKVxuICogQGF0dHJpYnV0ZXMtY29sdW1ucy10eXBlIFN0cmluZ1xuICpcbiAqXG4gKiA8aW5wdXQgdHlwZT0ndGV4dCcgI2VsZW1lbnQgZmlsdGVyRWxlbWVudCBbbW9kZWxdPSdtb2RlbCcgZmlsdGVyPSdzZWFyY2gnXG4gKiBjb2x1bW5zPSdpZCxidXllcl9uYW1lJyBwcmVmaXg9JyonIHN1ZmZpeD0nKicgcGxhY2Vob2xkZXI9J1NlYXJjaCBPcmRlcnMnPlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkZpbHRlckVsZW1lbnRdJyxcbiAgICBleHBvcnRBczogJ2ZpbHRlckVsZW1lbnQnXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoJ21vZGVsJykgbW9kZWw6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ3ByZWZpeCcpIHByZWZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3VmZml4Jykgc3VmZml4OiBzdHJpbmc7XG4gICAgQElucHV0KCdjb2x1bW5zJykgY29sdW1uczogc3RyaW5nO1xuICAgIEBJbnB1dCgnZmlsdGVyQ2xhc3MnKSBmaWx0ZXJDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZScpIG1vZGU6IHN0cmluZztcbiAgICBASW5wdXQoJ2RhdGVGb3JtYXQnKSBkYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGV4cG9zZWQgdG8gdGhlIGVsZW1lbnQgd2UgYXJlIGF0dGFjaGVkIHRvIGFzIGEgdGVtcGxhdGUgdmFyaWFibGUsXG4gICAgICogc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSBmaWx0ZXJzIHdpdGggdGhlIG5ldyBmaWx0ZXIgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVyVmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0RmlsdGVyT2JqZWN0KGZpbHRlclZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdEZpbHRlck9iamVjdChmaWx0ZXJWYWx1ZSkge1xuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IGZpbHRlclZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlZml4KSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnByZWZpeCArIG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdWZmaXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlICsgdGhpcy5zdWZmaXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb2x1bW5zOiB0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMuc3BsaXQoJywnKSA6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyTW9kZSA9IHRoaXMubW9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmZpbHRlckRhdGVGb3JtYXQgPSB0aGlzLmRhdGVGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBCaW5kIFNhdmVcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBbbm9qc0JpbmRTYXZlXVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgU2F2ZSBEaXJlY3RpdmUgYWxsb3dzIGZvciBzaW1wbGUgc2F2aW5nIG9mIG1vZGVsIGJhY2sgdG8gdGhlIHNlcnZlci4gVGhpcyB3aWxsIHJldHVybiB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiBlaXRoZXIgdGhlIE5vanNCaW5kTW9kZWwucmVzdWx0cyBhcnJheSBvciB0aGUgTm9qc0JpbmRNb2RlbC5pdGVtIG9iamVjdCB0byB0aGUgc2VydmVyIGZvciBwcm9jZXNzaW5nLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSBVUkwgd2hlcmUgb2YgdGhlIHNlcnZlciB3aGVyZSB0aGUgbW9kZWwgc2hvdWxkIGJlIHNlbnQgZm9yIHByb2Nlc3NpbmcuXG4gKiBAYXR0cmlidXRlcy1zdG9yZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtZGVzY3JpcHRpb24gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHRvIHNlbmQgYmFjayB0byB0aGUgc2VydmVyIHdpdGggdGhlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHNlbmQgdGhlIG1vZGVsIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgbW9kZWxcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBzYXZlIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZXNcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25FcnJvci1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3IgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmljZSBjYWxsLlxuICogQGF0dHJpYnV0ZXMtb25FcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIEFkZCB0aGUgbm9qc0JpbmRTYXZlIGF0dHJpYnV0ZSB0byBhbnkgZWxlbWVudC4gVGhlIGFzc29jaWF0ZWQgY2xpY2sgZXZlbnQgb24gdGhhdCBlbGVtZW50IHdpbGwgY2F1c2UgdGhlIG1vZGVsIHRvIHNhdmUuXG4gKiA8YnV0dG9uIG5vanNCaW5kU2F2ZSBzdG9yZT1cImh0dHBzOi8vc29tZXNlcnZpY2Uvc2F2ZVwiIHN0b3JlT2JqZWN0UGFyYW09XCJvcmRlcnNcIiBbbW9kZWxdPVwibW9kZWxcIlxuICogICBbc3RvcmVQYXJhbXNdPVwie3VzZXJJZDogMjAwfVwiIHNhdmVkUm91dGU9XCIvdmlld3MvdXNlcnNcIlxuICogICAob25TYXZlKT1cImNhbGxNZU9uU2F2ZSgpXCIgKG9uRXJyb3IpPVwiZG9Tb21ldGhpbmcoKVwiPlxuICogICBTYXZlXG4gKiA8L2J1dHRvbj5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiU2F2ZV0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ21vZGVsJykgbW9kZWw6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdzdG9yZScpIHN0b3JlVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdtZXRob2QnKSBtZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ3NhdmVkUm91dGUnKSBzYXZlZFJvdXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCdvblNhdmUnKSBvblNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uRXJyb3InKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljaygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICBsZXQgcG9zdFBhcmFtczogYW55O1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0FycmF5KHRoaXMubW9kZWwuZGF0YSkgJiYgdGhpcy5tb2RlbC5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5tb2RlbC5kYXRhO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHRoaXMubW9kZWwuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5tb2RlbC5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2QgfHwgJ1BPU1QnO1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy5zdG9yZVVSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBib2R5OiBtZXRob2QgPT09ICdHRVQnID8gbnVsbCA6IHBvc3RQYXJhbXMsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBtZXRob2QgPT09ICdHRVQnID8gcG9zdFBhcmFtcyA6IG51bGwsXG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFscyB8fCBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYXZlZFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnNhdmVkUm91dGVdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZS5lbWl0KHsgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBGb3JtXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNGb3JtXVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb2pzIEZvcm0gZGlyZWN0aXZlIGFsbG93cyBmb3IgbW9kZWwgdG8gc291cmNlZCBmcm9tIGEgVVJMIGFuZCBib3VuZCB0byBhIG1vZGVsLCB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGJpbmQgdG8gZm9ybSBjb21wb25lbnRzLiBBZGRpdGlvbmFsIGZvcm0gdmFsaWRhdGlvbiBjYW4gYmUgYWRkZWQgdG8gdGhlIGZvcm0gaW5wdXRzLiBJbiBvcmRlciB0byBzYXZlIG1vZGVsIGJhY2sgdG8gdGhlIHNlcnZlciwgYSBzdG9yZSBVUkwgYW5kIHN1Ym1pdCBidXR0b24gbmVlZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZm9ybSBtYXJrdXAuXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gbG9hZCB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkuIERhdGEgc2hvdWxkIGJlIHJldHVybmVkIGluIEpTT04gZm9ybWF0IGFzIGVpdGhlcjpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvcmVzdWx0cy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSB7aWQ6IDEsIG5hbWU6IHRlc3Rpbmd9IE9SPGJyPlt7aWQ6IDEsIG5hbWU6IHRlc3QxfSwge2lkOiAyLCBuYW1lOiB0ZXN0Mn1dIE9SPGJyPntyZXN1bHRzOiBbe2lkOiAxLi4ufSwge2lkOiAyLi4ufV0sIHRvdGFsQ291bnQ6IDJ9XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyBvYmplY3QgdG8gc2VuZCB3aXRoIHRoZSBTb3VyY2UgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgbW9kZWxcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSB1cmwgdG8gc2VuZCBhbnkgZGlydHkgbW9kZWwgYmFjayB0byB0aGUgc2VydmVyIGZvciBwcm9jZXNzaW5nLlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgb2JqZWN0IHRvIHNlbmQgd2l0aCB0aGUgU3RvcmUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdHlwZSBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gc2VuZCB0aGUgbW9kZWwgYmFjayB3aXRoLlxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS1kZXNjcmlwdGlvbiBUaGUgcm91dGUgdG8gbmF2aWdhdGUgdG8gb25jZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHJldHVybnMgc3VjY2Vzc2Z1bC5cbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS1kZXNjcmlwdGlvbiBJbiB0aGUgY2FzZSB3aGVyZSBhbiBhcnJheSBvZiBvYmplY3RzIGFyZSBiZWluZyBlZGl0ZWQsIG9ubHkgc2VuZCBiYWNrIHRoZSBvYmplY3RzIHdoZXJlIGNvbnRhaW5pbmcgZmllbGRzIGhhdmUgYmVlbiBjaGFuZ2VkLlxuICogQGF0dHJpYnV0ZXMtZGlydHlPbmx5LXR5cGUgQm9vbGVhbiAoZGVmYXVsdCBmYWxzZSlcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgb25jZSB0aGUgbW9kZWwgaGFzIGJlZW4gbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIGluIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGVyZSBpcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBtb2RlbC5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBzYXZlIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZXNcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25FcnJvci1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3IgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmljZSBjYWxsLlxuICogQGF0dHJpYnV0ZXMtb25FcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIFRoaXMgYXR0cmlidXRlIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBhIDxmb3JtPiBlbGVtZW50LlxuICogPGZvcm0gbm9qc0Zvcm0gW21vZGVsXT1cIm1vZGVsXCIgc291cmNlPVwiL1BPU1QvU29tZXNlcnZpY2UvZ2V0T3JkZXJEYXRhXCJcbiAqICAgW3NvdXJjZVBhcmFtc109XCJ7b3JkZXJJZDogMzd9XCIgc3RvcmU9XCIvUE9TVC9Tb21lc2VydmljZS9zYXZlT3JkZXJzXCJcbiAqICAgc3RvcmVPYmplY3RQYXJhbT1cIm9yZGVyc1wiIHNhdmVkUm91dGU9XCIvbm9qcy1jb3JlXCI+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPklEPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCIgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtLmlkXCIgcmVxdWlyZWQ+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3RhdHVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN0YXR1c1wiIFsobmdNb2RlbCldPVwibW9kZWwuaXRlbS5zdGF0dXNcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5TdWJ0b3RhbDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzdWJ0b3RhbFwiIFsobmdNb2RlbCldPVwibW9kZWwuaXRlbS5zdWJ0b3RhbFwiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlRheGVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRheGVzXCIgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtLnRheGVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+VG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidG90YWxcIiBbKG5nTW9kZWwpXT1cIm1vZGVsLml0ZW0udG90YWxcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAqIDwvZm9ybT5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiRm9ybV0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NvdXJjZScpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc291cmNlTWV0aG9kJykgc291cmNlTWV0aG9kOiBzdHJpbmc7XG4gICAgQElucHV0KCdzb3VyY2VQYXJhbXMnKSBzb3VyY2VQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ21vZGVsJykgbW9kZWw6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdzdG9yZScpIHN0b3JlVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdzdG9yZU1ldGhvZCcpIHN0b3JlTWV0aG9kOiBzdHJpbmc7XG4gICAgQElucHV0KCdzYXZlZFJvdXRlJykgc2F2ZWRSb3V0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnZGlydHlPbmx5JykgZGlydHlPbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uTG9hZEVycm9yJykgb25Mb2FkRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25TYXZlJykgb25TYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkVycm9yJykgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRTb3VyY2VEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFNhdmVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U291cmNlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kZWwucGFnZU9wdGlvbnMuaW5kZXggPSAwKTtcblxuICAgICAgICBtZXJnZSh0aGlzLm1vZGVsLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5tb2RlbC5wYWdlT3B0aW9ucy5jaGFuZ2VzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBfLmlzQXJyYXkoZGF0YS5yZXN1bHRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudG90YWxDb3VudCA9IGRhdGEudG90YWxDb3VudCB8fCBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50b3RhbENvdW50ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc291cmNlUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QpKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLmZpbHRlcnMgPSB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwucGFnZU9wdGlvbnMuc2l6ZSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMubW9kZWwucGFnZU9wdGlvbnMuc2l6ZTtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZSA9IHRoaXMubW9kZWwucGFnZU9wdGlvbnMuaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLnNvdXJjZU1ldGhvZCA/IHRoaXMuc291cmNlTWV0aG9kIDogKHRoaXMuc291cmNlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMudXJsLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuc291cmNlUGFyYW1zLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTYXZlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVVUkwpIHtcbiAgICAgICAgICAgIHRoaXMubmdGb3JtLm5nU3VibWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheSh0aGlzLm1vZGVsLmRhdGEpICYmIHRoaXMubW9kZWwuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcnR5T25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlydHkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaCh0aGlzLm5nRm9ybS5mb3JtLmNvbnRyb2xzLCAoY29udHJvbCwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlydHkucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcnR5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKGRpcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHRoaXMubW9kZWwuZGF0YSkgJiYgdGhpcy5uZ0Zvcm0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlRGF0YShkaXJ0eT8pIHtcbiAgICAgICAgbGV0IHBvc3RQYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoZGlydHkpIHtcblxuICAgICAgICAgICAgY29uc3QgZGlydHlPYmplY3RzID0gW107XG5cbiAgICAgICAgICAgIGRpcnR5LmZvckVhY2goZGlydHlLZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0S2V5ID0gZGlydHlLZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJ0eUluZGV4ID0gXy5maW5kKHNwbGl0S2V5LCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzTmFOKE51bWJlcihrZXkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkaXJ0eU9iamVjdHMucHVzaCh0aGlzLm1vZGVsLmRhdGFbZGlydHlJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBvc3RQYXJhbXMgPSBkaXJ0eU9iamVjdHM7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfLmlzQXJyYXkodGhpcy5tb2RlbC5kYXRhKSAmJiB0aGlzLm1vZGVsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLm1vZGVsLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QodGhpcy5tb2RlbC5kYXRhKSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLm1vZGVsLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLnN0b3JlTWV0aG9kID8gdGhpcy5zdG9yZU1ldGhvZCA6ICdQT1NUJztcblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMuc3RvcmVVUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9keTogbWV0aG9kID09PSAnR0VUJyA/IG51bGwgOiBwb3N0UGFyYW1zLFxuICAgICAgICAgICAgICAgIHBhcmFtczogbWV0aG9kID09PSAnR0VUJyA/IHBvc3RQYXJhbXMgOiBudWxsLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zYXZlZFJvdXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmUuZW1pdCh7IHJlc3VsdHM6IHJlc3VsdHMgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaFJlZ2V4VmFsaWRhdG9yKG1hdGNoOiBSZWdFeHApOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWQgPSBtYXRjaC50ZXN0KGNvbnRyb2wudmFsdWUpO1xuICAgICAgICByZXR1cm4gIW1hdGNoZWQgPyB7J21hdGNoUmVnZXgnOiB7dmFsdWU6IGNvbnRyb2wudmFsdWV9fSA6IG51bGw7XG4gICAgfTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JNYXRjaFJlZ2V4XScsXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBNYXRjaFJlZ2V4RGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoUmVnZXhEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgna2JNYXRjaFJlZ2V4JykgbWF0Y2hSZWdleDogc3RyaW5nO1xuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaFJlZ2V4ID8gbWF0Y2hSZWdleFZhbGlkYXRvcihuZXcgUmVnRXhwKHRoaXMubWF0Y2hSZWdleCwgJ2knKSkoY29udHJvbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19BU1lOQ19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiUmVtb3RlVmFsaWRhdGVdJyxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCdrYlJlbW90ZVZhbGlkYXRlJykgcmVtb3RlVmFsaWRhdGU6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgna2V5Jykga2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoJ3JlbW90ZVBhcmFtcycpIHJlbW90ZVBhcmFtczogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbGlkYXRlID8gdGhpcy5yZW1vdGVWYWxpZGF0ZVZhbGlkYXRvcih0aGlzLnJlbW90ZVZhbGlkYXRlKShjb250cm9sKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IocmVtb3RlVVJMOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMucmVtb3RlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHVybDtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3RlVVJMLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVtb3RlVVJMICsgYCYke3RoaXMua2V5fT0ke2NvbnRyb2wudmFsdWV9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSByZW1vdGVVUkwgKyBgPyR7dGhpcy5rZXl9PSR7Y29udHJvbC52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHVybCwge1xuICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucmVtb3RlUGFyYW1zXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWxpZCA/IHsgJ3JlbW90ZVZhbGlkYXRlJzogZmFsc2UgfSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBBY3Rpb25cbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBub2pzLWFjdGlvblxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgRGlyZWN0aXZlIGFsbG93cyBmb3IgcmFwaWQgYmluZGluZyBvZiBhIEpTT04gbW9kZWwgc291cmNlIHRvIGEgbW9kZWwuIFRoaXMgc2hvdWxkIHByaW1hcmlseSBiZSB1c2VkIGZvciBkcmF3aW5nIGxpc3RzIG9mIG1vZGVsLCB3aGVyZSB0aGUgbW9kZWwgZG9lcyBub3QgY2hhbmdlIGFzIHRoZSByZXN1bHQgb2YgdXNlciBpbnB1dC4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG5vanNCaW5kU2F2ZSB0byBzZW5kIGFueSBtb2RlbCBjaGFuZ2VzIGJhY2sgdG8gdGhlIHNlcnZlci4gSWYgeW91IGFyZSBsb29raW5nIHRvIGltcGxlbWVudCBGb3JtIGJlaGF2aW91ciwgdGhlbiB1c2Ugbm9qc0Zvcm0uXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiQWN0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdhY3Rpb25VUkwnKSBhY3Rpb25VUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnYWN0aW9uUGFyYW1zJykgYWN0aW9uUGFyYW1zOiBhbnk7XG4gICAgQElucHV0KCdzdWNjZXNzUm91dGUnKSBzdWNjZXNzUm91dGU6IHN0cmluZztcblxuICAgIEBPdXRwdXQoJ3N0YXJ0ZWQnKSBzdGFydGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ2NvbXBsZXRlZCcpIGNvbXBsZXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdlcnJvcicpIGVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc3RhcnRlZC5lbWl0KHRydWUpO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kID8gdGhpcy5tZXRob2QgOiAodGhpcy5hY3Rpb25QYXJhbXMgPyAnUE9TVCcgOiAnR0VUJyk7XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLmFjdGlvblVSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMuYWN0aW9uUGFyYW1zXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1Y2Nlc3NSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zdWNjZXNzUm91dGVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgS2luaWJpbmRCaW5kRGlyZWN0aXZlIH0gZnJvbSAnLi9iaW5kL2tpbmliaW5kLWJpbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXIva2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2ZpbHRlci1lbGVtZW50L2tpbmliaW5kLWZpbHRlci1lbGVtZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50SnNvbnBNb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBLaW5pYmluZFNhdmVEaXJlY3RpdmUgfSBmcm9tICcuL2JpbmQtc2F2ZS9raW5pYmluZC1zYXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtpbmliaW5kRm9ybURpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS9raW5pYmluZC1mb3JtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRjaFJlZ2V4RGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcmVtb3RlLXZhbGlkYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vYWN0aW9uL2tpbmliaW5kLWFjdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50SnNvbnBNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBLaW5pYmluZEJpbmREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLaW5pYmluZFNhdmVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGb3JtRGlyZWN0aXZlLFxuICAgICAgICBNYXRjaFJlZ2V4RGlyZWN0aXZlLFxuICAgICAgICBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEtpbmliaW5kQmluZERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRTYXZlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZvcm1EaXJlY3RpdmUsXG4gICAgICAgIE1hdGNoUmVnZXhEaXJlY3RpdmUsXG4gICAgICAgIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0tpbmliaW5kTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJfLmlzUGxhaW5PYmplY3QiLCJfLmlzQXJyYXkiLCJfLmlzRW1wdHkiLCJfLmV4dGVuZCIsIl8uaXNPYmplY3QiLCJvYnNlcnZhYmxlT2YiLCJfLmZvckVhY2giLCJfLmZpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQVVJLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO0tBQ2xFOzs7Ozs7O0lBRU0sV0FBVyxDQUFDLE1BQWMsRUFBRSxHQUFXLEVBQUUsVUFBZSxFQUFFO1FBQzdELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7SUFHNUMsZUFBZSxDQUFDLEdBQVcsRUFBRSxNQUFXLEVBQUUsVUFBZSxFQUFFO1FBQzlELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztJQUd6QyxjQUFjLENBQUMsR0FBVyxFQUFFLFVBQWUsRUFBRTtRQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztJQUdoQyxnQkFBZ0IsQ0FBQyxHQUFXLEVBQUUsTUFBVzs7UUFDNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDOztRQUN4RSxNQUFNLE9BQU8sR0FBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7UUFHMUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztRQUVuQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV4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