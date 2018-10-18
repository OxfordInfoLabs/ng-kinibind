import {
    Directive, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, of } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import { KinibindModel } from '../shared/kinibind.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

/**
 *
 * @name NoJS Bind
 * @docType Directive
 * @tag nojs-bind
 * @templateData attributeData
 *
 * @description The NoJS Bind Directive allows for rapid binding of a JSON data source to a model. This should primarily be used for drawing lists of data, where the data does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 * @attributes-source-description The URL to load the data asynchronously. Data should be returned in JSON format as either:
 * @attributes-source-type String
 * @attributes-source-value https://someservice/results.json
 * @attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * @attributes-sourceParams-description Parameters used to send back to the server in the post request.
 * @attributes-sourceParams-type Object.
 * @attributes-sourceParams-value {param: value}
 * @attributes-model-description The object that the results from the source will bind itself to.
 * @attributes-model-type NojsBindModel
 * @attributes-model-value data
 * @attributes-onLoad-description Event raised once the data has been loaded successfully.
 * @attributes-onLoad-type method
 * @attributes-onLoadError-description Event raised in the scenario where there is an error loading the data.
 * @attributes-onLoadError-type method
 *
 *
 * @exampleDescription Create an element using the <nojs-bind> tag
 * <nojs-bind source="https://someservice/results.json" [sourceParams]="{userId: 100}"
 *   [model]="data">
 *
 *   <div *ngFor="let item of data.results">
 *     <span>{{item.id}}</span>
 *     <span>{item.name}}</span>
 *     <span>{{item.date}}</span>
 *     <span>{{item.address}}</span>
 *   </div>
 *
 * </nojs-bind>
 *
 */
@Directive({
    selector: 'kb-bind'
})
export class KinibindBindDirective implements OnInit {

    @Input('source') url: string;
    @Input('method') method: string;
    @Input('sourceParams') sourceParams: any;
    @Input('model') data: KinibindModel;
    @Input('withCredentials') withCredentials: boolean;
    @Input('reloadTrigger') reloadTrigger: EventEmitter<any> = new EventEmitter<any>();

    @Output('onLoad') onLoad: EventEmitter<any> = new EventEmitter<any>();
    @Output('onLoadError') onLoadError: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: HttpClient,
                private kbRequest: KinibindRequestService) {

    }

    ngOnInit(): void {
        // If we have a reload trigger listen for changes and reset the data model.
        this.reloadTrigger.subscribe(() => {
            this.data.filters.filterObject = {};
            this.data.pageOptions.index = 1;
        });

        this.data.filters.changes.subscribe(() => this.data.pageOptions.index = 1);

        merge(this.data.filters.changes, this.data.pageOptions.changes, this.reloadTrigger)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.getData();
                }),
                map((data: any) => {
                    if (_.isPlainObject(data)) {
                        if (data.results && _.isArray(data.results)) {
                            this.data.totalCount = data.totalCount || data.results.length;
                            return data.results;
                        } else {
                            return data;
                        }
                    } else if (_.isArray(data)) {
                        this.data.totalCount = data.length;
                        return data;
                    } else {
                        return data;
                    }
                }),
                catchError((error) => {
                    this.onLoadError.emit(error);
                    return of([]);
                })
            ).subscribe(data => {
            if (_.isPlainObject(data)) {
                this.data.item = data;
            } else if (_.isArray(data)) {
                this.data.results = data;
            } else {
                this.data.value = data;
            }
            this.onLoad.emit({ success: true });
        });
    }

    private getData(): Observable<any> {
        const postParams: any = this.sourceParams || {};

        if (!_.isEmpty(this.data.filters.filterObject)) {
            postParams.filters = this.data.filters.filterObject;
        }

        if (this.data.pageOptions.size) {
            postParams.pageSize = this.data.pageOptions.size;
            postParams.page = this.data.pageOptions.index;
        }

        const method = this.method ? this.method : (this.sourceParams ? 'POST' : 'GET');

        return this.kbRequest.makeRequest(method, this.url, {params: postParams});
    }
}
