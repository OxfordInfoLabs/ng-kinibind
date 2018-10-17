import { Subject } from 'rxjs';

export interface KinibindFilters {
    changes: Subject<any>;
    filterObject?: any;
}


export interface KinibindPageOptions {
    changes: Subject<any>;
    size?: number;
    index?: number;
    options?: number[];
}

/**
 * @name KinibindModel
 * @docType Model
 * @description This is the Model that nojs-bind, nojs-filter, nojs-paginator, and nojs-filter-element bind to. It provides a structure that allows for each of these nojs components to manage their own state and data handling.
 * @templateData memberData
 *
 * @members-results-type property: any[]
 * @members-results-description This property will be populated in the event that the results from the service call are in array form.
 * @members-results-defaultValue Array
 * @members-item-type property: any
 * @members-item-description This property will be populated when the returning value from the service call is in object form.
 * @members-item-defaultValue Object
 * @members-totalCount-type property: number
 * @members-totalCount-description Count of the total results
 * @members-totalCount-defaultValue 0
 * @members-offset-type property: number
 * @members-offset-description When limiting results returned from server this values store the current offset.
 * @members-offset-defaultValue 0
 * @members-filters-type property: NojsFilters
 * @members-filters-description This object stores the current filter values used for filtering results on the server.
 * @members-filters-defaultValue { changes: new Subject<any>(), filterObject: {} }
 * @members-pageOptions-type property: NojsPageOptions
 * @members-pageOptions-description This object stores the values used to page the results on the server.
 * @members-pageOptions-defaultValue { changes: new Subject<any>(), size: 10, index: 0, options: [10, 25, 50, 100] }
 * @members-setPageOptions-type method
 * @members-setPageOptions-description This function should be called when paging results need to be updated.
 *
 * @exampleDescription Simply create a new instance of NojsBindModel to make use of this object.
 * const bindModel = new NojsBindModel();
 */
export class KinibindModel {

    public results: any[];
    public item: any;
    public value: any;
    public totalCount: number;
    public offset: number;
    public filters: KinibindFilters;
    public pageOptions: KinibindPageOptions;

    constructor(limit?: number, offset?: number) {
        this.results = [];
        this.item = {};
        this.value = '';
        this.totalCount = 0;
        this.offset = offset || 0;
        this.filters = {
            changes: new Subject<any>(),
            filterObject: {}
        };
        this.pageOptions = {
            changes: new Subject<any>(),
            size: limit,
            index: 1,
            options: [10, 25, 50, 100]
        };
    }

    public setPageOptions(pageSize, pageIndex) {
        this.pageOptions.size = pageSize;
        this.pageOptions.index = pageIndex;
        this.offset = pageSize * pageIndex;
        this.pageOptions.changes.next(true);
    }

}
