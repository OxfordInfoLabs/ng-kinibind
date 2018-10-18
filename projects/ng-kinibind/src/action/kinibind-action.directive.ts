import {
    Directive, EventEmitter, HostListener, Input, OnInit, Output
} from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';

/**
 *
 * @name NoJS Action
 * @docType Directive
 * @tag nojs-action
 * @templateData attributeData
 *
 * @description The NoJS Bind Directive allows for rapid binding of a JSON data source to a model. This should primarily be used for drawing lists of data, where the data does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 *
 *
 */
@Directive({
    selector: '[kbAction]'
})
export class KinibindActionDirective implements OnInit {

    @Input('actionURL') actionURL: string;
    @Input('method') method: string;
    @Input('actionParams') actionParams: any;

    @Output('started') started: EventEmitter<any> = new EventEmitter<any>();
    @Output('completed') completed: EventEmitter<any> = new EventEmitter<any>();
    @Output('error') error: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('click', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.started.emit(true);

        const method = this.method ? this.method : (this.actionParams ? 'POST' : 'GET');

        this.kbRequest.makeRequest(method, this.actionURL,
            {
                params: this.actionParams
            })
            .toPromise()
            .then(result => {
                this.completed.emit(result);
            })
            .catch(error => {
                this.error.emit(error);
            });
    }

    constructor(private kbRequest: KinibindRequestService) {
    }

    ngOnInit(): void {
    }
}
