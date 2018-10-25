/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { KinibindModel } from '../shared/kinibind.model';
import { KinibindRequestService } from '../shared/kinibind-request.service';
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
        model: [{ type: Input, args: ['model',] }],
        multiple: [{ type: Input, args: ['multiple',] }],
        showCount: [{ type: Input, args: ['showCount',] }],
        filter: [{ type: Input, args: ['filter',] }],
        initialFilterValues: [{ type: Input, args: ['initialFilterValues',] }],
        withCredentials: [{ type: Input, args: ['withCredentials',] }]
    };
    return KinibindFilterComponent;
}());
export { KinibindFilterComponent };
if (false) {
    /** @type {?} */
    KinibindFilterComponent.prototype.url;
    /** @type {?} */
    KinibindFilterComponent.prototype.model;
    /** @type {?} */
    KinibindFilterComponent.prototype.multiple;
    /** @type {?} */
    KinibindFilterComponent.prototype.showCount;
    /** @type {?} */
    KinibindFilterComponent.prototype.filter;
    /** @type {?} */
    KinibindFilterComponent.prototype.initialFilterValues;
    /** @type {?} */
    KinibindFilterComponent.prototype.withCredentials;
    /** @type {?} */
    KinibindFilterComponent.prototype.filterValues;
    /** @type {?} */
    KinibindFilterComponent.prototype.kbRequest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWtpbmliaW5kLyIsInNvdXJjZXMiOlsiZmlsdGVyL2tpbmliaW5kLWZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4RHhFLGlDQUFvQixTQUFpQztRQUFqQyxjQUFTLEdBQVQsU0FBUyxDQUF3Qjs0QkFGMUIsRUFBRTtLQUc1Qjs7OztJQUVELDBDQUFROzs7SUFBUjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDekc7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDeEQsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0tBQ047Ozs7O0lBRU0sOENBQVk7Ozs7Y0FBQyxZQUFZO1FBQzVCLFlBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFD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QUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2Y7Ozs7Z0JBakRRLHNCQUFzQjs7O3NCQW9EMUIsS0FBSyxTQUFDLFFBQVE7d0JBQ2QsS0FBSyxTQUFDLE9BQU87MkJBQ2IsS0FBSyxTQUFDLFVBQVU7NEJBQ2hCLEtBQUssU0FBQyxXQUFXO3lCQUNqQixLQUFLLFNBQUMsUUFBUTtzQ0FDZCxLQUFLLFNBQUMscUJBQXFCO2tDQUMzQixLQUFLLFNBQUMsaUJBQWlCOztrQ0E5RDVCOztTQXNEYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBuYW1lIE5vSlMgRmlsdGVyXG4gKiBAZG9jVHlwZSBDb21wb25lbnRcbiAqIEB0YWcgbm9qcy1maWx0ZXJcbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBGaWx0ZXJpbmcgY29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGZpbHRlciBvcHRpb25zIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gc291cmNlLiBTZWxlY3RpbmcgYW55IG9mIHRoZXNlIG9wdGlvbnMgd2lsbCB1cGRhdGUgdGhlIGZpbHRlciBvYmplY3QgZnJvbSBbbW9kZWxdIHdoaWNoIHdpbGwgdHJpZ2dlciBhIHNlcnZlciBzaWRlIGZpbHRlciBvZiB0aGUgbW9kZWwuXG4gKlxuICogQGF0dHJpYnV0ZXMtc291cmNlLWRlc2NyaXB0aW9uIFRoZSBVUkwgdG8gY2FsbCB0byByZXRyaWV2ZSB0aGUgZmlsdGVyIG9wdGlvbnMgZnJvbSB0aGUgc2VydmVyLiBSZXR1cm4gbW9kZWwgZXhwZWN0ZWQgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gKiBAYXR0cmlidXRlcy1zb3VyY2UtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXNvdXJjZS12YWx1ZSBodHRwczovL3NvbWVzZXJ2aWNlL2ZpbHRlcnMuanNvblxuICogQGF0dHJpYnV0ZXMtc291cmNlLWNvZGUgW3tjb3VudDogMiwgbGFiZWw6IE9wdGlvbjE6IHZhbHVlOiAxfSw8YnI+e2NvdW50OiA0LCBsYWJlbDogT3B0aW9uMjogdmFsdWU6IDJ9XVxuICogQGF0dHJpYnV0ZXMtbW9kZWwtZGVzY3JpcHRpb24gVGhlIG9iamVjdCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNvdXJjZSB3aWxsIGJpbmQgaXRzZWxmIHRvLlxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdHlwZSBOb2pzQmluZE1vZGVsXG4gKiBAYXR0cmlidXRlcy1tb2RlbC12YWx1ZSBtb2RlbFxuICogQGF0dHJpYnV0ZXMtbXVsdGlwbGUtZGVzY3JpcHRpb24gQWxsb3cgbXVsdGlwbGUgZmlsdGVyIG9wdGlvbnMgdG8gYmUgc2VsZWN0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAqIEBhdHRyaWJ1dGVzLW11bHRpcGxlLXR5cGUgQm9vbGVhblxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLWRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBkYXRhYmFzZSBmaWVsZCB0aGF0IHRoZSBmaWx0ZXIgd2lsbCBiZSBhcHBsaWVkIHRvLlxuICogQGF0dHJpYnV0ZXMtZmlsdGVyLXR5cGUgU3RyaW5nXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtZGVzY3JpcHRpb24gVG9nZ2xlIHRoYXQgc2hvd3MgdGhlIGNvdW50IG9mIHJlc3VsdHMgZm9yIHRoZSBnaXZlbiBmaWx0ZXIuXG4gKiBAYXR0cmlidXRlcy1zaG93Q291bnQtdHlwZSBCb29sZWFuXG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLWRlc2NyaXB0aW9uIFNldCBmaWx0ZXIgdmFsdWVzIHVwb24gY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICogQGF0dHJpYnV0ZXMtaW5pdGlhbEZpbHRlclZhbHVlcy10eXBlIEpTT04gT2JqZWN0XG4gKiBAYXR0cmlidXRlcy1pbml0aWFsRmlsdGVyVmFsdWVzLXZhbHVlIHtzb21lVmFsdWU6IHRydWV9XG4gKlxuICogPG5vanMtZmlsdGVyIHNvdXJjZT1cImh0dHBzOi8vc29tZXNlcnZpY2UvZmlsdGVycy5qc29uXCJcbiAqIFtpbml0aWFsRmlsdGVyVmFsdWVzXT1cIntjb21wbGV0ZTogdHJ1ZX1cIlxuICogW21vZGVsXT1cIm1vZGVsXCIgbXVsdGlwbGU9XCJ0cnVlXCIgZmlsdGVyPVwidG90YWxcIiBzaG93Q291bnQ9XCJ0cnVlXCI+XG4gKiA8L25vanMtZmlsdGVyPlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2tiLWZpbHRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBmaWx0ZXJWYWx1ZSBvZiBmaWx0ZXJWYWx1ZXNcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibXVsdGlwbGVcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIChjaGFuZ2UpPVwidXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKVwiLz5cbiAgICAgICAge3tmaWx0ZXJWYWx1ZS5sYWJlbH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50XCI+KHt7ZmlsdGVyVmFsdWUuY291bnR9fSk8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8YSAqbmdJZj1cIiFtdWx0aXBsZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgIFtzdHlsZS5mb250LXdlaWdodF09XCJmaWx0ZXJWYWx1ZS5zZWxlY3RlZCA/ICdib2xkJyA6ICdub3JtYWwnXCIgKGNsaWNrKT1cInVwZGF0ZUZpbHRlcihmaWx0ZXJWYWx1ZSlcIj5cbiAgICAgICAge3tmaWx0ZXJWYWx1ZS5sYWJlbH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50XCI+KHt7ZmlsdGVyVmFsdWUuY291bnR9fSk8L3NwYW4+XG4gICAgPC9hPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NvdXJjZScpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZWwnKSBtb2RlbDogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ211bHRpcGxlJykgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgQElucHV0KCdzaG93Q291bnQnKSBzaG93Q291bnQ6IGJvb2xlYW47XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ2luaXRpYWxGaWx0ZXJWYWx1ZXMnKSBpbml0aWFsRmlsdGVyVmFsdWVzOiBhbnk7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZmlsdGVyVmFsdWVzOiBhbnkgPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2JSZXF1ZXN0OiBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QgPSBfLmV4dGVuZCh0aGlzLmluaXRpYWxGaWx0ZXJWYWx1ZXMsIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0KS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXIoZmlsdGVyT2JqZWN0KSB7XG4gICAgICAgIGZpbHRlck9iamVjdC5zZWxlY3RlZCA9ICFmaWx0ZXJPYmplY3Quc2VsZWN0ZWQ7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyT2JqZWN0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IFtmaWx0ZXJPYmplY3QudmFsdWVdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnB1c2goZmlsdGVyT2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uaW5kZXhPZihmaWx0ZXJPYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IGZpbHRlck9iamVjdC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3QpO1xuICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YShmaWx0ZXJzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgc2VlZENvbHVtbjogdGhpcy5maWx0ZXIsXG4gICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdCh0aGlzLnVybCwgcG9zdFBhcmFtcyk7XG4gICAgfVxufVxuIl19