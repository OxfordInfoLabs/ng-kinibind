import { EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import { KinibindModel } from '../shared/kinibind.model';
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
export declare class KinibindBindDirective implements OnInit {
    private http;
    private kbRequest;
    url: string;
    getURL: string;
    sourceParams: any;
    data: KinibindModel;
    withCredentials: boolean;
    reloadTrigger: EventEmitter<any>;
    onLoad: EventEmitter<any>;
    onLoadError: EventEmitter<any>;
    constructor(http: HttpClient, kbRequest: KinibindRequestService);
    ngOnInit(): void;
    private getData();
}
