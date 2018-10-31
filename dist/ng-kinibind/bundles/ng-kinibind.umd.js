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
                // If we have a reload trigger listen for changes and reset the model model.
                this.reloadTrigger.subscribe(function () {
                    _this.model.filters.filterObject = {};
                    _this.model.pageOptions.index = 1;
                });
                this.model.filters.changes.subscribe(function () { return _this.model.pageOptions.index = 1; });
                rxjs.merge(this.model.filters.changes, this.model.pageOptions.changes, this.reloadTrigger)
                    .pipe(operators.startWith({}), operators.switchMap(function () {
                    return _this.getData();
                }), operators.map(function (data) {
                    if (_.isPlainObject(data)) {
                        if (data.results && _.isArray(data.results)) {
                            _this.model.totalCount = data.totalCount || data.results.length;
                            return data.results;
                        }
                    }
                    else if (_.isArray(data)) {
                        _this.model.totalCount = data.length;
                    }
                    return data;
                }), operators.catchError(function (error) {
                    _this.onLoadError.emit(error);
                    return rxjs.of([]);
                })).subscribe(function (data) {
                    _this.model.data = data;
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
                if (!_.isEmpty(this.model.filters.filterObject)) {
                    postParams.filters = this.model.filters.filterObject;
                }
                if (this.model.pageOptions.size) {
                    postParams.pageSize = this.model.pageOptions.size;
                    postParams.page = this.model.pageOptions.index;
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
            model: [{ type: core.Input, args: ['model',] }],
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
                    this.model.filters.filterObject = _.extend(this.initialFilterValues, this.model.filters.filterObject);
                }
                this.getData(this.model.filters.filterObject).subscribe(function (data) {
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
                        var index = this.model.filters.filterObject[this.filter].indexOf(filterObject.value);
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
            model: [{ type: core.Input, args: ['model',] }],
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
                    delete this.model.filters.filterObject[this.filter];
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
            model: [{ type: core.Input, args: ['model',] }],
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
                    if (_.isArray(this.model.data) && this.model.data.length > 0) {
                        postParams = this.model.data;
                    }
                    else if (_.isObject(this.model.data)) {
                        postParams = this.model.data;
                    }
                }
                /** @type {?} */
                var method = this.method || 'POST';
                this.kbRequest.makeRequest(method, this.storeURL, {
                    body: method === 'GET' ? null : postParams,
                    params: method === 'GET' ? postParams : null,
                    withCredentials: this.withCredentials || false
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
                this.model.filters.changes.subscribe(function () { return _this.model.pageOptions.index = 0; });
                rxjs.merge(this.model.filters.changes, this.model.pageOptions.changes)
                    .pipe(operators.startWith({}), operators.switchMap(function () {
                    return _this.getData();
                }), operators.map(function (data) {
                    if (_.isPlainObject(data)) {
                        if (data.results && _.isArray(data.results)) {
                            _this.model.totalCount = data.totalCount || data.results.length;
                            return data.results;
                        }
                        else {
                            return data;
                        }
                    }
                    else if (_.isArray(data)) {
                        _this.model.totalCount = data.length;
                        return data;
                    }
                }), operators.catchError(function (error) {
                    _this.onLoadError.emit(error);
                    return rxjs.of([]);
                })).subscribe(function (data) {
                    _this.model.data = data;
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
                if (!_.isEmpty(this.model.filters.filterObject)) {
                    postParams.filters = this.model.filters.filterObject;
                }
                if (this.model.pageOptions.size) {
                    postParams.pageSize = this.model.pageOptions.size;
                    postParams.page = this.model.pageOptions.index;
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
                        if (_.isArray(_this.model.data) && _this.model.data.length > 0) {
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
                        else if (_.isObject(_this.model.data) && _this.ngForm.dirty) {
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
                        dirtyObjects_1.push(_this.model.data[dirtyIndex]);
                    });
                    postParams = dirtyObjects_1;
                }
                else {
                    if (_.isArray(this.model.data) && this.model.data.length > 0) {
                        postParams = this.model.data;
                    }
                    else if (_.isObject(this.model.data)) {
                        postParams = this.model.data;
                    }
                }
                /** @type {?} */
                var method = this.storeMethod ? this.storeMethod : 'POST';
                this.kbRequest.makeRequest(method, this.storeURL, {
                    body: method === 'GET' ? null : postParams,
                    params: method === 'GET' ? postParams : null,
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
            model: [{ type: core.Input, args: ['model',] }],
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
     * \@description The NoJS Bind Directive allows for rapid binding of a JSON model source to a model. This should primarily be used for drawing lists of model, where the model does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
     *
     *
     *
     */
    var KinibindActionDirective = (function () {
        function KinibindActionDirective(kbRequest, router$$1) {
            this.kbRequest = kbRequest;
            this.router = router$$1;
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
                    if (_this.successRoute) {
                        _this.router.navigate([_this.successRoute]);
                    }
                    else {
                        _this.completed.emit(result);
                    }
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
                { type: KinibindRequestService },
                { type: router.Router }
            ];
        };
        KinibindActionDirective.propDecorators = {
            actionURL: [{ type: core.Input, args: ['actionURL',] }],
            method: [{ type: core.Input, args: ['method',] }],
            actionParams: [{ type: core.Input, args: ['actionParams',] }],
            successRoute: [{ type: core.Input, args: ['successRoute',] }],
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
    var /**
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
     */ KinibindModel = (function () {
        function KinibindModel(data, pageSize, page) {
            this.data = data;
            this.totalCount = 0;
            this.offset = pageSize || 0;
            this.filters = {
                changes: new rxjs.Subject(),
                filterObject: {}
            };
            this.pageOptions = {
                changes: new rxjs.Subject(),
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1raW5pYmluZC9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9iaW5kL2tpbmliaW5kLWJpbmQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9maWx0ZXIva2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmcta2luaWJpbmQvZmlsdGVyLWVsZW1lbnQva2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9iaW5kLXNhdmUva2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL2Zvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL3ZhbGlkYXRvcnMvbWF0Y2gtcmVnZXguZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC92YWxpZGF0b3JzL3JlbW90ZS12YWxpZGF0ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLWtpbmliaW5kL2FjdGlvbi9raW5pYmluZC1hY3Rpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1raW5pYmluZC9uZy1raW5pYmluZC5tb2R1bGUudHMiLCJuZzovL25nLWtpbmliaW5kL3NoYXJlZC9raW5pYmluZC5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBqc29ucFJlcXVlc3RFcnJvcjogRXZlbnRFbWl0dGVyPEh0dHBFcnJvclJlc3BvbnNlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmpzb25wUmVxdWVzdEVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxIdHRwRXJyb3JSZXNwb25zZT4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZVJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QobWV0aG9kLCB1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlUG9zdFJlcXVlc3QodXJsOiBzdHJpbmcsIHBhcmFtczogYW55LCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlR2V0UmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZUpzb25wUmVxdWVzdCh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHsgaGVhZGVyczogaGVhZGVycyB9O1xuXG4gICAgICAgIC8vIFNldCBjYWxsYmFjayBwYXJhbSBmb3IgdGhlIEpTT05QIHJlcXVlc3QuXG4gICAgICAgIHBhcmFtcy5jYWxsYmFjayA9ICdKU09OUF9DQUxMQkFDSyc7XG5cbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBwYXJhbXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdqc29ucCcsIHVybCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5waXBlKG1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pLCBjYXRjaEVycm9yKChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBjbGllbnQtc2lkZSBvciBuZXR3b3JrIGVycm9yIG9jY3VycmVkLiBIYW5kbGUgaXQgYWNjb3JkaW5nbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkOicsIGVyci5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYmFja2VuZCByZXR1cm5lZCBhbiB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2UgY29kZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJlc3BvbnNlIGJvZHkgbWF5IGNvbnRhaW4gY2x1ZXMgYXMgdG8gd2hhdCB3ZW50IHdyb25nLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBCYWNrZW5kIHJldHVybmVkIGNvZGUgJHtlcnIuc3RhdHVzfSwgYm9keSB3YXM6ICR7ZXJyLmVycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuanNvbnBSZXF1ZXN0RXJyb3IuZW1pdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqXG4gKiBAbmFtZSBOb0pTIEJpbmRcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBub2pzLWJpbmRcbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIERpcmVjdGl2ZSBhbGxvd3MgZm9yIHJhcGlkIGJpbmRpbmcgb2YgYSBKU09OIG1vZGVsIHNvdXJjZSB0byBhIG1vZGVsLiBUaGlzIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBmb3IgZHJhd2luZyBsaXN0cyBvZiBtb2RlbCwgd2hlcmUgdGhlIG1vZGVsIGRvZXMgbm90IGNoYW5nZSBhcyB0aGUgcmVzdWx0IG9mIHVzZXIgaW5wdXQuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBub2pzQmluZFNhdmUgdG8gc2VuZCBhbnkgbW9kZWwgY2hhbmdlcyBiYWNrIHRvIHRoZSBzZXJ2ZXIuIElmIHlvdSBhcmUgbG9va2luZyB0byBpbXBsZW1lbnQgRm9ybSBiZWhhdmlvdXIsIHRoZW4gdXNlIG5vanNGb3JtLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHRvIGxvYWQgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgdXNlZCB0byBzZW5kIGJhY2sgdG8gdGhlIHNlcnZlciBpbiB0aGUgcG9zdCByZXF1ZXN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXR5cGUgT2JqZWN0LlxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIG1vZGVsXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIG9uY2UgdGhlIG1vZGVsIGhhcyBiZWVuIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLWRlc2NyaXB0aW9uIEV2ZW50IHJhaXNlZCBpbiB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlcmUgaXMgYW4gZXJyb3IgbG9hZGluZyB0aGUgbW9kZWwuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci10eXBlIG1ldGhvZFxuICpcbiAqXG4gKiBAZXhhbXBsZURlc2NyaXB0aW9uIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSA8bm9qcy1iaW5kPiB0YWdcbiAqIDxub2pzLWJpbmQgc291cmNlPVwiaHR0cHM6Ly9zb21lc2VydmljZS9yZXN1bHRzLmpzb25cIiBbc291cmNlUGFyYW1zXT1cInt1c2VySWQ6IDEwMH1cIlxuICogICBbbW9kZWxdPVwibW9kZWxcIj5cbiAqXG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWwubW9kZWxcIj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uaWR9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57aXRlbS5uYW1lfX08L3NwYW4+XG4gKiAgICAgPHNwYW4+e3tpdGVtLmRhdGV9fTwvc3Bhbj5cbiAqICAgICA8c3Bhbj57e2l0ZW0uYWRkcmVzc319PC9zcGFuPlxuICogICA8L2Rpdj5cbiAqXG4gKiA8L25vanMtYmluZD5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAna2ItYmluZCdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRCaW5kRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc291cmNlJykgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCdtZXRob2QnKSBtZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZVBhcmFtcycpIHNvdXJjZVBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnbW9kZWwnKSBtb2RlbDogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3JlbG9hZFRyaWdnZXInKSByZWxvYWRUcmlnZ2VyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgnb25Mb2FkJykgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uTG9hZEVycm9yJykgb25Mb2FkRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcmVsb2FkIHRyaWdnZXIgbGlzdGVuIGZvciBjaGFuZ2VzIGFuZCByZXNldCB0aGUgbW9kZWwgbW9kZWwuXG4gICAgICAgIHRoaXMucmVsb2FkVHJpZ2dlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5wYWdlT3B0aW9ucy5pbmRleCA9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLmluZGV4ID0gMSk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5tb2RlbC5maWx0ZXJzLmNoYW5nZXMsIHRoaXMubW9kZWwucGFnZU9wdGlvbnMuY2hhbmdlcywgdGhpcy5yZWxvYWRUcmlnZ2VyKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBfLmlzQXJyYXkoZGF0YS5yZXN1bHRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudG90YWxDb3VudCA9IGRhdGEudG90YWxDb3VudCB8fCBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRvdGFsQ291bnQgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmVtaXQoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5zb3VyY2VQYXJhbXMgfHwge307XG5cbiAgICAgICAgaWYgKCFfLmlzRW1wdHkodGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCkpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMuZmlsdGVycyA9IHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb2RlbC5wYWdlT3B0aW9ucy5zaXplKSB7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5tb2RlbC5wYWdlT3B0aW9ucy5zaXplO1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5wYWdlID0gdGhpcy5tb2RlbC5wYWdlT3B0aW9ucy5pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kID8gdGhpcy5tZXRob2QgOiAodGhpcy5zb3VyY2VQYXJhbXMgPyAnUE9TVCcgOiAnR0VUJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy51cmwsIHtwYXJhbXM6IHBvc3RQYXJhbXN9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBuYW1lIE5vSlMgRmlsdGVyXG4gKiBAZG9jVHlwZSBDb21wb25lbnRcbiAqIEB0YWcgbm9qcy1maWx0ZXJcbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBGaWx0ZXJpbmcgY29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGZpbHRlciBvcHRpb25zIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gc291cmNlLiBTZWxlY3RpbmcgYW55IG9mIHRoZXNlIG9wdGlvbnMgd2lsbCB1cGRhdGUgdGhlIGZpbHRlciBvYmplY3QgZnJvbSBbbW9kZWxdIHdoaWNoIHdpbGwgdHJpZ2dlciBhIHNlcnZlciBzaWRlIGZpbHRlciBvZiB0aGUgbW9kZWwuXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gY2FsbCB0byByZXRyaWV2ZSB0aGUgZmlsdGVyIG9wdGlvbnMgZnJvbSB0aGUgc2VydmVyLiBSZXR1cm4gbW9kZWwgZXhwZWN0ZWQgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL2ZpbHRlcnMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUgW3tjb3VudDogMiwgbGFiZWw6IE9wdGlvbjE6IHZhbHVlOiAxfSw8YnI+e2NvdW50OiA0LCBsYWJlbDogT3B0aW9uMjogdmFsdWU6IDJ9XVxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBtb2RlbFxuICogQGF0dHJpYnV0ZXMtbXVsdGlwbGUtZGVzY3JpcHRpb24gQWxsb3cgbXVsdGlwbGUgZmlsdGVyIG9wdGlvbnMgdG8gYmUgc2VsZWN0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAqIEBhdHRyaWJ1dGVzLW11bHRpcGxlLXR5cGUgQm9vbGVhblxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBkYXRhYmFzZSBmaWVsZCB0aGF0IHRoZSBmaWx0ZXIgd2lsbCBiZSBhcHBsaWVkIHRvLlxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtZGVzY3JpcHRpb24gVG9nZ2xlIHRoYXQgc2hvd3MgdGhlIGNvdW50IG9mIHJlc3VsdHMgZm9yIHRoZSBnaXZlbiBmaWx0ZXIuXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtdHlwZSBCb29sZWFuXG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLWRlc2NyaXB0aW9uIFNldCBmaWx0ZXIgdmFsdWVzIHVwb24gY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICogQGF0dHJpYnV0ZXMtaW5pdGlhbEZpbHRlclZhbHVlcy10eXBlIEpTT04gT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLXZhbHVlIHtzb21lVmFsdWU6IHRydWV9XG4gKlxuICogPG5vanMtZmlsdGVyIHNvdXJjZT1cImh0dHBzOi8vc29tZXNlcnZpY2UvZmlsdGVycy5qc29uXCJcbiAqIFtpbml0aWFsRmlsdGVyVmFsdWVzXT1cIntjb21wbGV0ZTogdHJ1ZX1cIlxuICogW21vZGVsXT1cIm1vZGVsXCIgbXVsdGlwbGU9XCJ0cnVlXCIgZmlsdGVyPVwidG90YWxcIiBzaG93Q291bnQ9XCJ0cnVlXCI+XG4gKiA8L25vanMtZmlsdGVyPlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2tiLWZpbHRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBmaWx0ZXJWYWx1ZSBvZiBmaWx0ZXJWYWx1ZXNcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibXVsdGlwbGVcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIChjaGFuZ2UpPVwidXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKVwiLz5cbiAgICAgICAge3tmaWx0ZXJWYWx1ZS5sYWJlbH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50XCI+KHt7ZmlsdGVyVmFsdWUuY291bnR9fSk8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8YSAqbmdJZj1cIiFtdWx0aXBsZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgIFtzdHlsZS5mb250LXdlaWdodF09XCJmaWx0ZXJWYWx1ZS5zZWxlY3RlZCA/ICdib2xkJyA6ICdub3JtYWwnXCIgKGNsaWNrKT1cInVwZGF0ZUZpbHRlcihmaWx0ZXJWYWx1ZSlcIj5cbiAgICAgICAge3tmaWx0ZXJWYWx1ZS5sYWJlbH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50XCI+KHt7ZmlsdGVyVmFsdWUuY291bnR9fSk8L3NwYW4+XG4gICAgPC9hPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NvdXJjZScpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZWwnKSBtb2RlbDogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ211bHRpcGxlJykgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgQElucHV0KCdzaG93Q291bnQnKSBzaG93Q291bnQ6IGJvb2xlYW47XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ2luaXRpYWxGaWx0ZXJWYWx1ZXMnKSBpbml0aWFsRmlsdGVyVmFsdWVzOiBhbnk7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZmlsdGVyVmFsdWVzOiBhbnkgPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QgPSBfLmV4dGVuZCh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMsIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0KS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0KSB7XG4gICAgICAgIGZpbHRlck9iamVjdC5zZWxlY3RlZCA9ICFmaWx0ZXJPYmplY3Quc2VsZWN0ZWQ7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyT2JqZWN0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IFtmaWx0ZXJPYmplY3QudmFsdWVdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnB1c2goZmlsdGVyT2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uaW5kZXhPZihmaWx0ZXJPYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IGZpbHRlck9iamVjdC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QpO1xuICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YShmaWx0ZXJzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgc2VlZENvbHVtbjogdGhpcy5maWx0ZXIsXG4gICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLnVybCwgcG9zdFBhcmFtcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5cbi8qKlxuICogQG5hbWUgTm9KUyBGaWx0ZXIgRWxlbWVudFxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRmlsdGVyRWxlbWVudF1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBBbGxvdyBmb3IgYW4gaW5wdXQgZWxlbWVudCB0byBwZXJmb3JtIGN1c3RvbSBmaWx0ZXJpbmcgb24gdGhlIGFzc29jaWF0ZWQgYm91bmQgbW9kZWwuXG4gKlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBtb2RlbFxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIGZpbHRlcmluZyBhcHBsaWVkIHRvIHRoaXMgZWxlbWVudC4gKEN1cnJlbnRseSBvbmx5ICdzZWFyY2gnIGlzIHN1cHBvcnRlZClcbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtcHJlZml4LWRlc2NyaXB0aW9uIFNwZWNpZnkgYSBwcmVmaXggdG8gYXBwbHkgdG8gdGhlIGZpbHRlclxuICogQGF0dHJpYnV0ZXMtcHJlZml4LXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdWZmaXgtZGVzcmlwdGlvbiBTcGVjaWZ5IGEgc3VmZml4IHRvIGFwcGx5IHRvIHRoZSBmaWx0ZXJcbiAqIEBhdHRyaWJ1dGVzLXN1ZmZpeC10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtY29sdW1ucy1kZXNjcmlwdGlvbiBTcGVjaWZ5IHRoZSBjb2x1bW5zIGluIHRoZSB0YWJsZSB0aGF0IHRoaXMgZmlsdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKGNvbW1hIHNlcGFyYXRlZCBsaXN0ICdpZCxuYW1lLGRlc2NyaXB0aW9uJylcbiAqIEBhdHRyaWJ1dGVzLWNvbHVtbnMtdHlwZSBTdHJpbmdcbiAqXG4gKlxuICogPGlucHV0IHR5cGU9J3RleHQnICNlbGVtZW50IGZpbHRlckVsZW1lbnQgW21vZGVsXT0nbW9kZWwnIGZpbHRlcj0nc2VhcmNoJ1xuICogY29sdW1ucz0naWQsYnV5ZXJfbmFtZScgcHJlZml4PScqJyBzdWZmaXg9JyonIHBsYWNlaG9sZGVyPSdTZWFyY2ggT3JkZXJzJz5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGaWx0ZXJFbGVtZW50XScsXG4gICAgZXhwb3J0QXM6ICdmaWx0ZXJFbGVtZW50J1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnZmlsdGVyJykgZmlsdGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCdwcmVmaXgnKSBwcmVmaXg6IHN0cmluZztcbiAgICBASW5wdXQoJ3N1ZmZpeCcpIHN1ZmZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgnY29sdW1ucycpIGNvbHVtbnM6IHN0cmluZztcbiAgICBASW5wdXQoJ2ZpbHRlckNsYXNzJykgZmlsdGVyQ2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoJ21vZGUnKSBtb2RlOiBzdHJpbmc7XG4gICAgQElucHV0KCdkYXRlRm9ybWF0JykgZGF0ZUZvcm1hdDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBleHBvc2VkIHRvIHRoZSBlbGVtZW50IHdlIGFyZSBhdHRhY2hlZCB0byBhcyBhIHRlbXBsYXRlIHZhcmlhYmxlLFxuICAgICAqIHNvIHRoYXQgd2UgY2FuIHVwZGF0ZSB0aGUgZmlsdGVycyB3aXRoIHRoZSBuZXcgZmlsdGVyIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZpbHRlclZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihmaWx0ZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdEZpbHRlck9iamVjdChmaWx0ZXJWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RGaWx0ZXJPYmplY3QoZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBmaWx0ZXJWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZWZpeCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5wcmVmaXggKyBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSArIHRoaXMuc3VmZml4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29sdW1uczogdGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLnNwbGl0KCcsJykgOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLmZpbHRlck1vZGUgPSB0aGlzLm1vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5maWx0ZXJEYXRlRm9ybWF0ID0gdGhpcy5kYXRlRm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQmluZCBTYXZlXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgW25vanNCaW5kU2F2ZV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIFNhdmUgRGlyZWN0aXZlIGFsbG93cyBmb3Igc2ltcGxlIHNhdmluZyBvZiBtb2RlbCBiYWNrIHRvIHRoZSBzZXJ2ZXIuIFRoaXMgd2lsbCByZXR1cm4gdGhlIHVwZGF0ZWQgY29udGVudHMgb2YgZWl0aGVyIHRoZSBOb2pzQmluZE1vZGVsLnJlc3VsdHMgYXJyYXkgb3IgdGhlIE5vanNCaW5kTW9kZWwuaXRlbSBvYmplY3QgdG8gdGhlIHNlcnZlciBmb3IgcHJvY2Vzc2luZy5cbiAqXG4gKiBAYXR0cmlidXRlcy1zdG9yZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHdoZXJlIG9mIHRoZSBzZXJ2ZXIgd2hlcmUgdGhlIG1vZGVsIHNob3VsZCBiZSBzZW50IGZvciBwcm9jZXNzaW5nLlxuICogQGF0dHJpYnV0ZXMtc3RvcmUtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLWRlc2NyaXB0aW9uIEFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byBzZW5kIGJhY2sgdG8gdGhlIHNlcnZlciB3aXRoIHRoZSBwb3N0IHJlcXVlc3QuXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc3RvcmVQYXJhbXMtdmFsdWUge3BhcmFtOiB2YWx1ZX1cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tZGVzY3JpcHRpb24gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZW5kIHRoZSBtb2RlbCBiYWNrIHdpdGguXG4gKiBAYXR0cmlidXRlcy1zdG9yZU9iamVjdFBhcmFtLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIG1vZGVsXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLWRlc2NyaXB0aW9uIFRoZSByb3V0ZSB0byBuYXZpZ2F0ZSB0byBvbmNlIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgcmV0dXJucyBzdWNjZXNzZnVsLlxuICogQGF0dHJpYnV0ZXMtc2F2ZWRSb3V0ZS10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtb25TYXZlLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgc2F2ZSBzdWNjZXNzZnVsbHkgY29tcGxldGVzXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGVycm9yIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZpY2UgY2FsbC5cbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItdHlwZSBtZXRob2RcbiAqXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBBZGQgdGhlIG5vanNCaW5kU2F2ZSBhdHRyaWJ1dGUgdG8gYW55IGVsZW1lbnQuIFRoZSBhc3NvY2lhdGVkIGNsaWNrIGV2ZW50IG9uIHRoYXQgZWxlbWVudCB3aWxsIGNhdXNlIHRoZSBtb2RlbCB0byBzYXZlLlxuICogPGJ1dHRvbiBub2pzQmluZFNhdmUgc3RvcmU9XCJodHRwczovL3NvbWVzZXJ2aWNlL3NhdmVcIiBzdG9yZU9iamVjdFBhcmFtPVwib3JkZXJzXCIgW21vZGVsXT1cIm1vZGVsXCJcbiAqICAgW3N0b3JlUGFyYW1zXT1cInt1c2VySWQ6IDIwMH1cIiBzYXZlZFJvdXRlPVwiL3ZpZXdzL3VzZXJzXCJcbiAqICAgKG9uU2F2ZSk9XCJjYWxsTWVPblNhdmUoKVwiIChvbkVycm9yKT1cImRvU29tZXRoaW5nKClcIj5cbiAqICAgU2F2ZVxuICogPC9idXR0b24+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYlNhdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZFNhdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnc3RvcmUnKSBzdG9yZVVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnbWV0aG9kJykgbWV0aG9kOiBzdHJpbmc7XG4gICAgQElucHV0KCdzYXZlZFJvdXRlJykgc2F2ZWRSb3V0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgnb25TYXZlJykgb25TYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkVycm9yJykgb25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZSgpIHtcbiAgICAgICAgbGV0IHBvc3RQYXJhbXM6IGFueTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgaWYgKF8uaXNBcnJheSh0aGlzLm1vZGVsLmRhdGEpICYmIHRoaXMubW9kZWwuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtcyA9IHRoaXMubW9kZWwuZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdCh0aGlzLm1vZGVsLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcG9zdFBhcmFtcyA9IHRoaXMubW9kZWwuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kIHx8ICdQT1NUJztcblxuICAgICAgICB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHRoaXMuc3RvcmVVUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9keTogbWV0aG9kID09PSAnR0VUJyA/IG51bGwgOiBwb3N0UGFyYW1zLFxuICAgICAgICAgICAgICAgIHBhcmFtczogbWV0aG9kID09PSAnR0VUJyA/IHBvc3RQYXJhbXMgOiBudWxsLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHMgfHwgZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5zYXZlZFJvdXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmUuZW1pdCh7IHJlc3VsdHM6IHJlc3VsdHMgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBLaW5pYmluZE1vZGVsIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLm1vZGVsJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgRm9ybVxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRm9ybV1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9qcyBGb3JtIGRpcmVjdGl2ZSBhbGxvd3MgZm9yIG1vZGVsIHRvIHNvdXJjZWQgZnJvbSBhIFVSTCBhbmQgYm91bmQgdG8gYSBtb2RlbCwgd2hpY2ggY2FuIHRoZW4gYmUgdXNlZCB0byBiaW5kIHRvIGZvcm0gY29tcG9uZW50cy4gQWRkaXRpb25hbCBmb3JtIHZhbGlkYXRpb24gY2FuIGJlIGFkZGVkIHRvIHRoZSBmb3JtIGlucHV0cy4gSW4gb3JkZXIgdG8gc2F2ZSBtb2RlbCBiYWNrIHRvIHRoZSBzZXJ2ZXIsIGEgc3RvcmUgVVJMIGFuZCBzdWJtaXQgYnV0dG9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGZvcm0gbWFya3VwLlxuICpcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS1kZXNjcmlwdGlvbiBUaGUgVVJMIHRvIGxvYWQgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5LiBEYXRhIHNob3VsZCBiZSByZXR1cm5lZCBpbiBKU09OIGZvcm1hdCBhcyBlaXRoZXI6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL3Jlc3VsdHMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUge2lkOiAxLCBuYW1lOiB0ZXN0aW5nfSBPUjxicj5be2lkOiAxLCBuYW1lOiB0ZXN0MX0sIHtpZDogMiwgbmFtZTogdGVzdDJ9XSBPUjxicj57cmVzdWx0czogW3tpZDogMS4uLn0sIHtpZDogMi4uLn1dLCB0b3RhbENvdW50OiAyfVxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLWRlc2NyaXB0aW9uIFBhcmFtZXRlcnMgb2JqZWN0IHRvIHNlbmQgd2l0aCB0aGUgU291cmNlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZVBhcmFtcy10eXBlIE9iamVjdFxuICogQGF0dHJpYnV0ZXMtc291cmNlUGFyYW1zLXZhbHVlIHtwYXJhbTogdmFsdWV9XG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIG1vZGVsXG4gKiBAYXR0cmlidXRlcy1zdG9yZS1kZXNjcmlwdGlvbiBUaGUgdXJsIHRvIHNlbmQgYW55IGRpcnR5IG1vZGVsIGJhY2sgdG8gdGhlIHNlcnZlciBmb3IgcHJvY2Vzc2luZy5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy1kZXNjcmlwdGlvbiBQYXJhbWV0ZXJzIG9iamVjdCB0byBzZW5kIHdpdGggdGhlIFN0b3JlIHBvc3QgcmVxdWVzdC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlUGFyYW1zLXR5cGUgT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1zdG9yZVBhcmFtcy12YWx1ZSB7cGFyYW06IHZhbHVlfVxuICogQGF0dHJpYnV0ZXMtc3RvcmVPYmplY3RQYXJhbS1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHNlbmQgdGhlIG1vZGVsIGJhY2sgd2l0aC5cbiAqIEBhdHRyaWJ1dGVzLXN0b3JlT2JqZWN0UGFyYW0tdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNhdmVkUm91dGUtZGVzY3JpcHRpb24gVGhlIHJvdXRlIHRvIG5hdmlnYXRlIHRvIG9uY2UgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciByZXR1cm5zIHN1Y2Nlc3NmdWwuXG4gKiBAYXR0cmlidXRlcy1zYXZlZFJvdXRlLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1kaXJ0eU9ubHktZGVzY3JpcHRpb24gSW4gdGhlIGNhc2Ugd2hlcmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhcmUgYmVpbmcgZWRpdGVkLCBvbmx5IHNlbmQgYmFjayB0aGUgb2JqZWN0cyB3aGVyZSBjb250YWluaW5nIGZpZWxkcyBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIEBhdHRyaWJ1dGVzLWRpcnR5T25seS10eXBlIEJvb2xlYW4gKGRlZmF1bHQgZmFsc2UpXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtZGVzY3JpcHRpb24gRXZlbnQgcmFpc2VkIG9uY2UgdGhlIG1vZGVsIGhhcyBiZWVuIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWQtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uTG9hZEVycm9yLWRlc2NyaXB0aW9uIEV2ZW50IHJhaXNlZCBpbiB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlcmUgaXMgYW4gZXJyb3IgbG9hZGluZyB0aGUgbW9kZWwuXG4gKiBAYXR0cmlidXRlcy1vbkxvYWRFcnJvci10eXBlIG1ldGhvZFxuICogQGF0dHJpYnV0ZXMtb25TYXZlLWRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgc2F2ZSBzdWNjZXNzZnVsbHkgY29tcGxldGVzXG4gKiBAYXR0cmlidXRlcy1vblNhdmUtdHlwZSBtZXRob2RcbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIGFuIGVycm9yIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZpY2UgY2FsbC5cbiAqIEBhdHRyaWJ1dGVzLW9uRXJyb3ItdHlwZSBtZXRob2RcbiAqXG4gKlxuICogQGV4YW1wbGVEZXNjcmlwdGlvbiBUaGlzIGF0dHJpYnV0ZSBzaG91bGQgb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYSA8Zm9ybT4gZWxlbWVudC5cbiAqIDxmb3JtIG5vanNGb3JtIFttb2RlbF09XCJtb2RlbFwiIHNvdXJjZT1cIi9QT1NUL1NvbWVzZXJ2aWNlL2dldE9yZGVyRGF0YVwiXG4gKiAgIFtzb3VyY2VQYXJhbXNdPVwie29yZGVySWQ6IDM3fVwiIHN0b3JlPVwiL1BPU1QvU29tZXNlcnZpY2Uvc2F2ZU9yZGVyc1wiXG4gKiAgIHN0b3JlT2JqZWN0UGFyYW09XCJvcmRlcnNcIiBzYXZlZFJvdXRlPVwiL25vanMtY29yZVwiPlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5JRDwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiIFsobmdNb2RlbCldPVwibW9kZWwuaXRlbS5pZFwiIHJlcXVpcmVkPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlN0YXR1czwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzdGF0dXNcIiBbKG5nTW9kZWwpXT1cIm1vZGVsLml0ZW0uc3RhdHVzXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwicGFkZGluZzogMjBweFwiPlxuICogICA8bGFiZWw+U3VidG90YWw8L2xhYmVsPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3VidG90YWxcIiBbKG5nTW9kZWwpXT1cIm1vZGVsLml0ZW0uc3VidG90YWxcIj5cbiAqIDwvZGl2PlxuICpcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJwYWRkaW5nOiAyMHB4XCI+XG4gKiAgIDxsYWJlbD5UYXhlczwvbGFiZWw+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0YXhlc1wiIFsobmdNb2RlbCldPVwibW9kZWwuaXRlbS50YXhlc1wiPlxuICogPC9kaXY+XG4gKlxuICogPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cInBhZGRpbmc6IDIwcHhcIj5cbiAqICAgPGxhYmVsPlRvdGFsPC9sYWJlbD5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRvdGFsXCIgWyhuZ01vZGVsKV09XCJtb2RlbC5pdGVtLnRvdGFsXCI+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TYXZlPC9idXR0b24+XG4gKiA8L2Zvcm0+XG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkZvcm1dJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZvcm1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdzb3VyY2UnKSB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoJ3NvdXJjZU1ldGhvZCcpIHNvdXJjZU1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc291cmNlUGFyYW1zJykgc291cmNlUGFyYW1zOiBhbnk7XG4gICAgQElucHV0KCdtb2RlbCcpIG1vZGVsOiBLaW5pYmluZE1vZGVsO1xuICAgIEBJbnB1dCgnc3RvcmUnKSBzdG9yZVVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3RvcmVNZXRob2QnKSBzdG9yZU1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc2F2ZWRSb3V0ZScpIHNhdmVkUm91dGU6IHN0cmluZztcbiAgICBASW5wdXQoJ2RpcnR5T25seScpIGRpcnR5T25seTogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3dpdGhDcmVkZW50aWFscycpIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoJ29uTG9hZCcpIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdvbkxvYWRFcnJvcicpIG9uTG9hZEVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoJ29uU2F2ZScpIG9uU2F2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnb25FcnJvcicpIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0Zvcm06IE5nRm9ybSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0U291cmNlRGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRTYXZlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNvdXJjZURhdGEoKSB7XG4gICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLmluZGV4ID0gMCk7XG5cbiAgICAgICAgbWVyZ2UodGhpcy5tb2RlbC5maWx0ZXJzLmNoYW5nZXMsIHRoaXMubW9kZWwucGFnZU9wdGlvbnMuY2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdHMgJiYgXy5pc0FycmF5KGRhdGEucmVzdWx0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRvdGFsQ291bnQgPSBkYXRhLnRvdGFsQ291bnQgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudG90YWxDb3VudCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZEVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKFtdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBwb3N0UGFyYW1zOiBhbnkgPSB0aGlzLnNvdXJjZVBhcmFtcyB8fCB7fTtcblxuICAgICAgICBpZiAoIV8uaXNFbXB0eSh0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0KSkge1xuICAgICAgICAgICAgcG9zdFBhcmFtcy5maWx0ZXJzID0gdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLnNpemUpIHtcbiAgICAgICAgICAgIHBvc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLnNpemU7XG4gICAgICAgICAgICBwb3N0UGFyYW1zLnBhZ2UgPSB0aGlzLm1vZGVsLnBhZ2VPcHRpb25zLmluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5zb3VyY2VNZXRob2QgPyB0aGlzLnNvdXJjZU1ldGhvZCA6ICh0aGlzLnNvdXJjZVBhcmFtcyA/ICdQT1NUJyA6ICdHRVQnKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnVybCwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnNvdXJjZVBhcmFtcyxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U2F2ZURhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0b3JlVVJMKSB7XG4gICAgICAgICAgICB0aGlzLm5nRm9ybS5uZ1N1Ym1pdC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkodGhpcy5tb2RlbC5kYXRhKSAmJiB0aGlzLm1vZGVsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJ0eU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcnR5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2godGhpcy5uZ0Zvcm0uZm9ybS5jb250cm9scywgKGNvbnRyb2wsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnR5LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJ0eS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlRGF0YShkaXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdCh0aGlzLm1vZGVsLmRhdGEpICYmIHRoaXMubmdGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZURhdGEoZGlydHk/KSB7XG4gICAgICAgIGxldCBwb3N0UGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKGRpcnR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpcnR5T2JqZWN0cyA9IFtdO1xuXG4gICAgICAgICAgICBkaXJ0eS5mb3JFYWNoKGRpcnR5S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGxpdEtleSA9IGRpcnR5S2V5LnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlydHlJbmRleCA9IF8uZmluZChzcGxpdEtleSwga2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc05hTihOdW1iZXIoa2V5KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGlydHlPYmplY3RzLnB1c2godGhpcy5tb2RlbC5kYXRhW2RpcnR5SW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwb3N0UGFyYW1zID0gZGlydHlPYmplY3RzO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXy5pc0FycmF5KHRoaXMubW9kZWwuZGF0YSkgJiYgdGhpcy5tb2RlbC5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5tb2RlbC5kYXRhO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHRoaXMubW9kZWwuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBwb3N0UGFyYW1zID0gdGhpcy5tb2RlbC5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5zdG9yZU1ldGhvZCA/IHRoaXMuc3RvcmVNZXRob2QgOiAnUE9TVCc7XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB0aGlzLnN0b3JlVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJvZHk6IG1ldGhvZCA9PT0gJ0dFVCcgPyBudWxsIDogcG9zdFBhcmFtcyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG1ldGhvZCA9PT0gJ0dFVCcgPyBwb3N0UGFyYW1zIDogbnVsbCxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc2F2ZWRSb3V0ZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlLmVtaXQoeyByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hSZWdleFZhbGlkYXRvcihtYXRjaDogUmVnRXhwKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGVkID0gbWF0Y2gudGVzdChjb250cm9sLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuICFtYXRjaGVkID8geydtYXRjaFJlZ2V4Jzoge3ZhbHVlOiBjb250cm9sLnZhbHVlfX0gOiBudWxsO1xuICAgIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiTWF0Y2hSZWdleF0nLFxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTWF0Y2hSZWdleERpcmVjdGl2ZSwgbXVsdGk6IHRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRjaFJlZ2V4RGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBASW5wdXQoJ2tiTWF0Y2hSZWdleCcpIG1hdGNoUmVnZXg6IHN0cmluZztcblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hSZWdleCA/IG1hdGNoUmVnZXhWYWxpZGF0b3IobmV3IFJlZ0V4cCh0aGlzLm1hdGNoUmVnZXgsICdpJykpKGNvbnRyb2wpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufSIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTkdfQVNZTkNfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYlJlbW90ZVZhbGlkYXRlXScsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19BU1lOQ19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgna2JSZW1vdGVWYWxpZGF0ZScpIHJlbW90ZVZhbGlkYXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCdtZXRob2QnKSBtZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ2tleScpIGtleTogc3RyaW5nO1xuICAgIEBJbnB1dCgnd2l0aENyZWRlbnRpYWxzJykgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCdyZW1vdGVQYXJhbXMnKSByZW1vdGVQYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVWYWxpZGF0ZSA/IHRoaXMucmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IodGhpcy5yZW1vdGVWYWxpZGF0ZSkoY29udHJvbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW90ZVZhbGlkYXRlVmFsaWRhdG9yKHJlbW90ZVVSTDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuXG4gICAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2QgPyB0aGlzLm1ldGhvZCA6ICh0aGlzLnJlbW90ZVBhcmFtcyA/ICdQT1NUJyA6ICdHRVQnKTtcblxuICAgICAgICAgICAgICAgIGxldCB1cmw7XG4gICAgICAgICAgICAgICAgaWYgKHJlbW90ZVVSTC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHJlbW90ZVVSTCArIGAmJHt0aGlzLmtleX09JHtjb250cm9sLnZhbHVlfWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVtb3RlVVJMICsgYD8ke3RoaXMua2V5fT0ke2NvbnRyb2wudmFsdWV9YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rYlJlcXVlc3QubWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnJlbW90ZVBhcmFtc1xuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHZhbGlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdmFsaWQgPyB7ICdyZW1vdGVWYWxpZGF0ZSc6IGZhbHNlIH0gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH07XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbi8qKlxuICpcbiAqIEBuYW1lIE5vSlMgQWN0aW9uXG4gKiBAZG9jVHlwZSBEaXJlY3RpdmVcbiAqIEB0YWcgbm9qcy1hY3Rpb25cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBUaGUgTm9KUyBCaW5kIERpcmVjdGl2ZSBhbGxvd3MgZm9yIHJhcGlkIGJpbmRpbmcgb2YgYSBKU09OIG1vZGVsIHNvdXJjZSB0byBhIG1vZGVsLiBUaGlzIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBmb3IgZHJhd2luZyBsaXN0cyBvZiBtb2RlbCwgd2hlcmUgdGhlIG1vZGVsIGRvZXMgbm90IGNoYW5nZSBhcyB0aGUgcmVzdWx0IG9mIHVzZXIgaW5wdXQuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBub2pzQmluZFNhdmUgdG8gc2VuZCBhbnkgbW9kZWwgY2hhbmdlcyBiYWNrIHRvIHRoZSBzZXJ2ZXIuIElmIHlvdSBhcmUgbG9va2luZyB0byBpbXBsZW1lbnQgRm9ybSBiZWhhdmlvdXIsIHRoZW4gdXNlIG5vanNGb3JtLlxuICpcbiAqXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trYkFjdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnYWN0aW9uVVJMJykgYWN0aW9uVVJMOiBzdHJpbmc7XG4gICAgQElucHV0KCdtZXRob2QnKSBtZXRob2Q6IHN0cmluZztcbiAgICBASW5wdXQoJ2FjdGlvblBhcmFtcycpIGFjdGlvblBhcmFtczogYW55O1xuICAgIEBJbnB1dCgnc3VjY2Vzc1JvdXRlJykgc3VjY2Vzc1JvdXRlOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCdzdGFydGVkJykgc3RhcnRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdjb21wbGV0ZWQnKSBjb21wbGV0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnZXJyb3InKSBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja0V2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQuZW1pdCh0cnVlKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMuYWN0aW9uUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgIHRoaXMua2JSZXF1ZXN0Lm1ha2VSZXF1ZXN0KG1ldGhvZCwgdGhpcy5hY3Rpb25VUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmFjdGlvblBhcmFtc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWNjZXNzUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc3VjY2Vzc1JvdXRlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEtpbmliaW5kQmluZERpcmVjdGl2ZSB9IGZyb20gJy4vYmluZC9raW5pYmluZC1iaW5kLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9maWx0ZXItZWxlbWVudC9raW5pYmluZC1maWx0ZXItZWxlbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudEpzb25wTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgS2luaWJpbmRTYXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9iaW5kLXNhdmUva2luaWJpbmQtc2F2ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLaW5pYmluZEZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0va2luaWJpbmQtZm9ybS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0Y2hSZWdleERpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWRhdG9ycy9tYXRjaC1yZWdleC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZGF0b3JzL3JlbW90ZS12YWxpZGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2FjdGlvbi9raW5pYmluZC1hY3Rpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudEpzb25wTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgS2luaWJpbmRCaW5kRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2luaWJpbmRTYXZlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRm9ybURpcmVjdGl2ZSxcbiAgICAgICAgTWF0Y2hSZWdleERpcmVjdGl2ZSxcbiAgICAgICAgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBLaW5pYmluZEJpbmREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGb3JtRGlyZWN0aXZlLFxuICAgICAgICBNYXRjaFJlZ2V4RGlyZWN0aXZlLFxuICAgICAgICBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgS2luaWJpbmRSZXF1ZXN0U2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdLaW5pYmluZE1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRGaWx0ZXJzIHtcbiAgICBjaGFuZ2VzOiBTdWJqZWN0PGFueT47XG4gICAgZmlsdGVyT2JqZWN0PzogYW55O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRQYWdlT3B0aW9ucyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgaW5kZXg/OiBudW1iZXI7XG4gICAgb3B0aW9ucz86IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEBuYW1lIEtpbmliaW5kTW9kZWxcbiAqIEBkb2NUeXBlIE1vZGVsXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB0aGUgTW9kZWwgdGhhdCBub2pzLWJpbmQsIG5vanMtZmlsdGVyLCBub2pzLXBhZ2luYXRvciwgYW5kIG5vanMtZmlsdGVyLWVsZW1lbnQgYmluZCB0by4gSXQgcHJvdmlkZXMgYSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgZm9yIGVhY2ggb2YgdGhlc2Ugbm9qcyBjb21wb25lbnRzIHRvIG1hbmFnZSB0aGVpciBvd24gc3RhdGUgYW5kIG1vZGVsIGhhbmRsaW5nLlxuICogQHRlbXBsYXRlRGF0YSBtZW1iZXJEYXRhXG4gKlxuICogQG1lbWJlcnMtcmVzdWx0cy10eXBlIHByb3BlcnR5OiBhbnlbXVxuICogQG1lbWJlcnMtcmVzdWx0cy1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIGluIHRoZSBldmVudCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBhcmUgaW4gYXJyYXkgZm9ybS5cbiAqIEBtZW1iZXJzLXJlc3VsdHMtZGVmYXVsdFZhbHVlIEFycmF5XG4gKiBAbWVtYmVycy1pdGVtLXR5cGUgcHJvcGVydHk6IGFueVxuICogQG1lbWJlcnMtaXRlbS1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIHdoZW4gdGhlIHJldHVybmluZyB2YWx1ZSBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwgaXMgaW4gb2JqZWN0IGZvcm0uXG4gKiBAbWVtYmVycy1pdGVtLWRlZmF1bHRWYWx1ZSBPYmplY3RcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlc2NyaXB0aW9uIENvdW50IG9mIHRoZSB0b3RhbCByZXN1bHRzXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1vZmZzZXQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy1vZmZzZXQtZGVzY3JpcHRpb24gV2hlbiBsaW1pdGluZyByZXN1bHRzIHJldHVybmVkIGZyb20gc2VydmVyIHRoaXMgdmFsdWVzIHN0b3JlIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIEBtZW1iZXJzLW9mZnNldC1kZWZhdWx0VmFsdWUgMFxuICogQG1lbWJlcnMtZmlsdGVycy10eXBlIHByb3BlcnR5OiBOb2pzRmlsdGVyc1xuICogQG1lbWJlcnMtZmlsdGVycy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlcyB1c2VkIGZvciBmaWx0ZXJpbmcgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtZmlsdGVycy1kZWZhdWx0VmFsdWUgeyBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksIGZpbHRlck9iamVjdDoge30gfVxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtdHlwZSBwcm9wZXJ0eTogTm9qc1BhZ2VPcHRpb25zXG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIHZhbHVlcyB1c2VkIHRvIHBhZ2UgdGhlIHJlc3VsdHMgb24gdGhlIHNlcnZlci5cbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgc2l6ZTogMTAsIGluZGV4OiAwLCBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXSB9XG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy10eXBlIG1ldGhvZFxuICogQG1lbWJlcnMtc2V0UGFnZU9wdGlvbnMtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcGFnaW5nIHJlc3VsdHMgbmVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gU2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBOb2pzQmluZE1vZGVsIHRvIG1ha2UgdXNlIG9mIHRoaXMgb2JqZWN0LlxuICogY29uc3QgYmluZE1vZGVsID0gbmV3IE5vanNCaW5kTW9kZWwoKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEtpbmliaW5kTW9kZWwge1xuXG4gICAgcHVibGljIGRhdGE6IGFueTtcbiAgICBwdWJsaWMgdG90YWxDb3VudDogbnVtYmVyO1xuICAgIHB1YmxpYyBvZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZmlsdGVyczogS2luaWJpbmRGaWx0ZXJzO1xuICAgIHB1YmxpYyBwYWdlT3B0aW9uczogS2luaWJpbmRQYWdlT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE/OiBhbnksIHBhZ2VTaXplPzogbnVtYmVyLCBwYWdlPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gcGFnZVNpemUgfHwgMDtcbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge1xuICAgICAgICAgICAgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLFxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0OiB7fVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zID0ge1xuICAgICAgICAgICAgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLFxuICAgICAgICAgICAgc2l6ZTogcGFnZVNpemUsXG4gICAgICAgICAgICBpbmRleDogcGFnZSB8fCAxLFxuICAgICAgICAgICAgb3B0aW9uczogWzEwLCAyNSwgNTAsIDEwMF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGFnZU9wdGlvbnMocGFnZVNpemUsIHBhZ2VJbmRleCkge1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zLnNpemUgPSBwYWdlU2l6ZTtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5pbmRleCA9IHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBwYWdlU2l6ZSAqIHBhZ2VJbmRleDtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxuXG59XG4iXSwibmFtZXMiOlsiaHR0cCIsIkV2ZW50RW1pdHRlciIsIkh0dHBIZWFkZXJzIiwibWFwIiwiY2F0Y2hFcnJvciIsIkVNUFRZIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJtZXJnZSIsInN0YXJ0V2l0aCIsInN3aXRjaE1hcCIsIl8uaXNQbGFpbk9iamVjdCIsIl8uaXNBcnJheSIsIm9mIiwiXy5pc0VtcHR5IiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJPdXRwdXQiLCJfLmV4dGVuZCIsIkNvbXBvbmVudCIsInJvdXRlciIsIl8uaXNPYmplY3QiLCJSb3V0ZXIiLCJIb3N0TGlzdGVuZXIiLCJvYnNlcnZhYmxlT2YiLCJfLmZvckVhY2giLCJfLmZpbmQiLCJOZ0Zvcm0iLCJOR19WQUxJREFUT1JTIiwiTkdfQVNZTkNfVkFMSURBVE9SUyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiSHR0cENsaWVudEpzb25wTW9kdWxlIiwiU3ViamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBVUksZ0NBQW9CQSxPQUFnQjtZQUFoQixTQUFJLEdBQUpBLE9BQUksQ0FBWTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSUMsaUJBQVksRUFBcUIsQ0FBQztTQUNsRTs7Ozs7OztRQUVNLDRDQUFXOzs7Ozs7c0JBQUMsTUFBYyxFQUFFLEdBQVcsRUFBRSxPQUFpQjtnQkFBakIsd0JBQUE7b0JBQUEsWUFBaUI7O2dCQUM3RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7O1FBRzVDLGdEQUFlOzs7Ozs7c0JBQUMsR0FBVyxFQUFFLE1BQVcsRUFBRSxPQUFpQjtnQkFBakIsd0JBQUE7b0JBQUEsWUFBaUI7O2dCQUM5RCxPQUFPLElBQUksQ0FBQyxJQUFJ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