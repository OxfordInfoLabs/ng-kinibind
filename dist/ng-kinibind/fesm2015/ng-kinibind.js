import { EventEmitter, Injectable, Directive, Input, Output, Component, HostListener, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { EMPTY, Subject, merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { isPlainObject, isArray, isEmpty, extend, forEach, find } from 'lodash';
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
 * \@description This is the Model that nojs-bind, nojs-filter, nojs-paginator, and nojs-filter-element bind to. It provides a structure that allows for each of these nojs components to manage their own state and data handling.
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
     * @param {?=} limit
     * @param {?=} offset
     */
    constructor(limit, offset) {
        this.results = [];
        this.item = {};
        this.value = '';
        this.totalCount = 0;
        this.offset = offset || 0;
        this.filters = {
            changes: new Subject(),
            filterObject: {}
        };
        this.pageOptions = {
            changes: new Subject(),
            size: limit,
            index: 1,
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
 * \@description The NoJS Bind Directive allows for rapid binding of a JSON data source to a model. This should primarily be used for drawing lists of data, where the data does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 * \@attributes-source-description The URL to load the data asynchronously. Data should be returned in JSON format as either:
 * \@attributes-source-type String
 * \@attributes-source-value https://someservice/results.json
 * \@attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * \@attributes-sourceParams-description Parameters used to send back to the server in the post request.
 * \@attributes-sourceParams-type Object.
 * \@attributes-sourceParams-value {param: value}
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value data
 * \@attributes-onLoad-description Event raised once the data has been loaded successfully.
 * \@attributes-onLoad-type method
 * \@attributes-onLoadError-description Event raised in the scenario where there is an error loading the data.
 * \@attributes-onLoadError-type method
 *
 *
 * \@exampleDescription Create an element using the <nojs-bind> tag
 * <nojs-bind source="https://someservice/results.json" [sourceParams]="{userId: 100}"
 *   [model]="data">
 *
 *   <div *ngFor="let item of data.results">
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
        // If we have a reload trigger listen for changes and reset the data model.
        this.reloadTrigger.subscribe(() => {
            this.data.filters.filterObject = {};
            this.data.pageOptions.index = 1;
        });
        this.data.filters.changes.subscribe(() => this.data.pageOptions.index = 1);
        merge(this.data.filters.changes, this.data.pageOptions.changes, this.reloadTrigger)
            .pipe(startWith({}), switchMap(() => {
            return this.getData();
        }), map((data) => {
            if (isPlainObject(data)) {
                if (data.results && isArray(data.results)) {
                    this.data.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (isArray(data)) {
                this.data.totalCount = data.length;
                return data;
            }
            else {
                return data;
            }
        }), catchError((error) => {
            this.onLoadError.emit(error);
            return of([]);
        })).subscribe(data => {
            if (isPlainObject(data)) {
                this.data.item = data;
            }
            else if (isArray(data)) {
                this.data.results = data;
            }
            else {
                this.data.value = data;
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
        if (!isEmpty(this.data.filters.filterObject)) {
            postParams.filters = this.data.filters.filterObject;
        }
        if (this.data.pageOptions.size) {
            postParams.pageSize = this.data.pageOptions.size;
            postParams.page = this.data.pageOptions.index;
        }
        if (this.getURL) {
            return this.kbRequest.makeGetRequest(this.getURL);
        }
        else {
            return this.kbRequest.makePostRequest(this.url, postParams);
        }
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
    getURL: [{ type: Input, args: ['getSource',] }],
    sourceParams: [{ type: Input, args: ['sourceParams',] }],
    data: [{ type: Input, args: ['model',] }],
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
 * \@description Filtering component that generates filter options based on the passed in source. Selecting any of these options will update the filter object from [model] which will trigger a server side filter of the data.
 *
 * \@attributes-source-description The URL to call to retrieve the filter options from the server. Return data expected in the following format:
 * \@attributes-source-type String
 * \@attributes-source-value https://someservice/filters.json
 * \@attributes-source-code [{count: 2, label: Option1: value: 1},<br>{count: 4, label: Option2: value: 2}]
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value data
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
 * [model]="data" multiple="true" filter="total" showCount="true">
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
            this.data.filters.filterObject = extend(this.initialFilterValues, this.data.filters.filterObject);
        }
        this.getData(this.data.filters.filterObject).subscribe(data => {
            this.filterValues = data;
        });
    }
    /**
     * @param {?} filterObject
     * @return {?}
     */
    updateFilter(filterObject) {
        filterObject.selected = !filterObject.selected;
        if (!this.data.filters.filterObject) {
            this.data.filters.filterObject = {};
        }
        if (this.multiple) {
            if (filterObject.selected) {
                if (!Array.isArray(this.data.filters.filterObject[this.filter])) {
                    this.data.filters.filterObject[this.filter] = [filterObject.value];
                }
                else {
                    this.data.filters.filterObject[this.filter].push(filterObject.value);
                }
            }
            else {
                /** @type {?} */
                const index = this.data.filters.filterObject[this.filter].indexOf(filterObject.value);
                if (index > -1) {
                    this.data.filters.filterObject[this.filter].splice(index, 1);
                }
                if (!this.data.filters.filterObject[this.filter].length) {
                    delete this.data.filters.filterObject[this.filter];
                }
            }
        }
        else {
            if (filterObject.selected) {
                this.data.filters.filterObject[this.filter] = filterObject.value;
            }
            else {
                delete this.data.filters.filterObject[this.filter];
            }
        }
        this.getData(this.data.filters.filterObject);
        this.data.filters.changes.next(true);
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
    data: [{ type: Input, args: ['model',] }],
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
 * \@description Allow for an input element to perform custom filtering on the associated bound data.
 *
 * \@attributes-model-description The object that the results from the source will bind itself to.
 * \@attributes-model-type NojsBindModel
 * \@attributes-model-value data
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
 * <input type='text' #element filterElement [model]='data' filter='search'
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
            delete this.data.filters.filterObject[this.filter];
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
            this.data.filters.filterObject[this.filter] = {
                filterValue: newValue,
                filterColumns: this.columns ? this.columns.split(',') : []
            };
            if (this.mode) {
                this.data.filters.filterObject[this.filter].filterMode = this.mode;
            }
            if (this.dateFormat) {
                this.data.filters.filterObject[this.filter].filterDateFormat = this.dateFormat;
            }
        }
        this.data.filters.changes.next(true);
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
    data: [{ type: Input, args: ['model',] }],
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
        const postParams = this.storeParams || {};
        if (this.model) {
            if (this.model.results.length > 0) {
                postParams[this.storeObjectParam || 'results'] = this.model.results;
            }
            else if (this.model.item) {
                postParams[this.storeObjectParam || 'object'] = this.model.item;
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
    storeParams: [{ type: Input, args: ['storeParams',] }],
    storeObjectParam: [{ type: Input, args: ['storeObjectParam',] }],
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
        this.data.filters.changes.subscribe(() => this.data.pageOptions.index = 0);
        merge(this.data.filters.changes, this.data.pageOptions.changes)
            .pipe(startWith({}), switchMap(() => {
            return this.getData();
        }), map((data) => {
            if (isPlainObject(data)) {
                if (data.results && isArray(data.results)) {
                    this.data.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (isArray(data)) {
                this.data.totalCount = data.length;
                return data;
            }
        }), catchError((error) => {
            this.onLoadError.emit(error);
            return of([]);
        })).subscribe(data => {
            if (isPlainObject(data)) {
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
                const dirtyIndex = find(splitKey, key => {
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
        this.remoteObjectParams = {};
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
            this.remoteObjectParams[this.remoteObjectParam] = control.value;
            if (control.value) {
                return this.kbRequest.makePostRequest(remoteURL, this.remoteObjectParams).toPromise()
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
    remoteObjectParam: [{ type: Input, args: ['remoteObjectParam',] }],
    remoteObjectParams: [{ type: Input, args: ['remoteObjectParams',] }]
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
 * \@description The NoJS Bind Directive allows for rapid binding of a JSON data source to a model. This should primarily be used for drawing lists of data, where the data does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 *
 *
 */
class KinibindActionDirective {
    /**
     * @param {?} kbRequest
     */
    constructor(kbRequest) {
        this.kbRequest = kbRequest;
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
        const postParams = this.actionParams || {};
        this.kbRequest.makePostRequest(this.actionURL, postParams).toPromise()
            .then(result => {
            this.completed.emit(result);
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
    { type: KinibindRequestService }
];
KinibindActionDirective.propDecorators = {
    actionURL: [{ type: Input, args: ['actionURL',] }],
    actionParams: [{ type: Input, args: ['actionParams',] }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC5tb2RlbC50cyIsIm5nOi8vbmcta2luaWJpbmQvYmluZC9raW5pYmluZC1iaW5kLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL25nLWtpbmliaW5kL2ZpbHRlci1lbGVtZW50L2tpbmliaW5kLWZpbHRlci1lbGVtZW50LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvYmluZC1zYXZlL2tpbmliaW5kLXNhdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9mb3JtL2tpbmliaW5kLWZvcm0uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC92YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvdmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9hY3Rpb24va2luaWJpbmQtYWN0aW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvbmcta2luaWJpbmQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kUmVxdWVzdFNlcnZpY2Uge1xuXG4gICAgcHVibGljIGpzb25wUmVxdWVzdEVycm9yOiBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlUG9zdFJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogYW55LCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlR2V0UmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZUpzb25wUmVxdWVzdCh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHsgaGVhZGVyczogaGVhZGVycyB9O1xuXG4gICAgICAgIC8vIFNldCBjYWxsYmFjayBwYXJhbSBmb3IgdGhlIEpTT05QIHJlcXVlc3QuXG4gICAgICAgIHBhcmFtcy5jYWxsYmFjayA9ICdKU09OUF9DQUxMQkFDSyc7XG5cbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBwYXJhbXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdqc29ucCcsIHVybCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5waXBlKG1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pLCBjYXRjaEVycm9yKChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBjbGllbnQtc2lkZSBvciBuZXR3b3JrIGVycm9yIG9jY3VycmVkLiBIYW5kbGUgaXQgYWNjb3JkaW5nbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkOicsIGVyci5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYmFja2VuZCByZXR1cm5lZCBhbiB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2UgY29kZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJlc3BvbnNlIGJvZHkgbWF5IGNvbnRhaW4gY2x1ZXMgYXMgdG8gd2hhdCB3ZW50IHdyb25nLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBCYWNrZW5kIHJldHVybmVkIGNvZGUgJHtlcnIuc3RhdHVzfSwgYm9keSB3YXM6ICR7ZXJyLmVycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IuZW1pdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEtpbmliaW5kRmlsdGVycyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIGZpbHRlck9iamVjdD86IGFueTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEtpbmliaW5kUGFnZU9wdGlvbnMge1xuICAgIGNoYW5nZXM6IFN1YmplY3Q8YW55PjtcbiAgICBzaXplPzogbnVtYmVyO1xuICAgIGluZGV4PzogbnVtYmVyO1xuICAgIG9wdGlvbnM/OiBudW1iZXJbXTtcbn1cblxuLyoqXG4gKiBAbmFtZSBLaW5pYmluZE1vZGVsXG4gKiBAZG9jVHlwZSBNb2RlbFxuICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgdGhlIE1vZGVsIHRoYXQgbm9qcy1iaW5kLCBub2pzLWZpbHRlciwgbm9qcy1wYWdpbmF0b3IsIGFuZCBub2pzLWZpbHRlci1lbGVtZW50IGJpbmQgdG8uIEl0IHByb3ZpZGVzIGEgc3RydWN0dXJlIHRoYXQgYWxsb3dzIGZvciBlYWNoIG9mIHRoZXNlIG5vanMgY29tcG9uZW50cyB0byBtYW5hZ2UgdGhlaXIgb3duIHN0YXRlIGFuZCBkYXRhIGhhbmRsaW5nLlxuICogQHRlbXBsYXRlRGF0YSBtZW1iZXJEYXRhXG4gKlxuICogQG1lbWJlcnMtcmVzdWx0cy10eXBlIHByb3BlcnR5OiBhbnlbXVxuICogQG1lbWJlcnMtcmVzdWx0cy1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIGluIHRoZSBldmVudCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBhcmUgaW4gYXJyYXkgZm9ybS5cbiAqIEBtZW1iZXJzLXJlc3VsdHMtZGVmYXVsdFZhbHVlIEFycmF5XG4gKiBAbWVtYmVycy1pdGVtLXR5cGUgcHJvcGVydHk6IGFueVxuICogQG1lbWJlcnMtaXRlbS1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIHdoZW4gdGhlIHJldHVybmluZyB2YWx1ZSBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwgaXMgaW4gb2JqZWN0IGZvcm0uXG4gKiBAbWVtYmVycy1pdGVtLWRlZmF1bHRWYWx1ZSBPYmplY3RcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlc2NyaXB0aW9uIENvdW50IG9mIHRoZSB0b3RhbCByZXN1bHRzXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1vZmZzZXQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy1vZmZzZXQtZGVzY3JpcHRpb24gV2hlbiBsaW1pdGluZyByZXN1bHRzIHJldHVybmVkIGZyb20gc2VydmVyIHRoaXMgdmFsdWVzIHN0b3JlIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIEBtZW1iZXJzLW9mZnNldC1kZWZhdWx0VmFsdWUgMFxuICogQG1lbWJlcnMtZmlsdGVycy10eXBlIHByb3BlcnR5OiBOb2pzRmlsdGVyc1xuICogQG1lbWJlcnMtZmlsdGVycy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlcyB1c2VkIGZvciBmaWx0ZXJpbmcgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtZmlsdGVycy1kZWZhdWx0VmFsdWUgeyBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksIGZpbHRlck9iamVjdDoge30gfVxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtdHlwZSBwcm9wZXJ0eTogTm9qc1BhZ2VPcHRpb25zXG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIHZhbHVlcyB1c2VkIHRvIHBhZ2UgdGhlIHJlc3VsdHMgb24gdGhlIHNlcnZlci5cbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgc2l6ZTogMTAsIGluZGV4OiAwLCBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXSB9XG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy10eXBlIG1ldGhvZFxuICogQG1lbWJlcnMtc2V0UGFnZU9wdGlvbnMtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcGFnaW5nIHJlc3VsdHMgbmVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gU2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBOb2pzQmluZE1vZGVsIHRvIG1ha2UgdXNlIG9mIHRoaXMgb2JqZWN0LlxuICogY29uc3QgYmluZE1vZGVsID0gbmV3IE5vanNCaW5kTW9kZWwoKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEtpbmliaW5kTW9kZWwge1xuXG4gICAgcHVibGljIHJlc3VsdHM6IGFueVtdO1xuICAgIHB1YmxpYyBpdGVtOiBhbnk7XG4gICAgcHVibGljIHZhbHVlOiBhbnk7XG4gICAgcHVibGljIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgICBwdWJsaWMgb2Zmc2V0OiBudW1iZXI7XG4gICAgcHVibGljIGZpbHRlcnM6IEtpbmliaW5kRmlsdGVycztcbiAgICBwdWJsaWMgcGFnZU9wdGlvbnM6IEtpbmliaW5kUGFnZU9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3RvcihsaW1pdD86IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgICAgICB0aGlzLml0ZW0gPSB7fTtcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7XG4gICAgICAgICAgICBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3Q6IHt9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGFnZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksXG4gICAgICAgICAgICBzaXplOiBsaW1pdCxcbiAgICAgICAgICAgIGluZGV4OiAxLFxuICAgICAgICAgICAgb3B0aW9uczogWzEwLCAyNSwgNTAsIDEwMF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGFnZU9wdGlvbnMocGFnZVNpemUsIHBhZ2VJbmRleCkge1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLnNpemUgPSBwYWdlU2l6ZTtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5pbmRleCA9IHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBwYWdlU2l6ZSAqIHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQmluZFxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIG5vanMtYmluZFxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgRGlyZWN0aXZlIGFsbG93cyBmb3IgcmFwaWQgYmluZGluZyBvZiBhIEpTT04gZGF0YSBzb3VyY2UgdG8gYSBtb2RlbC4gVGhpcyBzaG91bGQgcHJpbWFyaWx5IGJlIHVzZWQgZm9yIGRyYXdpbmcgbGlzdHMgb2YgZGF0YSwgd2hlcmUgdGhlIGRhdGEgZG9lcyBub3QgY2hhbmdlIGFzIHRoZSByZXN1bHQgb2YgdXNlciBpbnB1dC4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG5vanNCaW5kU2F2ZSB0byBzZW5kIGFueSBtb2RlbCBjaGFuZ2VzIGJhY2sgdG8gdGhlIHNlcnZlci4gSWYgeW91IGFyZSBsb29raW5nIHRvIGltcGxlbWVudCBGb3JtIGJlaGF2aW91ciwgdGhlbiB1c2Ugbm9qc0Zvcm0uXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gbG9hZCB0aGUgZGF0YSBhc3luY2hyb25vdXNseS4gRGF0YSBzaG91bGQgYmUgcmV0dXJuZWQgaW4gSlNPTiBmb3JtYXQgYXMgZWl0aGVyOlxuICogQGF0dHJpYnV0ZXMtc291cmNlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdmFsdWUgaHR0cHM6Ly9zb21lc2VydmljZS9yZXN1bHRzLmpzb25cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1jb2RlIHtpZDogMSwgbmFtZTogdGVzdGluZ30gT1I8YnI+W3tpZDogMSwgbmFtZTogdGVzdDF9LCB7aWQ6IDIsIG5hbWU6IHRlc3QyfV0gT1I8YnI+e3Jlc3VsdHM6IFt7aWQ6IDEuLi59LCB7aWQ6IDIuLi59XSwgdG90YWxDb3VudDogMn1cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy1kZXNjcmlwdGlvbiBQYXJhbWV0ZXJzIHVzZWQgdG8gc2VuZCBiYWNrIHRvIHRoZSBzZXJ2ZXIgaW4gdGhlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy10eXBlIE9iamVjdC5cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBkYXRhXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIG9uY2UgdGhlIGRhdGEgaGFzIGJlZW4gbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIGluIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGVyZSBpcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBkYXRhLlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItdHlwZSBtZXRob2RcbiAqXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBDcmVhdGUgYW4gZWxlbWVudCB1c2luZyB0aGUgPG5vanMtYmluZD4gdGFnXG4gKiA8bm9qcy1iaW5kIHNvdXJjZT1cImh0dHBzOi8vc29tZXNlcnZpY2UvcmVzdWx0cy5qc29uXCIgW3NvdXJjZVBhcmFtc109XCJ7dXNlcklkOiAxMDB9XCJcbiAqICAgW21vZGVsXT1cImRhdGFcIj5cbiAqXG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YS5yZXN1bHRzXCI+XG4gKiAgICAgPHNwYW4+e3tpdGVtLmlkfX08L3NwYW4+XG4gKiAgICAgPHNwYW4+e2l0ZW0ubmFtZX19PC9zcGFuPlxuICogICAgIDxzcGFuPnt7aXRlbS5kYXRlfX08L3NwYW4+XG4gKiAgICAgPHNwYW4+e3tpdGVtLmFkZHJlc3N9fTwvc3Bhbj5cbiAqICAgPC9kaXY+XG4gKlxuICogPC9ub2pzLWJpbmQ+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2tiLWJpbmQnXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kQmluZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NvdXJjZScpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgnZ2V0U291cmNlJykgZ2V0VVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdzb3VyY2VQYXJhbXMnKSBzb3VyY2VQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ21vZGVsJykgZGF0YTogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3JlbG9hZFRyaWdnZXInKSByZWxvYWRUcmlnZ2VyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgnb25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uTG9hZEVycm9yJykgb25Mb2FkRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcmVsb2FkIHRyaWdnZXIgbGlzdGVuIGZvciBjaGFuZ2VzIGFuZCByZXNldCB0aGUgZGF0YSBtb2RlbC5cbiAgICAgICAgdGhpcy5yZWxvYWRUcmlnZ2VyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5pbmRleCA9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5pbmRleCA9IDEpO1xuXG4gICAgICAgIG1lcmdlKHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMsIHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5jaGFuZ2VzLCB0aGlzLnJlbG9hZFRyaWdnZXIpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRzICYmIF8uaXNBcnJheShkYXRhLnJlc3VsdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLnRvdGFsQ291bnQgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS50b3RhbENvdW50ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRFcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLml0ZW0gPSBkYXRhO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucmVzdWx0cyA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS52YWx1ZSA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc291cmNlUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMuZmlsdGVycyA9IHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucGFnZU9wdGlvbnMuc2l6ZSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplO1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5wYWdlID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0VVJMKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZUdldFJlcXVlc3QodGhpcy5nZXRVUkwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLnVybCwgcG9zdFBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBuYW1lIE5vSlMgRmlsdGVyXG4gKiBAZG9jVHlwZSBDb21wb25lbnRcbiAqIEB0YWcgbm9qcy1maWx0ZXJcbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBGaWx0ZXJpbmcgY29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGZpbHRlciBvcHRpb25zIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gc291cmNlLiBTZWxlY3RpbmcgYW55IG9mIHRoZXNlIG9wdGlvbnMgd2lsbCB1cGRhdGUgdGhlIGZpbHRlciBvYmplY3QgZnJvbSBbbW9kZWxdIHdoaWNoIHdpbGwgdHJpZ2dlciBhIHNlcnZlciBzaWRlIGZpbHRlciBvZiB0aGUgZGF0YS5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBjYWxsIHRvIHJldHJpZXZlIHRoZSBmaWx0ZXIgb3B0aW9ucyBmcm9tIHRoZSBzZXJ2ZXIuIFJldHVybiBkYXRhIGV4cGVjdGVkIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICogQGF0dHJpYnV0ZXMtc291cmNlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdmFsdWUgaHR0cHM6Ly9zb21lc2VydmljZS9maWx0ZXJzLmpzb25cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1jb2RlIFt7Y291bnQ6IDIsIGxhYmVsOiBPcHRpb24xOiB2YWx1ZTogMX0sPGJyPntjb3VudDogNCwgbGFiZWw6IE9wdGlvbjI6IHZhbHVlOiAyfV1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtbXVsdGlwbGUtZGVzY3JpcHRpb24gQWxsb3cgbXVsdGlwbGUgZmlsdGVyIG9wdGlvbnMgdG8gYmUgc2VsZWN0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAqIEBhdHRyaWJ1dGVzLW11bHRpcGxlLXR5cGUgQm9vbGVhblxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBkYXRhYmFzZSBmaWVsZCB0aGF0IHRoZSBmaWx0ZXIgd2lsbCBiZSBhcHBsaWVkIHRvLlxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtZGVzY3JpcHRpb24gVG9nZ2xlIHRoYXQgc2hvd3MgdGhlIGNvdW50IG9mIHJlc3VsdHMgZm9yIHRoZSBnaXZlbiBmaWx0ZXIuXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtdHlwZSBCb29sZWFuXG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLWRlc2NyaXB0aW9uIFNldCBmaWx0ZXIgdmFsdWVzIHVwb24gY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICogQGF0dHJpYnV0ZXMtaW5pdGlhbEZpbHRlclZhbHVlcy10eXBlIEpTT04gT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLXZhbHVlIHtzb21lVmFsdWU6IHRydWV9XG4gKlxuICogPG5vanMtZmlsdGVyIHNvdXJjZT1cImh0dHBzOi8vc29tZXNlcnZpY2UvZmlsdGVycy5qc29uXCJcbiAqIFtpbml0aWFsRmlsdGVyVmFsdWVzXT1cIntjb21wbGV0ZTogdHJ1ZX1cIlxuICogW21vZGVsXT1cImRhdGFcIiBtdWx0aXBsZT1cInRydWVcIiBmaWx0ZXI9XCJ0b3RhbFwiIHNob3dDb3VudD1cInRydWVcIj5cbiAqIDwvbm9qcy1maWx0ZXI+XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna2ItZmlsdGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nRm9yPVwibGV0IGZpbHRlclZhbHVlIG9mIGZpbHRlclZhbHVlc1wiPlxuICAgIDxkaXYgKm5nSWY9XCJtdWx0aXBsZVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJ1cGRhdGVGaWx0ZXIoZmlsdGVyVmFsdWUpXCIvPlxuICAgICAgICB7e2ZpbHRlclZhbHVlLmxhYmVsfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRcIj4oe3tmaWx0ZXJWYWx1ZS5jb3VudH19KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxhICpuZ0lmPVwiIW11bHRpcGxlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgW3N0eWxlLmZvbnQtd2VpZ2h0XT1cImZpbHRlclZhbHVlLnNlbGVjdGVkID8gJ2JvbGQnIDogJ25vcm1hbCdcIiAoY2xpY2spPVwidXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKVwiPlxuICAgICAgICB7e2ZpbHRlclZhbHVlLmxhYmVsfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRcIj4oe3tmaWx0ZXJWYWx1ZS5jb3VudH19KTwvc3Bhbj5cbiAgICA8L2E+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdtdWx0aXBsZScpIG11bHRpcGxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgnc2hvd0NvdW50Jykgc2hvd0NvdW50OiBib29sZWFuO1xuICAgIEBJbnB1dCgnZmlsdGVyJykgZmlsdGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCdpbml0aWFsRmlsdGVyVmFsdWVzJykgaW5pdGlhbEZpbHRlclZhbHVlczogYW55O1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgcHVibGljIGZpbHRlclZhbHVlczogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsRmlsdGVyVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QgPSBfLmV4dGVuZCh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMsIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlRmlsdGVyKGZpbHRlck9iamVjdCkge1xuICAgICAgICBmaWx0ZXJPYmplY3Quc2VsZWN0ZWQgPSAhZmlsdGVyT2JqZWN0LnNlbGVjdGVkO1xuICAgICAgICBpZiAoIXRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IFtmaWx0ZXJPYmplY3QudmFsdWVdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0ucHVzaChmaWx0ZXJPYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmluZGV4T2YoZmlsdGVyT2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyT2JqZWN0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IGZpbHRlck9iamVjdC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KTtcbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YShmaWx0ZXJzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgc2VlZENvbHVtbjogdGhpcy5maWx0ZXIsXG4gICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLnVybCwgcG9zdFBhcmFtcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5cbi8qKlxuICogQG5hbWUgTm9KUyBGaWx0ZXIgRWxlbWVudFxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRmlsdGVyRWxlbWVudF1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBBbGxvdyBmb3IgYW4gaW5wdXQgZWxlbWVudCB0byBwZXJmb3JtIGN1c3RvbSBmaWx0ZXJpbmcgb24gdGhlIGFzc29jaWF0ZWQgYm91bmQgZGF0YS5cbiAqXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgdHlwZSBvZiBmaWx0ZXJpbmcgYXBwbGllZCB0byB0aGlzIGVsZW1lbnQuIChDdXJyZW50bHkgb25seSAnc2VhcmNoJyBpcyBzdXBwb3J0ZWQpXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC1kZXNjcmlwdGlvbiBTcGVjaWZ5IGEgcHJlZml4IHRvIGFwcGx5IHRvIHRoZSBmaWx0ZXJcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3VmZml4LWRlc3JpcHRpb24gU3BlY2lmeSBhIHN1ZmZpeCB0byBhcHBseSB0byB0aGUgZmlsdGVyXG4gKiBAYXR0cmlidXRlcy1zdWZmaXgtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWNvbHVtbnMtZGVzY3JpcHRpb24gU3BlY2lmeSB0aGUgY29sdW1ucyBpbiB0aGUgdGFibGUgdGhhdCB0aGlzIGZpbHRlciBpcyBhc3NvY2lhdGVkIHdpdGguIChjb21tYSBzZXBhcmF0ZWQgbGlzdCAnaWQsbmFtZSxkZXNjcmlwdGlvbicpXG4gKiBAYXR0cmlidXRlcy1jb2x1bW5zLXR5cGUgU3RyaW5nXG4gKlxuICpcbiAqIDxpbnB1dCB0eXBlPSd0ZXh0JyAjZWxlbWVudCBmaWx0ZXJFbGVtZW50IFttb2RlbF09J2RhdGEnIGZpbHRlcj0nc2VhcmNoJ1xuICogY29sdW1ucz0naWQsYnV5ZXJfbmFtZScgcHJlZml4PScqJyBzdWZmaXg9JyonIHBsYWNlaG9sZGVyPSdTZWFyY2ggT3JkZXJzJz5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGaWx0ZXJFbGVtZW50XScsXG4gICAgZXhwb3J0QXM6ICdmaWx0ZXJFbGVtZW50J1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ3ByZWZpeCcpIHByZWZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3VmZml4Jykgc3VmZml4OiBzdHJpbmc7XG4gICAgQElucHV0KCdjb2x1bW5zJykgY29sdW1uczogc3RyaW5nO1xuICAgIEBJbnB1dCgnZmlsdGVyQ2xhc3MnKSBmaWx0ZXJDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZScpIG1vZGU6IHN0cmluZztcbiAgICBASW5wdXQoJ2RhdGVGb3JtYXQnKSBkYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGV4cG9zZWQgdG8gdGhlIGVsZW1lbnQgd2UgYXJlIGF0dGFjaGVkIHRvIGFzIGEgdGVtcGxhdGUgdmFyaWFibGUsXG4gICAgICogc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSBmaWx0ZXJzIHdpdGggdGhlIG5ldyBmaWx0ZXIgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVyVmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0RmlsdGVyT2JqZWN0KGZpbHRlclZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdEZpbHRlck9iamVjdChmaWx0ZXJWYWx1ZSkge1xuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gZmlsdGVyVmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucHJlZml4ICsgbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN1ZmZpeCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgKyB0aGlzLnN1ZmZpeDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29sdW1uczogdGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLnNwbGl0KCcsJykgOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyTW9kZSA9IHRoaXMubW9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyRGF0ZUZvcm1hdCA9IHRoaXMuZGF0ZUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQmluZCBTYXZlXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNCaW5kU2F2ZV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIFNhdmUgRGlyZWN0aXZlIGFsbG93cyBmb3Igc2ltcGxlIHNhdmluZyBvZiBkYXRhIGJhY2sgdG8gdGhlIHNlcnZlci4gVGhpcyB3aWxsIHJldHVybiB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiBlaXRoZXIgdGhlIE5vanNCaW5kTW9kZWwucmVzdWx0cyBhcnJheSBvciB0aGUgTm9qc0JpbmRNb2RlbC5pdGVtIG9iamVjdCB0byB0aGUgc2VydmVyIGZvciBwcm9jZXNzaW5nLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSBVUkwgd2hlcmUgb2YgdGhlIHNlcnZlciB3aGVyZSB0aGUgZGF0YSBzaG91bGQgYmUgc2VudCBmb3IgcHJvY2Vzc2luZy5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy1kZXNjcmlwdGlvbiBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gc2VuZCBiYWNrIHRvIHRoZSBzZXJ2ZXIgd2l0aCB0aGUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdHlwZSBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gc2VuZCB0aGUgZGF0YSBiYWNrIHdpdGguXG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBzYXZlIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZXNcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25FcnJvci1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3IgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmljZSBjYWxsLlxuICogQGF0dHJpYnV0ZXMtb25FcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIEFkZCB0aGUgbm9qc0JpbmRTYXZlIGF0dHJpYnV0ZSB0byBhbnkgZWxlbWVudC4gVGhlIGFzc29jaWF0ZWQgY2xpY2sgZXZlbnQgb24gdGhhdCBlbGVtZW50IHdpbGwgY2F1c2UgdGhlIGRhdGEgdG8gc2F2ZS5cbiAqIDxidXR0b24gbm9qc0JpbmRTYXZlIHN0b3JlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9zYXZlXCIgc3RvcmVPYmplY3RQYXJhbT1cIm9yZGVyc1wiIFttb2RlbF09XCJkYXRhXCJcbiAqICAgW3N0b3JlUGFyYW1zXT1cInt1c2VySWQ6IDIwMH1cIiBzYXZlZFJvdXRlPVwiL3ZpZXdzL3VzZXJzXCJcbiAqICAgKG9uU2F2ZSk9XCJjYWxsTWVPblNhdmUoKVwiIChvbkVycm9yKT1cImRvU29tZXRoaW5nKClcIj5cbiAqICAgU2F2ZVxuICogPC9idXR0b24+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYlNhdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFNhdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnc3RvcmUnKSBzdG9yZVVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3RvcmVQYXJhbXMnKSBzdG9yZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnc3RvcmVPYmplY3RQYXJhbScpIHN0b3JlT2JqZWN0UGFyYW06IHN0cmluZztcbiAgICBASW5wdXQoJ3NhdmVkUm91dGUnKSBzYXZlZFJvdXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCdvblNhdmUnKSBvblNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uRXJyb3InKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljaygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlKCkge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB0aGlzLnN0b3JlUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zW3RoaXMuc3RvcmVPYmplY3RQYXJhbSB8fCAncmVzdWx0cyddID0gdGhpcy5tb2RlbC5yZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsLml0ZW0pIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zW3RoaXMuc3RvcmVPYmplY3RQYXJhbSB8fCAnb2JqZWN0J10gPSB0aGlzLm1vZGVsLml0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QodGhpcy5zdG9yZVVSTCwgcG9zdFBhcmFtcykudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zYXZlZFJvdXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmUuZW1pdCh7IHJlc3VsdHM6IHJlc3VsdHMgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgRm9ybVxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRm9ybV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9qcyBGb3JtIGRpcmVjdGl2ZSBhbGxvd3MgZm9yIGRhdGEgdG8gc291cmNlZCBmcm9tIGEgVVJMIGFuZCBib3VuZCB0byBhIG1vZGVsLCB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGJpbmQgdG8gZm9ybSBjb21wb25lbnRzLiBBZGRpdGlvbmFsIGZvcm0gdmFsaWRhdGlvbiBjYW4gYmUgYWRkZWQgdG8gdGhlIGZvcm0gaW5wdXRzLiBJbiBvcmRlciB0byBzYXZlIGRhdGEgYmFjayB0byB0aGUgc2VydmVyLCBhIHN0b3JlIFVSTCBhbmQgc3VibWl0IGJ1dHRvbiBuZWVkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmb3JtIG1hcmt1cC5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBsb2FkIHRoZSBkYXRhIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgb2JqZWN0IHRvIHNlbmQgd2l0aCB0aGUgU291cmNlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSB1cmwgdG8gc2VuZCBhbnkgZGlydHkgZGF0YSBiYWNrIHRvIHRoZSBzZXJ2ZXIgZm9yIHByb2Nlc3NpbmcuXG4gKiBAYXR0cmlidXRlcy1zdG9yZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyBvYmplY3QgdG8gc2VuZCB3aXRoIHRoZSBTdG9yZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZW5kIHRoZSBkYXRhIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1kaXJ0eU9ubHktZGVzY3JpcHRpb24gSW4gdGhlIGNhc2Ugd2hlcmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhcmUgYmVpbmcgZWRpdGVkLCBvbmx5IHNlbmQgYmFjayB0aGUgb2JqZWN0cyB3aGVyZSBjb250YWluaW5nIGZpZWxkcyBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS10eXBlIEJvb2xlYW4gKGRlZmF1bHQgZmFsc2UpXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIG9uY2UgdGhlIGRhdGEgaGFzIGJlZW4gbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIGluIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGVyZSBpcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBkYXRhLlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHNhdmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlc1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gVGhpcyBhdHRyaWJ1dGUgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGEgPGZvcm0+IGVsZW1lbnQuXG4gKiA8Zm9ybSBub2pzRm9ybSBbbW9kZWxdPVwiZGF0YVwiIHNvdXJjZT1cIi9QT1NUL1NvbWVzZXJ2aWNlL2dldE9yZGVyRGF0YVwiXG4gKiAgIFtzb3VyY2VQYXJhbXNdPVwie29yZGVySWQ6IDM3fVwiIHN0b3JlPVwiL1BPU1QvU29tZXNlcnZpY2Uvc2F2ZU9yZGVyc1wiXG4gKiAgIHN0b3JlT2JqZWN0UGFyYW09XCJvcmRlcnNcIiBzYXZlZFJvdXRlPVwiL25vanMtY29yZVwiPlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5JRDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLmlkXCIgcmVxdWlyZWQ+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3RhdHVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN0YXR1c1wiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnN0YXR1c1wiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlN1YnRvdGFsPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN1YnRvdGFsXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uc3VidG90YWxcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5UYXhlczwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YXhlc1wiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnRheGVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+VG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidG90YWxcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS50b3RhbFwiPlxuICogPC9kaXY+XG4gKlxuICogPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICogPC9mb3JtPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGb3JtXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdzb3VyY2VQYXJhbXMnKSBzb3VyY2VQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ21vZGVsJykgZGF0YTogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3N0b3JlJykgc3RvcmVVUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ3N0b3JlUGFyYW1zJykgc3RvcmVQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ3N0b3JlT2JqZWN0UGFyYW0nKSBzdG9yZU9iamVjdFBhcmFtOiBzdHJpbmc7XG4gICAgQElucHV0KCdzYXZlZFJvdXRlJykgc2F2ZWRSb3V0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnZGlydHlPbmx5JykgZGlydHlPbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uTG9hZEVycm9yJykgb25Mb2FkRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25TYXZlJykgb25TYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkVycm9yJykgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRTb3VyY2VEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFNhdmVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U291cmNlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMCk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRzICYmIF8uaXNBcnJheShkYXRhLnJlc3VsdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLnRvdGFsQ291bnQgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS50b3RhbENvdW50ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbSA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5yZXN1bHRzID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc291cmNlUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMuZmlsdGVycyA9IHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucGFnZU9wdGlvbnMuc2l6ZSAmJiB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplICogdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4O1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5saW1pdCA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplO1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMudXJsLCBwb3N0UGFyYW1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTYXZlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVVUkwpIHtcbiAgICAgICAgICAgIHRoaXMubmdGb3JtLm5nU3VibWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlydHlPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJ0eSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMubmdGb3JtLmZvcm0uY29udHJvbHMsIChjb250cm9sLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbC5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJ0eS5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlydHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoZGlydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5pdGVtICYmIHRoaXMubmdGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZURhdGEoZGlydHk/KSB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc3RvcmVQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKGRpcnR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpcnR5T2JqZWN0cyA9IFtdO1xuXG4gICAgICAgICAgICBkaXJ0eS5mb3JFYWNoKGRpcnR5S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdEtleSA9IGRpcnR5S2V5LnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlydHlJbmRleCA9IF8uZmluZChzcGxpdEtleSwga2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc05hTihOdW1iZXIoa2V5KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGlydHlPYmplY3RzLnB1c2godGhpcy5kYXRhLnJlc3VsdHNbZGlydHlJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBvc3RQYXJhbXNbdGhpcy5zdG9yZU9iamVjdFBhcmFtIHx8ICdyZXN1bHRzJ10gPSBkaXJ0eU9iamVjdHM7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtc1t0aGlzLnN0b3JlT2JqZWN0UGFyYW0gfHwgJ3Jlc3VsdHMnXSA9IHRoaXMuZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXNbdGhpcy5zdG9yZU9iamVjdFBhcmFtIHx8ICdvYmplY3QnXSA9IHRoaXMuZGF0YS5pdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMuc3RvcmVVUkwsIHBvc3RQYXJhbXMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc2F2ZWRSb3V0ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlLmVtaXQoe3Jlc3VsdHM6IHJlc3VsdHN9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoUmVnZXhWYWxpZGF0b3IobWF0Y2g6IFJlZ0V4cCk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2hlZCA9IG1hdGNoLnRlc3QoY29udHJvbC52YWx1ZSk7XG4gICAgICAgIHJldHVybiAhbWF0Y2hlZCA/IHsnbWF0Y2hSZWdleCc6IHt2YWx1ZTogY29udHJvbC52YWx1ZX19IDogbnVsbDtcbiAgICB9O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYk1hdGNoUmVnZXhdJyxcbiAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdGNoUmVnZXhEaXJlY3RpdmUsIG11bHRpOiB0cnVlfV1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Y2hSZWdleERpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCdrYk1hdGNoUmVnZXgnKSBtYXRjaFJlZ2V4OiBzdHJpbmc7XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoUmVnZXggPyBtYXRjaFJlZ2V4VmFsaWRhdG9yKG5ldyBSZWdFeHAodGhpcy5tYXRjaFJlZ2V4LCAnaScpKShjb250cm9sKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIE5HX0FTWU5DX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JSZW1vdGVWYWxpZGF0ZV0nLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdfQVNZTkNfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSwgbXVsdGk6IHRydWUgfV1cbn0pXG5leHBvcnQgY2xhc3MgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBASW5wdXQoJ2tiUmVtb3RlVmFsaWRhdGUnKSByZW1vdGVWYWxpZGF0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgncmVtb3RlT2JqZWN0UGFyYW0nKSByZW1vdGVPYmplY3RQYXJhbTogYW55O1xuICAgIEBJbnB1dCgncmVtb3RlT2JqZWN0UGFyYW1zJykgcmVtb3RlT2JqZWN0UGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlVmFsaWRhdGUgPyB0aGlzLnJlbW90ZVZhbGlkYXRlVmFsaWRhdG9yKHRoaXMucmVtb3RlVmFsaWRhdGUpKGNvbnRyb2wpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdGVWYWxpZGF0ZVZhbGlkYXRvcihyZW1vdGVVUkw6IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdGVPYmplY3RQYXJhbXNbdGhpcy5yZW1vdGVPYmplY3RQYXJhbV0gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHJlbW90ZVVSTCwgdGhpcy5yZW1vdGVPYmplY3RQYXJhbXMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHZhbGlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdmFsaWQgPyB7ICdyZW1vdGVWYWxpZGF0ZSc6IGZhbHNlIH0gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQWN0aW9uXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgbm9qcy1hY3Rpb25cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIERpcmVjdGl2ZSBhbGxvd3MgZm9yIHJhcGlkIGJpbmRpbmcgb2YgYSBKU09OIGRhdGEgc291cmNlIHRvIGEgbW9kZWwuIFRoaXMgc2hvdWxkIHByaW1hcmlseSBiZSB1c2VkIGZvciBkcmF3aW5nIGxpc3RzIG9mIGRhdGEsIHdoZXJlIHRoZSBkYXRhIGRvZXMgbm90IGNoYW5nZSBhcyB0aGUgcmVzdWx0IG9mIHVzZXIgaW5wdXQuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBub2pzQmluZFNhdmUgdG8gc2VuZCBhbnkgbW9kZWwgY2hhbmdlcyBiYWNrIHRvIHRoZSBzZXJ2ZXIuIElmIHlvdSBhcmUgbG9va2luZyB0byBpbXBsZW1lbnQgRm9ybSBiZWhhdmlvdXIsIHRoZW4gdXNlIG5vanNGb3JtLlxuICpcbiAqXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkFjdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnYWN0aW9uVVJMJykgYWN0aW9uVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdhY3Rpb25QYXJhbXMnKSBhY3Rpb25QYXJhbXM6IGFueTtcblxuICAgIEBPdXRwdXQoJ3N0YXJ0ZWQnKSBzdGFydGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ2NvbXBsZXRlZCcpIGNvbXBsZXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdlcnJvcicpIGVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc3RhcnRlZC5lbWl0KHRydWUpO1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB0aGlzLmFjdGlvblBhcmFtcyB8fCB7fTtcblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QodGhpcy5hY3Rpb25VUkwsIHBvc3RQYXJhbXMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVkLmVtaXQocmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgS2luaWJpbmRCaW5kRGlyZWN0aXZlIH0gZnJvbSAnLi9iaW5kL2tpbmliaW5kLWJpbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXIva2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2ZpbHRlci1lbGVtZW50L2tpbmliaW5kLWZpbHRlci1lbGVtZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50SnNvbnBNb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBLaW5pYmluZFNhdmVEaXJlY3RpdmUgfSBmcm9tICcuL2JpbmQtc2F2ZS9raW5pYmluZC1zYXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtpbmliaW5kRm9ybURpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS9raW5pYmluZC1mb3JtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRjaFJlZ2V4RGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcmVtb3RlLXZhbGlkYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vYWN0aW9uL2tpbmliaW5kLWFjdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50SnNvbnBNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBLaW5pYmluZEJpbmREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLaW5pYmluZFNhdmVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGb3JtRGlyZWN0aXZlLFxuICAgICAgICBNYXRjaFJlZ2V4RGlyZWN0aXZlLFxuICAgICAgICBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEtpbmliaW5kQmluZERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRTYXZlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZvcm1EaXJlY3RpdmUsXG4gICAgICAgIE1hdGNoUmVnZXhEaXJlY3RpdmUsXG4gICAgICAgIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0tpbmliaW5kTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJfLmlzUGxhaW5PYmplY3QiLCJfLmlzQXJyYXkiLCJfLmlzRW1wdHkiLCJfLmV4dGVuZCIsIm9ic2VydmFibGVPZiIsIl8uZm9yRWFjaCIsIl8uZmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFB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