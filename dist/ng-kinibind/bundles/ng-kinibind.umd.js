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
                if (this.getURL) {
                    return this.kbRequest.makeGetRequest(this.getURL);
                }
                else {
                    return this.kbRequest.makePostRequest(this.url, postParams);
                }
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
            getURL: [{ type: core.Input, args: ['getSource',] }],
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
                var postParams = this.storeParams || {};
                if (this.model) {
                    if (this.model.results.length > 0) {
                        postParams[this.storeObjectParam || 'results'] = this.model.results;
                    }
                    else if (this.model.item) {
                        postParams[this.storeObjectParam || 'object'] = this.model.item;
                    }
                }
                this.kbRequest.makePostRequest(this.storeURL, postParams).toPromise()
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
            storeParams: [{ type: core.Input, args: ['storeParams',] }],
            storeObjectParam: [{ type: core.Input, args: ['storeObjectParam',] }],
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
                if (this.data.filters.filterObject) {
                    postParams.filters = this.data.filters.filterObject;
                }
                if (this.data.pageOptions.size && this.data.pageOptions.index) {
                    /** @type {?} */
                    var offset = this.data.pageOptions.size * this.data.pageOptions.index;
                    postParams.limit = this.data.pageOptions.size;
                    postParams.offset = offset;
                }
                return this.kbRequest.makePostRequest(this.url, postParams);
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
                var postParams = this.storeParams || {};
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
                    postParams[this.storeObjectParam || 'results'] = dirtyObjects_1;
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
            sourceParams: [{ type: core.Input, args: ['sourceParams',] }],
            data: [{ type: core.Input, args: ['model',] }],
            storeURL: [{ type: core.Input, args: ['store',] }],
            storeParams: [{ type: core.Input, args: ['storeParams',] }],
            storeObjectParam: [{ type: core.Input, args: ['storeObjectParam',] }],
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
            remoteObjectParam: [{ type: core.Input, args: ['remoteObjectParam',] }],
            remoteObjectParams: [{ type: core.Input, args: ['remoteObjectParams',] }]
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
                var postParams = this.actionParams || {};
                this.kbRequest.makePostRequest(this.actionURL, postParams).toPromise()
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1raW5pYmluZC9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9iaW5kL2tpbmliaW5kLWJpbmQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9maWx0ZXIva2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmcta2luaWJpbmQvZmlsdGVyLWVsZW1lbnQva2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9iaW5kLXNhdmUva2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL2Zvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL3ZhbGlkYXRvcnMvbWF0Y2gtcmVnZXguZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC92YWxpZGF0b3JzL3JlbW90ZS12YWxpZGF0ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL2FjdGlvbi9raW5pYmluZC1hY3Rpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9uZy1raW5pYmluZC5tb2R1bGUudHMiLCJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBqc29ucFJlcXVlc3RFcnJvcjogRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZVBvc3RSZXF1ZXN0KHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSwgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZUdldFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VKc29ucFJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zOiBhbnkgPSB7IGhlYWRlcnM6IGhlYWRlcnMgfTtcblxuICAgICAgICAvLyBTZXQgY2FsbGJhY2sgcGFyYW0gZm9yIHRoZSBKU09OUCByZXF1ZXN0LlxuICAgICAgICBwYXJhbXMuY2FsbGJhY2sgPSAnSlNPTlBfQ0FMTEJBQ0snO1xuXG4gICAgICAgIG9wdGlvbnMucGFyYW1zID0gcGFyYW1zO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnanNvbnAnLCB1cmwsIG9wdGlvbnMpXG4gICAgICAgICAgICAucGlwZShtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9KSwgY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgY2xpZW50LXNpZGUgb3IgbmV0d29yayBlcnJvciBvY2N1cnJlZC4gSGFuZGxlIGl0IGFjY29yZGluZ2x5LlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZDonLCBlcnIuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGJhY2tlbmQgcmV0dXJuZWQgYW4gdW5zdWNjZXNzZnVsIHJlc3BvbnNlIGNvZGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSByZXNwb25zZSBib2R5IG1heSBjb250YWluIGNsdWVzIGFzIHRvIHdoYXQgd2VudCB3cm9uZyxcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQmFja2VuZCByZXR1cm5lZCBjb2RlICR7ZXJyLnN0YXR1c30sIGJvZHkgd2FzOiAke2Vyci5lcnJvcn1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yLmVtaXQoZXJyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBCaW5kXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgbm9qcy1iaW5kXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gVGhlIE5vSlMgQmluZCBEaXJlY3RpdmUgYWxsb3dzIGZvciByYXBpZCBiaW5kaW5nIG9mIGEgSlNPTiBkYXRhIHNvdXJjZSB0byBhIG1vZGVsLiBUaGlzIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBmb3IgZHJhd2luZyBsaXN0cyBvZiBkYXRhLCB3aGVyZSB0aGUgZGF0YSBkb2VzIG5vdCBjaGFuZ2UgYXMgdGhlIHJlc3VsdCBvZiB1c2VyIGlucHV0LiBIb3dldmVyLCB0aGlzIGNhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggbm9qc0JpbmRTYXZlIHRvIHNlbmQgYW55IG1vZGVsIGNoYW5nZXMgYmFjayB0byB0aGUgc2VydmVyLiBJZiB5b3UgYXJlIGxvb2tpbmcgdG8gaW1wbGVtZW50IEZvcm0gYmVoYXZpb3VyLCB0aGVuIHVzZSBub2pzRm9ybS5cbiAqXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtZGVzY3JpcHRpb24gVGhlIFVSTCB0byBsb2FkIHRoZSBkYXRhIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgdXNlZCB0byBzZW5kIGJhY2sgdG8gdGhlIHNlcnZlciBpbiB0aGUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXR5cGUgT2JqZWN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgb25jZSB0aGUgZGF0YSBoYXMgYmVlbiBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgaW4gdGhlIHNjZW5hcmlvIHdoZXJlIHRoZXJlIGlzIGFuIGVycm9yIGxvYWRpbmcgdGhlIGRhdGEuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSA8bm9qcy1iaW5kPiB0YWdcbiAqIDxub2pzLWJpbmQgc291cmNlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9yZXN1bHRzLmpzb25cIiBbc291cmNlUGFyYW1zXT1cInt1c2VySWQ6IDEwMH1cIlxuICogICBbbW9kZWxdPVwiZGF0YVwiPlxuICpcbiAqICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhLnJlc3VsdHNcIj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uaWR9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57aXRlbS5uYW1lfX08L3NwYW4+XG4gKiAgICAgPHNwYW4+e3tpdGVtLmRhdGV9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uYWRkcmVzc319PC9zcGFuPlxuICogICA8L2Rpdj5cbiAqXG4gKiA8L25vanMtYmluZD5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAna2ItYmluZCdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRCaW5kRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdnZXRTb3VyY2UnKSBnZXRVUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZVBhcmFtcycpIHNvdXJjZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnbW9kZWwnKSBkYXRhOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuICAgIEBJbnB1dCgncmVsb2FkVHJpZ2dlcicpIHJlbG9hZFRyaWdnZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCdvbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25Mb2FkRXJyb3InKSBvbkxvYWRFcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSByZWxvYWQgdHJpZ2dlciBsaXN0ZW4gZm9yIGNoYW5nZXMgYW5kIHJlc2V0IHRoZSBkYXRhIG1vZGVsLlxuICAgICAgICB0aGlzLnJlbG9hZFRyaWdnZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmluZGV4ID0gMSk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcywgdGhpcy5kYXRhLnBhZ2VPcHRpb25zLmNoYW5nZXMsIHRoaXMucmVsb2FkVHJpZ2dlcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdHMgJiYgXy5pc0FycmF5KGRhdGEucmVzdWx0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudG90YWxDb3VudCA9IGRhdGEudG90YWxDb3VudCB8fCBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZEVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbSA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5yZXN1bHRzID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5zb3VyY2VQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKCFfLmlzRW1wdHkodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5maWx0ZXJzID0gdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemU7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2UgPSB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nZXRVUkwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlR2V0UmVxdWVzdCh0aGlzLmdldFVSTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMudXJsLCBwb3N0UGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbi8qKlxuICogQG5hbWUgTm9KUyBGaWx0ZXJcbiAqIEBkb2NUeXBlIENvbXBvbmVudFxuICogQHRhZyBub2pzLWZpbHRlclxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIEZpbHRlcmluZyBjb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgZmlsdGVyIG9wdGlvbnMgYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBzb3VyY2UuIFNlbGVjdGluZyBhbnkgb2YgdGhlc2Ugb3B0aW9ucyB3aWxsIHVwZGF0ZSB0aGUgZmlsdGVyIG9iamVjdCBmcm9tIFttb2RlbF0gd2hpY2ggd2lsbCB0cmlnZ2VyIGEgc2VydmVyIHNpZGUgZmlsdGVyIG9mIHRoZSBkYXRhLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHRvIGNhbGwgdG8gcmV0cmlldmUgdGhlIGZpbHRlciBvcHRpb25zIGZyb20gdGhlIHNlcnZlci4gUmV0dXJuIGRhdGEgZXhwZWN0ZWQgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL2ZpbHRlcnMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUgW3tjb3VudDogMiwgbGFiZWw6IE9wdGlvbjE6IHZhbHVlOiAxfSw8YnI+e2NvdW50OiA0LCBsYWJlbDogT3B0aW9uMjogdmFsdWU6IDJ9XVxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBkYXRhXG4gKiBAYXR0cmlidXRlcy1tdWx0aXBsZS1kZXNjcmlwdGlvbiBBbGxvdyBtdWx0aXBsZSBmaWx0ZXIgb3B0aW9ucyB0byBiZSBzZWxlY3RlZCBhdCB0aGUgc2FtZSB0aW1lLlxuICogQGF0dHJpYnV0ZXMtbXVsdGlwbGUtdHlwZSBCb29sZWFuXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIGRhdGFiYXNlIGZpZWxkIHRoYXQgdGhlIGZpbHRlciB3aWxsIGJlIGFwcGxpZWQgdG8uXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNob3dDb3VudC1kZXNjcmlwdGlvbiBUb2dnbGUgdGhhdCBzaG93cyB0aGUgY291bnQgb2YgcmVzdWx0cyBmb3IgdGhlIGdpdmVuIGZpbHRlci5cbiAqIEBhdHRyaWJ1dGVzLXNob3dDb3VudC10eXBlIEJvb2xlYW5cbiAqIEBhdHRyaWJ1dGVzLWluaXRpYWxGaWx0ZXJWYWx1ZXMtZGVzY3JpcHRpb24gU2V0IGZpbHRlciB2YWx1ZXMgdXBvbiBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uXG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLXR5cGUgSlNPTiBPYmplY3RcbiAqIEBhdHRyaWJ1dGVzLWluaXRpYWxGaWx0ZXJWYWx1ZXMtdmFsdWUge3NvbWVWYWx1ZTogdHJ1ZX1cbiAqXG4gKiA8bm9qcy1maWx0ZXIgc291cmNlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9maWx0ZXJzLmpzb25cIlxuICogW2luaXRpYWxGaWx0ZXJWYWx1ZXNdPVwie2NvbXBsZXRlOiB0cnVlfVwiXG4gKiBbbW9kZWxdPVwiZGF0YVwiIG11bHRpcGxlPVwidHJ1ZVwiIGZpbHRlcj1cInRvdGFsXCIgc2hvd0NvdW50PVwidHJ1ZVwiPlxuICogPC9ub2pzLWZpbHRlcj5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrYi1maWx0ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdGb3I9XCJsZXQgZmlsdGVyVmFsdWUgb2YgZmlsdGVyVmFsdWVzXCI+XG4gICAgPGRpdiAqbmdJZj1cIm11bHRpcGxlXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAoY2hhbmdlKT1cInVwZGF0ZUZpbHRlcihmaWx0ZXJWYWx1ZSlcIi8+XG4gICAgICAgIHt7ZmlsdGVyVmFsdWUubGFiZWx9fVxuICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dDb3VudFwiPih7e2ZpbHRlclZhbHVlLmNvdW50fX0pPC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGEgKm5nSWY9XCIhbXVsdGlwbGVcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICBbc3R5bGUuZm9udC13ZWlnaHRdPVwiZmlsdGVyVmFsdWUuc2VsZWN0ZWQgPyAnYm9sZCcgOiAnbm9ybWFsJ1wiIChjbGljayk9XCJ1cGRhdGVGaWx0ZXIoZmlsdGVyVmFsdWUpXCI+XG4gICAgICAgIHt7ZmlsdGVyVmFsdWUubGFiZWx9fVxuICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dDb3VudFwiPih7e2ZpbHRlclZhbHVlLmNvdW50fX0pPC9zcGFuPlxuICAgIDwvYT5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdzb3VyY2UnKSB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoJ21vZGVsJykgZGF0YTogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ211bHRpcGxlJykgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgQElucHV0KCdzaG93Q291bnQnKSBzaG93Q291bnQ6IGJvb2xlYW47XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ2luaXRpYWxGaWx0ZXJWYWx1ZXMnKSBpbml0aWFsRmlsdGVyVmFsdWVzOiBhbnk7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZmlsdGVyVmFsdWVzOiBhbnkgPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCA9IF8uZXh0ZW5kKHRoaXMuaW5pdGlhbEZpbHRlclZhbHVlcywgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0KSB7XG4gICAgICAgIGZpbHRlck9iamVjdC5zZWxlY3RlZCA9ICFmaWx0ZXJPYmplY3Quc2VsZWN0ZWQ7XG4gICAgICAgIGlmICghdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKGZpbHRlck9iamVjdC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdID0gW2ZpbHRlck9iamVjdC52YWx1ZV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5wdXNoKGZpbHRlck9iamVjdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uaW5kZXhPZihmaWx0ZXJPYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdID0gZmlsdGVyT2JqZWN0LnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3QpO1xuICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKGZpbHRlcnMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB7XG4gICAgICAgICAgICBzZWVkQ29sdW1uOiB0aGlzLmZpbHRlcixcbiAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlcnNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMudXJsLCBwb3N0UGFyYW1zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcblxuLyoqXG4gKiBAbmFtZSBOb0pTIEZpbHRlciBFbGVtZW50XG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNGaWx0ZXJFbGVtZW50XVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIEFsbG93IGZvciBhbiBpbnB1dCBlbGVtZW50IHRvIHBlcmZvcm0gY3VzdG9tIGZpbHRlcmluZyBvbiB0aGUgYXNzb2NpYXRlZCBib3VuZCBkYXRhLlxuICpcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIGZpbHRlcmluZyBhcHBsaWVkIHRvIHRoaXMgZWxlbWVudC4gKEN1cnJlbnRseSBvbmx5ICdzZWFyY2gnIGlzIHN1cHBvcnRlZClcbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtcHJlZml4LWRlc2NyaXB0aW9uIFNwZWNpZnkgYSBwcmVmaXggdG8gYXBwbHkgdG8gdGhlIGZpbHRlclxuICogQGF0dHJpYnV0ZXMtcHJlZml4LXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdWZmaXgtZGVzcmlwdGlvbiBTcGVjaWZ5IGEgc3VmZml4IHRvIGFwcGx5IHRvIHRoZSBmaWx0ZXJcbiAqIEBhdHRyaWJ1dGVzLXN1ZmZpeC10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtY29sdW1ucy1kZXNjcmlwdGlvbiBTcGVjaWZ5IHRoZSBjb2x1bW5zIGluIHRoZSB0YWJsZSB0aGF0IHRoaXMgZmlsdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKGNvbW1hIHNlcGFyYXRlZCBsaXN0ICdpZCxuYW1lLGRlc2NyaXB0aW9uJylcbiAqIEBhdHRyaWJ1dGVzLWNvbHVtbnMtdHlwZSBTdHJpbmdcbiAqXG4gKlxuICogPGlucHV0IHR5cGU9J3RleHQnICNlbGVtZW50IGZpbHRlckVsZW1lbnQgW21vZGVsXT0nZGF0YScgZmlsdGVyPSdzZWFyY2gnXG4gKiBjb2x1bW5zPSdpZCxidXllcl9uYW1lJyBwcmVmaXg9JyonIHN1ZmZpeD0nKicgcGxhY2Vob2xkZXI9J1NlYXJjaCBPcmRlcnMnPlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkZpbHRlckVsZW1lbnRdJyxcbiAgICBleHBvcnRBczogJ2ZpbHRlckVsZW1lbnQnXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoJ21vZGVsJykgZGF0YTogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ2ZpbHRlcicpIGZpbHRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgncHJlZml4JykgcHJlZml4OiBzdHJpbmc7XG4gICAgQElucHV0KCdzdWZmaXgnKSBzdWZmaXg6IHN0cmluZztcbiAgICBASW5wdXQoJ2NvbHVtbnMnKSBjb2x1bW5zOiBzdHJpbmc7XG4gICAgQElucHV0KCdmaWx0ZXJDbGFzcycpIGZpbHRlckNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlJykgbW9kZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnZGF0ZUZvcm1hdCcpIGRhdGVGb3JtYXQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgZXhwb3NlZCB0byB0aGUgZWxlbWVudCB3ZSBhcmUgYXR0YWNoZWQgdG8gYXMgYSB0ZW1wbGF0ZSB2YXJpYWJsZSxcbiAgICAgKiBzbyB0aGF0IHdlIGNhbiB1cGRhdGUgdGhlIGZpbHRlcnMgd2l0aCB0aGUgbmV3IGZpbHRlciB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWx0ZXJWYWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXIoZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RGaWx0ZXJPYmplY3QoZmlsdGVyVmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0RmlsdGVyT2JqZWN0KGZpbHRlclZhbHVlKSB7XG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBmaWx0ZXJWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZWZpeCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5wcmVmaXggKyBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSArIHRoaXMuc3VmZml4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb2x1bW5zOiB0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMuc3BsaXQoJywnKSA6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5maWx0ZXJNb2RlID0gdGhpcy5tb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5maWx0ZXJEYXRlRm9ybWF0ID0gdGhpcy5kYXRlRm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBCaW5kIFNhdmVcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBbbm9qc0JpbmRTYXZlXVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgU2F2ZSBEaXJlY3RpdmUgYWxsb3dzIGZvciBzaW1wbGUgc2F2aW5nIG9mIGRhdGEgYmFjayB0byB0aGUgc2VydmVyLiBUaGlzIHdpbGwgcmV0dXJuIHRoZSB1cGRhdGVkIGNvbnRlbnRzIG9mIGVpdGhlciB0aGUgTm9qc0JpbmRNb2RlbC5yZXN1bHRzIGFycmF5IG9yIHRoZSBOb2pzQmluZE1vZGVsLml0ZW0gb2JqZWN0IHRvIHRoZSBzZXJ2ZXIgZm9yIHByb2Nlc3NpbmcuXG4gKlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtZGVzY3JpcHRpb24gVGhlIFVSTCB3aGVyZSBvZiB0aGUgc2VydmVyIHdoZXJlIHRoZSBkYXRhIHNob3VsZCBiZSBzZW50IGZvciBwcm9jZXNzaW5nLlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLWRlc2NyaXB0aW9uIEFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byBzZW5kIGJhY2sgdG8gdGhlIHNlcnZlciB3aXRoIHRoZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZW5kIHRoZSBkYXRhIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS1kZXNjcmlwdGlvbiBUaGUgcm91dGUgdG8gbmF2aWdhdGUgdG8gb25jZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHJldHVybnMgc3VjY2Vzc2Z1bC5cbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLW9uU2F2ZS1kZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHNhdmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlc1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwuXG4gKiBAYXR0cmlidXRlcy1vbkVycm9yLXR5cGUgbWV0aG9kXG4gKlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gQWRkIHRoZSBub2pzQmluZFNhdmUgYXR0cmlidXRlIHRvIGFueSBlbGVtZW50LiBUaGUgYXNzb2NpYXRlZCBjbGljayBldmVudCBvbiB0aGF0IGVsZW1lbnQgd2lsbCBjYXVzZSB0aGUgZGF0YSB0byBzYXZlLlxuICogPGJ1dHRvbiBub2pzQmluZFNhdmUgc3RvcmU9XCJodHRwczovL3NvbWVzZXJ2aWNlL3NhdmVcIiBzdG9yZU9iamVjdFBhcmFtPVwib3JkZXJzXCIgW21vZGVsXT1cImRhdGFcIlxuICogICBbc3RvcmVQYXJhbXNdPVwie3VzZXJJZDogMjAwfVwiIHNhdmVkUm91dGU9XCIvdmlld3MvdXNlcnNcIlxuICogICAob25TYXZlKT1cImNhbGxNZU9uU2F2ZSgpXCIgKG9uRXJyb3IpPVwiZG9Tb21ldGhpbmcoKVwiPlxuICogICBTYXZlXG4gKiA8L2J1dHRvbj5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiU2F2ZV0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ21vZGVsJykgbW9kZWw6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdzdG9yZScpIHN0b3JlVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdzdG9yZVBhcmFtcycpIHN0b3JlUGFyYW1zOiBhbnk7XG4gICAgQElucHV0KCdzdG9yZU9iamVjdFBhcmFtJykgc3RvcmVPYmplY3RQYXJhbTogc3RyaW5nO1xuICAgIEBJbnB1dCgnc2F2ZWRSb3V0ZScpIHNhdmVkUm91dGU6IHN0cmluZztcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoJ29uU2F2ZScpIG9uU2F2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnb25FcnJvcicpIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKCRldmVudCkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuc3RvcmVQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXNbdGhpcy5zdG9yZU9iamVjdFBhcmFtIHx8ICdyZXN1bHRzJ10gPSB0aGlzLm1vZGVsLnJlc3VsdHM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWwuaXRlbSkge1xuICAgICAgICAgICAgICAgIHBvc3RQYXJhbXNbdGhpcy5zdG9yZU9iamVjdFBhcmFtIHx8ICdvYmplY3QnXSA9IHRoaXMubW9kZWwuaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLnN0b3JlVVJMLCBwb3N0UGFyYW1zKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYXZlZFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnNhdmVkUm91dGVdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZS5lbWl0KHsgcmVzdWx0czogcmVzdWx0cyB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBGb3JtXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNGb3JtXVxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb2pzIEZvcm0gZGlyZWN0aXZlIGFsbG93cyBmb3IgZGF0YSB0byBzb3VyY2VkIGZyb20gYSBVUkwgYW5kIGJvdW5kIHRvIGEgbW9kZWwsIHdoaWNoIGNhbiB0aGVuIGJlIHVzZWQgdG8gYmluZCB0byBmb3JtIGNvbXBvbmVudHMuIEFkZGl0aW9uYWwgZm9ybSB2YWxpZGF0aW9uIGNhbiBiZSBhZGRlZCB0byB0aGUgZm9ybSBpbnB1dHMuIEluIG9yZGVyIHRvIHNhdmUgZGF0YSBiYWNrIHRvIHRoZSBzZXJ2ZXIsIGEgc3RvcmUgVVJMIGFuZCBzdWJtaXQgYnV0dG9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGZvcm0gbWFya3VwLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHRvIGxvYWQgdGhlIGRhdGEgYXN5bmNocm9ub3VzbHkuIERhdGEgc2hvdWxkIGJlIHJldHVybmVkIGluIEpTT04gZm9ybWF0IGFzIGVpdGhlcjpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc291cmNlLXZhbHVlIGh0dHBzOi8vc29tZXNlcnZpY2UvcmVzdWx0cy5qc29uXG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtY29kZSB7aWQ6IDEsIG5hbWU6IHRlc3Rpbmd9IE9SPGJyPlt7aWQ6IDEsIG5hbWU6IHRlc3QxfSwge2lkOiAyLCBuYW1lOiB0ZXN0Mn1dIE9SPGJyPntyZXN1bHRzOiBbe2lkOiAxLi4ufSwge2lkOiAyLi4ufV0sIHRvdGFsQ291bnQ6IDJ9XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtZGVzY3JpcHRpb24gUGFyYW1ldGVycyBvYmplY3QgdG8gc2VuZCB3aXRoIHRoZSBTb3VyY2UgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zb3VyY2VQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgZGF0YVxuICogQGF0dHJpYnV0ZXMtc3RvcmUtZGVzY3JpcHRpb24gVGhlIHVybCB0byBzZW5kIGFueSBkaXJ0eSBkYXRhIGJhY2sgdG8gdGhlIHNlcnZlciBmb3IgcHJvY2Vzc2luZy5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy1kZXNjcmlwdGlvbiBQYXJhbWV0ZXJzIG9iamVjdCB0byBzZW5kIHdpdGggdGhlIFN0b3JlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHNlbmQgdGhlIGRhdGEgYmFjayB3aXRoLlxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS1kZXNjcmlwdGlvbiBUaGUgcm91dGUgdG8gbmF2aWdhdGUgdG8gb25jZSB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHJldHVybnMgc3VjY2Vzc2Z1bC5cbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS1kZXNjcmlwdGlvbiBJbiB0aGUgY2FzZSB3aGVyZSBhbiBhcnJheSBvZiBvYmplY3RzIGFyZSBiZWluZyBlZGl0ZWQsIG9ubHkgc2VuZCBiYWNrIHRoZSBvYmplY3RzIHdoZXJlIGNvbnRhaW5pbmcgZmllbGRzIGhhdmUgYmVlbiBjaGFuZ2VkLlxuICogQGF0dHJpYnV0ZXMtZGlydHlPbmx5LXR5cGUgQm9vbGVhbiAoZGVmYXVsdCBmYWxzZSlcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZC1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgb25jZSB0aGUgZGF0YSBoYXMgYmVlbiBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxuICogQGF0dHJpYnV0ZXMtb25Mb2FkLXR5cGUgbWV0aG9kXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci1kZXNjcmlwdGlvbiBFdmVudCByYWlzZWQgaW4gdGhlIHNjZW5hcmlvIHdoZXJlIHRoZXJlIGlzIGFuIGVycm9yIGxvYWRpbmcgdGhlIGRhdGEuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25TYXZlLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgc2F2ZSBzdWNjZXNzZnVsbHkgY29tcGxldGVzXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGVycm9yIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZpY2UgY2FsbC5cbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItdHlwZSBtZXRob2RcbiAqXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBUaGlzIGF0dHJpYnV0ZSBzaG91bGQgb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYSA8Zm9ybT4gZWxlbWVudC5cbiAqIDxmb3JtIG5vanNGb3JtIFttb2RlbF09XCJkYXRhXCIgc291cmNlPVwiL1BPU1QvU29tZXNlcnZpY2UvZ2V0T3JkZXJEYXRhXCJcbiAqICAgW3NvdXJjZVBhcmFtc109XCJ7b3JkZXJJZDogMzd9XCIgc3RvcmU9XCIvUE9TVC9Tb21lc2VydmljZS9zYXZlT3JkZXJzXCJcbiAqICAgc3RvcmVPYmplY3RQYXJhbT1cIm9yZGVyc1wiIHNhdmVkUm91dGU9XCIvbm9qcy1jb3JlXCI+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPklEPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uaWRcIiByZXF1aXJlZD5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5TdGF0dXM8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhdHVzXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0uc3RhdHVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3VidG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3VidG90YWxcIiBbKG5nTW9kZWwpXT1cImRhdGEuaXRlbS5zdWJ0b3RhbFwiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlRheGVzPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRheGVzXCIgWyhuZ01vZGVsKV09XCJkYXRhLml0ZW0udGF4ZXNcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5Ub3RhbDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0b3RhbFwiIFsobmdNb2RlbCldPVwiZGF0YS5pdGVtLnRvdGFsXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TYXZlPC9idXR0b24+XG4gKiA8L2Zvcm0+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkZvcm1dJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZvcm1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdzb3VyY2UnKSB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZVBhcmFtcycpIHNvdXJjZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnbW9kZWwnKSBkYXRhOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnc3RvcmUnKSBzdG9yZVVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3RvcmVQYXJhbXMnKSBzdG9yZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnc3RvcmVPYmplY3RQYXJhbScpIHN0b3JlT2JqZWN0UGFyYW06IHN0cmluZztcbiAgICBASW5wdXQoJ3NhdmVkUm91dGUnKSBzYXZlZFJvdXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCdkaXJ0eU9ubHknKSBkaXJ0eU9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCdvbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnb25Mb2FkRXJyb3InKSBvbkxvYWRFcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdvblNhdmUnKSBvblNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uRXJyb3InKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdGb3JtOiBOZ0Zvcm0sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFNvdXJjZURhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0U2F2ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTb3VyY2VEYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXggPSAwKTtcblxuICAgICAgICBtZXJnZSh0aGlzLmRhdGEuZmlsdGVycy5jaGFuZ2VzLCB0aGlzLmRhdGEucGFnZU9wdGlvbnMuY2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdHMgJiYgXy5pc0FycmF5KGRhdGEucmVzdWx0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEudG90YWxDb3VudCA9IGRhdGEudG90YWxDb3VudCB8fCBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnRvdGFsQ291bnQgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRFcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pdGVtID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnJlc3VsdHMgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5zb3VyY2VQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdCkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5maWx0ZXJzID0gdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5zaXplICYmIHRoaXMuZGF0YS5wYWdlT3B0aW9ucy5pbmRleCkge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemUgKiB0aGlzLmRhdGEucGFnZU9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLmxpbWl0ID0gdGhpcy5kYXRhLnBhZ2VPcHRpb25zLnNpemU7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QodGhpcy51cmwsIHBvc3RQYXJhbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNhdmVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5zdG9yZVVSTCkge1xuICAgICAgICAgICAgdGhpcy5uZ0Zvcm0ubmdTdWJtaXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJ0eU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcnR5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2godGhpcy5uZ0Zvcm0uZm9ybS5jb250cm9scywgKGNvbnRyb2wsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnR5LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJ0eS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YShkaXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLml0ZW0gJiYgdGhpcy5uZ0Zvcm0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlRGF0YShkaXJ0eT8pIHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5zdG9yZVBhcmFtcyB8fCB7fTtcblxuICAgICAgICBpZiAoZGlydHkpIHtcblxuICAgICAgICAgICAgY29uc3QgZGlydHlPYmplY3RzID0gW107XG5cbiAgICAgICAgICAgIGRpcnR5LmZvckVhY2goZGlydHlLZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0S2V5ID0gZGlydHlLZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJ0eUluZGV4ID0gXy5maW5kKHNwbGl0S2V5LCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzTmFOKE51bWJlcihrZXkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkaXJ0eU9iamVjdHMucHVzaCh0aGlzLmRhdGEucmVzdWx0c1tkaXJ0eUluZGV4XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcG9zdFBhcmFtc1t0aGlzLnN0b3JlT2JqZWN0UGFyYW0gfHwgJ3Jlc3VsdHMnXSA9IGRpcnR5T2JqZWN0cztcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zW3RoaXMuc3RvcmVPYmplY3RQYXJhbSB8fCAncmVzdWx0cyddID0gdGhpcy5kYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtc1t0aGlzLnN0b3JlT2JqZWN0UGFyYW0gfHwgJ29iamVjdCddID0gdGhpcy5kYXRhLml0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QodGhpcy5zdG9yZVVSTCwgcG9zdFBhcmFtcykudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zYXZlZFJvdXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmUuZW1pdCh7cmVzdWx0czogcmVzdWx0c30pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hSZWdleFZhbGlkYXRvcihtYXRjaDogUmVnRXhwKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGVkID0gbWF0Y2gudGVzdChjb250cm9sLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuICFtYXRjaGVkID8geydtYXRjaFJlZ2V4Jzoge3ZhbHVlOiBjb250cm9sLnZhbHVlfX0gOiBudWxsO1xuICAgIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiTWF0Y2hSZWdleF0nLFxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTWF0Y2hSZWdleERpcmVjdGl2ZSwgbXVsdGk6IHRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRjaFJlZ2V4RGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBASW5wdXQoJ2tiTWF0Y2hSZWdleCcpIG1hdGNoUmVnZXg6IHN0cmluZztcblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hSZWdleCA/IG1hdGNoUmVnZXhWYWxpZGF0b3IobmV3IFJlZ0V4cCh0aGlzLm1hdGNoUmVnZXgsICdpJykpKGNvbnRyb2wpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufSIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTkdfQVNZTkNfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYlJlbW90ZVZhbGlkYXRlXScsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19BU1lOQ19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgna2JSZW1vdGVWYWxpZGF0ZScpIHJlbW90ZVZhbGlkYXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCdyZW1vdGVPYmplY3RQYXJhbScpIHJlbW90ZU9iamVjdFBhcmFtOiBhbnk7XG4gICAgQElucHV0KCdyZW1vdGVPYmplY3RQYXJhbXMnKSByZW1vdGVPYmplY3RQYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVWYWxpZGF0ZSA/IHRoaXMucmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IodGhpcy5yZW1vdGVWYWxpZGF0ZSkoY29udHJvbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW90ZVZhbGlkYXRlVmFsaWRhdG9yKHJlbW90ZVVSTDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnJlbW90ZU9iamVjdFBhcmFtc1t0aGlzLnJlbW90ZU9iamVjdFBhcmFtXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUG9zdFJlcXVlc3QocmVtb3RlVVJMLCB0aGlzLnJlbW90ZU9iamVjdFBhcmFtcykudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWxpZCA/IHsgJ3JlbW90ZVZhbGlkYXRlJzogZmFsc2UgfSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuLyoqXG4gKlxuICogQG5hbWUgTm9KUyBBY3Rpb25cbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBub2pzLWFjdGlvblxuICogQHRlbXBsYXRlRGF0YSBhdHRyaWJ1dGVEYXRhXG4gKlxuICogQGRlc2NyaXB0aW9uIFRoZSBOb0pTIEJpbmQgRGlyZWN0aXZlIGFsbG93cyBmb3IgcmFwaWQgYmluZGluZyBvZiBhIEpTT04gZGF0YSBzb3VyY2UgdG8gYSBtb2RlbC4gVGhpcyBzaG91bGQgcHJpbWFyaWx5IGJlIHVzZWQgZm9yIGRyYXdpbmcgbGlzdHMgb2YgZGF0YSwgd2hlcmUgdGhlIGRhdGEgZG9lcyBub3QgY2hhbmdlIGFzIHRoZSByZXN1bHQgb2YgdXNlciBpbnB1dC4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG5vanNCaW5kU2F2ZSB0byBzZW5kIGFueSBtb2RlbCBjaGFuZ2VzIGJhY2sgdG8gdGhlIHNlcnZlci4gSWYgeW91IGFyZSBsb29raW5nIHRvIGltcGxlbWVudCBGb3JtIGJlaGF2aW91ciwgdGhlbiB1c2Ugbm9qc0Zvcm0uXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiQWN0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdhY3Rpb25VUkwnKSBhY3Rpb25VUkw6IHN0cmluZztcbiAgICBASW5wdXQoJ2FjdGlvblBhcmFtcycpIGFjdGlvblBhcmFtczogYW55O1xuXG4gICAgQE91dHB1dCgnc3RhcnRlZCcpIHN0YXJ0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnY29tcGxldGVkJykgY29tcGxldGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ2Vycm9yJykgZXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tFdmVudChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zdGFydGVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXM6IGFueSA9IHRoaXMuYWN0aW9uUGFyYW1zIHx8IHt9O1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLmFjdGlvblVSTCwgcG9zdFBhcmFtcykudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdChyZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBLaW5pYmluZEJpbmREaXJlY3RpdmUgfSBmcm9tICcuL2JpbmQva2luaWJpbmQtYmluZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci9raW5pYmluZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZmlsdGVyLWVsZW1lbnQva2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEh0dHBDbGllbnRKc29ucE1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEtpbmliaW5kU2F2ZURpcmVjdGl2ZSB9IGZyb20gJy4vYmluZC1zYXZlL2tpbmliaW5kLXNhdmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgS2luaWJpbmRGb3JtRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtL2tpbmliaW5kLWZvcm0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdGNoUmVnZXhEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkYXRvcnMvbWF0Y2gtcmVnZXguZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9hY3Rpb24va2luaWJpbmQtYWN0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRKc29ucE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEtpbmliaW5kQmluZERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZvcm1EaXJlY3RpdmUsXG4gICAgICAgIE1hdGNoUmVnZXhEaXJlY3RpdmUsXG4gICAgICAgIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgS2luaWJpbmRCaW5kRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZFNhdmVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRm9ybURpcmVjdGl2ZSxcbiAgICAgICAgTWF0Y2hSZWdleERpcmVjdGl2ZSxcbiAgICAgICAgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEtpbmliaW5kUmVxdWVzdFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nS2luaWJpbmRNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEtpbmliaW5kRmlsdGVycyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIGZpbHRlck9iamVjdD86IGFueTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEtpbmliaW5kUGFnZU9wdGlvbnMge1xuICAgIGNoYW5nZXM6IFN1YmplY3Q8YW55PjtcbiAgICBzaXplPzogbnVtYmVyO1xuICAgIGluZGV4PzogbnVtYmVyO1xuICAgIG9wdGlvbnM/OiBudW1iZXJbXTtcbn1cblxuLyoqXG4gKiBAbmFtZSBLaW5pYmluZE1vZGVsXG4gKiBAZG9jVHlwZSBNb2RlbFxuICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgdGhlIE1vZGVsIHRoYXQgbm9qcy1iaW5kLCBub2pzLWZpbHRlciwgbm9qcy1wYWdpbmF0b3IsIGFuZCBub2pzLWZpbHRlci1lbGVtZW50IGJpbmQgdG8uIEl0IHByb3ZpZGVzIGEgc3RydWN0dXJlIHRoYXQgYWxsb3dzIGZvciBlYWNoIG9mIHRoZXNlIG5vanMgY29tcG9uZW50cyB0byBtYW5hZ2UgdGhlaXIgb3duIHN0YXRlIGFuZCBkYXRhIGhhbmRsaW5nLlxuICogQHRlbXBsYXRlRGF0YSBtZW1iZXJEYXRhXG4gKlxuICogQG1lbWJlcnMtcmVzdWx0cy10eXBlIHByb3BlcnR5OiBhbnlbXVxuICogQG1lbWJlcnMtcmVzdWx0cy1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIGluIHRoZSBldmVudCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBhcmUgaW4gYXJyYXkgZm9ybS5cbiAqIEBtZW1iZXJzLXJlc3VsdHMtZGVmYXVsdFZhbHVlIEFycmF5XG4gKiBAbWVtYmVycy1pdGVtLXR5cGUgcHJvcGVydHk6IGFueVxuICogQG1lbWJlcnMtaXRlbS1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIHdoZW4gdGhlIHJldHVybmluZyB2YWx1ZSBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwgaXMgaW4gb2JqZWN0IGZvcm0uXG4gKiBAbWVtYmVycy1pdGVtLWRlZmF1bHRWYWx1ZSBPYmplY3RcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlc2NyaXB0aW9uIENvdW50IG9mIHRoZSB0b3RhbCByZXN1bHRzXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1vZmZzZXQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy1vZmZzZXQtZGVzY3JpcHRpb24gV2hlbiBsaW1pdGluZyByZXN1bHRzIHJldHVybmVkIGZyb20gc2VydmVyIHRoaXMgdmFsdWVzIHN0b3JlIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIEBtZW1iZXJzLW9mZnNldC1kZWZhdWx0VmFsdWUgMFxuICogQG1lbWJlcnMtZmlsdGVycy10eXBlIHByb3BlcnR5OiBOb2pzRmlsdGVyc1xuICogQG1lbWJlcnMtZmlsdGVycy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlcyB1c2VkIGZvciBmaWx0ZXJpbmcgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtZmlsdGVycy1kZWZhdWx0VmFsdWUgeyBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksIGZpbHRlck9iamVjdDoge30gfVxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtdHlwZSBwcm9wZXJ0eTogTm9qc1BhZ2VPcHRpb25zXG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIHZhbHVlcyB1c2VkIHRvIHBhZ2UgdGhlIHJlc3VsdHMgb24gdGhlIHNlcnZlci5cbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgc2l6ZTogMTAsIGluZGV4OiAwLCBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXSB9XG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy10eXBlIG1ldGhvZFxuICogQG1lbWJlcnMtc2V0UGFnZU9wdGlvbnMtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcGFnaW5nIHJlc3VsdHMgbmVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gU2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBOb2pzQmluZE1vZGVsIHRvIG1ha2UgdXNlIG9mIHRoaXMgb2JqZWN0LlxuICogY29uc3QgYmluZE1vZGVsID0gbmV3IE5vanNCaW5kTW9kZWwoKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEtpbmliaW5kTW9kZWwge1xuXG4gICAgcHVibGljIHJlc3VsdHM6IGFueVtdO1xuICAgIHB1YmxpYyBpdGVtOiBhbnk7XG4gICAgcHVibGljIHZhbHVlOiBhbnk7XG4gICAgcHVibGljIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgICBwdWJsaWMgb2Zmc2V0OiBudW1iZXI7XG4gICAgcHVibGljIGZpbHRlcnM6IEtpbmliaW5kRmlsdGVycztcbiAgICBwdWJsaWMgcGFnZU9wdGlvbnM6IEtpbmliaW5kUGFnZU9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3RvcihsaW1pdD86IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgICAgICB0aGlzLml0ZW0gPSB7fTtcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7XG4gICAgICAgICAgICBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3Q6IHt9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGFnZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksXG4gICAgICAgICAgICBzaXplOiBsaW1pdCxcbiAgICAgICAgICAgIGluZGV4OiAxLFxuICAgICAgICAgICAgb3B0aW9uczogWzEwLCAyNSwgNTAsIDEwMF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGFnZU9wdGlvbnMocGFnZVNpemUsIHBhZ2VJbmRleCkge1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLnNpemUgPSBwYWdlU2l6ZTtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5pbmRleCA9IHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBwYWdlU2l6ZSAqIHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG59XG4iXSwibmFtZXMiOlsiaHR0cCIsIkV2ZW50RW1pdHRlciIsIkh0dHBIZWFkZXJzIiwibWFwIiwiY2F0Y2hFcnJvciIsIkVNUFRZIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJtZXJnZSIsInN0YXJ0V2l0aCIsInN3aXRjaE1hcCIsIl8uaXNQbGFpbk9iamVjdCIsIl8uaXNBcnJheSIsIm9mIiwiXy5pc0VtcHR5IiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJPdXRwdXQiLCJfLmV4dGVuZCIsIkNvbXBvbmVudCIsInJvdXRlciIsIlJvdXRlciIsIkhvc3RMaXN0ZW5lciIsIm9ic2VydmFibGVPZiIsIl8uZm9yRWFjaCIsIl8uZmluZCIsIk5nRm9ybSIsIk5HX1ZBTElEQVRPUlMiLCJOR19BU1lOQ19WQUxJREFUT1JTIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJIdHRwQ2xpZW50SnNvbnBNb2R1bGUiLCJTdWJqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFVSSxnQ0FBb0JBLE9BQWdCO1lBQWhCLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJQyxpQkFBWSxFQUFxQixDQUFDO1NBQ2xFOzs7Ozs7O1FBRU0sZ0RBQWU7Ozs7OztzQkFBQyxHQUFXLEVBQUUsTUFBVyxFQUFFLE9BQWlCO2dCQUFqQix3QkFBQTtvQkFBQSxZQUFpQjs7Z0JBQzlELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztRQUd6QywrQ0FBYzs7Ozs7c0JBQUMsR0FBVyxFQUFFLE9BQWlCO2dCQUFqQix3QkFBQTtvQkFBQSxZQUFpQjs7Z0JBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O1FBR2hDLGlEQUFnQjs7Ozs7c0JBQUMsR0FBVyxFQUFFLE1BQVc7OztnQkFDNUMsSUFBTSxPQUFPLEdBQUcsSUFBSUMsZ0JBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7O2dCQUN4RSxJQUFNLE9BQU8sR0FBUSxFQUFFLE9BQU8sRUFBRSxP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