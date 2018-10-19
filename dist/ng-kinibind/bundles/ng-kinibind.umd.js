(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('@angular/router'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-kinibind', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', 'lodash', '@angular/router', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-kinibind'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,null,global.ng.router,global.ng.forms,global.ng.common));
}(this, (function (exports,core,http,rxjs,operators,_,router,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var KinibindRequestService = (function () {
        function KinibindRequestService(http$$1) {
            this.http = http$$1;
            this.jsonpRequestError = new core.EventEmitter();
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
                if (options === void 0) {
                    options = {};
                }
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
                if (options === void 0) {
                    options = {};
                }
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
                if (options === void 0) {
                    options = {};
                }
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
                var headers = new http.HttpHeaders({ 'Content-Type': 'application/json' });
                /** @type {?} */
                var options = { headers: headers };
                // Set callback param for the JSONP request.
                params.callback = 'JSONP_CALLBACK';
                options.params = params;
                return this.http.request('jsonp', url, options)
                    .pipe(operators.map(function (data) {
                    return data;
                }), operators.catchError(function (err) {
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
                    return rxjs.EMPTY;
                }));
            };
        KinibindRequestService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        KinibindRequestService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return KinibindRequestService;
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
    var KinibindBindDirective = (function () {
        function KinibindBindDirective(http$$1, kbRequest) {
            this.http = http$$1;
            this.kbRequest = kbRequest;
            this.reloadTrigger = new core.EventEmitter();
            this.onLoad = new core.EventEmitter();
            this.onLoadError = new core.EventEmitter();
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
                rxjs.merge(this.data.filters.changes, this.data.pageOptions.changes, this.reloadTrigger)
                    .pipe(operators.startWith({}), operators.switchMap(function () {
                    return _this.getData();
                }), operators.map(function (data) {
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
                    else {
                        return data;
                    }
                }), operators.catchError(function (error) {
                    _this.onLoadError.emit(error);
                    return rxjs.of([]);
                })).subscribe(function (data) {
                    if (_.isPlainObject(data)) {
                        _this.data.item = data;
                    }
                    else if (_.isArray(data)) {
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
                if (!_.isEmpty(this.data.filters.filterObject)) {
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
            { type: core.Directive, args: [{
                        selector: 'kb-bind'
                    },] },
        ];
        /** @nocollapse */
        KinibindBindDirective.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: KinibindRequestService }
            ];
        };
        KinibindBindDirective.propDecorators = {
            url: [{ type: core.Input, args: ['source',] }],
            method: [{ type: core.Input, args: ['method',] }],
            sourceParams: [{ type: core.Input, args: ['sourceParams',] }],
            data: [{ type: core.Input, args: ['model',] }],
            withCredentials: [{ type: core.Input, args: ['withCredentials',] }],
            reloadTrigger: [{ type: core.Input, args: ['reloadTrigger',] }],
            onLoad: [{ type: core.Output, args: ['onLoad',] }],
            onLoadError: [{ type: core.Output, args: ['onLoadError',] }]
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
    var KinibindFilterComponent = (function () {
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
                    this.data.filters.filterObject = _.extend(this.initialFilterValues, this.data.filters.filterObject);
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
            { type: core.Component, args: [{
                        selector: 'kb-filter',
                        template: "<div *ngFor=\"let filterValue of filterValues\">\n    <div *ngIf=\"multiple\">\n        <input type=\"checkbox\" (change)=\"updateFilter(filterValue)\"/>\n        {{filterValue.label}}\n        <span *ngIf=\"showCount\">({{filterValue.count}})</span>\n    </div>\n\n    <a *ngIf=\"!multiple\" href=\"javascript:void(0)\"\n       [style.font-weight]=\"filterValue.selected ? 'bold' : 'normal'\" (click)=\"updateFilter(filterValue)\">\n        {{filterValue.label}}\n        <span *ngIf=\"showCount\">({{filterValue.count}})</span>\n    </a>\n</div>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        KinibindFilterComponent.ctorParameters = function () {
            return [
                { type: KinibindRequestService }
            ];
        };
        KinibindFilterComponent.propDecorators = {
            url: [{ type: core.Input, args: ['source',] }],
            data: [{ type: core.Input, args: ['model',] }],
            multiple: [{ type: core.Input, args: ['multiple',] }],
            showCount: [{ type: core.Input, args: ['showCount',] }],
            filter: [{ type: core.Input, args: ['filter',] }],
            initialFilterValues: [{ type: core.Input, args: ['initialFilterValues',] }],
            withCredentials: [{ type: core.Input, args: ['withCredentials',] }]
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
    var KinibindFilterElementDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: '[kbFilterElement]',
                        exportAs: 'filterElement'
                    },] },
        ];
        /** @nocollapse */
        KinibindFilterElementDirective.ctorParameters = function () { return []; };
        KinibindFilterElementDirective.propDecorators = {
            data: [{ type: core.Input, args: ['model',] }],
            filter: [{ type: core.Input, args: ['filter',] }],
            prefix: [{ type: core.Input, args: ['prefix',] }],
            suffix: [{ type: core.Input, args: ['suffix',] }],
            columns: [{ type: core.Input, args: ['columns',] }],
            filterClass: [{ type: core.Input, args: ['filterClass',] }],
            mode: [{ type: core.Input, args: ['mode',] }],
            dateFormat: [{ type: core.Input, args: ['dateFormat',] }]
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
    var KinibindSaveDirective = (function () {
        function KinibindSaveDirective(http$$1, router$$1, kbRequest) {
            this.http = http$$1;
            this.router = router$$1;
            this.kbRequest = kbRequest;
            this.onSave = new core.EventEmitter();
            this.onError = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[kbSave]'
                    },] },
        ];
        /** @nocollapse */
        KinibindSaveDirective.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: router.Router },
                { type: KinibindRequestService }
            ];
        };
        KinibindSaveDirective.propDecorators = {
            model: [{ type: core.Input, args: ['model',] }],
            storeURL: [{ type: core.Input, args: ['store',] }],
            method: [{ type: core.Input, args: ['method',] }],
            savedRoute: [{ type: core.Input, args: ['savedRoute',] }],
            withCredentials: [{ type: core.Input, args: ['withCredentials',] }],
            onSave: [{ type: core.Output, args: ['onSave',] }],
            onError: [{ type: core.Output, args: ['onError',] }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }]
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
    var KinibindFormDirective = (function () {
        function KinibindFormDirective(ngForm, router$$1, kbRequest) {
            this.ngForm = ngForm;
            this.router = router$$1;
            this.kbRequest = kbRequest;
            this.onLoad = new core.EventEmitter();
            this.onLoadError = new core.EventEmitter();
            this.onSave = new core.EventEmitter();
            this.onError = new core.EventEmitter();
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
                rxjs.merge(this.data.filters.changes, this.data.pageOptions.changes)
                    .pipe(operators.startWith({}), operators.switchMap(function () {
                    return _this.getData();
                }), operators.map(function (data) {
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
                }), operators.catchError(function (error) {
                    _this.onLoadError.emit(error);
                    return rxjs.of([]);
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
            { type: core.Directive, args: [{
                        selector: '[kbForm]'
                    },] },
        ];
        /** @nocollapse */
        KinibindFormDirective.ctorParameters = function () {
            return [
                { type: forms.NgForm },
                { type: router.Router },
                { type: KinibindRequestService }
            ];
        };
        KinibindFormDirective.propDecorators = {
            url: [{ type: core.Input, args: ['source',] }],
            sourceMethod: [{ type: core.Input, args: ['sourceMethod',] }],
            sourceParams: [{ type: core.Input, args: ['sourceParams',] }],
            data: [{ type: core.Input, args: ['model',] }],
            storeURL: [{ type: core.Input, args: ['store',] }],
            storeMethod: [{ type: core.Input, args: ['storeMethod',] }],
            savedRoute: [{ type: core.Input, args: ['savedRoute',] }],
            dirtyOnly: [{ type: core.Input, args: ['dirtyOnly',] }],
            withCredentials: [{ type: core.Input, args: ['withCredentials',] }],
            onLoad: [{ type: core.Output, args: ['onLoad',] }],
            onLoadError: [{ type: core.Output, args: ['onLoadError',] }],
            onSave: [{ type: core.Output, args: ['onSave',] }],
            onError: [{ type: core.Output, args: ['onError',] }]
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
    var MatchRegexDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: '[kbMatchRegex]',
                        providers: [{ provide: forms.NG_VALIDATORS, useExisting: MatchRegexDirective, multi: true }]
                    },] },
        ];
        MatchRegexDirective.propDecorators = {
            matchRegex: [{ type: core.Input, args: ['kbMatchRegex',] }]
        };
        return MatchRegexDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NojsRemoteValidateDirective = (function () {
        function NojsRemoteValidateDirective(kbRequest) {
            this.kbRequest = kbRequest;
            this.withCredentials = false;
            this.remoteParams = {};
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
                    if (control.value) {
                        /** @type {?} */
                        var method = _this.method ? _this.method : (_this.remoteParams ? 'POST' : 'GET');
                        /** @type {?} */
                        var url = void 0;
                        if (remoteURL.includes('?')) {
                            url = remoteURL + ("&" + _this.key + "=" + control.value);
                        }
                        else {
                            url = remoteURL + ("?" + _this.key + "=" + control.value);
                        }
                        return _this.kbRequest.makeRequest(method, url, {
                            withCredentials: _this.withCredentials,
                            params: _this.remoteParams
                        }).toPromise()
                            .then(function (valid) {
                            return !valid ? { 'remoteValidate': false } : null;
                        });
                    }
                    return Promise.resolve(null);
                };
            };
        NojsRemoteValidateDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[kbRemoteValidate]',
                        providers: [{ provide: forms.NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
                    },] },
        ];
        /** @nocollapse */
        NojsRemoteValidateDirective.ctorParameters = function () {
            return [
                { type: KinibindRequestService }
            ];
        };
        NojsRemoteValidateDirective.propDecorators = {
            remoteValidate: [{ type: core.Input, args: ['kbRemoteValidate',] }],
            method: [{ type: core.Input, args: ['method',] }],
            key: [{ type: core.Input, args: ['key',] }],
            withCredentials: [{ type: core.Input, args: ['withCredentials',] }],
            remoteParams: [{ type: core.Input, args: ['remoteParams',] }]
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
    var KinibindActionDirective = (function () {
        function KinibindActionDirective(kbRequest) {
            this.kbRequest = kbRequest;
            this.started = new core.EventEmitter();
            this.completed = new core.EventEmitter();
            this.error = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[kbAction]'
                    },] },
        ];
        /** @nocollapse */
        KinibindActionDirective.ctorParameters = function () {
            return [
                { type: KinibindRequestService }
            ];
        };
        KinibindActionDirective.propDecorators = {
            actionURL: [{ type: core.Input, args: ['actionURL',] }],
            method: [{ type: core.Input, args: ['method',] }],
            actionParams: [{ type: core.Input, args: ['actionParams',] }],
            started: [{ type: core.Output, args: ['started',] }],
            completed: [{ type: core.Output, args: ['completed',] }],
            error: [{ type: core.Output, args: ['error',] }],
            clickEvent: [{ type: core.HostListener, args: ['click', ['$event'],] }]
        };
        return KinibindActionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgKinibindModule = (function () {
        function NgKinibindModule() {
        }
        NgKinibindModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule,
                            forms.FormsModule,
                            http.HttpClientJsonpModule
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
    var /**
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
     */ KinibindModel = (function () {
        function KinibindModel(limit, offset) {
            this.results = [];
            this.item = {};
            this.value = '';
            this.totalCount = 0;
            this.offset = offset || 0;
            this.filters = {
                changes: new rxjs.Subject(),
                filterObject: {}
            };
            this.pageOptions = {
                changes: new rxjs.Subject(),
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgKinibindModule = NgKinibindModule;
    exports.KinibindRequestService = KinibindRequestService;
    exports.KinibindModel = KinibindModel;
    exports.ɵh = KinibindActionDirective;
    exports.ɵc = KinibindSaveDirective;
    exports.ɵa = KinibindBindDirective;
    exports.ɵd = KinibindFilterElementDirective;
    exports.ɵb = KinibindFilterComponent;
    exports.ɵe = KinibindFormDirective;
    exports.ɵf = MatchRegexDirective;
    exports.ɵg = NojsRemoteValidateDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1raW5pYmluZC9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9iaW5kL2tpbmliaW5kLWJpbmQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9maWx0ZXIva2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmcta2luaWJpbmQvZmlsdGVyLWVsZW1lbnQva2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9iaW5kLXNhdmUva2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL2Zvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL3ZhbGlkYXRvcnMvbWF0Y2gtcmVnZXguZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC92YWxpZGF0b3JzL3JlbW90ZS12YWxpZGF0ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL2FjdGlvbi9raW5pYmluZC1hY3Rpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9uZy1raW5pYmluZC5tb2R1bGUudHMiLCJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBqc29ucFJlcXVlc3RFcnJvcjogRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZVJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QobWV0aG9kLCB1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlUG9zdFJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogYW55LCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlR2V0UmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZUpzb25wUmVxdWVzdCh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHsgaGVhZGVyczogaGVhZGVycyB9O1xuXG4gICAgICAgIC8vIFNldCBjYWxsYmFjayBwYXJhbSBmb3IgdGhlIEpTT05QIHJlcXVlc3QuXG4gICAgICAgIHBhcmFtcy5jYWxsYmFjayA9ICdKU09OUF9DQUxMQkFDSyc7XG5cbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBwYXJhbXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdqc29ucCcsIHVybCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5waXBlKG1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pLCBjYXRjaEVycm9yKChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBjbGllbnQtc2lkZSBvciBuZXR3b3JrIGVycm9yIG9jY3VycmVkLiBIYW5kbGUgaXQgYWNjb3JkaW5nbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkOicsIGVyci5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYmFja2VuZCByZXR1cm5lZCBhbiB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2UgY29kZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJlc3BvbnNlIGJvZHkgbWF5IGNvbnRhaW4gY2x1ZXMgYXMgdG8gd2hhdCB3ZW50IHdyb25nLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBCYWNrZW5kIHJldHVybmVkIGNvZGUgJHtlcnIuc3RhdHVzfSwgYm9keSB3YXM6ICR7ZXJyLmVycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IuZW1pdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqXG4gKiBAbmFtZSBOb0pTIEJpbmRcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBub2pzLWJpbmRcbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIERpcmVjdGl2ZSBhbGxvd3MgZm9yIHJhcGlkIGJpbmRpbmcgb2YgYSBKU09OIGRhdGEgc291cmNlIHRvIGEgbW9kZWwuIFRoaXMgc2hvdWxkIHByaW1hcmlseSBiZSB1c2VkIGZvciBkcmF3aW5nIGxpc3RzIG9mIGRhdGEsIHdoZXJlIHRoZSBkYXRhIGRvZXMgbm90IGNoYW5nZSBhcyB0aGUgcmVzdWx0IG9mIHVzZXIgaW5wdXQuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBub2pzQmluZFNhdmUgdG8gc2VuZCBhbnkgbW9kZWwgY2hhbmdlcyBiYWNrIHRvIHRoZSBzZXJ2ZXIuIElmIHlvdSBhcmUgbG9va2luZyB0byBpbXBsZW1lbnQgRm9ybSBiZWhhdmlvdXIsIHRoZW4gdXNlIG5vanNGb3JtLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHRvIGxvYWQgdGhlIGRhdGEgYXN5bmNocm9ub3VzbHkuIERhdGEgc2hvdWxkIGJlIHJldHVybmVkIGluIEpTT04gZm9ybWF0IGFzIGVpdGhlcjpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvcmVzdWx0cy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSB7aWQ6IDEsIG5hbWU6IHRlc3Rpbmd9IE9SPGJyPlt7aWQ6IDEsIG5hbWU6IHRlc3QxfSwge2lkOiAyLCBuYW1lOiB0ZXN0Mn1dIE9SPGJyPntyZXN1bHRzOiBbe2lkOiAxLi4ufSwge2lkOiAyLi4ufV0sIHRvdGFsQ291bnQ6IDJ9XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyB1c2VkIHRvIHNlbmQgYmFjayB0byB0aGUgc2VydmVyIGluIHRoZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdHlwZSBPYmplY3QuXG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtb25Mb2FkLWRlc2NyaXB0aW9uIEV2ZW50IHJhaXNlZCBvbmNlIHRoZSBkYXRhIGhhcyBiZWVuIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLWRlc2NyaXB0aW9uIEV2ZW50IHJhaXNlZCBpbiB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlcmUgaXMgYW4gZXJyb3IgbG9hZGluZyB0aGUgZGF0YS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gQ3JlYXRlIGFuIGVsZW1lbnQgdXNpbmcgdGhlIDxub2pzLWJpbmQ+IHRhZ1xuICogPG5vanMtYmluZCBzb3VyY2U9XCJodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblwiIFtzb3VyY2VQYXJhbXNdPVwie3VzZXJJZDogMTAwfVwiXG4gKiAgIFttb2RlbF09XCJkYXRhXCI+XG4gKlxuICogICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGEucmVzdWx0c1wiPlxuICogICAgIDxzcGFuPnt7aXRlbS5pZH19PC9zcGFuPlxuICogICAgIDxzcGFuPntpdGVtLm5hbWV9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uZGF0ZX19PC9zcGFuPlxuICogICAgIDxzcGFuPnt7aXRlbS5hZGRyZXNzfX08L3NwYW4+XG4gKiAgIDwvZGl2PlxuICpcbiAqIDwvbm9qcy1iaW5kPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdrYi1iaW5kJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEJpbmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdzb3VyY2UnKSB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc291cmNlUGFyYW1zJykgc291cmNlUGFyYW1zOiBhbnk7XG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG4gICAgQElucHV0KCdyZWxvYWRUcmlnZ2VyJykgcmVsb2FkVHJpZ2dlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoJ29uTG9hZCcpIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdvbkxvYWRFcnJvcicpIG9uTG9hZEVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHJlbG9hZCB0cmlnZ2VyIGxpc3RlbiBmb3IgY2hhbmdlcyBhbmQgcmVzZXQgdGhlIGRhdGEgbW9kZWwuXG4gICAgICAgIHRoaXMucmVsb2FkVHJpZ2dlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0ID0ge307XG4gICAgICAgICAgICB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXggPSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXggPSAxKTtcblxuICAgICAgICBtZXJnZSh0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLCB0aGlzLmRhdGEucGFnZU9wdGlvbnMuY2hhbmdlcywgdGhpcy5yZWxvYWRUcmlnZ2VyKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBfLmlzQXJyYXkoZGF0YS5yZXN1bHRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS50b3RhbENvdW50ID0gZGF0YS50b3RhbENvdW50IHx8IGRhdGEucmVzdWx0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudG90YWxDb3VudCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pdGVtID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnJlc3VsdHMgPSBkYXRhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEudmFsdWUgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB0aGlzLnNvdXJjZVBhcmFtcyB8fCB7fTtcblxuICAgICAgICBpZiAoIV8uaXNFbXB0eSh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLmZpbHRlcnMgPSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemUpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLmRhdGEucGFnZU9wdGlvbnMuc2l6ZTtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZSA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kID8gdGhpcy5tZXRob2QgOiAodGhpcy5zb3VyY2VQYXJhbXMgPyAnUE9TVCcgOiAnR0VUJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy51cmwsIHtwYXJhbXM6IHBvc3RQYXJhbXN9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBuYW1lIE5vSlMgRmlsdGVyXG4gKiBAZG9jVHlwZSBDb21wb25lbnRcbiAqIEB0YWcgbm9qcy1maWx0ZXJcbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBGaWx0ZXJpbmcgY29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGZpbHRlciBvcHRpb25zIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gc291cmNlLiBTZWxlY3RpbmcgYW55IG9mIHRoZXNlIG9wdGlvbnMgd2lsbCB1cGRhdGUgdGhlIGZpbHRlciBvYmplY3QgZnJvbSBbbW9kZWxdIHdoaWNoIHdpbGwgdHJpZ2dlciBhIHNlcnZlciBzaWRlIGZpbHRlciBvZiB0aGUgZGF0YS5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBjYWxsIHRvIHJldHJpZXZlIHRoZSBmaWx0ZXIgb3B0aW9ucyBmcm9tIHRoZSBzZXJ2ZXIuIFJldHVybiBkYXRhIGV4cGVjdGVkIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICogQGF0dHJpYnV0ZXMtc291cmNlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdmFsdWUgaHR0cHM6Ly9zb21lc2VydmljZS9maWx0ZXJzLmpzb25cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1jb2RlIFt7Y291bnQ6IDIsIGxhYmVsOiBPcHRpb24xOiB2YWx1ZTogMX0sPGJyPntjb3VudDogNCwgbGFiZWw6IE9wdGlvbjI6IHZhbHVlOiAyfV1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtbXVsdGlwbGUtZGVzY3JpcHRpb24gQWxsb3cgbXVsdGlwbGUgZmlsdGVyIG9wdGlvbnMgdG8gYmUgc2VsZWN0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAqIEBhdHRyaWJ1dGVzLW11bHRpcGxlLXR5cGUgQm9vbGVhblxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBkYXRhYmFzZSBmaWVsZCB0aGF0IHRoZSBmaWx0ZXIgd2lsbCBiZSBhcHBsaWVkIHRvLlxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtZGVzY3JpcHRpb24gVG9nZ2xlIHRoYXQgc2hvd3MgdGhlIGNvdW50IG9mIHJlc3VsdHMgZm9yIHRoZSBnaXZlbiBmaWx0ZXIuXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtdHlwZSBCb29sZWFuXG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLWRlc2NyaXB0aW9uIFNldCBmaWx0ZXIgdmFsdWVzIHVwb24gY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICogQGF0dHJpYnV0ZXMtaW5pdGlhbEZpbHRlclZhbHVlcy10eXBlIEpTT04gT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLXZhbHVlIHtzb21lVmFsdWU6IHRydWV9XG4gKlxuICogPG5vanMtZmlsdGVyIHNvdXJjZT1cImh0dHBzOi8vc29tZXNlcnZpY2UvZmlsdGVycy5qc29uXCJcbiAqIFtpbml0aWFsRmlsdGVyVmFsdWVzXT1cIntjb21wbGV0ZTogdHJ1ZX1cIlxuICogW21vZGVsXT1cImRhdGFcIiBtdWx0aXBsZT1cInRydWVcIiBmaWx0ZXI9XCJ0b3RhbFwiIHNob3dDb3VudD1cInRydWVcIj5cbiAqIDwvbm9qcy1maWx0ZXI+XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna2ItZmlsdGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nRm9yPVwibGV0IGZpbHRlclZhbHVlIG9mIGZpbHRlclZhbHVlc1wiPlxuICAgIDxkaXYgKm5nSWY9XCJtdWx0aXBsZVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJ1cGRhdGVGaWx0ZXIoZmlsdGVyVmFsdWUpXCIvPlxuICAgICAgICB7e2ZpbHRlclZhbHVlLmxhYmVsfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRcIj4oe3tmaWx0ZXJWYWx1ZS5jb3VudH19KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxhICpuZ0lmPVwiIW11bHRpcGxlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgW3N0eWxlLmZvbnQtd2VpZ2h0XT1cImZpbHRlclZhbHVlLnNlbGVjdGVkID8gJ2JvbGQnIDogJ25vcm1hbCdcIiAoY2xpY2spPVwidXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKVwiPlxuICAgICAgICB7e2ZpbHRlclZhbHVlLmxhYmVsfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRcIj4oe3tmaWx0ZXJWYWx1ZS5jb3VudH19KTwvc3Bhbj5cbiAgICA8L2E+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdtdWx0aXBsZScpIG11bHRpcGxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgnc2hvd0NvdW50Jykgc2hvd0NvdW50OiBib29sZWFuO1xuICAgIEBJbnB1dCgnZmlsdGVyJykgZmlsdGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCdpbml0aWFsRmlsdGVyVmFsdWVzJykgaW5pdGlhbEZpbHRlclZhbHVlczogYW55O1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgcHVibGljIGZpbHRlclZhbHVlczogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsRmlsdGVyVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QgPSBfLmV4dGVuZCh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMsIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlRmlsdGVyKGZpbHRlck9iamVjdCkge1xuICAgICAgICBmaWx0ZXJPYmplY3Quc2VsZWN0ZWQgPSAhZmlsdGVyT2JqZWN0LnNlbGVjdGVkO1xuICAgICAgICBpZiAoIXRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IFtmaWx0ZXJPYmplY3QudmFsdWVdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0ucHVzaChmaWx0ZXJPYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmluZGV4T2YoZmlsdGVyT2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyT2JqZWN0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IGZpbHRlck9iamVjdC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KTtcbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YShmaWx0ZXJzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgc2VlZENvbHVtbjogdGhpcy5maWx0ZXIsXG4gICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLnVybCwgcG9zdFBhcmFtcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5cbi8qKlxuICogQG5hbWUgTm9KUyBGaWx0ZXIgRWxlbWVudFxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRmlsdGVyRWxlbWVudF1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBBbGxvdyBmb3IgYW4gaW5wdXQgZWxlbWVudCB0byBwZXJmb3JtIGN1c3RvbSBmaWx0ZXJpbmcgb24gdGhlIGFzc29jaWF0ZWQgYm91bmQgZGF0YS5cbiAqXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgdHlwZSBvZiBmaWx0ZXJpbmcgYXBwbGllZCB0byB0aGlzIGVsZW1lbnQuIChDdXJyZW50bHkgb25seSAnc2VhcmNoJyBpcyBzdXBwb3J0ZWQpXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC1kZXNjcmlwdGlvbiBTcGVjaWZ5IGEgcHJlZml4IHRvIGFwcGx5IHRvIHRoZSBmaWx0ZXJcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3VmZml4LWRlc3JpcHRpb24gU3BlY2lmeSBhIHN1ZmZpeCB0byBhcHBseSB0byB0aGUgZmlsdGVyXG4gKiBAYXR0cmlidXRlcy1zdWZmaXgtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWNvbHVtbnMtZGVzY3JpcHRpb24gU3BlY2lmeSB0aGUgY29sdW1ucyBpbiB0aGUgdGFibGUgdGhhdCB0aGlzIGZpbHRlciBpcyBhc3NvY2lhdGVkIHdpdGguIChjb21tYSBzZXBhcmF0ZWQgbGlzdCAnaWQsbmFtZSxkZXNjcmlwdGlvbicpXG4gKiBAYXR0cmlidXRlcy1jb2x1bW5zLXR5cGUgU3RyaW5nXG4gKlxuICpcbiAqIDxpbnB1dCB0eXBlPSd0ZXh0JyAjZWxlbWVudCBmaWx0ZXJFbGVtZW50IFttb2RlbF09J2RhdGEnIGZpbHRlcj0nc2VhcmNoJ1xuICogY29sdW1ucz0naWQsYnV5ZXJfbmFtZScgcHJlZml4PScqJyBzdWZmaXg9JyonIHBsYWNlaG9sZGVyPSdTZWFyY2ggT3JkZXJzJz5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGaWx0ZXJFbGVtZW50XScsXG4gICAgZXhwb3J0QXM6ICdmaWx0ZXJFbGVtZW50J1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ3ByZWZpeCcpIHByZWZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3VmZml4Jykgc3VmZml4OiBzdHJpbmc7XG4gICAgQElucHV0KCdjb2x1bW5zJykgY29sdW1uczogc3RyaW5nO1xuICAgIEBJbnB1dCgnZmlsdGVyQ2xhc3MnKSBmaWx0ZXJDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZScpIG1vZGU6IHN0cmluZztcbiAgICBASW5wdXQoJ2RhdGVGb3JtYXQnKSBkYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGV4cG9zZWQgdG8gdGhlIGVsZW1lbnQgd2UgYXJlIGF0dGFjaGVkIHRvIGFzIGEgdGVtcGxhdGUgdmFyaWFibGUsXG4gICAgICogc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSBmaWx0ZXJzIHdpdGggdGhlIG5ldyBmaWx0ZXIgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVyVmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0RmlsdGVyT2JqZWN0KGZpbHRlclZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdEZpbHRlck9iamVjdChmaWx0ZXJWYWx1ZSkge1xuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gZmlsdGVyVmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucHJlZml4ICsgbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN1ZmZpeCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgKyB0aGlzLnN1ZmZpeDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29sdW1uczogdGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLnNwbGl0KCcsJykgOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyTW9kZSA9IHRoaXMubW9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyRGF0ZUZvcm1hdCA9IHRoaXMuZGF0ZUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQmluZCBTYXZlXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNCaW5kU2F2ZV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIFNhdmUgRGlyZWN0aXZlIGFsbG93cyBmb3Igc2ltcGxlIHNhdmluZyBvZiBkYXRhIGJhY2sgdG8gdGhlIHNlcnZlci4gVGhpcyB3aWxsIHJldHVybiB0aGUgdXBkYXRlZCBjb250ZW50cyBvZiBlaXRoZXIgdGhlIE5vanNCaW5kTW9kZWwucmVzdWx0cyBhcnJheSBvciB0aGUgTm9qc0JpbmRNb2RlbC5pdGVtIG9iamVjdCB0byB0aGUgc2VydmVyIGZvciBwcm9jZXNzaW5nLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSBVUkwgd2hlcmUgb2YgdGhlIHNlcnZlciB3aGVyZSB0aGUgZGF0YSBzaG91bGQgYmUgc2VudCBmb3IgcHJvY2Vzc2luZy5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy1kZXNjcmlwdGlvbiBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gc2VuZCBiYWNrIHRvIHRoZSBzZXJ2ZXIgd2l0aCB0aGUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdHlwZSBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gc2VuZCB0aGUgZGF0YSBiYWNrIHdpdGguXG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBzYXZlIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZXNcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25FcnJvci1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3IgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmljZSBjYWxsLlxuICogQGF0dHJpYnV0ZXMtb25FcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIEFkZCB0aGUgbm9qc0JpbmRTYXZlIGF0dHJpYnV0ZSB0byBhbnkgZWxlbWVudC4gVGhlIGFzc29jaWF0ZWQgY2xpY2sgZXZlbnQgb24gdGhhdCBlbGVtZW50IHdpbGwgY2F1c2UgdGhlIGRhdGEgdG8gc2F2ZS5cbiAqIDxidXR0b24gbm9qc0JpbmRTYXZlIHN0b3JlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9zYXZlXCIgc3RvcmVPYmplY3RQYXJhbT1cIm9yZGVyc1wiIFttb2RlbF09XCJkYXRhXCJcbiAqICAgW3N0b3JlUGFyYW1zXT1cInt1c2VySWQ6IDIwMH1cIiBzYXZlZFJvdXRlPVwiL3ZpZXdzL3VzZXJzXCJcbiAqICAgKG9uU2F2ZSk9XCJjYWxsTWVPblNhdmUoKVwiIChvbkVycm9yKT1cImRvU29tZXRoaW5nKClcIj5cbiAqICAgU2F2ZVxuICogPC9idXR0b24+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYlNhdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFNhdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnc3RvcmUnKSBzdG9yZVVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnbWV0aG9kJykgbWV0aG9kOiBzdHJpbmc7XG4gICAgQElucHV0KCdzYXZlZFJvdXRlJykgc2F2ZWRSb3V0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25TYXZlJykgb25TYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkVycm9yJykgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgbGV0IHBvc3RQYXJhbXM6IGFueTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtcyA9IHRoaXMubW9kZWwucmVzdWx0cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlbC5pdGVtKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtcyA9IHRoaXMubW9kZWwuaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kIHx8ICdQT1NUJztcblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMuc3RvcmVVUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFscyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBvc3RQYXJhbXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zYXZlZFJvdXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmUuZW1pdCh7IHJlc3VsdHM6IHJlc3VsdHMgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgRm9ybVxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRm9ybV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9qcyBGb3JtIGRpcmVjdGl2ZSBhbGxvd3MgZm9yIGRhdGEgdG8gc291cmNlZCBmcm9tIGEgVVJMIGFuZCBib3VuZCB0byBhIG1vZGVsLCB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGJpbmQgdG8gZm9ybSBjb21wb25lbnRzLiBBZGRpdGlvbmFsIGZvcm0gdmFsaWRhdGlvbiBjYW4gYmUgYWRkZWQgdG8gdGhlIGZvcm0gaW5wdXRzLiBJbiBvcmRlciB0byBzYXZlIGRhdGEgYmFjayB0byB0aGUgc2VydmVyLCBhIHN0b3JlIFVSTCBhbmQgc3VibWl0IGJ1dHRvbiBuZWVkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmb3JtIG1hcmt1cC5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBsb2FkIHRoZSBkYXRhIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgb2JqZWN0IHRvIHNlbmQgd2l0aCB0aGUgU291cmNlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLWRlc2NyaXB0aW9uIFRoZSB1cmwgdG8gc2VuZCBhbnkgZGlydHkgZGF0YSBiYWNrIHRvIHRoZSBzZXJ2ZXIgZm9yIHByb2Nlc3NpbmcuXG4gKiBAYXR0cmlidXRlcy1zdG9yZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyBvYmplY3QgdG8gc2VuZCB3aXRoIHRoZSBTdG9yZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZW5kIHRoZSBkYXRhIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1kaXJ0eU9ubHktZGVzY3JpcHRpb24gSW4gdGhlIGNhc2Ugd2hlcmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhcmUgYmVpbmcgZWRpdGVkLCBvbmx5IHNlbmQgYmFjayB0aGUgb2JqZWN0cyB3aGVyZSBjb250YWluaW5nIGZpZWxkcyBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS10eXBlIEJvb2xlYW4gKGRlZmF1bHQgZmFsc2UpXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIG9uY2UgdGhlIGRhdGEgaGFzIGJlZW4gbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIGluIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGVyZSBpcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBkYXRhLlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkRXJyb3ItdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHNhdmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlc1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gVGhpcyBhdHRyaWJ1dGUgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGEgPGZvcm0+IGVsZW1lbnQuXG4gKiA8Zm9ybSBub2pzRm9ybSBbbW9kZWxdPVwiZGF0YVwiIHNvdXJjZT1cIi9QT1NUL1NvbWVzZXJ2aWNlL2dldE9yZGVyRGF0YVwiXG4gKiAgIFtzb3VyY2VQYXJhbXNdPVwie29yZGVySWQ6IDM3fVwiIHN0b3JlPVwiL1BPU1QvU29tZXNlcnZpY2Uvc2F2ZU9yZGVyc1wiXG4gKiAgIHN0b3JlT2JqZWN0UGFyYW09XCJvcmRlcnNcIiBzYXZlZFJvdXRlPVwiL25vanMtY29yZVwiPlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5JRDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLmlkXCIgcmVxdWlyZWQ+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3RhdHVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN0YXR1c1wiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnN0YXR1c1wiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlN1YnRvdGFsPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN1YnRvdGFsXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uc3VidG90YWxcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5UYXhlczwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YXhlc1wiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnRheGVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+VG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidG90YWxcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS50b3RhbFwiPlxuICogPC9kaXY+XG4gKlxuICogPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICogPC9mb3JtPlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGb3JtXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdzb3VyY2VNZXRob2QnKSBzb3VyY2VNZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZVBhcmFtcycpIHNvdXJjZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnbW9kZWwnKSBkYXRhOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnc3RvcmUnKSBzdG9yZVVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3RvcmVNZXRob2QnKSBzdG9yZU1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc2F2ZWRSb3V0ZScpIHNhdmVkUm91dGU6IHN0cmluZztcbiAgICBASW5wdXQoJ2RpcnR5T25seScpIGRpcnR5T25seTogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoJ29uTG9hZCcpIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdvbkxvYWRFcnJvcicpIG9uTG9hZEVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uU2F2ZScpIG9uU2F2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnb25FcnJvcicpIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0Zvcm06IE5nRm9ybSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0U291cmNlRGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRTYXZlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNvdXJjZURhdGEoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5pbmRleCA9IDApO1xuXG4gICAgICAgIG1lcmdlKHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMsIHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5jaGFuZ2VzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBfLmlzQXJyYXkoZGF0YS5yZXN1bHRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS50b3RhbENvdW50ID0gZGF0YS50b3RhbENvdW50IHx8IGRhdGEucmVzdWx0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudG90YWxDb3VudCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZEVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKFtdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLml0ZW0gPSBkYXRhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucmVzdWx0cyA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc291cmNlUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMuZmlsdGVycyA9IHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGEucGFnZU9wdGlvbnMuc2l6ZSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplO1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5wYWdlID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5zb3VyY2VNZXRob2QgPyB0aGlzLnNvdXJjZU1ldGhvZCA6ICh0aGlzLnNvdXJjZVBhcmFtcyA/ICdQT1NUJyA6ICdHRVQnKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnVybCwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnNvdXJjZVBhcmFtcyxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U2F2ZURhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0b3JlVVJMKSB7XG4gICAgICAgICAgICB0aGlzLm5nRm9ybS5uZ1N1Ym1pdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcnR5T25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlydHkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaCh0aGlzLm5nRm9ybS5mb3JtLmNvbnRyb2xzLCAoY29udHJvbCwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlydHkucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcnR5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKGRpcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaXRlbSAmJiB0aGlzLm5nRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVEYXRhKGRpcnR5Pykge1xuICAgICAgICBsZXQgcG9zdFBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChkaXJ0eSkge1xuXG4gICAgICAgICAgICBjb25zdCBkaXJ0eU9iamVjdHMgPSBbXTtcblxuICAgICAgICAgICAgZGlydHkuZm9yRWFjaChkaXJ0eUtleSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRLZXkgPSBkaXJ0eUtleS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcnR5SW5kZXggPSBfLmZpbmQoc3BsaXRLZXksIGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNOYU4oTnVtYmVyKGtleSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRpcnR5T2JqZWN0cy5wdXNoKHRoaXMuZGF0YS5yZXN1bHRzW2RpcnR5SW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwb3N0UGFyYW1zID0gZGlydHlPYmplY3RzO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXMgPSB0aGlzLmRhdGEucmVzdWx0cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLml0ZW0pIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5kYXRhLml0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLnN0b3JlTWV0aG9kID8gdGhpcy5zdG9yZU1ldGhvZCA6ICdQT1NUJztcblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMuc3RvcmVVUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwb3N0UGFyYW1zLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zYXZlZFJvdXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmUuZW1pdCh7IHJlc3VsdHM6IHJlc3VsdHMgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaFJlZ2V4VmFsaWRhdG9yKG1hdGNoOiBSZWdFeHApOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWQgPSBtYXRjaC50ZXN0KGNvbnRyb2wudmFsdWUpO1xuICAgICAgICByZXR1cm4gIW1hdGNoZWQgPyB7J21hdGNoUmVnZXgnOiB7dmFsdWU6IGNvbnRyb2wudmFsdWV9fSA6IG51bGw7XG4gICAgfTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JNYXRjaFJlZ2V4XScsXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBNYXRjaFJlZ2V4RGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoUmVnZXhEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgna2JNYXRjaFJlZ2V4JykgbWF0Y2hSZWdleDogc3RyaW5nO1xuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaFJlZ2V4ID8gbWF0Y2hSZWdleFZhbGlkYXRvcihuZXcgUmVnRXhwKHRoaXMubWF0Y2hSZWdleCwgJ2knKSkoY29udHJvbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19BU1lOQ19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiUmVtb3RlVmFsaWRhdGVdJyxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCdrYlJlbW90ZVZhbGlkYXRlJykgcmVtb3RlVmFsaWRhdGU6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgna2V5Jykga2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoJ3JlbW90ZVBhcmFtcycpIHJlbW90ZVBhcmFtczogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbGlkYXRlID8gdGhpcy5yZW1vdGVWYWxpZGF0ZVZhbGlkYXRvcih0aGlzLnJlbW90ZVZhbGlkYXRlKShjb250cm9sKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IocmVtb3RlVVJMOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMucmVtb3RlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHVybDtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3RlVVJMLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVtb3RlVVJMICsgYCYke3RoaXMua2V5fT0ke2NvbnRyb2wudmFsdWV9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSByZW1vdGVVUkwgKyBgPyR7dGhpcy5rZXl9PSR7Y29udHJvbC52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHVybCwge1xuICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucmVtb3RlUGFyYW1zXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWxpZCA/IHsgJ3JlbW90ZVZhbGlkYXRlJzogZmFsc2UgfSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBBY3Rpb25cbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBub2pzLWFjdGlvblxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgRGlyZWN0aXZlIGFsbG93cyBmb3IgcmFwaWQgYmluZGluZyBvZiBhIEpTT04gZGF0YSBzb3VyY2UgdG8gYSBtb2RlbC4gVGhpcyBzaG91bGQgcHJpbWFyaWx5IGJlIHVzZWQgZm9yIGRyYXdpbmcgbGlzdHMgb2YgZGF0YSwgd2hlcmUgdGhlIGRhdGEgZG9lcyBub3QgY2hhbmdlIGFzIHRoZSByZXN1bHQgb2YgdXNlciBpbnB1dC4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG5vanNCaW5kU2F2ZSB0byBzZW5kIGFueSBtb2RlbCBjaGFuZ2VzIGJhY2sgdG8gdGhlIHNlcnZlci4gSWYgeW91IGFyZSBsb29raW5nIHRvIGltcGxlbWVudCBGb3JtIGJlaGF2aW91ciwgdGhlbiB1c2Ugbm9qc0Zvcm0uXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiQWN0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdhY3Rpb25VUkwnKSBhY3Rpb25VUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnYWN0aW9uUGFyYW1zJykgYWN0aW9uUGFyYW1zOiBhbnk7XG5cbiAgICBAT3V0cHV0KCdzdGFydGVkJykgc3RhcnRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdjb21wbGV0ZWQnKSBjb21wbGV0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnZXJyb3InKSBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja0V2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQuZW1pdCh0cnVlKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMuYWN0aW9uUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy5hY3Rpb25VUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmFjdGlvblBhcmFtc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEtpbmliaW5kQmluZERpcmVjdGl2ZSB9IGZyb20gJy4vYmluZC9raW5pYmluZC1iaW5kLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9maWx0ZXItZWxlbWVudC9raW5pYmluZC1maWx0ZXItZWxlbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudEpzb25wTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgS2luaWJpbmRTYXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9iaW5kLXNhdmUva2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLaW5pYmluZEZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0Y2hSZWdleERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWRhdG9ycy9tYXRjaC1yZWdleC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZGF0b3JzL3JlbW90ZS12YWxpZGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2FjdGlvbi9raW5pYmluZC1hY3Rpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudEpzb25wTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgS2luaWJpbmRCaW5kRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2luaWJpbmRTYXZlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRm9ybURpcmVjdGl2ZSxcbiAgICAgICAgTWF0Y2hSZWdleERpcmVjdGl2ZSxcbiAgICAgICAgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBLaW5pYmluZEJpbmREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGb3JtRGlyZWN0aXZlLFxuICAgICAgICBNYXRjaFJlZ2V4RGlyZWN0aXZlLFxuICAgICAgICBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgS2luaWJpbmRSZXF1ZXN0U2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdLaW5pYmluZE1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRGaWx0ZXJzIHtcbiAgICBjaGFuZ2VzOiBTdWJqZWN0PGFueT47XG4gICAgZmlsdGVyT2JqZWN0PzogYW55O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRQYWdlT3B0aW9ucyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgaW5kZXg/OiBudW1iZXI7XG4gICAgb3B0aW9ucz86IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEBuYW1lIEtpbmliaW5kTW9kZWxcbiAqIEBkb2NUeXBlIE1vZGVsXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB0aGUgTW9kZWwgdGhhdCBub2pzLWJpbmQsIG5vanMtZmlsdGVyLCBub2pzLXBhZ2luYXRvciwgYW5kIG5vanMtZmlsdGVyLWVsZW1lbnQgYmluZCB0by4gSXQgcHJvdmlkZXMgYSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgZm9yIGVhY2ggb2YgdGhlc2Ugbm9qcyBjb21wb25lbnRzIHRvIG1hbmFnZSB0aGVpciBvd24gc3RhdGUgYW5kIGRhdGEgaGFuZGxpbmcuXG4gKiBAdGVtcGxhdGVEYXRhIG1lbWJlckRhdGFcbiAqXG4gKiBAbWVtYmVycy1yZXN1bHRzLXR5cGUgcHJvcGVydHk6IGFueVtdXG4gKiBAbWVtYmVycy1yZXN1bHRzLWRlc2NyaXB0aW9uIFRoaXMgcHJvcGVydHkgd2lsbCBiZSBwb3B1bGF0ZWQgaW4gdGhlIGV2ZW50IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc2VydmljZSBjYWxsIGFyZSBpbiBhcnJheSBmb3JtLlxuICogQG1lbWJlcnMtcmVzdWx0cy1kZWZhdWx0VmFsdWUgQXJyYXlcbiAqIEBtZW1iZXJzLWl0ZW0tdHlwZSBwcm9wZXJ0eTogYW55XG4gKiBAbWVtYmVycy1pdGVtLWRlc2NyaXB0aW9uIFRoaXMgcHJvcGVydHkgd2lsbCBiZSBwb3B1bGF0ZWQgd2hlbiB0aGUgcmV0dXJuaW5nIHZhbHVlIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBpcyBpbiBvYmplY3QgZm9ybS5cbiAqIEBtZW1iZXJzLWl0ZW0tZGVmYXVsdFZhbHVlIE9iamVjdFxuICogQG1lbWJlcnMtdG90YWxDb3VudC10eXBlIHByb3BlcnR5OiBudW1iZXJcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtZGVzY3JpcHRpb24gQ291bnQgb2YgdGhlIHRvdGFsIHJlc3VsdHNcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtZGVmYXVsdFZhbHVlIDBcbiAqIEBtZW1iZXJzLW9mZnNldC10eXBlIHByb3BlcnR5OiBudW1iZXJcbiAqIEBtZW1iZXJzLW9mZnNldC1kZXNjcmlwdGlvbiBXaGVuIGxpbWl0aW5nIHJlc3VsdHMgcmV0dXJuZWQgZnJvbSBzZXJ2ZXIgdGhpcyB2YWx1ZXMgc3RvcmUgdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICogQG1lbWJlcnMtb2Zmc2V0LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1maWx0ZXJzLXR5cGUgcHJvcGVydHk6IE5vanNGaWx0ZXJzXG4gKiBAbWVtYmVycy1maWx0ZXJzLWRlc2NyaXB0aW9uIFRoaXMgb2JqZWN0IHN0b3JlcyB0aGUgY3VycmVudCBmaWx0ZXIgdmFsdWVzIHVzZWQgZm9yIGZpbHRlcmluZyByZXN1bHRzIG9uIHRoZSBzZXJ2ZXIuXG4gKiBAbWVtYmVycy1maWx0ZXJzLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgZmlsdGVyT2JqZWN0OiB7fSB9XG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy10eXBlIHByb3BlcnR5OiBOb2pzUGFnZU9wdGlvbnNcbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlc2NyaXB0aW9uIFRoaXMgb2JqZWN0IHN0b3JlcyB0aGUgdmFsdWVzIHVzZWQgdG8gcGFnZSB0aGUgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtZGVmYXVsdFZhbHVlIHsgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLCBzaXplOiAxMCwgaW5kZXg6IDAsIG9wdGlvbnM6IFsxMCwgMjUsIDUwLCAxMDBdIH1cbiAqIEBtZW1iZXJzLXNldFBhZ2VPcHRpb25zLXR5cGUgbWV0aG9kXG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBwYWdpbmcgcmVzdWx0cyBuZWVkIHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBTaW1wbHkgY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIE5vanNCaW5kTW9kZWwgdG8gbWFrZSB1c2Ugb2YgdGhpcyBvYmplY3QuXG4gKiBjb25zdCBiaW5kTW9kZWwgPSBuZXcgTm9qc0JpbmRNb2RlbCgpO1xuICovXG5leHBvcnQgY2xhc3MgS2luaWJpbmRNb2RlbCB7XG5cbiAgICBwdWJsaWMgcmVzdWx0czogYW55W107XG4gICAgcHVibGljIGl0ZW06IGFueTtcbiAgICBwdWJsaWMgdmFsdWU6IGFueTtcbiAgICBwdWJsaWMgdG90YWxDb3VudDogbnVtYmVyO1xuICAgIHB1YmxpYyBvZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZmlsdGVyczogS2luaWJpbmRGaWx0ZXJzO1xuICAgIHB1YmxpYyBwYWdlT3B0aW9uczogS2luaWJpbmRQYWdlT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMuaXRlbSA9IHt9O1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcbiAgICAgICAgICAgIGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSxcbiAgICAgICAgICAgIGZpbHRlck9iamVjdDoge31cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSxcbiAgICAgICAgICAgIHNpemU6IGxpbWl0LFxuICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQYWdlT3B0aW9ucyhwYWdlU2l6ZSwgcGFnZUluZGV4KSB7XG4gICAgICAgIHRoaXMucGFnZU9wdGlvbnMuc2l6ZSA9IHBhZ2VTaXplO1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLmluZGV4ID0gcGFnZUluZGV4O1xuICAgICAgICB0aGlzLm9mZnNldCA9IHBhZ2VTaXplICogcGFnZUluZGV4O1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG5cbn1cbiJdLCJuYW1lcyI6WyJodHRwIiwiRXZlbnRFbWl0dGVyIiwiSHR0cEhlYWRlcnMiLCJtYXAiLCJjYXRjaEVycm9yIiwiRU1QVFkiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIm1lcmdlIiwic3RhcnRXaXRoIiwic3dpdGNoTWFwIiwiXy5pc1BsYWluT2JqZWN0IiwiXy5pc0FycmF5Iiwib2YiLCJfLmlzRW1wdHkiLCJEaXJlY3RpdmUiLCJJbnB1dCIsIk91dHB1dCIsIl8uZXh0ZW5kIiwiQ29tcG9uZW50Iiwicm91dGVyIiwiUm91dGVyIiwiSG9zdExpc3RlbmVyIiwib2JzZXJ2YWJsZU9mIiwiXy5mb3JFYWNoIiwiXy5maW5kIiwiTmdGb3JtIiwiTkdfVkFMSURBVE9SUyIsIk5HX0FTWU5DX1ZBTElEQVRPUlMiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkh0dHBDbGllbnRKc29ucE1vZHVsZSIsIlN1YmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQVVJLGdDQUFvQkEsT0FBZ0I7WUFBaEIsU0FBSSxHQUFKQSxPQUFJLENBQVk7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUlDLGlCQUFZLEVBQXFCLENBQUM7U0FDbEU7Ozs7Ozs7UUFFTSw0Q0FBVzs7Ozs7O3NCQUFDLE1BQWMsRUFBRSxHQUFXLEVBQUUsT0FBaUI7Z0JBQWpCLHdCQUFBO29CQUFBLFlBQWlCOztnQkFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztRQUc1QyxnREFBZTs7Ozs7O3NCQUFDLEdBQVcsRUFBRSxNQUFXLEVBQUUsT0FBaUI7Z0JBQWpCLHdCQUFBO29CQUFBLFlBQWlCOztnQkFDOUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O1FBR3pDLCtDQUFjOzs7OztzQkFBQyxHQUFXLEVBQUUsT0FBaUI7Z0JBQWpCLHdCQUFBO29CQUFBLFlBQWlCOztnQkFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7UUFHaEMsaURBQWdCOzs7OztzQkFBQyxHQUFXLEVBQUUsTUFBVzs7O2dCQUM1QyxJQUFNLE9BQU8sR0FBRyxJQUFJQyxnQkFBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQzs7Z0JBQ3hFLElBQU0sT0FBTyxHQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOztnQkFHMUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztnQkFFbkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7cUJBQzFDLElBQUksQ0FBQ0MsYUFBRyxDQUFDLFVBQUEsSUFBSTtvQkFDVixPQUFPLElBQUksQ0FBQztpQkFDZixDQUFDLEVBQUVDLG9CQUFVLENBQUMsVUFBQyxHQUFzQjtvQkFFbEMsSUFBSSxHQUFHLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRTs7d0JBRTVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDMUQ7eUJBQU07Ozt3QkFHSCxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUF5QixHQUFHLENBQUMsTUFBTSxvQkFBZSxHQUFHLENBQUMsS0FBTyxDQUFDLENBQUM7cUJBQ2hGO29CQUVELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWpDLE9BQU9DLFVBQUssQ0FBQztpQkFDaEIsQ0FBQyxDQUFDLENBQUM7OztvQkEvQ2ZDLGVBQVU7Ozs7O3dCQUpGQyxlQUFVOzs7cUNBRG5COzs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtRUksK0JBQW9CUCxPQUFnQixFQUNoQjtZQURBLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQ2hCLGNBQVMsR0FBVCxTQUFTO2lDQU44QixJQUFJQyxpQkFBWSxFQUFPOzBCQUVwQyxJQUFJQSxpQkFBWSxFQUFPOytCQUNiLElBQUlBLGlCQUFZLEVBQU87U0FLOUU7Ozs7UUFFRCx3Q0FBUTs7O1lBQVI7Z0JBQUEsaUJBNENDOztnQkExQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3BDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ25DLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFBLENBQUMsQ0FBQztnQkFFM0VPLFVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7cUJBQzlFLElBQUksQ0FDREMsbUJBQVMsQ0FBQyxFQUFFLENBQUMsRUFDYkMsbUJBQVMsQ0FBQztvQkFDTixPQUFPLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDekIsQ0FBQyxFQUNGUCxhQUFHLENBQUMsVUFBQyxJQUFTO29CQUNWLElBQUlRLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOzRCQUM5RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3ZCOzZCQUFNOzRCQUNILE9BQU8sSUFBSSxDQUFDO3lCQUNmO3FCQUNKO3lCQUFNLElBQUlBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDeEIsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFDbkMsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0gsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0osQ0FBQyxFQUNGUixvQkFBVSxDQUFDLFVBQUMsS0FBSztvQkFDYixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsT0FBT1MsT0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNqQixDQUFDLENBQ0wsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUNoQixJQUFJRixlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3ZCLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztxQkFDekI7eUJBQU0sSUFBSUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN4QixLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNILEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFDMUI7b0JBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDdkMsQ0FBQyxDQUFDO2FBQ047Ozs7UUFFTyx1Q0FBTzs7Ozs7Z0JBQ1gsSUFBTSxVQUFVLEdBQVEsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7Z0JBRWhELElBQUksQ0FBQ0UsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUM1QyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztpQkFDdkQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7b0JBQzVCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNqRCxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztpQkFDakQ7O2dCQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFFaEYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDOzs7b0JBaEZqRkMsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxTQUFTO3FCQUN0Qjs7Ozs7d0JBbkRRUixlQUFVO3dCQUtWLHNCQUFzQjs7OzswQkFpRDFCUyxVQUFLLFNBQUMsUUFBUTs2QkFDZEEsVUFBSyxTQUFDLFFBQVE7bUNBQ2RBLFVBQUssU0FBQyxjQUFjOzJCQUNwQkEsVUFBSyxTQUFDLE9BQU87c0NBQ2JBLFVBQUssU0FBQyxpQkFBaUI7b0NBQ3ZCQSxVQUFLLFNBQUMsZUFBZTs2QkFFckJDLFdBQU0sU0FBQyxRQUFRO2tDQUNmQSxXQUFNLFNBQUMsYUFBYTs7b0NBakV6Qjs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBa0VJLGlDQUFvQixTQUFpQztZQUFqQyxjQUFTLEdBQVQsU0FBUyxDQUF3QjtnQ0FGMUIsRUFBRTtTQUc1Qjs7OztRQUVELDBDQUFROzs7WUFBUjtnQkFBQSxpQkFPQztnQkFORyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN2RztnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7b0JBQ3ZELEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUM1QixDQUFDLENBQUM7YUFDTjs7Ozs7UUFFTSw4Q0FBWTs7OztzQkFBQyxZQUFZO2dCQUM1QixZQUFZLENBQUMsUUFBUSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtvQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNmLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFOzRCQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUN0RTs2QkFBTTs0QkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3hFO3FCQUNKO3lCQUFNOzt3QkFDSCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3RGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFOzRCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDaEU7d0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFOzRCQUNyRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3REO3FCQUNKO2lCQUNKO3FCQUFNO29CQUNILElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO3FCQUNwRTt5QkFBTTt3QkFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3REO2lCQUNKO2dCQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztRQUdqQyx5Q0FBTzs7OztzQkFBQyxPQUFPOztnQkFDbkIsSUFBTSxVQUFVLEdBQVE7b0JBQ3BCLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDdkIsT0FBTyxFQUFFLE9BQU87aUJBQ25CLENBQUM7Z0JBRUYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7b0JBbEZuRUMsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxXQUFXO3dCQUNyQixRQUFRLEVBQUUsdWlCQWFiO3dCQUNHLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDZjs7Ozs7d0JBakRRLHNCQUFzQjs7OzswQkFvRDFCSCxVQUFLLFNBQUMsUUFBUTsyQkFDZEEsVUFBSyxTQUFDLE9BQU87K0JBQ2JBLFVBQUssU0FBQyxVQUFVO2dDQUNoQkEsVUFBSyxTQUFDLFdBQVc7NkJBQ2pCQSxVQUFLLFNBQUMsUUFBUTswQ0FDZEEsVUFBSyxTQUFDLHFCQUFxQjtzQ0FDM0JBLFVBQUssU0FBQyxpQkFBaUI7O3NDQTlENUI7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTBDSTtTQUNDOzs7Ozs7OztRQVFNLHFEQUFZOzs7Ozs7O3NCQUFDLFdBQVc7Z0JBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7O1FBR3BDLDhEQUFxQjs7OztzQkFBQyxXQUFXO2dCQUNyQyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7b0JBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdEQ7cUJBQU07O29CQUNILElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQztvQkFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNiLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztxQkFDckM7b0JBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNiLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDckM7b0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzt3QkFDMUMsV0FBVyxFQUFFLFFBQVE7d0JBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7cUJBQzdELENBQUM7b0JBRUYsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQ3RFO29CQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNsRjtpQkFDSjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7b0JBdkQ1Q0QsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7d0JBQzdCLFFBQVEsRUFBRSxlQUFlO3FCQUM1Qjs7Ozs7MkJBR0lDLFVBQUssU0FBQyxPQUFPOzZCQUNiQSxVQUFLLFNBQUMsUUFBUTs2QkFDZEEsVUFBSyxTQUFDLFFBQVE7NkJBQ2RBLFVBQUssU0FBQyxRQUFROzhCQUNkQSxVQUFLLFNBQUMsU0FBUztrQ0FDZkEsVUFBSyxTQUFDLGFBQWE7MkJBQ25CQSxVQUFLLFNBQUMsTUFBTTtpQ0FDWkEsVUFBSyxTQUFDLFlBQVk7OzZDQXhDdkI7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBNkRJLCtCQUFvQmhCLE9BQWdCLEVBQ2hCb0IsV0FDQTtZQUZBLFNBQUksR0FBSnBCLE9BQUksQ0FBWTtZQUNoQixXQUFNLEdBQU5vQixTQUFNO1lBQ04sY0FBUyxHQUFULFNBQVM7MEJBVGlCLElBQUluQixpQkFBWSxFQUFFOzJCQUNoQixJQUFJQSxpQkFBWSxFQUFFO1NBVWpFOzs7OztRQVJrQyx1Q0FBTzs7OztZQUExQyxVQUEyQyxNQUFNO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZjs7OztRQVFELHdDQUFROzs7WUFBUjthQUVDOzs7O1FBRU8sb0NBQUk7Ozs7OztnQkFDUixJQUFJLFVBQVUsQ0FBTTtnQkFFcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNaLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO3FCQUNuQzt5QkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO3dCQUN4QixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7cUJBQ2hDO2lCQUNKOztnQkFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztnQkFFckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQzVDO29CQUNJLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUs7b0JBQzlDLE1BQU0sRUFBRSxVQUFVO2lCQUNyQixDQUFDO3FCQUNELFNBQVMsRUFBRTtxQkFDWCxJQUFJLENBQUMsVUFBQSxPQUFPO29CQUVULElBQUksS0FBSSxDQUFDLFVBQVUsRUFBRTt3QkFDakIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztxQkFDM0M7b0JBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDMUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO29CQUNSLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QixDQUFDLENBQUM7OztvQkF6RGRjLGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsVUFBVTtxQkFDdkI7Ozs7O3dCQTFDUVIsZUFBVTt3QkFFVmMsYUFBTTt3QkFDTixzQkFBc0I7Ozs7NEJBMEMxQkwsVUFBSyxTQUFDLE9BQU87K0JBQ2JBLFVBQUssU0FBQyxPQUFPOzZCQUNiQSxVQUFLLFNBQUMsUUFBUTtpQ0FDZEEsVUFBSyxTQUFDLFlBQVk7c0NBQ2xCQSxVQUFLLFNBQUMsaUJBQWlCOzZCQUV2QkMsV0FBTSxTQUFDLFFBQVE7OEJBQ2ZBLFdBQU0sU0FBQyxTQUFTOzhCQUVoQkssaUJBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O29DQXpEckM7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBMEdJLCtCQUFvQixNQUFjLEVBQ2RGLFdBQ0E7WUFGQSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsV0FBTSxHQUFOQSxTQUFNO1lBQ04sY0FBUyxHQUFULFNBQVM7MEJBUGlCLElBQUluQixpQkFBWSxFQUFPOytCQUNiLElBQUlBLGlCQUFZLEVBQU87MEJBQ2pDLElBQUlBLGlCQUFZLEVBQUU7MkJBQ2hCLElBQUlBLGlCQUFZLEVBQUU7U0FNakU7Ozs7UUFFRCx3Q0FBUTs7O1lBQVI7Z0JBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7Ozs7UUFFTyw4Q0FBYzs7Ozs7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUEsQ0FBQyxDQUFDO2dCQUUzRU8sVUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7cUJBQzFELElBQUksQ0FDREMsbUJBQVMsQ0FBQyxFQUFFLENBQUMsRUFDYkMsbUJBQVMsQ0FBQztvQkFDTixPQUFPLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDekIsQ0FBQyxFQUNGUCxhQUFHLENBQUMsVUFBQyxJQUFTO29CQUNWLElBQUlRLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOzRCQUM5RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3ZCOzZCQUFNOzRCQUNILE9BQU8sSUFBSSxDQUFDO3lCQUNmO3FCQUNKO3lCQUFNLElBQUlBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDeEIsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFDbkMsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0osQ0FBQyxFQUNGUixvQkFBVSxDQUFDLFVBQUMsS0FBSztvQkFDYixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsT0FBT21CLE9BQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDM0IsQ0FBQyxDQUNMLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDaEIsSUFBSVosZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN2QixLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNILEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztxQkFDNUI7b0JBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDdkMsQ0FBQyxDQUFDOzs7OztRQUdDLHVDQUFPOzs7OztnQkFDWCxJQUFNLFVBQVUsR0FBUSxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztnQkFFaEQsSUFBSSxDQUFDRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQzVDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2lCQUN2RDtnQkFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtvQkFDNUIsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ2pELFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2lCQUNqRDs7Z0JBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUU1RixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNoRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVk7b0JBQ3pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtpQkFDeEMsQ0FBQyxDQUFDOzs7OztRQUdDLDRDQUFZOzs7OztnQkFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzt3QkFDM0IsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUM5QixJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7O2dDQUNoQixJQUFNLE9BQUssR0FBRyxFQUFFLENBQUM7Z0NBQ2pCVSxTQUFTLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsT0FBTyxFQUFFLEdBQUc7b0NBQzlDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTt3Q0FDZixPQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNuQjtpQ0FDSixDQUFDLENBQUM7Z0NBQ0gsSUFBSSxPQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQ0FDbEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUMsQ0FBQztpQ0FDeEI7NkJBQ0o7aUNBQU07Z0NBQ0gsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzZCQUNuQjt5QkFFSjs2QkFBTSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFOzRCQUM1QyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQ25CO3FCQUNKLENBQUMsQ0FBQztpQkFDTjs7Ozs7O1FBR0csd0NBQVE7Ozs7c0JBQUMsS0FBTTs7O2dCQUNuQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBRXBCLElBQUksS0FBSyxFQUFFOztvQkFFUCxJQUFNLGNBQVksR0FBRyxFQUFFLENBQUM7b0JBRXhCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFROzt3QkFDbEIsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7d0JBQ3JDLElBQU0sVUFBVSxHQUFHQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQUEsR0FBRzs0QkFDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDOUIsQ0FBQyxDQUFDO3dCQUNILGNBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztxQkFDcEQsQ0FBQyxDQUFDO29CQUVILFVBQVUsR0FBRyxjQUFZLENBQUM7aUJBRTdCO3FCQUFNO29CQUNILElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDOUIsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3FCQUNsQzt5QkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUN2QixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQy9CO2lCQUNKOztnQkFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUU1RCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFDNUM7b0JBQ0ksTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtpQkFDeEMsQ0FBQztxQkFDRCxTQUFTLEVBQUU7cUJBQ1gsSUFBSSxDQUFDLFVBQUEsT0FBTztvQkFFVCxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ2pCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7cUJBQzNDO29CQUVELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7aUJBQzFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztvQkFDUixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUIsQ0FBQyxDQUFDOzs7b0JBM0pkVixjQUFTLFNBQUM7d0JBQ1AsUUFBUSxFQUFFLFVBQVU7cUJBQ3ZCOzs7Ozt3QkFsRlFXLFlBQU07d0JBQ05MLGFBQU07d0JBRU4sc0JBQXNCOzs7OzBCQWtGMUJMLFVBQUssU0FBQyxRQUFRO21DQUNkQSxVQUFLLFNBQUMsY0FBYzttQ0FDcEJBLFVBQUssU0FBQyxjQUFjOzJCQUNwQkEsVUFBSyxTQUFDLE9BQU87K0JBQ2JBLFVBQUssU0FBQyxPQUFPO2tDQUNiQSxVQUFLLFNBQUMsYUFBYTtpQ0FDbkJBLFVBQUssU0FBQyxZQUFZO2dDQUNsQkEsVUFBSyxTQUFDLFdBQVc7c0NBQ2pCQSxVQUFLLFNBQUMsaUJBQWlCOzZCQUV2QkMsV0FBTSxTQUFDLFFBQVE7a0NBQ2ZBLFdBQU0sU0FBQyxhQUFhOzZCQUNwQkEsV0FBTSxTQUFDLFFBQVE7OEJBQ2ZBLFdBQU0sU0FBQyxTQUFTOztvQ0F4R3JCOzs7Ozs7O0FDQUE7Ozs7QUFHQSxpQ0FBb0MsS0FBYTtRQUM3QyxPQUFPLFVBQUMsT0FBd0I7O1lBQzVCLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsRUFBQyxZQUFZLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBQyxFQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25FLENBQUM7S0FDTDs7Ozs7Ozs7UUFTRyxzQ0FBUTs7OztZQUFSLFVBQVMsT0FBd0I7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3NCQUNqRixJQUFJLENBQUM7YUFDZDs7b0JBVkpGLGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsZ0JBQWdCO3dCQUMxQixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRVksbUJBQWEsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO3FCQUN2Rjs7O2lDQUVJWCxVQUFLLFNBQUMsY0FBYzs7a0NBZnpCOzs7Ozs7O0FDQUE7UUFnQkkscUNBQW9CLFNBQWlDO1lBQWpDLGNBQVMsR0FBVCxTQUFTLENBQXdCO21DQUhBLEtBQUs7Z0NBQ2YsRUFBRTtTQUk1Qzs7Ozs7UUFFRCw4Q0FBUTs7OztZQUFSLFVBQVMsT0FBd0I7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztzQkFDakYsSUFBSSxDQUFDO2FBQ2Q7Ozs7O1FBRU8sNkRBQXVCOzs7O3NCQUFDLFNBQWlCOztnQkFDN0MsT0FBTyxVQUFDLE9BQXdCO29CQUU1QixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7O3dCQUVmLElBQU0sTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sSUFBSSxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQzs7d0JBRWhGLElBQUksR0FBRyxVQUFDO3dCQUNSLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDekIsR0FBRyxHQUFHLFNBQVMsSUFBRyxNQUFJLEtBQUksQ0FBQyxHQUFHLFNBQUksT0FBTyxDQUFDLEtBQU8sQ0FBQSxDQUFDO3lCQUNyRDs2QkFBTTs0QkFDSCxHQUFHLEdBQUcsU0FBUyxJQUFHLE1BQUksS0FBSSxDQUFDLEdBQUcsU0FBSSxPQUFPLENBQUMsS0FBTyxDQUFBLENBQUM7eUJBQ3JEO3dCQUVELE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTs0QkFDM0MsZUFBZSxFQUFFLEtBQUksQ0FBQyxlQUFlOzRCQUNyQyxNQUFNLEVBQUUsS0FBSSxDQUFDLFlBQVk7eUJBQzVCLENBQUMsQ0FBQyxTQUFTLEVBQUU7NkJBQ1QsSUFBSSxDQUFDLFVBQUEsS0FBSzs0QkFDUCxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO3lCQUN0RCxDQUFDLENBQUM7cUJBQ1Y7b0JBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQyxDQUFDOzs7b0JBM0NURCxjQUFTLFNBQUM7d0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjt3QkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUVhLHlCQUFtQixFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7cUJBQ3ZHOzs7Ozt3QkFOUSxzQkFBc0I7Ozs7cUNBUTFCWixVQUFLLFNBQUMsa0JBQWtCOzZCQUN4QkEsVUFBSyxTQUFDLFFBQVE7MEJBQ2RBLFVBQUssU0FBQyxLQUFLO3NDQUNYQSxVQUFLLFNBQUMsaUJBQWlCO21DQUN2QkEsVUFBSyxTQUFDLGNBQWM7OzBDQWR6Qjs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7O1FBbURJLGlDQUFvQixTQUFpQztZQUFqQyxjQUFTLEdBQVQsU0FBUyxDQUF3QjsyQkF6QkwsSUFBSWYsaUJBQVksRUFBTzs2QkFDbkIsSUFBSUEsaUJBQVksRUFBTzt5QkFDL0IsSUFBSUEsaUJBQVksRUFBTztTQXdCbEU7Ozs7O1FBckJELDRDQUFVOzs7O1lBRFYsVUFDVyxLQUFLO2dCQURoQixpQkFtQkM7Z0JBakJHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBRXhCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFFaEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQzdDO29CQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWTtpQkFDNUIsQ0FBQztxQkFDRCxTQUFTLEVBQUU7cUJBQ1gsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDUixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDL0IsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO29CQUNSLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQixDQUFDLENBQUM7YUFDVjs7OztRQUtELDBDQUFROzs7WUFBUjthQUNDOztvQkF0Q0pjLGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsWUFBWTtxQkFDekI7Ozs7O3dCQWhCUSxzQkFBc0I7Ozs7Z0NBbUIxQkMsVUFBSyxTQUFDLFdBQVc7NkJBQ2pCQSxVQUFLLFNBQUMsUUFBUTttQ0FDZEEsVUFBSyxTQUFDLGNBQWM7OEJBRXBCQyxXQUFNLFNBQUMsU0FBUztnQ0FDaEJBLFdBQU0sU0FBQyxXQUFXOzRCQUNsQkEsV0FBTSxTQUFDLE9BQU87aUNBRWRLLGlCQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztzQ0E5QnJDOzs7Ozs7O0FDQUE7Ozs7b0JBY0NPLGFBQVEsU0FBQzt3QkFDTixPQUFPLEVBQUU7NEJBQ0xDLG1CQUFZOzRCQUNaQyxxQkFBZ0I7NEJBQ2hCQyxpQkFBVzs0QkFDWEMsMEJBQXFCO3lCQUN4Qjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1YscUJBQXFCOzRCQUNyQix1QkFBdUI7NEJBQ3ZCLHFCQUFxQjs0QkFDckIsOEJBQThCOzRCQUM5QixxQkFBcUI7NEJBQ3JCLG1CQUFtQjs0QkFDbkIsMkJBQTJCOzRCQUMzQix1QkFBdUI7eUJBQzFCO3dCQUNELE9BQU8sRUFBRTs0QkFDTCxxQkFBcUI7NEJBQ3JCLHFCQUFxQjs0QkFDckIsdUJBQXVCOzRCQUN2Qiw4QkFBOEI7NEJBQzlCLHFCQUFxQjs0QkFDckIsbUJBQW1COzRCQUNuQiwyQkFBMkI7NEJBQzNCLHVCQUF1Qjt5QkFDMUI7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLHNCQUFzQjt5QkFDekI7cUJBQ0o7OytCQTVDRDs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQUE7UUFVSSx1QkFBWSxLQUFjLEVBQUUsTUFBZTtZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLE9BQU8sRUFBRSxJQUFJQyxZQUFPLEVBQU87Z0JBQzNCLFlBQVksRUFBRSxFQUFFO2FBQ25CLENBQUM7WUFDRixJQUFJLENBQUMsV0FBVyxHQUFHO2dCQUNmLE9BQU8sRUFBRSxJQUFJQSxZQUFPLEVBQU87Z0JBQzNCLElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxDQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQzthQUM3QixDQUFDO1NBQ0w7Ozs7OztRQUVNLHNDQUFjOzs7OztzQkFBQyxRQUFRLEVBQUUsU0FBUztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs0QkE3RTVDO1FBZ0ZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==