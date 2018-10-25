/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { KinibindModel } from '../shared/kinibind.model';
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
        { type: Directive, args: [{
                    selector: '[kbFilterElement]',
                    exportAs: 'filterElement'
                },] },
    ];
    /** @nocollapse */
    KinibindFilterElementDirective.ctorParameters = function () { return []; };
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
    return KinibindFilterElementDirective;
}());
export { KinibindFilterElementDirective };
if (false) {
    /** @type {?} */
    KinibindFilterElementDirective.prototype.model;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.filter;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.prefix;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.suffix;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.columns;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.filterClass;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.mode;
    /** @type {?} */
    KinibindFilterElementDirective.prototype.dateFormat;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJmaWx0ZXItZWxlbWVudC9raW5pYmluZC1maWx0ZXItZWxlbWVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5Q3JEO0tBQ0M7Ozs7Ozs7O0lBUU0scURBQVk7Ozs7Ozs7Y0FBQyxXQUFXO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7O0lBR3BDLDhEQUFxQjs7OztjQUFDLFdBQVc7UUFDckMsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZEO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBQ0osSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQzthQUNyQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNyQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQzNDLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDN0QsQ0FBQztZQUVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDdkU7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ25GO1NBQ0o7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Z0JBdkQ3QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLGVBQWU7aUJBQzVCOzs7Ozt3QkFHSSxLQUFLLFNBQUMsT0FBTzt5QkFDYixLQUFLLFNBQUMsUUFBUTt5QkFDZCxLQUFLLFNBQUMsUUFBUTt5QkFDZCxLQUFLLFNBQUMsUUFBUTswQkFDZCxLQUFLLFNBQUMsU0FBUzs4QkFDZixLQUFLLFNBQUMsYUFBYTt1QkFDbkIsS0FBSyxTQUFDLE1BQU07NkJBQ1osS0FBSyxTQUFDLFlBQVk7O3lDQXhDdkI7O1NBK0JhLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtpbmliaW5kTW9kZWwgfSBmcm9tICcuLi9zaGFyZWQva2luaWJpbmQubW9kZWwnO1xuXG4vKipcbiAqIEBuYW1lIE5vSlMgRmlsdGVyIEVsZW1lbnRcbiAqIEBkb2NUeXBlIERpcmVjdGl2ZVxuICogQHRhZyBbbm9qc0ZpbHRlckVsZW1lbnRdXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gQWxsb3cgZm9yIGFuIGlucHV0IGVsZW1lbnQgdG8gcGVyZm9ybSBjdXN0b20gZmlsdGVyaW5nIG9uIHRoZSBhc3NvY2lhdGVkIGJvdW5kIG1vZGVsLlxuICpcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLWRlc2NyaXB0aW9uIFRoZSBvYmplY3QgdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBzb3VyY2Ugd2lsbCBiaW5kIGl0c2VsZiB0by5cbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXR5cGUgTm9qc0JpbmRNb2RlbFxuICogQGF0dHJpYnV0ZXMtbW9kZWwtdmFsdWUgbW9kZWxcbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgdHlwZSBvZiBmaWx0ZXJpbmcgYXBwbGllZCB0byB0aGlzIGVsZW1lbnQuIChDdXJyZW50bHkgb25seSAnc2VhcmNoJyBpcyBzdXBwb3J0ZWQpXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC1kZXNjcmlwdGlvbiBTcGVjaWZ5IGEgcHJlZml4IHRvIGFwcGx5IHRvIHRoZSBmaWx0ZXJcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3VmZml4LWRlc3JpcHRpb24gU3BlY2lmeSBhIHN1ZmZpeCB0byBhcHBseSB0byB0aGUgZmlsdGVyXG4gKiBAYXR0cmlidXRlcy1zdWZmaXgtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWNvbHVtbnMtZGVzY3JpcHRpb24gU3BlY2lmeSB0aGUgY29sdW1ucyBpbiB0aGUgdGFibGUgdGhhdCB0aGlzIGZpbHRlciBpcyBhc3NvY2lhdGVkIHdpdGguIChjb21tYSBzZXBhcmF0ZWQgbGlzdCAnaWQsbmFtZSxkZXNjcmlwdGlvbicpXG4gKiBAYXR0cmlidXRlcy1jb2x1bW5zLXR5cGUgU3RyaW5nXG4gKlxuICpcbiAqIDxpbnB1dCB0eXBlPSd0ZXh0JyAjZWxlbWVudCBmaWx0ZXJFbGVtZW50IFttb2RlbF09J21vZGVsJyBmaWx0ZXI9J3NlYXJjaCdcbiAqIGNvbHVtbnM9J2lkLGJ1eWVyX25hbWUnIHByZWZpeD0nKicgc3VmZml4PScqJyBwbGFjZWhvbGRlcj0nU2VhcmNoIE9yZGVycyc+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiRmlsdGVyRWxlbWVudF0nLFxuICAgIGV4cG9ydEFzOiAnZmlsdGVyRWxlbWVudCdcbn0pXG5leHBvcnQgY2xhc3MgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgnbW9kZWwnKSBtb2RlbDogS2luaWJpbmRNb2RlbDtcbiAgICBASW5wdXQoJ2ZpbHRlcicpIGZpbHRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgncHJlZml4JykgcHJlZml4OiBzdHJpbmc7XG4gICAgQElucHV0KCdzdWZmaXgnKSBzdWZmaXg6IHN0cmluZztcbiAgICBASW5wdXQoJ2NvbHVtbnMnKSBjb2x1bW5zOiBzdHJpbmc7XG4gICAgQElucHV0KCdmaWx0ZXJDbGFzcycpIGZpbHRlckNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlJykgbW9kZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnZGF0ZUZvcm1hdCcpIGRhdGVGb3JtYXQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgZXhwb3NlZCB0byB0aGUgZWxlbWVudCB3ZSBhcmUgYXR0YWNoZWQgdG8gYXMgYSB0ZW1wbGF0ZSB2YXJpYWJsZSxcbiAgICAgKiBzbyB0aGF0IHdlIGNhbiB1cGRhdGUgdGhlIGZpbHRlcnMgd2l0aCB0aGUgbmV3IGZpbHRlciB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWx0ZXJWYWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXIoZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RGaWx0ZXJPYmplY3QoZmlsdGVyVmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uc3RydWN0RmlsdGVyT2JqZWN0KGZpbHRlclZhbHVlKSB7XG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubW9kZWwuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gZmlsdGVyVmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucHJlZml4ICsgbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN1ZmZpeCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgKyB0aGlzLnN1ZmZpeDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0gPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgIGZpbHRlckNvbHVtbnM6IHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5zcGxpdCgnLCcpIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXS5maWx0ZXJNb2RlID0gdGhpcy5tb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyRGF0ZUZvcm1hdCA9IHRoaXMuZGF0ZUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZWwuZmlsdGVycy5jaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfVxufVxuIl19