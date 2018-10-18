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
var  /**
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
KinibindModel = /** @class */ (function () {
    function KinibindModel(limit, offset) {
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
    KinibindModel.prototype.setPageOptions = /**
     * @param {?} pageSize
     * @param {?} pageIndex
     * @return {?}
     */
    function (pageSize, pageIndex) {
        this.pageOptions.size = pageSize;
        this.pageOptions.index = pageIndex;
        this.offset = pageSize * pageIndex;
        this.pageOptions.changes.next(true);
    };
    return KinibindModel;
}());

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
var KinibindBindDirective = /** @class */ (function () {
    function KinibindBindDirective(http, kbRequest) {
        this.http = http;
        this.kbRequest = kbRequest;
        this.reloadTrigger = new EventEmitter();
        this.onLoad = new EventEmitter();
        this.onLoadError = new EventEmitter();
    }
    /**
     * @return {?}
     */
    KinibindBindDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // If we have a reload trigger listen for changes and reset the data model.
        this.reloadTrigger.subscribe(function () {
            _this.data.filters.filterObject = {};
            _this.data.pageOptions.index = 1;
        });
        this.data.filters.changes.subscribe(function () { return _this.data.pageOptions.index = 1; });
        merge(this.data.filters.changes, this.data.pageOptions.changes, this.reloadTrigger)
            .pipe(startWith({}), switchMap(function () {
            return _this.getData();
        }), map(function (data) {
            if (isPlainObject(data)) {
                if (data.results && isArray(data.results)) {
                    _this.data.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (isArray(data)) {
                _this.data.totalCount = data.length;
                return data;
            }
            else {
                return data;
            }
        }), catchError(function (error) {
            _this.onLoadError.emit(error);
            return of([]);
        })).subscribe(function (data) {
            if (isPlainObject(data)) {
                _this.data.item = data;
            }
            else if (isArray(data)) {
                _this.data.results = data;
            }
            else {
                _this.data.value = data;
            }
            _this.onLoad.emit({ success: true });
        });
    };
    /**
     * @return {?}
     */
    KinibindBindDirective.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var postParams = this.sourceParams || {};
        if (!isEmpty(this.data.filters.filterObject)) {
            postParams.filters = this.data.filters.filterObject;
        }
        if (this.data.pageOptions.size) {
            postParams.pageSize = this.data.pageOptions.size;
            postParams.page = this.data.pageOptions.index;
        }
        /** @type {?} */
        var method = this.method ? this.method : (this.sourceParams ? 'POST' : 'GET');
        return this.kbRequest.makeRequest(method, this.url, { params: postParams });
    };
    KinibindBindDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kb-bind'
                },] },
    ];
    /** @nocollapse */
    KinibindBindDirective.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KinibindRequestService }
    ]; };
    KinibindBindDirective.propDecorators = {
        url: [{ type: Input, args: ['source',] }],
        method: [{ type: Input, args: ['method',] }],
        sourceParams: [{ type: Input, args: ['sourceParams',] }],
        data: [{ type: Input, args: ['model',] }],
        withCredentials: [{ type: Input, args: ['withCredentials',] }],
        reloadTrigger: [{ type: Input, args: ['reloadTrigger',] }],
        onLoad: [{ type: Output, args: ['onLoad',] }],
        onLoadError: [{ type: Output, args: ['onLoadError',] }]
    };
    return KinibindBindDirective;
}());

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
var KinibindFilterComponent = /** @class */ (function () {
    function KinibindFilterComponent(kbRequest) {
        this.kbRequest = kbRequest;
        this.filterValues = [];
    }
    /**
     * @return {?}
     */
    KinibindFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.initialFilterValues) {
            this.data.filters.filterObject = extend(this.initialFilterValues, this.data.filters.filterObject);
        }
        this.getData(this.data.filters.filterObject).subscribe(function (data) {
            _this.filterValues = data;
        });
    };
    /**
     * @param {?} filterObject
     * @return {?}
     */
    KinibindFilterComponent.prototype.updateFilter = /**
     * @param {?} filterObject
     * @return {?}
     */
    function (filterObject) {
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
                var index = this.data.filters.filterObject[this.filter].indexOf(filterObject.value);
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
    };
    /**
     * @param {?} filters
     * @return {?}
     */
    KinibindFilterComponent.prototype.getData = /**
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        /** @type {?} */
        var postParams = {
            seedColumn: this.filter,
            filters: filters
        };
        return this.kbRequest.makePostRequest(this.url, postParams);
    };
    KinibindFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kb-filter',
                    template: "<div *ngFor=\"let filterValue of filterValues\">\n    <div *ngIf=\"multiple\">\n        <input type=\"checkbox\" (change)=\"updateFilter(filterValue)\"/>\n        {{filterValue.label}}\n        <span *ngIf=\"showCount\">({{filterValue.count}})</span>\n    </div>\n\n    <a *ngIf=\"!multiple\" href=\"javascript:void(0)\"\n       [style.font-weight]=\"filterValue.selected ? 'bold' : 'normal'\" (click)=\"updateFilter(filterValue)\">\n        {{filterValue.label}}\n        <span *ngIf=\"showCount\">({{filterValue.count}})</span>\n    </a>\n</div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    KinibindFilterComponent.ctorParameters = function () { return [
        { type: KinibindRequestService }
    ]; };
    KinibindFilterComponent.propDecorators = {
        url: [{ type: Input, args: ['source',] }],
        data: [{ type: Input, args: ['model',] }],
        multiple: [{ type: Input, args: ['multiple',] }],
        showCount: [{ type: Input, args: ['showCount',] }],
        filter: [{ type: Input, args: ['filter',] }],
        initialFilterValues: [{ type: Input, args: ['initialFilterValues',] }],
        withCredentials: [{ type: Input, args: ['withCredentials',] }]
    };
    return KinibindFilterComponent;
}());

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
var KinibindFilterElementDirective = /** @class */ (function () {
    function KinibindFilterElementDirective() {
    }
    /**
     * This is exposed to the element we are attached to as a template variable,
     * so that we can update the filters with the new filter value.
     *
     * @param {?} filterValue
     * @return {?}
     */
    KinibindFilterElementDirective.prototype.updateFilter = /**
     * This is exposed to the element we are attached to as a template variable,
     * so that we can update the filters with the new filter value.
     *
     * @param {?} filterValue
     * @return {?}
     */
    function (filterValue) {
        this.constructFilterObject(filterValue);
    };
    /**
     * @param {?} filterValue
     * @return {?}
     */
    KinibindFilterElementDirective.prototype.constructFilterObject = /**
     * @param {?} filterValue
     * @return {?}
     */
    function (filterValue) {
        if (filterValue === null) {
            delete this.data.filters.filterObject[this.filter];
        }
        else {
            /** @type {?} */
            var newValue = filterValue;
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
    };
    KinibindFilterElementDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbFilterElement]',
                    exportAs: 'filterElement'
                },] },
    ];
    /** @nocollapse */
    KinibindFilterElementDirective.ctorParameters = function () { return []; };
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
    return KinibindFilterElementDirective;
}());

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
            if (isPlainObject(data)) {
                if (data.results && isArray(data.results)) {
                    _this.data.totalCount = data.totalCount || data.results.length;
                    return data.results;
                }
                else {
                    return data;
                }
            }
            else if (isArray(data)) {
                _this.data.totalCount = data.length;
                return data;
            }
        }), catchError(function (error) {
            _this.onLoadError.emit(error);
            return of([]);
        })).subscribe(function (data) {
            if (isPlainObject(data)) {
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
        if (!isEmpty(this.data.filters.filterObject)) {
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
                        forEach(_this.ngForm.form.controls, function (control, key) {
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
                var dirtyIndex = find(splitKey, function (key) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} match
 * @return {?}
 */
function matchRegexValidator(match) {
    return function (control) {
        /** @type {?} */
        var matched = match.test(control.value);
        return !matched ? { 'matchRegex': { value: control.value } } : null;
    };
}
var MatchRegexDirective = /** @class */ (function () {
    function MatchRegexDirective() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    MatchRegexDirective.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.matchRegex ? matchRegexValidator(new RegExp(this.matchRegex, 'i'))(control)
            : null;
    };
    MatchRegexDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbMatchRegex]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: MatchRegexDirective, multi: true }]
                },] },
    ];
    MatchRegexDirective.propDecorators = {
        matchRegex: [{ type: Input, args: ['kbMatchRegex',] }]
    };
    return MatchRegexDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NojsRemoteValidateDirective = /** @class */ (function () {
    function NojsRemoteValidateDirective(kbRequest) {
        this.kbRequest = kbRequest;
        this.remoteObjectParams = {};
    }
    /**
     * @param {?} control
     * @return {?}
     */
    NojsRemoteValidateDirective.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.remoteValidate ? this.remoteValidateValidator(this.remoteValidate)(control)
            : null;
    };
    /**
     * @param {?} remoteURL
     * @return {?}
     */
    NojsRemoteValidateDirective.prototype.remoteValidateValidator = /**
     * @param {?} remoteURL
     * @return {?}
     */
    function (remoteURL) {
        var _this = this;
        return function (control) {
            _this.remoteObjectParams[_this.remoteObjectParam] = control.value;
            if (control.value) {
                return _this.kbRequest.makePostRequest(remoteURL, _this.remoteObjectParams).toPromise()
                    .then(function (valid) {
                    return !valid ? { 'remoteValidate': false } : null;
                });
            }
            return Promise.resolve(null);
        };
    };
    NojsRemoteValidateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbRemoteValidate]',
                    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
                },] },
    ];
    /** @nocollapse */
    NojsRemoteValidateDirective.ctorParameters = function () { return [
        { type: KinibindRequestService }
    ]; };
    NojsRemoteValidateDirective.propDecorators = {
        remoteValidate: [{ type: Input, args: ['kbRemoteValidate',] }],
        remoteObjectParam: [{ type: Input, args: ['remoteObjectParam',] }],
        remoteObjectParams: [{ type: Input, args: ['remoteObjectParams',] }]
    };
    return NojsRemoteValidateDirective;
}());

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
var KinibindActionDirective = /** @class */ (function () {
    function KinibindActionDirective(kbRequest) {
        this.kbRequest = kbRequest;
        this.started = new EventEmitter();
        this.completed = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    KinibindActionDirective.prototype.clickEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        this.started.emit(true);
        /** @type {?} */
        var method = this.method ? this.method : (this.actionParams ? 'POST' : 'GET');
        this.kbRequest.makeRequest(method, this.actionURL, {
            params: this.actionParams
        })
            .toPromise()
            .then(function (result) {
            _this.completed.emit(result);
        })
            .catch(function (error) {
            _this.error.emit(error);
        });
    };
    /**
     * @return {?}
     */
    KinibindActionDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    KinibindActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbAction]'
                },] },
    ];
    /** @nocollapse */
    KinibindActionDirective.ctorParameters = function () { return [
        { type: KinibindRequestService }
    ]; };
    KinibindActionDirective.propDecorators = {
        actionURL: [{ type: Input, args: ['actionURL',] }],
        method: [{ type: Input, args: ['method',] }],
        actionParams: [{ type: Input, args: ['actionParams',] }],
        started: [{ type: Output, args: ['started',] }],
        completed: [{ type: Output, args: ['completed',] }],
        error: [{ type: Output, args: ['error',] }],
        clickEvent: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return KinibindActionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgKinibindModule = /** @class */ (function () {
    function NgKinibindModule() {
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
    return NgKinibindModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgKinibindModule, KinibindRequestService, KinibindModel, KinibindActionDirective as ɵh, KinibindSaveDirective as ɵc, KinibindBindDirective as ɵa, KinibindFilterElementDirective as ɵd, KinibindFilterComponent as ɵb, KinibindFormDirective as ɵe, MatchRegexDirective as ɵf, NojsRemoteValidateDirective as ɵg };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UudHMiLCJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC5tb2RlbC50cyIsIm5nOi8vbmcta2luaWJpbmQvYmluZC9raW5pYmluZC1iaW5kLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL25nLWtpbmliaW5kL2ZpbHRlci1lbGVtZW50L2tpbmliaW5kLWZpbHRlci1lbGVtZW50LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvYmluZC1zYXZlL2tpbmliaW5kLXNhdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9mb3JtL2tpbmliaW5kLWZvcm0uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC92YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvdmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9hY3Rpb24va2luaWJpbmQtYWN0aW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmcta2luaWJpbmQvbmcta2luaWJpbmQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kUmVxdWVzdFNlcnZpY2Uge1xuXG4gICAgcHVibGljIGpzb25wUmVxdWVzdEVycm9yOiBFdmVudEVtaXR0ZXI8SHR0cEVycm9yUmVzcG9uc2U+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlUmVxdWVzdChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChtZXRob2QsIHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VQb3N0UmVxdWVzdCh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnksIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VHZXRSZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlSnNvbnBSZXF1ZXN0KHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogYW55ID0geyBoZWFkZXJzOiBoZWFkZXJzIH07XG5cbiAgICAgICAgLy8gU2V0IGNhbGxiYWNrIHBhcmFtIGZvciB0aGUgSlNPTlAgcmVxdWVzdC5cbiAgICAgICAgcGFyYW1zLmNhbGxiYWNrID0gJ0pTT05QX0NBTExCQUNLJztcblxuICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHBhcmFtcztcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2pzb25wJywgdXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgLnBpcGUobWFwKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBIGNsaWVudC1zaWRlIG9yIG5ldHdvcmsgZXJyb3Igb2NjdXJyZWQuIEhhbmRsZSBpdCBhY2NvcmRpbmdseS5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQ6JywgZXJyLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBiYWNrZW5kIHJldHVybmVkIGFuIHVuc3VjY2Vzc2Z1bCByZXNwb25zZSBjb2RlLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcmVzcG9uc2UgYm9keSBtYXkgY29udGFpbiBjbHVlcyBhcyB0byB3aGF0IHdlbnQgd3JvbmcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEJhY2tlbmQgcmV0dXJuZWQgY29kZSAke2Vyci5zdGF0dXN9LCBib2R5IHdhczogJHtlcnIuZXJyb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5qc29ucFJlcXVlc3RFcnJvci5lbWl0KGVycik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRGaWx0ZXJzIHtcbiAgICBjaGFuZ2VzOiBTdWJqZWN0PGFueT47XG4gICAgZmlsdGVyT2JqZWN0PzogYW55O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRQYWdlT3B0aW9ucyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgaW5kZXg/OiBudW1iZXI7XG4gICAgb3B0aW9ucz86IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEBuYW1lIEtpbmliaW5kTW9kZWxcbiAqIEBkb2NUeXBlIE1vZGVsXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB0aGUgTW9kZWwgdGhhdCBub2pzLWJpbmQsIG5vanMtZmlsdGVyLCBub2pzLXBhZ2luYXRvciwgYW5kIG5vanMtZmlsdGVyLWVsZW1lbnQgYmluZCB0by4gSXQgcHJvdmlkZXMgYSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgZm9yIGVhY2ggb2YgdGhlc2Ugbm9qcyBjb21wb25lbnRzIHRvIG1hbmFnZSB0aGVpciBvd24gc3RhdGUgYW5kIGRhdGEgaGFuZGxpbmcuXG4gKiBAdGVtcGxhdGVEYXRhIG1lbWJlckRhdGFcbiAqXG4gKiBAbWVtYmVycy1yZXN1bHRzLXR5cGUgcHJvcGVydHk6IGFueVtdXG4gKiBAbWVtYmVycy1yZXN1bHRzLWRlc2NyaXB0aW9uIFRoaXMgcHJvcGVydHkgd2lsbCBiZSBwb3B1bGF0ZWQgaW4gdGhlIGV2ZW50IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc2VydmljZSBjYWxsIGFyZSBpbiBhcnJheSBmb3JtLlxuICogQG1lbWJlcnMtcmVzdWx0cy1kZWZhdWx0VmFsdWUgQXJyYXlcbiAqIEBtZW1iZXJzLWl0ZW0tdHlwZSBwcm9wZXJ0eTogYW55XG4gKiBAbWVtYmVycy1pdGVtLWRlc2NyaXB0aW9uIFRoaXMgcHJvcGVydHkgd2lsbCBiZSBwb3B1bGF0ZWQgd2hlbiB0aGUgcmV0dXJuaW5nIHZhbHVlIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBpcyBpbiBvYmplY3QgZm9ybS5cbiAqIEBtZW1iZXJzLWl0ZW0tZGVmYXVsdFZhbHVlIE9iamVjdFxuICogQG1lbWJlcnMtdG90YWxDb3VudC10eXBlIHByb3BlcnR5OiBudW1iZXJcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtZGVzY3JpcHRpb24gQ291bnQgb2YgdGhlIHRvdGFsIHJlc3VsdHNcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtZGVmYXVsdFZhbHVlIDBcbiAqIEBtZW1iZXJzLW9mZnNldC10eXBlIHByb3BlcnR5OiBudW1iZXJcbiAqIEBtZW1iZXJzLW9mZnNldC1kZXNjcmlwdGlvbiBXaGVuIGxpbWl0aW5nIHJlc3VsdHMgcmV0dXJuZWQgZnJvbSBzZXJ2ZXIgdGhpcyB2YWx1ZXMgc3RvcmUgdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICogQG1lbWJlcnMtb2Zmc2V0LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1maWx0ZXJzLXR5cGUgcHJvcGVydHk6IE5vanNGaWx0ZXJzXG4gKiBAbWVtYmVycy1maWx0ZXJzLWRlc2NyaXB0aW9uIFRoaXMgb2JqZWN0IHN0b3JlcyB0aGUgY3VycmVudCBmaWx0ZXIgdmFsdWVzIHVzZWQgZm9yIGZpbHRlcmluZyByZXN1bHRzIG9uIHRoZSBzZXJ2ZXIuXG4gKiBAbWVtYmVycy1maWx0ZXJzLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgZmlsdGVyT2JqZWN0OiB7fSB9XG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy10eXBlIHByb3BlcnR5OiBOb2pzUGFnZU9wdGlvbnNcbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlc2NyaXB0aW9uIFRoaXMgb2JqZWN0IHN0b3JlcyB0aGUgdmFsdWVzIHVzZWQgdG8gcGFnZSB0aGUgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtZGVmYXVsdFZhbHVlIHsgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLCBzaXplOiAxMCwgaW5kZXg6IDAsIG9wdGlvbnM6IFsxMCwgMjUsIDUwLCAxMDBdIH1cbiAqIEBtZW1iZXJzLXNldFBhZ2VPcHRpb25zLXR5cGUgbWV0aG9kXG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBwYWdpbmcgcmVzdWx0cyBuZWVkIHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBTaW1wbHkgY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIE5vanNCaW5kTW9kZWwgdG8gbWFrZSB1c2Ugb2YgdGhpcyBvYmplY3QuXG4gKiBjb25zdCBiaW5kTW9kZWwgPSBuZXcgTm9qc0JpbmRNb2RlbCgpO1xuICovXG5leHBvcnQgY2xhc3MgS2luaWJpbmRNb2RlbCB7XG5cbiAgICBwdWJsaWMgcmVzdWx0czogYW55W107XG4gICAgcHVibGljIGl0ZW06IGFueTtcbiAgICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgICBwdWJsaWMgdG90YWxDb3VudDogbnVtYmVyO1xuICAgIHB1YmxpYyBvZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZmlsdGVyczogS2luaWJpbmRGaWx0ZXJzO1xuICAgIHB1YmxpYyBwYWdlT3B0aW9uczogS2luaWJpbmRQYWdlT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMuaXRlbSA9IHt9O1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcbiAgICAgICAgICAgIGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSxcbiAgICAgICAgICAgIGZpbHRlck9iamVjdDoge31cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSxcbiAgICAgICAgICAgIHNpemU6IGxpbWl0LFxuICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQYWdlT3B0aW9ucyhwYWdlU2l6ZSwgcGFnZUluZGV4KSB7XG4gICAgICAgIHRoaXMucGFnZU9wdGlvbnMuc2l6ZSA9IHBhZ2VTaXplO1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLmluZGV4ID0gcGFnZUluZGV4O1xuICAgICAgICB0aGlzLm9mZnNldCA9IHBhZ2VTaXplICogcGFnZUluZGV4O1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBCaW5kXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgbm9qcy1iaW5kXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gVGhlIE5vSlMgQmluZCBEaXJlY3RpdmUgYWxsb3dzIGZvciByYXBpZCBiaW5kaW5nIG9mIGEgSlNPTiBkYXRhIHNvdXJjZSB0byBhIG1vZGVsLiBUaGlzIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBmb3IgZHJhd2luZyBsaXN0cyBvZiBkYXRhLCB3aGVyZSB0aGUgZGF0YSBkb2VzIG5vdCBjaGFuZ2UgYXMgdGhlIHJlc3VsdCBvZiB1c2VyIGlucHV0LiBIb3dldmVyLCB0aGlzIGNhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggbm9qc0JpbmRTYXZlIHRvIHNlbmQgYW55IG1vZGVsIGNoYW5nZXMgYmFjayB0byB0aGUgc2VydmVyLiBJZiB5b3UgYXJlIGxvb2tpbmcgdG8gaW1wbGVtZW50IEZvcm0gYmVoYXZpb3VyLCB0aGVuIHVzZSBub2pzRm9ybS5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBsb2FkIHRoZSBkYXRhIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgdXNlZCB0byBzZW5kIGJhY2sgdG8gdGhlIHNlcnZlciBpbiB0aGUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXR5cGUgT2JqZWN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgb25jZSB0aGUgZGF0YSBoYXMgYmVlbiBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgaW4gdGhlIHNjZW5hcmlvIHdoZXJlIHRoZXJlIGlzIGFuIGVycm9yIGxvYWRpbmcgdGhlIGRhdGEuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSA8bm9qcy1iaW5kPiB0YWdcbiAqIDxub2pzLWJpbmQgc291cmNlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9yZXN1bHRzLmpzb25cIiBbc291cmNlUGFyYW1zXT1cInt1c2VySWQ6IDEwMH1cIlxuICogICBbbW9kZWxdPVwiZGF0YVwiPlxuICpcbiAqICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhLnJlc3VsdHNcIj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uaWR9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57aXRlbS5uYW1lfX08L3NwYW4+XG4gKiAgICAgPHNwYW4+e3tpdGVtLmRhdGV9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uYWRkcmVzc319PC9zcGFuPlxuICogICA8L2Rpdj5cbiAqXG4gKiA8L25vanMtYmluZD5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAna2ItYmluZCdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRCaW5kRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdtZXRob2QnKSBtZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZVBhcmFtcycpIHNvdXJjZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnbW9kZWwnKSBkYXRhOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuICAgIEBJbnB1dCgncmVsb2FkVHJpZ2dlcicpIHJlbG9hZFRyaWdnZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCdvbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25Mb2FkRXJyb3InKSBvbkxvYWRFcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSByZWxvYWQgdHJpZ2dlciBsaXN0ZW4gZm9yIGNoYW5nZXMgYW5kIHJlc2V0IHRoZSBkYXRhIG1vZGVsLlxuICAgICAgICB0aGlzLnJlbG9hZFRyaWdnZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMSk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmNoYW5nZXMsIHRoaXMucmVsb2FkVHJpZ2dlcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdHMgJiYgXy5pc0FycmF5KGRhdGEucmVzdWx0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudG90YWxDb3VudCA9IGRhdGEudG90YWxDb3VudCB8fCBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZEVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbSA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5yZXN1bHRzID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5zb3VyY2VQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKCFfLmlzRW1wdHkodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5maWx0ZXJzID0gdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemU7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2UgPSB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMuc291cmNlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMudXJsLCB7cGFyYW1zOiBwb3N0UGFyYW1zfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuLyoqXG4gKiBAbmFtZSBOb0pTIEZpbHRlclxuICogQGRvY1R5cGUgQ29tcG9uZW50XG4gKiBAdGFnIG5vanMtZmlsdGVyXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gRmlsdGVyaW5nIGNvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBmaWx0ZXIgb3B0aW9ucyBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIHNvdXJjZS4gU2VsZWN0aW5nIGFueSBvZiB0aGVzZSBvcHRpb25zIHdpbGwgdXBkYXRlIHRoZSBmaWx0ZXIgb2JqZWN0IGZyb20gW21vZGVsXSB3aGljaCB3aWxsIHRyaWdnZXIgYSBzZXJ2ZXIgc2lkZSBmaWx0ZXIgb2YgdGhlIGRhdGEuXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gY2FsbCB0byByZXRyaWV2ZSB0aGUgZmlsdGVyIG9wdGlvbnMgZnJvbSB0aGUgc2VydmVyLiBSZXR1cm4gZGF0YSBleHBlY3RlZCBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvZmlsdGVycy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSBbe2NvdW50OiAyLCBsYWJlbDogT3B0aW9uMTogdmFsdWU6IDF9LDxicj57Y291bnQ6IDQsIGxhYmVsOiBPcHRpb24yOiB2YWx1ZTogMn1dXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLW11bHRpcGxlLWRlc2NyaXB0aW9uIEFsbG93IG11bHRpcGxlIGZpbHRlciBvcHRpb25zIHRvIGJlIHNlbGVjdGVkIGF0IHRoZSBzYW1lIHRpbWUuXG4gKiBAYXR0cmlidXRlcy1tdWx0aXBsZS10eXBlIEJvb2xlYW5cbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgZGF0YWJhc2UgZmllbGQgdGhhdCB0aGUgZmlsdGVyIHdpbGwgYmUgYXBwbGllZCB0by5cbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc2hvd0NvdW50LWRlc2NyaXB0aW9uIFRvZ2dsZSB0aGF0IHNob3dzIHRoZSBjb3VudCBvZiByZXN1bHRzIGZvciB0aGUgZ2l2ZW4gZmlsdGVyLlxuICogQGF0dHJpYnV0ZXMtc2hvd0NvdW50LXR5cGUgQm9vbGVhblxuICogQGF0dHJpYnV0ZXMtaW5pdGlhbEZpbHRlclZhbHVlcy1kZXNjcmlwdGlvbiBTZXQgZmlsdGVyIHZhbHVlcyB1cG9uIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbi5cbiAqIEBhdHRyaWJ1dGVzLWluaXRpYWxGaWx0ZXJWYWx1ZXMtdHlwZSBKU09OIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtaW5pdGlhbEZpbHRlclZhbHVlcy12YWx1ZSB7c29tZVZhbHVlOiB0cnVlfVxuICpcbiAqIDxub2pzLWZpbHRlciBzb3VyY2U9XCJodHRwczovL3NvbWVzZXJ2aWNlL2ZpbHRlcnMuanNvblwiXG4gKiBbaW5pdGlhbEZpbHRlclZhbHVlc109XCJ7Y29tcGxldGU6IHRydWV9XCJcbiAqIFttb2RlbF09XCJkYXRhXCIgbXVsdGlwbGU9XCJ0cnVlXCIgZmlsdGVyPVwidG90YWxcIiBzaG93Q291bnQ9XCJ0cnVlXCI+XG4gKiA8L25vanMtZmlsdGVyPlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2tiLWZpbHRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBmaWx0ZXJWYWx1ZSBvZiBmaWx0ZXJWYWx1ZXNcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibXVsdGlwbGVcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIChjaGFuZ2UpPVwidXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKVwiLz5cbiAgICAgICAge3tmaWx0ZXJWYWx1ZS5sYWJlbH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50XCI+KHt7ZmlsdGVyVmFsdWUuY291bnR9fSk8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8YSAqbmdJZj1cIiFtdWx0aXBsZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgIFtzdHlsZS5mb250LXdlaWdodF09XCJmaWx0ZXJWYWx1ZS5zZWxlY3RlZCA/ICdib2xkJyA6ICdub3JtYWwnXCIgKGNsaWNrKT1cInVwZGF0ZUZpbHRlcihmaWx0ZXJWYWx1ZSlcIj5cbiAgICAgICAge3tmaWx0ZXJWYWx1ZS5sYWJlbH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50XCI+KHt7ZmlsdGVyVmFsdWUuY291bnR9fSk8L3NwYW4+XG4gICAgPC9hPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NvdXJjZScpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZWwnKSBkYXRhOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnbXVsdGlwbGUnKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3Nob3dDb3VudCcpIHNob3dDb3VudDogYm9vbGVhbjtcbiAgICBASW5wdXQoJ2ZpbHRlcicpIGZpbHRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgnaW5pdGlhbEZpbHRlclZhbHVlcycpIGluaXRpYWxGaWx0ZXJWYWx1ZXM6IGFueTtcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBmaWx0ZXJWYWx1ZXM6IGFueSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbEZpbHRlclZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0ID0gXy5leHRlbmQodGhpcy5pbml0aWFsRmlsdGVyVmFsdWVzLCB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWVzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihmaWx0ZXJPYmplY3QpIHtcbiAgICAgICAgZmlsdGVyT2JqZWN0LnNlbGVjdGVkID0gIWZpbHRlck9iamVjdC5zZWxlY3RlZDtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyT2JqZWN0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0gPSBbZmlsdGVyT2JqZWN0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnB1c2goZmlsdGVyT2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5pbmRleE9mKGZpbHRlck9iamVjdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpbHRlck9iamVjdC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0gPSBmaWx0ZXJPYmplY3QudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCk7XG4gICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoZmlsdGVycyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHtcbiAgICAgICAgICAgIHNlZWRDb2x1bW46IHRoaXMuZmlsdGVyLFxuICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyc1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QodGhpcy51cmwsIHBvc3RQYXJhbXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuXG4vKipcbiAqIEBuYW1lIE5vSlMgRmlsdGVyIEVsZW1lbnRcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBbbm9qc0ZpbHRlckVsZW1lbnRdXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gQWxsb3cgZm9yIGFuIGlucHV0IGVsZW1lbnQgdG8gcGVyZm9ybSBjdXN0b20gZmlsdGVyaW5nIG9uIHRoZSBhc3NvY2lhdGVkIGJvdW5kIGRhdGEuXG4gKlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBkYXRhXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHR5cGUgb2YgZmlsdGVyaW5nIGFwcGxpZWQgdG8gdGhpcyBlbGVtZW50LiAoQ3VycmVudGx5IG9ubHkgJ3NlYXJjaCcgaXMgc3VwcG9ydGVkKVxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1wcmVmaXgtZGVzY3JpcHRpb24gU3BlY2lmeSBhIHByZWZpeCB0byBhcHBseSB0byB0aGUgZmlsdGVyXG4gKiBAYXR0cmlidXRlcy1wcmVmaXgtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN1ZmZpeC1kZXNyaXB0aW9uIFNwZWNpZnkgYSBzdWZmaXggdG8gYXBwbHkgdG8gdGhlIGZpbHRlclxuICogQGF0dHJpYnV0ZXMtc3VmZml4LXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1jb2x1bW5zLWRlc2NyaXB0aW9uIFNwZWNpZnkgdGhlIGNvbHVtbnMgaW4gdGhlIHRhYmxlIHRoYXQgdGhpcyBmaWx0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLiAoY29tbWEgc2VwYXJhdGVkIGxpc3QgJ2lkLG5hbWUsZGVzY3JpcHRpb24nKVxuICogQGF0dHJpYnV0ZXMtY29sdW1ucy10eXBlIFN0cmluZ1xuICpcbiAqXG4gKiA8aW5wdXQgdHlwZT0ndGV4dCcgI2VsZW1lbnQgZmlsdGVyRWxlbWVudCBbbW9kZWxdPSdkYXRhJyBmaWx0ZXI9J3NlYXJjaCdcbiAqIGNvbHVtbnM9J2lkLGJ1eWVyX25hbWUnIHByZWZpeD0nKicgc3VmZml4PScqJyBwbGFjZWhvbGRlcj0nU2VhcmNoIE9yZGVycyc+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiRmlsdGVyRWxlbWVudF0nLFxuICAgIGV4cG9ydEFzOiAnZmlsdGVyRWxlbWVudCdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgnbW9kZWwnKSBkYXRhOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnZmlsdGVyJykgZmlsdGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCdwcmVmaXgnKSBwcmVmaXg6IHN0cmluZztcbiAgICBASW5wdXQoJ3N1ZmZpeCcpIHN1ZmZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgnY29sdW1ucycpIGNvbHVtbnM6IHN0cmluZztcbiAgICBASW5wdXQoJ2ZpbHRlckNsYXNzJykgZmlsdGVyQ2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoJ21vZGUnKSBtb2RlOiBzdHJpbmc7XG4gICAgQElucHV0KCdkYXRlRm9ybWF0JykgZGF0ZUZvcm1hdDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBleHBvc2VkIHRvIHRoZSBlbGVtZW50IHdlIGFyZSBhdHRhY2hlZCB0byBhcyBhIHRlbXBsYXRlIHZhcmlhYmxlLFxuICAgICAqIHNvIHRoYXQgd2UgY2FuIHVwZGF0ZSB0aGUgZmlsdGVycyB3aXRoIHRoZSBuZXcgZmlsdGVyIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZpbHRlclZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihmaWx0ZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdEZpbHRlck9iamVjdChmaWx0ZXJWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RGaWx0ZXJPYmplY3QoZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IGZpbHRlclZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlZml4KSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnByZWZpeCArIG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdWZmaXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlICsgdGhpcy5zdWZmaXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0gPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgIGZpbHRlckNvbHVtbnM6IHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5zcGxpdCgnLCcpIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmZpbHRlck1vZGUgPSB0aGlzLm1vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmZpbHRlckRhdGVGb3JtYXQgPSB0aGlzLmRhdGVGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqXG4gKiBAbmFtZSBOb0pTIEJpbmQgU2F2ZVxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzQmluZFNhdmVdXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gVGhlIE5vSlMgQmluZCBTYXZlIERpcmVjdGl2ZSBhbGxvd3MgZm9yIHNpbXBsZSBzYXZpbmcgb2YgZGF0YSBiYWNrIHRvIHRoZSBzZXJ2ZXIuIFRoaXMgd2lsbCByZXR1cm4gdGhlIHVwZGF0ZWQgY29udGVudHMgb2YgZWl0aGVyIHRoZSBOb2pzQmluZE1vZGVsLnJlc3VsdHMgYXJyYXkgb3IgdGhlIE5vanNCaW5kTW9kZWwuaXRlbSBvYmplY3QgdG8gdGhlIHNlcnZlciBmb3IgcHJvY2Vzc2luZy5cbiAqXG4gKiBAYXR0cmlidXRlcy1zdG9yZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHdoZXJlIG9mIHRoZSBzZXJ2ZXIgd2hlcmUgdGhlIGRhdGEgc2hvdWxkIGJlIHNlbnQgZm9yIHByb2Nlc3NpbmcuXG4gKiBAYXR0cmlidXRlcy1zdG9yZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtZGVzY3JpcHRpb24gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHRvIHNlbmQgYmFjayB0byB0aGUgc2VydmVyIHdpdGggdGhlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHNlbmQgdGhlIGRhdGEgYmFjayB3aXRoLlxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBkYXRhXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLWRlc2NyaXB0aW9uIFRoZSByb3V0ZSB0byBuYXZpZ2F0ZSB0byBvbmNlIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgcmV0dXJucyBzdWNjZXNzZnVsLlxuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgc2F2ZSBzdWNjZXNzZnVsbHkgY29tcGxldGVzXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGVycm9yIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZpY2UgY2FsbC5cbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItdHlwZSBtZXRob2RcbiAqXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBBZGQgdGhlIG5vanNCaW5kU2F2ZSBhdHRyaWJ1dGUgdG8gYW55IGVsZW1lbnQuIFRoZSBhc3NvY2lhdGVkIGNsaWNrIGV2ZW50IG9uIHRoYXQgZWxlbWVudCB3aWxsIGNhdXNlIHRoZSBkYXRhIHRvIHNhdmUuXG4gKiA8YnV0dG9uIG5vanNCaW5kU2F2ZSBzdG9yZT1cImh0dHBzOi8vc29tZXNlcnZpY2Uvc2F2ZVwiIHN0b3JlT2JqZWN0UGFyYW09XCJvcmRlcnNcIiBbbW9kZWxdPVwiZGF0YVwiXG4gKiAgIFtzdG9yZVBhcmFtc109XCJ7dXNlcklkOiAyMDB9XCIgc2F2ZWRSb3V0ZT1cIi92aWV3cy91c2Vyc1wiXG4gKiAgIChvblNhdmUpPVwiY2FsbE1lT25TYXZlKClcIiAob25FcnJvcik9XCJkb1NvbWV0aGluZygpXCI+XG4gKiAgIFNhdmVcbiAqIDwvYnV0dG9uPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JTYXZlXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRTYXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnbW9kZWwnKSBtb2RlbDogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3N0b3JlJykgc3RvcmVVUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc2F2ZWRSb3V0ZScpIHNhdmVkUm91dGU6IHN0cmluZztcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoJ29uU2F2ZScpIG9uU2F2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnb25FcnJvcicpIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmUoKSB7XG4gICAgICAgIGxldCBwb3N0UGFyYW1zOiBhbnk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLm1vZGVsLnJlc3VsdHM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWwuaXRlbSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLm1vZGVsLml0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCB8fCAnUE9TVCc7XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnN0b3JlVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwb3N0UGFyYW1zXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc2F2ZWRSb3V0ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlLmVtaXQoeyByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqXG4gKiBAbmFtZSBOb0pTIEZvcm1cbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBbbm9qc0Zvcm1dXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gVGhlIE5vanMgRm9ybSBkaXJlY3RpdmUgYWxsb3dzIGZvciBkYXRhIHRvIHNvdXJjZWQgZnJvbSBhIFVSTCBhbmQgYm91bmQgdG8gYSBtb2RlbCwgd2hpY2ggY2FuIHRoZW4gYmUgdXNlZCB0byBiaW5kIHRvIGZvcm0gY29tcG9uZW50cy4gQWRkaXRpb25hbCBmb3JtIHZhbGlkYXRpb24gY2FuIGJlIGFkZGVkIHRvIHRoZSBmb3JtIGlucHV0cy4gSW4gb3JkZXIgdG8gc2F2ZSBkYXRhIGJhY2sgdG8gdGhlIHNlcnZlciwgYSBzdG9yZSBVUkwgYW5kIHN1Ym1pdCBidXR0b24gbmVlZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZm9ybSBtYXJrdXAuXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gbG9hZCB0aGUgZGF0YSBhc3luY2hyb25vdXNseS4gRGF0YSBzaG91bGQgYmUgcmV0dXJuZWQgaW4gSlNPTiBmb3JtYXQgYXMgZWl0aGVyOlxuICogQGF0dHJpYnV0ZXMtc291cmNlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdmFsdWUgaHR0cHM6Ly9zb21lc2VydmljZS9yZXN1bHRzLmpzb25cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1jb2RlIHtpZDogMSwgbmFtZTogdGVzdGluZ30gT1I8YnI+W3tpZDogMSwgbmFtZTogdGVzdDF9LCB7aWQ6IDIsIG5hbWU6IHRlc3QyfV0gT1I8YnI+e3Jlc3VsdHM6IFt7aWQ6IDEuLi59LCB7aWQ6IDIuLi59XSwgdG90YWxDb3VudDogMn1cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy1kZXNjcmlwdGlvbiBQYXJhbWV0ZXJzIG9iamVjdCB0byBzZW5kIHdpdGggdGhlIFNvdXJjZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdHlwZSBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBkYXRhXG4gKiBAYXR0cmlidXRlcy1zdG9yZS1kZXNjcmlwdGlvbiBUaGUgdXJsIHRvIHNlbmQgYW55IGRpcnR5IGRhdGEgYmFjayB0byB0aGUgc2VydmVyIGZvciBwcm9jZXNzaW5nLlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgb2JqZWN0IHRvIHNlbmQgd2l0aCB0aGUgU3RvcmUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdHlwZSBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gc2VuZCB0aGUgZGF0YSBiYWNrIHdpdGguXG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLWRlc2NyaXB0aW9uIFRoZSByb3V0ZSB0byBuYXZpZ2F0ZSB0byBvbmNlIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgcmV0dXJucyBzdWNjZXNzZnVsLlxuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtZGlydHlPbmx5LWRlc2NyaXB0aW9uIEluIHRoZSBjYXNlIHdoZXJlIGFuIGFycmF5IG9mIG9iamVjdHMgYXJlIGJlaW5nIGVkaXRlZCwgb25seSBzZW5kIGJhY2sgdGhlIG9iamVjdHMgd2hlcmUgY29udGFpbmluZyBmaWVsZHMgaGF2ZSBiZWVuIGNoYW5nZWQuXG4gKiBAYXR0cmlidXRlcy1kaXJ0eU9ubHktdHlwZSBCb29sZWFuIChkZWZhdWx0IGZhbHNlKVxuICogQGF0dHJpYnV0ZXMtb25Mb2FkLWRlc2NyaXB0aW9uIEV2ZW50IHJhaXNlZCBvbmNlIHRoZSBkYXRhIGhhcyBiZWVuIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLWRlc2NyaXB0aW9uIEV2ZW50IHJhaXNlZCBpbiB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlcmUgaXMgYW4gZXJyb3IgbG9hZGluZyB0aGUgZGF0YS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBzYXZlIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZXNcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25FcnJvci1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3IgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmljZSBjYWxsLlxuICogQGF0dHJpYnV0ZXMtb25FcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIFRoaXMgYXR0cmlidXRlIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBhIDxmb3JtPiBlbGVtZW50LlxuICogPGZvcm0gbm9qc0Zvcm0gW21vZGVsXT1cImRhdGFcIiBzb3VyY2U9XCIvUE9TVC9Tb21lc2VydmljZS9nZXRPcmRlckRhdGFcIlxuICogICBbc291cmNlUGFyYW1zXT1cIntvcmRlcklkOiAzN31cIiBzdG9yZT1cIi9QT1NUL1NvbWVzZXJ2aWNlL3NhdmVPcmRlcnNcIlxuICogICBzdG9yZU9iamVjdFBhcmFtPVwib3JkZXJzXCIgc2F2ZWRSb3V0ZT1cIi9ub2pzLWNvcmVcIj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+SUQ8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaWRcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS5pZFwiIHJlcXVpcmVkPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlN0YXR1czwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzdGF0dXNcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS5zdGF0dXNcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5TdWJ0b3RhbDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzdWJ0b3RhbFwiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnN1YnRvdGFsXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+VGF4ZXM8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGF4ZXNcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS50YXhlc1wiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlRvdGFsPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRvdGFsXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0udG90YWxcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAqIDwvZm9ybT5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiRm9ybV0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NvdXJjZScpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc291cmNlTWV0aG9kJykgc291cmNlTWV0aG9kOiBzdHJpbmc7XG4gICAgQElucHV0KCdzb3VyY2VQYXJhbXMnKSBzb3VyY2VQYXJhbXM6IGFueTtcbiAgICBASW5wdXQoJ21vZGVsJykgZGF0YTogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3N0b3JlJykgc3RvcmVVUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ3N0b3JlTWV0aG9kJykgc3RvcmVNZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ3NhdmVkUm91dGUnKSBzYXZlZFJvdXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCdkaXJ0eU9ubHknKSBkaXJ0eU9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCdvbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25Mb2FkRXJyb3InKSBvbkxvYWRFcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdvblNhdmUnKSBvblNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uRXJyb3InKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdGb3JtOiBOZ0Zvcm0sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFNvdXJjZURhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0U2F2ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTb3VyY2VEYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXggPSAwKTtcblxuICAgICAgICBtZXJnZSh0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLCB0aGlzLmRhdGEucGFnZU9wdGlvbnMuY2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdHMgJiYgXy5pc0FycmF5KGRhdGEucmVzdWx0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudG90YWxDb3VudCA9IGRhdGEudG90YWxDb3VudCB8fCBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRFcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pdGVtID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnJlc3VsdHMgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB0aGlzLnNvdXJjZVBhcmFtcyB8fCB7fTtcblxuICAgICAgICBpZiAoIV8uaXNFbXB0eSh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLmZpbHRlcnMgPSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemUpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLmRhdGEucGFnZU9wdGlvbnMuc2l6ZTtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZSA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMuc291cmNlTWV0aG9kID8gdGhpcy5zb3VyY2VNZXRob2QgOiAodGhpcy5zb3VyY2VQYXJhbXMgPyAnUE9TVCcgOiAnR0VUJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy51cmwsIHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5zb3VyY2VQYXJhbXMsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNhdmVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5zdG9yZVVSTCkge1xuICAgICAgICAgICAgdGhpcy5uZ0Zvcm0ubmdTdWJtaXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJ0eU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcnR5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2godGhpcy5uZ0Zvcm0uZm9ybS5jb250cm9scywgKGNvbnRyb2wsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnR5LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJ0eS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YShkaXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLml0ZW0gJiYgdGhpcy5uZ0Zvcm0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlRGF0YShkaXJ0eT8pIHtcbiAgICAgICAgbGV0IHBvc3RQYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoZGlydHkpIHtcblxuICAgICAgICAgICAgY29uc3QgZGlydHlPYmplY3RzID0gW107XG5cbiAgICAgICAgICAgIGRpcnR5LmZvckVhY2goZGlydHlLZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0S2V5ID0gZGlydHlLZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJ0eUluZGV4ID0gXy5maW5kKHNwbGl0S2V5LCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzTmFOKE51bWJlcihrZXkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkaXJ0eU9iamVjdHMucHVzaCh0aGlzLmRhdGEucmVzdWx0c1tkaXJ0eUluZGV4XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcG9zdFBhcmFtcyA9IGRpcnR5T2JqZWN0cztcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5kYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtcyA9IHRoaXMuZGF0YS5pdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5zdG9yZU1ldGhvZCA/IHRoaXMuc3RvcmVNZXRob2QgOiAnUE9TVCc7XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnN0b3JlVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhcmFtczogcG9zdFBhcmFtcyxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc2F2ZWRSb3V0ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlLmVtaXQoeyByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hSZWdleFZhbGlkYXRvcihtYXRjaDogUmVnRXhwKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGVkID0gbWF0Y2gudGVzdChjb250cm9sLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuICFtYXRjaGVkID8geydtYXRjaFJlZ2V4Jzoge3ZhbHVlOiBjb250cm9sLnZhbHVlfX0gOiBudWxsO1xuICAgIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiTWF0Y2hSZWdleF0nLFxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTWF0Y2hSZWdleERpcmVjdGl2ZSwgbXVsdGk6IHRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRjaFJlZ2V4RGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBASW5wdXQoJ2tiTWF0Y2hSZWdleCcpIG1hdGNoUmVnZXg6IHN0cmluZztcblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hSZWdleCA/IG1hdGNoUmVnZXhWYWxpZGF0b3IobmV3IFJlZ0V4cCh0aGlzLm1hdGNoUmVnZXgsICdpJykpKGNvbnRyb2wpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufSIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTkdfQVNZTkNfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYlJlbW90ZVZhbGlkYXRlXScsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19BU1lOQ19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgna2JSZW1vdGVWYWxpZGF0ZScpIHJlbW90ZVZhbGlkYXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCdyZW1vdGVPYmplY3RQYXJhbScpIHJlbW90ZU9iamVjdFBhcmFtOiBhbnk7XG4gICAgQElucHV0KCdyZW1vdGVPYmplY3RQYXJhbXMnKSByZW1vdGVPYmplY3RQYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVWYWxpZGF0ZSA/IHRoaXMucmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IodGhpcy5yZW1vdGVWYWxpZGF0ZSkoY29udHJvbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW90ZVZhbGlkYXRlVmFsaWRhdG9yKHJlbW90ZVVSTDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnJlbW90ZU9iamVjdFBhcmFtc1t0aGlzLnJlbW90ZU9iamVjdFBhcmFtXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QocmVtb3RlVVJMLCB0aGlzLnJlbW90ZU9iamVjdFBhcmFtcykudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWxpZCA/IHsgJ3JlbW90ZVZhbGlkYXRlJzogZmFsc2UgfSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBBY3Rpb25cbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBub2pzLWFjdGlvblxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgRGlyZWN0aXZlIGFsbG93cyBmb3IgcmFwaWQgYmluZGluZyBvZiBhIEpTT04gZGF0YSBzb3VyY2UgdG8gYSBtb2RlbC4gVGhpcyBzaG91bGQgcHJpbWFyaWx5IGJlIHVzZWQgZm9yIGRyYXdpbmcgbGlzdHMgb2YgZGF0YSwgd2hlcmUgdGhlIGRhdGEgZG9lcyBub3QgY2hhbmdlIGFzIHRoZSByZXN1bHQgb2YgdXNlciBpbnB1dC4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG5vanNCaW5kU2F2ZSB0byBzZW5kIGFueSBtb2RlbCBjaGFuZ2VzIGJhY2sgdG8gdGhlIHNlcnZlci4gSWYgeW91IGFyZSBsb29raW5nIHRvIGltcGxlbWVudCBGb3JtIGJlaGF2aW91ciwgdGhlbiB1c2Ugbm9qc0Zvcm0uXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiQWN0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdhY3Rpb25VUkwnKSBhY3Rpb25VUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnYWN0aW9uUGFyYW1zJykgYWN0aW9uUGFyYW1zOiBhbnk7XG5cbiAgICBAT3V0cHV0KCdzdGFydGVkJykgc3RhcnRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdjb21wbGV0ZWQnKSBjb21wbGV0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnZXJyb3InKSBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja0V2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQuZW1pdCh0cnVlKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMuYWN0aW9uUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy5hY3Rpb25VUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmFjdGlvblBhcmFtc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEtpbmliaW5kQmluZERpcmVjdGl2ZSB9IGZyb20gJy4vYmluZC9raW5pYmluZC1iaW5kLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9maWx0ZXItZWxlbWVudC9raW5pYmluZC1maWx0ZXItZWxlbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudEpzb25wTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgS2luaWJpbmRTYXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9iaW5kLXNhdmUva2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLaW5pYmluZEZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0Y2hSZWdleERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWRhdG9ycy9tYXRjaC1yZWdleC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZGF0b3JzL3JlbW90ZS12YWxpZGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2FjdGlvbi9raW5pYmluZC1hY3Rpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudEpzb25wTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgS2luaWJpbmRCaW5kRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2luaWJpbmRTYXZlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRm9ybURpcmVjdGl2ZSxcbiAgICAgICAgTWF0Y2hSZWdleERpcmVjdGl2ZSxcbiAgICAgICAgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBLaW5pYmluZEJpbmREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGb3JtRGlyZWN0aXZlLFxuICAgICAgICBNYXRjaFJlZ2V4RGlyZWN0aXZlLFxuICAgICAgICBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgS2luaWJpbmRSZXF1ZXN0U2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdLaW5pYmluZE1vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiXy5pc1BsYWluT2JqZWN0IiwiXy5pc0FycmF5IiwiXy5pc0VtcHR5IiwiXy5leHRlbmQiLCJvYnNlcnZhYmxlT2YiLCJfLmZvckVhY2giLCJfLmZpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQVVJLGdDQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztLQUNsRTs7Ozs7OztJQUVNLDRDQUFXOzs7Ozs7Y0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztJQUc1QyxnREFBZTs7Ozs7O2NBQUMsR0FBVyxFQUFFLE1BQVcsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQzlELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztJQUd6QywrQ0FB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