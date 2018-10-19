/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';
export class NojsRemoteValidateDirective {
    /**
     * @param {?} kbRequest
     */
    constructor(kbRequest) {
        this.kbRequest = kbRequest;
        this.withCredentials = false;
        this.remoteParams = {};
    }
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.remoteValidate ? this.remoteValidateValidator(this.remoteValidate)(control)
            : null;
    }
    /**
     * @param {?} remoteURL
     * @return {?}
     */
    remoteValidateValidator(remoteURL) {
        return (control) => {
            if (control.value) {
                /** @type {?} */
                const method = this.method ? this.method : (this.remoteParams ? 'POST' : 'GET');
                /** @type {?} */
                let url;
                if (remoteURL.includes('?')) {
                    url = remoteURL + `&${this.key}=${control.value}`;
                }
                else {
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
NojsRemoteValidateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbRemoteValidate]',
                providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
            },] },
];
/** @nocollapse */
NojsRemoteValidateDirective.ctorParameters = () => [
    { type: KinibindRequestService }
];
NojsRemoteValidateDirective.propDecorators = {
    remoteValidate: [{ type: Input, args: ['kbRemoteValidate',] }],
    method: [{ type: Input, args: ['method',] }],
    key: [{ type: Input, args: ['key',] }],
    withCredentials: [{ type: Input, args: ['withCredentials',] }],
    remoteParams: [{ type: Input, args: ['remoteParams',] }]
};
if (false) {
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.remoteValidate;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.method;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.key;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.withCredentials;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.remoteParams;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.kbRequest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXZhbGlkYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWtpbmliaW5kLyIsInNvdXJjZXMiOlsidmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW1CLG1CQUFtQixFQUEwQixNQUFNLGdCQUFnQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBTzVFLE1BQU07Ozs7SUFPRixZQUFvQixTQUFpQztRQUFqQyxjQUFTLEdBQVQsU0FBUyxDQUF3QjsrQkFIQSxLQUFLOzRCQUNmLEVBQUU7S0FJNUM7Ozs7O0lBRUQsUUFBUSxDQUFDLE9BQXdCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuRixDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ2Q7Ozs7O0lBRU8sdUJBQXVCLENBQUMsU0FBaUI7UUFDN0MsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBMEIsRUFBRTtZQUV4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBRWhCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRWhGLElBQUksR0FBRyxDQUFDO2dCQUNSLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3JEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDckQ7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7b0JBQzNDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtvQkFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUM1QixDQUFDLENBQUMsU0FBUyxFQUFFO3FCQUNULElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDVixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDdEQsQ0FBQyxDQUFDO2FBQ1Y7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQyxDQUFDOzs7O1lBM0NULFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3ZHOzs7O1lBTlEsc0JBQXNCOzs7NkJBUTFCLEtBQUssU0FBQyxrQkFBa0I7cUJBQ3hCLEtBQUssU0FBQyxRQUFRO2tCQUNkLEtBQUssU0FBQyxLQUFLOzhCQUNYLEtBQUssU0FBQyxpQkFBaUI7MkJBQ3ZCLEtBQUssU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19BU1lOQ19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiUmVtb3RlVmFsaWRhdGVdJyxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCdrYlJlbW90ZVZhbGlkYXRlJykgcmVtb3RlVmFsaWRhdGU6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgna2V5Jykga2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoJ3JlbW90ZVBhcmFtcycpIHJlbW90ZVBhcmFtczogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbGlkYXRlID8gdGhpcy5yZW1vdGVWYWxpZGF0ZVZhbGlkYXRvcih0aGlzLnJlbW90ZVZhbGlkYXRlKShjb250cm9sKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IocmVtb3RlVVJMOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMucmVtb3RlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHVybDtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3RlVVJMLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVtb3RlVVJMICsgYCYke3RoaXMua2V5fT0ke2NvbnRyb2wudmFsdWV9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSByZW1vdGVVUkwgKyBgPyR7dGhpcy5rZXl9PSR7Y29udHJvbC52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHVybCwge1xuICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucmVtb3RlUGFyYW1zXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWxpZCA/IHsgJ3JlbW90ZVZhbGlkYXRlJzogZmFsc2UgfSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iXX0=