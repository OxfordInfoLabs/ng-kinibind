/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * @record
 */
export function KinibindFilters() { }
/** @type {?} */
KinibindFilters.prototype.changes;
/** @type {?|undefined} */
KinibindFilters.prototype.filterObject;
/**
 * @record
 */
export function KinibindPageOptions() { }
/** @type {?} */
KinibindPageOptions.prototype.changes;
/** @type {?|undefined} */
KinibindPageOptions.prototype.size;
/** @type {?|undefined} */
KinibindPageOptions.prototype.index;
/** @type {?|undefined} */
KinibindPageOptions.prototype.options;
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
export class KinibindModel {
    /**
     * @param {?=} data
     * @param {?=} limit
     * @param {?=} offset
     */
    constructor(data, limit, offset) {
        this.data = data;
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
    setPageOptions(pageSize, pageIndex) {
        this.pageOptions.size = pageSize;
        this.pageOptions.index = pageIndex;
        this.offset = pageSize * pageIndex;
        this.pageOptions.changes.next(true);
    }
}
if (false) {
    /** @type {?} */
    KinibindModel.prototype.data;
    /** @type {?} */
    KinibindModel.prototype.totalCount;
    /** @type {?} */
    KinibindModel.prototype.offset;
    /** @type {?} */
    KinibindModel.prototype.filters;
    /** @type {?} */
    KinibindModel.prototype.pageOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1raW5pYmluZC8iLCJzb3VyY2VzIjpbInNoYXJlZC9raW5pYmluZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkMvQixNQUFNOzs7Ozs7SUFRRixZQUFZLElBQVUsRUFBRSxLQUFjLEVBQUUsTUFBZTtRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBTztZQUMzQixZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBTztZQUMzQixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO1NBQzdCLENBQUM7S0FDTDs7Ozs7O0lBRU0sY0FBYyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Q0FHM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRGaWx0ZXJzIHtcbiAgICBjaGFuZ2VzOiBTdWJqZWN0PGFueT47XG4gICAgZmlsdGVyT2JqZWN0PzogYW55O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luaWJpbmRQYWdlT3B0aW9ucyB7XG4gICAgY2hhbmdlczogU3ViamVjdDxhbnk+O1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgaW5kZXg/OiBudW1iZXI7XG4gICAgb3B0aW9ucz86IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEBuYW1lIEtpbmliaW5kTW9kZWxcbiAqIEBkb2NUeXBlIE1vZGVsXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB0aGUgTW9kZWwgdGhhdCBub2pzLWJpbmQsIG5vanMtZmlsdGVyLCBub2pzLXBhZ2luYXRvciwgYW5kIG5vanMtZmlsdGVyLWVsZW1lbnQgYmluZCB0by4gSXQgcHJvdmlkZXMgYSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgZm9yIGVhY2ggb2YgdGhlc2Ugbm9qcyBjb21wb25lbnRzIHRvIG1hbmFnZSB0aGVpciBvd24gc3RhdGUgYW5kIG1vZGVsIGhhbmRsaW5nLlxuICogQHRlbXBsYXRlRGF0YSBtZW1iZXJEYXRhXG4gKlxuICogQG1lbWJlcnMtcmVzdWx0cy10eXBlIHByb3BlcnR5OiBhbnlbXVxuICogQG1lbWJlcnMtcmVzdWx0cy1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIGluIHRoZSBldmVudCB0aGF0IHRoZSByZXN1bHRzIGZyb20gdGhlIHNlcnZpY2UgY2FsbCBhcmUgaW4gYXJyYXkgZm9ybS5cbiAqIEBtZW1iZXJzLXJlc3VsdHMtZGVmYXVsdFZhbHVlIEFycmF5XG4gKiBAbWVtYmVycy1pdGVtLXR5cGUgcHJvcGVydHk6IGFueVxuICogQG1lbWJlcnMtaXRlbS1kZXNjcmlwdGlvbiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcG9wdWxhdGVkIHdoZW4gdGhlIHJldHVybmluZyB2YWx1ZSBmcm9tIHRoZSBzZXJ2aWNlIGNhbGwgaXMgaW4gb2JqZWN0IGZvcm0uXG4gKiBAbWVtYmVycy1pdGVtLWRlZmF1bHRWYWx1ZSBPYmplY3RcbiAqIEBtZW1iZXJzLXRvdGFsQ291bnQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlc2NyaXB0aW9uIENvdW50IG9mIHRoZSB0b3RhbCByZXN1bHRzXG4gKiBAbWVtYmVycy10b3RhbENvdW50LWRlZmF1bHRWYWx1ZSAwXG4gKiBAbWVtYmVycy1vZmZzZXQtdHlwZSBwcm9wZXJ0eTogbnVtYmVyXG4gKiBAbWVtYmVycy1vZmZzZXQtZGVzY3JpcHRpb24gV2hlbiBsaW1pdGluZyByZXN1bHRzIHJldHVybmVkIGZyb20gc2VydmVyIHRoaXMgdmFsdWVzIHN0b3JlIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIEBtZW1iZXJzLW9mZnNldC1kZWZhdWx0VmFsdWUgMFxuICogQG1lbWJlcnMtZmlsdGVycy10eXBlIHByb3BlcnR5OiBOb2pzRmlsdGVyc1xuICogQG1lbWJlcnMtZmlsdGVycy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIGN1cnJlbnQgZmlsdGVyIHZhbHVlcyB1c2VkIGZvciBmaWx0ZXJpbmcgcmVzdWx0cyBvbiB0aGUgc2VydmVyLlxuICogQG1lbWJlcnMtZmlsdGVycy1kZWZhdWx0VmFsdWUgeyBjaGFuZ2VzOiBuZXcgU3ViamVjdDxhbnk+KCksIGZpbHRlck9iamVjdDoge30gfVxuICogQG1lbWJlcnMtcGFnZU9wdGlvbnMtdHlwZSBwcm9wZXJ0eTogTm9qc1BhZ2VPcHRpb25zXG4gKiBAbWVtYmVycy1wYWdlT3B0aW9ucy1kZXNjcmlwdGlvbiBUaGlzIG9iamVjdCBzdG9yZXMgdGhlIHZhbHVlcyB1c2VkIHRvIHBhZ2UgdGhlIHJlc3VsdHMgb24gdGhlIHNlcnZlci5cbiAqIEBtZW1iZXJzLXBhZ2VPcHRpb25zLWRlZmF1bHRWYWx1ZSB7IGNoYW5nZXM6IG5ldyBTdWJqZWN0PGFueT4oKSwgc2l6ZTogMTAsIGluZGV4OiAwLCBvcHRpb25zOiBbMTAsIDI1LCA1MCwgMTAwXSB9XG4gKiBAbWVtYmVycy1zZXRQYWdlT3B0aW9ucy10eXBlIG1ldGhvZFxuICogQG1lbWJlcnMtc2V0UGFnZU9wdGlvbnMtZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcGFnaW5nIHJlc3VsdHMgbmVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqIEBleGFtcGxlRGVzY3JpcHRpb24gU2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBOb2pzQmluZE1vZGVsIHRvIG1ha2UgdXNlIG9mIHRoaXMgb2JqZWN0LlxuICogY29uc3QgYmluZE1vZGVsID0gbmV3IE5vanNCaW5kTW9kZWwoKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEtpbmliaW5kTW9kZWwge1xuXG4gICAgcHVibGljIGRhdGE6IGFueTtcbiAgICBwdWJsaWMgdG90YWxDb3VudDogbnVtYmVyO1xuICAgIHB1YmxpYyBvZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZmlsdGVyczogS2luaWJpbmRGaWx0ZXJzO1xuICAgIHB1YmxpYyBwYWdlT3B0aW9uczogS2luaWJpbmRQYWdlT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE/OiBhbnksIGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQgfHwgMDtcbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge1xuICAgICAgICAgICAgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLFxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0OiB7fVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhZ2VPcHRpb25zID0ge1xuICAgICAgICAgICAgY2hhbmdlczogbmV3IFN1YmplY3Q8YW55PigpLFxuICAgICAgICAgICAgc2l6ZTogbGltaXQsXG4gICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgIG9wdGlvbnM6IFsxMCwgMjUsIDUwLCAxMDBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBhZ2VPcHRpb25zKHBhZ2VTaXplLCBwYWdlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYWdlT3B0aW9ucy5zaXplID0gcGFnZVNpemU7XG4gICAgICAgIHRoaXMucGFnZU9wdGlvbnMuaW5kZXggPSBwYWdlSW5kZXg7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gcGFnZVNpemUgKiBwYWdlSW5kZXg7XG4gICAgICAgIHRoaXMucGFnZU9wdGlvbnMuY2hhbmdlcy5uZXh0KHRydWUpO1xuICAgIH1cblxufVxuIl19