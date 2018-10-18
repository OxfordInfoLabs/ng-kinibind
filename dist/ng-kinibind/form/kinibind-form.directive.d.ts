import { EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KinibindModel } from '../shared/kinibind.model';
import { KinibindRequestService } from '../shared/kinibind-request.service';
/**
 *
 * @name NoJS Form
 * @docType Directive
 * @tag [nojsForm]
 * @templateData attributeData
 *
 * @description The Nojs Form directive allows for data to sourced from a URL and bound to a model, which can then be used to bind to form components. Additional form validation can be added to the form inputs. In order to save data back to the server, a store URL and submit button need to be included in the form markup.
 *
 * @attributes-source-description The URL to load the data asynchronously. Data should be returned in JSON format as either:
 * @attributes-source-type String
 * @attributes-source-value https://someservice/results.json
 * @attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * @attributes-sourceParams-description Parameters object to send with the Source post request.
 * @attributes-sourceParams-type Object
 * @attributes-sourceParams-value {param: value}
 * @attributes-model-description The object that the results from the source will bind itself to.
 * @attributes-model-type NojsBindModel
 * @attributes-model-value data
 * @attributes-store-description The url to send any dirty data back to the server for processing.
 * @attributes-store-type String
 * @attributes-storeParams-description Parameters object to send with the Store post request.
 * @attributes-storeParams-type Object
 * @attributes-storeParams-value {param: value}
 * @attributes-storeObjectParam-description The name of the parameter to send the data back with.
 * @attributes-storeObjectParam-type String
 * @attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * @attributes-savedRoute-type String
 * @attributes-dirtyOnly-description In the case where an array of objects are being edited, only send back the objects where containing fields have been changed.
 * @attributes-dirtyOnly-type Boolean (default false)
 * @attributes-onLoad-description Event raised once the data has been loaded successfully.
 * @attributes-onLoad-type method
 * @attributes-onLoadError-description Event raised in the scenario where there is an error loading the data.
 * @attributes-onLoadError-type method
 * @attributes-onSave-description This function will be called when the save successfully completes
 * @attributes-onSave-type method
 * @attributes-onError-description This function will be called when an error is returned from the service call.
 * @attributes-onError-type method
 *
 *
 * @exampleDescription This attribute should only be used in conjunction with a <form> element.
 * <form nojsForm [model]="data" source="/POST/Someservice/getOrderData"
 *   [sourceParams]="{orderId: 37}" store="/POST/Someservice/saveOrders"
 *   storeObjectParam="orders" savedRoute="/nojs-core">
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>ID</label>
 *   <input type="text" name="id" [(ngModel)]="data.item.id" required>
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Status</label>
 *   <input type="text" name="status" [(ngModel)]="data.item.status">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Subtotal</label>
 *   <input type="text" name="subtotal" [(ngModel)]="data.item.subtotal">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Taxes</label>
 *   <input type="text" name="taxes" [(ngModel)]="data.item.taxes">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Total</label>
 *   <input type="text" name="total" [(ngModel)]="data.item.total">
 * </div>
 *
 * <button type="submit">Save</button>
 * </form>
 *
 */
export declare class KinibindFormDirective implements OnInit {
    private ngForm;
    private router;
    private kbRequest;
    url: string;
    sourceMethod: string;
    sourceParams: any;
    data: KinibindModel;
    storeURL: string;
    storeMethod: string;
    savedRoute: string;
    dirtyOnly: boolean;
    withCredentials: boolean;
    onLoad: EventEmitter<any>;
    onLoadError: EventEmitter<any>;
    onSave: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(ngForm: NgForm, router: Router, kbRequest: KinibindRequestService);
    ngOnInit(): void;
    private initSourceData();
    private getData();
    private initSaveData();
    private saveData(dirty?);
}
