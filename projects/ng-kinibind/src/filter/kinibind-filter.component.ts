import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
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
@Component({
    selector: 'kb-filter',
    templateUrl: './kinibind-filter.component.html',
    styleUrls: ['./kinibind-filter.component.css']
})
export class KinibindFilterComponent implements OnInit {

    @Input('source') url: string;
    @Input('model') model: KinibindModel;
    @Input('multiple') multiple: boolean;
    @Input('showCount') showCount: boolean;
    @Input('filter') filter: string;
    @Input('initialFilterValues') initialFilterValues: any;
    @Input('withCredentials') withCredentials: boolean;

    public filterValues: any = [];

    constructor(private kbRequest: KinibindRequestService) {
    }

    ngOnInit() {
        if (this.initialFilterValues) {
            this.model.filters.filterObject = _.extend(this.initialFilterValues, this.model.filters.filterObject);
        }
        this.getData(this.model.filters.filterObject).subscribe(data => {
            this.filterValues = data;
        });
    }

    public updateFilter(filterObject) {
        filterObject.selected = !filterObject.selected;
        if (!this.model.filters.filterObject) {
            this.model.filters.filterObject = {};
        }
        if (this.multiple) {
            if (filterObject.selected) {
                if (!Array.isArray(this.model.filters.filterObject[this.filter])) {
                    this.model.filters.filterObject[this.filter] = [filterObject.value];
                } else {
                    this.model.filters.filterObject[this.filter].push(filterObject.value);
                }
            } else {
                const index = this.model.filters.filterObject[this.filter].indexOf(filterObject.value);
                if (index > -1) {
                    this.model.filters.filterObject[this.filter].splice(index, 1);
                }

                if (!this.model.filters.filterObject[this.filter].length) {
                    delete this.model.filters.filterObject[this.filter];
                }
            }
        } else {
            if (filterObject.selected) {
                this.model.filters.filterObject[this.filter] = filterObject.value;
            } else {
                delete this.model.filters.filterObject[this.filter];
            }
        }

        this.getData(this.model.filters.filterObject);
        this.model.filters.changes.next(true);
    }

    private getData(filters): Observable<any> {
        const postParams: any = {
            seedColumn: this.filter,
            filters: filters
        };

        return this.kbRequest.makePostRequest(this.url, postParams);
    }
}
