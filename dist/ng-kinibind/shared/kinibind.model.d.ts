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
 * @description This is the Model that nojs-bind, nojs-filter, nojs-paginator, and nojs-filter-element bind to. It provides a structure that allows for each of these nojs components to manage their own state and model handling.
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
export declare class KinibindModel {
    data: any;
    totalCount: number;
    offset: number;
    filters: KinibindFilters;
    pageOptions: KinibindPageOptions;
    constructor(data?: any, limit?: number, offset?: number);
    setPageOptions(pageSize: any, pageIndex: any): void;
}
