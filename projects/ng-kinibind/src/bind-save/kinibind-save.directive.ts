import {
    Directive, EventEmitter, HostListener, Input, OnInit, Output
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KinibindModel } from '../shared/kinibind.model';
import { Router } from '@angular/router';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import * as _ from 'lodash';

/**
 *
 * @name NoJS Bind Save
 * @docType Directive
 * @tag [nojsBindSave]
 * @templateData attributeData
 *
 * @description The NoJS Bind Save Directive allows for simple saving of model back to the server. This will return the updated contents of either the NojsBindModel.results array or the NojsBindModel.item object to the server for processing.
 *
 * @attributes-store-description The URL where of the server where the model should be sent for processing.
 * @attributes-store-type String
 * @attributes-storeParams-description Additional parameters to send back to the server with the post request.
 * @attributes-storeParams-type Object
 * @attributes-storeParams-value {param: value}
 * @attributes-storeObjectParam-description The name of the parameter to send the model back with.
 * @attributes-storeObjectParam-type String
 * @attributes-model-description The object that the results from the source will bind itself to.
 * @attributes-model-type NojsBindModel
 * @attributes-model-value model
 * @attributes-savedRoute-description The route to navigate to once the response from the server returns successful.
 * @attributes-savedRoute-type String
 * @attributes-onSave-description This function will be called when the save successfully completes
 * @attributes-onSave-type method
 * @attributes-onError-description This function will be called when an error is returned from the service call.
 * @attributes-onError-type method
 *
 *
 * @exampleDescription Add the nojsBindSave attribute to any element. The associated click event on that element will cause the model to save.
 * <button nojsBindSave store="https://someservice/save" storeObjectParam="orders" [model]="model"
 *   [storeParams]="{userId: 200}" savedRoute="/views/users"
 *   (onSave)="callMeOnSave()" (onError)="doSomething()">
 *   Save
 * </button>
 *
 */
@Directive({
    selector: '[kbSave]'
})
export class KinibindSaveDirective implements OnInit {

    @Input('model') model: KinibindModel;
    @Input('store') storeURL: string;
    @Input('method') method: string;
    @Input('savedRoute') savedRoute: string;
    @Input('withCredentials') withCredentials: boolean;

    @Output('onSave') onSave: EventEmitter<any> = new EventEmitter();
    @Output('onError') onError: EventEmitter<any> = new EventEmitter();

    @HostListener('click', ['$event']) onClick($event) {
        this.save();
    }

    constructor(private http: HttpClient,
                private router: Router,
                private kbRequest: KinibindRequestService) {

    }

    ngOnInit(): void {

    }

    private save() {
        let postParams: any;

        if (this.model) {
            if (_.isArray(this.model.data) && this.model.data.length > 0) {
                postParams = this.model.data;
            } else if (_.isObject(this.model.data)) {
                postParams = this.model.data;
            }
        }

        const method = this.method || 'POST';

        this.kbRequest.makeRequest(method, this.storeURL,
            {
                withCredentials: this.withCredentials || false,
                params: postParams
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
