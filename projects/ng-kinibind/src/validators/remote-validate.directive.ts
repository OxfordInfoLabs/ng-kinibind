import { AbstractControl, NG_ASYNC_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';


@Directive({
    selector: '[kbRemoteValidate]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
})
export class NojsRemoteValidateDirective implements Validator {
    @Input('kbRemoteValidate') remoteValidate: string;
    @Input('remoteObjectParam') remoteObjectParam: any;
    @Input('remoteObjectParams') remoteObjectParams: any = {};

    constructor(private kbRequest: KinibindRequestService) {

    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.remoteValidate ? this.remoteValidateValidator(this.remoteValidate)(control)
            : null;
    }

    private remoteValidateValidator(remoteURL: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {

            this.remoteObjectParams[this.remoteObjectParam] = control.value;
            if (control.value) {
                return this.kbRequest.makePostRequest(remoteURL, this.remoteObjectParams).toPromise()
                    .then(valid => {
                        return !valid ? { 'remoteValidate': false } : null;
                    });
            }
            return Promise.resolve(null);
        };
    }

}