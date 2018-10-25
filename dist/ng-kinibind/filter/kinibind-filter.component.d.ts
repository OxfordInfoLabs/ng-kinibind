import { OnInit } from '@angular/core';
import { KinibindModel } from '../shared/kinibind.model';
import { KinibindRequestService } from '../shared/kinibind-request.service';
/**
 * @name NoJS Filter
 * @docType Component
 * @tag nojs-filter
 * @templateData attributeData
 *
 * @description Filtering component that generates filter options based on the passed in source. Selecting any of these options will update the filter object from [model] which will trigger a server side filter of the model.
 *
 * @attributes-source-description The URL to call to retrieve the filter options from the server. Return model expected in the following format:
 * @attributes-source-type String
 * @attributes-source-value https://someservice/filters.json
 * @attributes-source-code [{count: 2, label: Option1: value: 1},<br>{count: 4, label: Option2: value: 2}]
 * @attributes-model-description The object that the results from the source will bind itself to.
 * @attributes-model-type NojsBindModel
 * @attributes-model-value model
 * @attributes-multiple-description Allow multiple filter options to be selected at the same time.
 * @attributes-multiple-type Boolean
 * @attributes-filter-description The name of the database field that the filter will be applied to.
 * @attributes-filter-type String
 * @attributes-showCount-description Toggle that shows the count of results for the given filter.
 * @attributes-showCount-type Boolean
 * @attributes-initialFilterValues-description Set filter values upon component initialisation.
 * @attributes-initialFilterValues-type JSON Object
 * @attributes-initialFilterValues-value {someValue: true}
 *
 * <nojs-filter source="https://someservice/filters.json"
 * [initialFilterValues]="{complete: true}"
 * [model]="model" multiple="true" filter="total" showCount="true">
 * </nojs-filter>
 */
export declare class KinibindFilterComponent implements OnInit {
    private kbRequest;
    url: string;
    model: KinibindModel;
    multiple: boolean;
    showCount: boolean;
    filter: string;
    initialFilterValues: any;
    withCredentials: boolean;
    filterValues: any;
    constructor(kbRequest: KinibindRequestService);
    ngOnInit(): void;
    updateFilter(filterObject: any): void;
    private getData(filters);
}
