import { AbstractControl, NG_ASYNC_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';


@Directive({
    selector: '[kbRemoteValidate]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
})
export class NojsRemoteValidateDirective implements Validator {
    @Input('kbRemoteValidate') remoteValidate: string;
    @Input('method') method: string;
    @Input('key') key: string;
    @Input('withCredentials') withCredentials: boolean = false;
    @Input('remoteParams') remoteParams: any = {};

    constructor(private kbRequest: KinibindRequestService) {

    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.remoteValidate ? this.remoteValidateValidator(this.remoteValidate)(control)
            : null;
    }

    private remoteValidateValidator(remoteURL: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {

            if (control.value) {

                const method = this.method ? this.method : (this.remoteParams ? 'POST' : 'GET');

                let url;
                if (remoteURL.includes('?')) {
                    url = remoteURL + `&${this.key}=${control.value}`;
                } else {
                    url = remoteURL + `?${this.key}=${control.value}`;
                }

                return this.kbRequest.makeRequest(method, url, {
                    withCredentials: this.withCredentials,
                    params: this.remoteParams
                }).toPromise()
                    .then(valid => {
                        return !valid ? { 'remoteValidate': false } : null;
                    });
            }
            return Promise.resolve(null);
        };
    }

}