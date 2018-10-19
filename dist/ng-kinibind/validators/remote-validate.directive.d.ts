import { AbstractControl, Validator } from '@angular/forms';
import { KinibindRequestService } from '../shared/kinibind-request.service';
export declare class NojsRemoteValidateDirective implements Validator {
    private kbRequest;
    remoteValidate: string;
    method: string;
    key: string;
    withCredentials: boolean;
    remoteParams: any;
    constructor(kbRequest: KinibindRequestService);
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    private remoteValidateValidator(remoteURL);
}
