import { EventEmitter, OnInit } from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';
import { Router } from "@angular/router";
/**
 *
 * @name NoJS Action
 * @docType Directive
 * @tag nojs-action
 * @templateData attributeData
 *
 * @description The NoJS Bind Directive allows for rapid binding of a JSON model source to a model. This should primarily be used for drawing lists of model, where the model does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 *
 *
 */
export declare class KinibindActionDirective implements OnInit {
    private kbRequest;
    private router;
    actionURL: string;
    method: string;
    actionParams: any;
    successRoute: string;
    started: EventEmitter<any>;
    completed: EventEmitter<any>;
    error: EventEmitter<any>;
    clickEvent(event: any): void;
    constructor(kbRequest: KinibindRequestService, router: Router);
    ngOnInit(): void;
}
