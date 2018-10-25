import {
    Directive, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { Observable, merge } from 'rxjs';
import { of as observableOf } from 'rxjs';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KinibindModel } from '../shared/kinibind.model';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

/**
 *
 * @name NoJS Form
 * @docType Directive
 * @tag [nojsForm]
 * @templateData attributeData
 *
 * @description The Nojs Form directive allows for model to sourced from a URL and bound to a model, which can then be used to bind to form components. Additional form validation can be added to the form inputs. In order to save model back to the server, a store URL and submit button need to be included in the form markup.
 *
 * @attributes-source-description The URL to load the model asynchronously. Data should be returned in JSON format as either:
 * @attributes-source-type String
 * @attributes-source-value https://someservice/results.json
 * @attributes-source-code {id: 1, name: testing} OR<br>[{id: 1, name: test1}, {id: 2, name: test2}] OR<br>{results: [{id: 1...}, {id: 2...}], totalCount: 2}
 * @attributes-sourceParams-description Parameters object to send with the Source post request.
 * @attributes-sourceParams-type Object
 * @attributes-sourceParams-value {param: value}
 * @attributes-model-description The object that the results from the source will bind itself to.
 * @attributes-model-type NojsBindModel
 * @attributes-model-value model
 * @attributes-store-description The url to send any dirty model back to the server for processing.
 * @attributes-store-type String
 * @attributes-storeParams-description Parameters object to send with the Store post request.
 * @attributes-storeParams-type Object
 * @attributes-storeParams-value {param: value}
 * @attributes-storeObjectParam-description The name of the parameter to send the model back with.
 * @attributes-storeObjectParam-type String
 * @attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * @attributes-savedRoute-type String
 * @attributes-dirtyOnly-description In the case where an array of objects are being edited, only send back the objects where containing fields have been changed.
 * @attributes-dirtyOnly-type Boolean (default false)
 * @attributes-onLoad-description Event raised once the model has been loaded successfully.
 * @attributes-onLoad-type method
 * @attributes-onLoadError-description Event raised in the scenario where there is an error loading the model.
 * @attributes-onLoadError-type method
 * @attributes-onSave-description This function will be called when the save successfully completes
 * @attributes-onSave-type method
 * @attributes-onError-description This function will be called when an error is returned from the service call.
 * @attributes-onError-type method
 *
 *
 * @exampleDescription This attribute should only be used in conjunction with a <form> element.
 * <form nojsForm [model]="model" source="/POST/Someservice/getOrderData"
 *   [sourceParams]="{orderId: 37}" store="/POST/Someservice/saveOrders"
 *   storeObjectParam="orders" savedRoute="/nojs-core">
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>ID</label>
 *   <input type="text" name="id" [(ngModel)]="model.item.id" required>
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Status</label>
 *   <input type="text" name="status" [(ngModel)]="model.item.status">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Subtotal</label>
 *   <input type="text" name="subtotal" [(ngModel)]="model.item.subtotal">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Taxes</label>
 *   <input type="text" name="taxes" [(ngModel)]="model.item.taxes">
 * </div>
 *
 * <div class="form-group" style="padding: 20px">
 *   <label>Total</label>
 *   <input type="text" name="total" [(ngModel)]="model.item.total">
 * </div>
 *
 * <button type="submit">Save</button>
 * </form>
 *
 */
@Directive({
    selector: '[kbForm]'
})
export class KinibindFormDirective implements OnInit {

    @Input('source') url: string;
    @Input('sourceMethod') sourceMethod: string;
    @Input('sourceParams') sourceParams: any;
    @Input('model') model: KinibindModel;
    @Input('store') storeURL: string;
    @Input('storeMethod') storeMethod: string;
    @Input('savedRoute') savedRoute: string;
    @Input('dirtyOnly') dirtyOnly: boolean;
    @Input('withCredentials') withCredentials: boolean;

    @Output('onLoad') onLoad: EventEmitter<any> = new EventEmitter<any>();
    @Output('onLoadError') onLoadError: EventEmitter<any> = new EventEmitter<any>();
    @Output('onSave') onSave: EventEmitter<any> = new EventEmitter();
    @Output('onError') onError: EventEmitter<any> = new EventEmitter();

    constructor(private ngForm: NgForm,
                private router: Router,
                private kbRequest: KinibindRequestService) {

    }

    ngOnInit(): void {
        this.initSourceData();
        this.initSaveData();
    }

    private initSourceData() {
        this.model.filters.changes.subscribe(() => this.model.pageOptions.index = 0);

        merge(this.model.filters.changes, this.model.pageOptions.changes)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.getData();
                }),
                map((data: any) => {
                    if (_.isPlainObject(data)) {
                        if (data.results && _.isArray(data.results)) {
                            this.model.totalCount = data.totalCount || data.results.length;
                            return data.results;
                        } else {
                            return data;
                        }
                    } else if (_.isArray(data)) {
                        this.model.totalCount = data.length;
                        return data;
                    }
                }),
                catchError((error) => {
                    this.onLoadError.emit(error);
                    return observableOf([]);
                })
            ).subscribe(data => {
            this.model.data = data;
            this.onLoad.emit({ success: true });
        });
    }

    private getData(): Observable<any> {
        const postParams: any = this.sourceParams || {};

        if (!_.isEmpty(this.model.filters.filterObject)) {
            postParams.filters = this.model.filters.filterObject;
        }

        if (this.model.pageOptions.size) {
            postParams.pageSize = this.model.pageOptions.size;
            postParams.page = this.model.pageOptions.index;
        }

        const method = this.sourceMethod ? this.sourceMethod : (this.sourceParams ? 'POST' : 'GET');

        return this.kbRequest.makeRequest(method, this.url, {
            params: this.sourceParams,
            withCredentials: this.withCredentials
        });
    }

    private initSaveData() {
        if (this.storeURL) {
            this.ngForm.ngSubmit.subscribe(() => {
                if (_.isArray(this.model.data) && this.model.data.length > 0) {
                    if (this.dirtyOnly) {
                        const dirty = [];
                        _.forEach(this.ngForm.form.controls, (control, key) => {
                            if (control.dirty) {
                                dirty.push(key);
                            }
                        });
                        if (dirty.length > 0) {
                            this.saveData(dirty);
                        }
                    } else {
                        this.saveData();
                    }

                } else if (_.isObject(this.model.data) && this.ngForm.dirty) {
                    this.saveData();
                }
            });
        }
    }

    private saveData(dirty?) {
        let postParams = {};

        if (dirty) {

            const dirtyObjects = [];

            dirty.forEach(dirtyKey => {
                const splitKey = dirtyKey.split('-');
                const dirtyIndex = _.find(splitKey, key => {
                    return !isNaN(Number(key));
                });
                dirtyObjects.push(this.model.data[dirtyIndex]);
            });

            postParams = dirtyObjects;

        } else {
            if (_.isArray(this.model.data) && this.model.data.length > 0) {
                postParams = this.model.data;
            } else if (_.isObject(this.model.data)) {
                postParams = this.model.data;
            }
        }

        const method = this.storeMethod ? this.storeMethod : 'POST';

        this.kbRequest.makeRequest(method, this.storeURL,
            {
                params: postParams,
                withCredentials: this.withCredentials
            })
            .toPromise()
            .then(results => {

                if (this.savedRoute) {
                    this.router.navigate([this.savedRoute]);
                }

                this.onSave.emit({ results: results });
            })
            .catch(error => {
                this.onError.emit(error);
            });
    }
}
