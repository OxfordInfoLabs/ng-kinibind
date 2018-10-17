import { Directive, Input } from '@angular/core';
import { KinibindModel } from '../shared/kinibind.model';

/**
 * @name NoJS Filter Element
 * @docType Directive
 * @tag [nojsFilterElement]
 * @templateData attributeData
 *
 * @description Allow for an input element to perform custom filtering on the associated bound data.
 *
 * @attributes-model-description The object that the results from the source will bind itself to.
 * @attributes-model-type NojsBindModel
 * @attributes-model-value data
 * @attributes-filter-description The name of the type of filtering applied to this element. (Currently only 'search' is supported)
 * @attributes-filter-type String
 * @attributes-prefix-description Specify a prefix to apply to the filter
 * @attributes-prefix-type String
 * @attributes-suffix-desription Specify a suffix to apply to the filter
 * @attributes-suffix-type String
 * @attributes-columns-description Specify the columns in the table that this filter is associated with. (comma separated list 'id,name,description')
 * @attributes-columns-type String
 *
 *
 * <input type='text' #element filterElement [model]='data' filter='search'
 * columns='id,buyer_name' prefix='*' suffix='*' placeholder='Search Orders'>
 */
@Directive({
    selector: '[kbFilterElement]',
    exportAs: 'filterElement'
})
export class KinibindFilterElementDirective {

    @Input('model') data: KinibindModel;
    @Input('filter') filter: string;
    @Input('prefix') prefix: string;
    @Input('suffix') suffix: string;
    @Input('columns') columns: string;
    @Input('filterClass') filterClass: string;
    @Input('mode') mode: string;
    @Input('dateFormat') dateFormat: string;

    constructor() {
    }

    /**
     * This is exposed to the element we are attached to as a template variable,
     * so that we can update the filters with the new filter value.
     *
     * @param filterValue
     */
    public updateFilter(filterValue) {
        this.constructFilterObject(filterValue);
    }

    private constructFilterObject(filterValue) {
        if (filterValue === null) {
            delete this.data.filters.filterObject[this.filter];
        } else {
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
