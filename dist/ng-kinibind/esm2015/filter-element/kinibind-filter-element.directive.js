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
export class KinibindFilterElementDirective {
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
if (false) {
    /** @type {?} */
    KinibindFilterElementDirective.prototype.data;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJmaWx0ZXItZWxlbWVudC9raW5pYmluZC1maWx0ZXItZWxlbWVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCekQsTUFBTTtJQVdGO0tBQ0M7Ozs7Ozs7O0lBUU0sWUFBWSxDQUFDLFdBQVc7UUFDM0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7SUFHcEMscUJBQXFCLENBQUMsV0FBVztRQUNyQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEQ7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFDSixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO2FBQ3JDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsUUFBUSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3JDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztnQkFDMUMsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUM3RCxDQUFDO1lBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN0RTtZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDbEY7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7WUF2RDVDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUsZUFBZTthQUM1Qjs7Ozs7bUJBR0ksS0FBSyxTQUFDLE9BQU87cUJBQ2IsS0FBSyxTQUFDLFFBQVE7cUJBQ2QsS0FBSyxTQUFDLFFBQVE7cUJBQ2QsS0FBSyxTQUFDLFFBQVE7c0JBQ2QsS0FBSyxTQUFDLFNBQVM7MEJBQ2YsS0FBSyxTQUFDLGFBQWE7bUJBQ25CLEtBQUssU0FBQyxNQUFNO3lCQUNaLEtBQUssU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRNb2RlbCB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC5tb2RlbCc7XG5cbi8qKlxuICogQG5hbWUgTm9KUyBGaWx0ZXIgRWxlbWVudFxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIFtub2pzRmlsdGVyRWxlbWVudF1cbiAqIEB0ZW1wbGF0ZURhdGEgYXR0cmlidXRlRGF0YVxuICpcbiAqIEBkZXNjcmlwdGlvbiBBbGxvdyBmb3IgYW4gaW5wdXQgZWxlbWVudCB0byBwZXJmb3JtIGN1c3RvbSBmaWx0ZXJpbmcgb24gdGhlIGFzc29jaWF0ZWQgYm91bmQgZGF0YS5cbiAqXG4gKiBAYXR0cmlidXRlcy1tb2RlbC1kZXNjcmlwdGlvbiBUaGUgb2JqZWN0IHRoYXQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgc291cmNlIHdpbGwgYmluZCBpdHNlbGYgdG8uXG4gKiBAYXR0cmlidXRlcy1tb2RlbC10eXBlIE5vanNCaW5kTW9kZWxcbiAqIEBhdHRyaWJ1dGVzLW1vZGVsLXZhbHVlIGRhdGFcbiAqIEBhdHRyaWJ1dGVzLWZpbHRlci1kZXNjcmlwdGlvbiBUaGUgbmFtZSBvZiB0aGUgdHlwZSBvZiBmaWx0ZXJpbmcgYXBwbGllZCB0byB0aGlzIGVsZW1lbnQuIChDdXJyZW50bHkgb25seSAnc2VhcmNoJyBpcyBzdXBwb3J0ZWQpXG4gKiBAYXR0cmlidXRlcy1maWx0ZXItdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC1kZXNjcmlwdGlvbiBTcGVjaWZ5IGEgcHJlZml4IHRvIGFwcGx5IHRvIHRoZSBmaWx0ZXJcbiAqIEBhdHRyaWJ1dGVzLXByZWZpeC10eXBlIFN0cmluZ1xuICogQGF0dHJpYnV0ZXMtc3VmZml4LWRlc3JpcHRpb24gU3BlY2lmeSBhIHN1ZmZpeCB0byBhcHBseSB0byB0aGUgZmlsdGVyXG4gKiBAYXR0cmlidXRlcy1zdWZmaXgtdHlwZSBTdHJpbmdcbiAqIEBhdHRyaWJ1dGVzLWNvbHVtbnMtZGVzY3JpcHRpb24gU3BlY2lmeSB0aGUgY29sdW1ucyBpbiB0aGUgdGFibGUgdGhhdCB0aGlzIGZpbHRlciBpcyBhc3NvY2lhdGVkIHdpdGguIChjb21tYSBzZXBhcmF0ZWQgbGlzdCAnaWQsbmFtZSxkZXNjcmlwdGlvbicpXG4gKiBAYXR0cmlidXRlcy1jb2x1bW5zLXR5cGUgU3RyaW5nXG4gKlxuICpcbiAqIDxpbnB1dCB0eXBlPSd0ZXh0JyAjZWxlbWVudCBmaWx0ZXJFbGVtZW50IFttb2RlbF09J2RhdGEnIGZpbHRlcj0nc2VhcmNoJ1xuICogY29sdW1ucz0naWQsYnV5ZXJfbmFtZScgcHJlZml4PScqJyBzdWZmaXg9JyonIHBsYWNlaG9sZGVyPSdTZWFyY2ggT3JkZXJzJz5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JGaWx0ZXJFbGVtZW50XScsXG4gICAgZXhwb3J0QXM6ICdmaWx0ZXJFbGVtZW50J1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCdtb2RlbCcpIGRhdGE6IEtpbmliaW5kTW9kZWw7XG4gICAgQElucHV0KCdmaWx0ZXInKSBmaWx0ZXI6IHN0cmluZztcbiAgICBASW5wdXQoJ3ByZWZpeCcpIHByZWZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgnc3VmZml4Jykgc3VmZml4OiBzdHJpbmc7XG4gICAgQElucHV0KCdjb2x1bW5zJykgY29sdW1uczogc3RyaW5nO1xuICAgIEBJbnB1dCgnZmlsdGVyQ2xhc3MnKSBmaWx0ZXJDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZScpIG1vZGU6IHN0cmluZztcbiAgICBASW5wdXQoJ2RhdGVGb3JtYXQnKSBkYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGV4cG9zZWQgdG8gdGhlIGVsZW1lbnQgd2UgYXJlIGF0dGFjaGVkIHRvIGFzIGEgdGVtcGxhdGUgdmFyaWFibGUsXG4gICAgICogc28gdGhhdCB3ZSBjYW4gdXBkYXRlIHRoZSBmaWx0ZXJzIHdpdGggdGhlIG5ldyBmaWx0ZXIgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVyVmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlRmlsdGVyKGZpbHRlclZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0RmlsdGVyT2JqZWN0KGZpbHRlclZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdEZpbHRlck9iamVjdChmaWx0ZXJWYWx1ZSkge1xuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuZmlsdGVycy5maWx0ZXJPYmplY3RbdGhpcy5maWx0ZXJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gZmlsdGVyVmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucHJlZml4ICsgbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN1ZmZpeCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgKyB0aGlzLnN1ZmZpeDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRhLmZpbHRlcnMuZmlsdGVyT2JqZWN0W3RoaXMuZmlsdGVyXSA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29sdW1uczogdGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLnNwbGl0KCcsJykgOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyTW9kZSA9IHRoaXMubW9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmZpbHRlck9iamVjdFt0aGlzLmZpbHRlcl0uZmlsdGVyRGF0ZUZvcm1hdCA9IHRoaXMuZGF0ZUZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YS5maWx0ZXJzLmNoYW5nZXMubmV4dCh0cnVlKTtcbiAgICB9XG59XG4iXX0=