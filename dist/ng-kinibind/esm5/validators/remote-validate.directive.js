/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';
var NojsRemoteValidateDirective = /** @class */ (function () {
    function NojsRemoteValidateDirective(kbRequest) {
        this.kbRequest = kbRequest;
        this.remoteObjectParams = {};
    }
    /**
     * @param {?} control
     * @return {?}
     */
    NojsRemoteValidateDirective.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.remoteValidate ? this.remoteValidateValidator(this.remoteValidate)(control)
            : null;
    };
    /**
     * @param {?} remoteURL
     * @return {?}
     */
    NojsRemoteValidateDirective.prototype.remoteValidateValidator = /**
     * @param {?} remoteURL
     * @return {?}
     */
    function (remoteURL) {
        var _this = this;
        return function (control) {
            _this.remoteObjectParams[_this.remoteObjectParam] = control.value;
            if (control.value) {
                return _this.kbRequest.makePostRequest(remoteURL, _this.remoteObjectParams).toPromise()
                    .then(function (valid) {
                    return !valid ? { 'remoteValidate': false } : null;
                });
            }
            return Promise.resolve(null);
        };
    };
    NojsRemoteValidateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbRemoteValidate]',
                    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: NojsRemoteValidateDirective, multi: true }]
                },] },
    ];
    /** @nocollapse */
    NojsRemoteValidateDirective.ctorParameters = function () { return [
        { type: KinibindRequestService }
    ]; };
    NojsRemoteValidateDirective.propDecorators = {
        remoteValidate: [{ type: Input, args: ['kbRemoteValidate',] }],
        remoteObjectParam: [{ type: Input, args: ['remoteObjectParam',] }],
        remoteObjectParams: [{ type: Input, args: ['remoteObjectParams',] }]
    };
    return NojsRemoteValidateDirective;
}());
export { NojsRemoteValidateDirective };
if (false) {
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.remoteValidate;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.remoteObjectParam;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.remoteObjectParams;
    /** @type {?} */
    NojsRemoteValidateDirective.prototype.kbRequest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXZhbGlkYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWtpbmliaW5kLyIsInNvdXJjZXMiOlsidmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW1CLG1CQUFtQixFQUEwQixNQUFNLGdCQUFnQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztJQVl4RSxxQ0FBb0IsU0FBaUM7UUFBakMsY0FBUyxHQUFULFNBQVMsQ0FBd0I7a0NBRkUsRUFBRTtLQUl4RDs7Ozs7SUFFRCw4Q0FBUTs7OztJQUFSLFVBQVMsT0FBd0I7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDZDs7Ozs7SUFFTyw2REFBdUI7Ozs7Y0FBQyxTQUFpQjs7UUFDN0MsTUFBTSxDQUFDLFVBQUMsT0FBd0I7WUFFNUIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDaEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxFQUFFO3FCQUNoRixJQUFJLENBQUMsVUFBQSxLQUFLO29CQUNQLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUN0RCxDQUFDLENBQUM7YUFDVjtZQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDLENBQUM7OztnQkE3QlQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQ3ZHOzs7O2dCQU5RLHNCQUFzQjs7O2lDQVExQixLQUFLLFNBQUMsa0JBQWtCO29DQUN4QixLQUFLLFNBQUMsbUJBQW1CO3FDQUN6QixLQUFLLFNBQUMsb0JBQW9COztzQ0FaL0I7O1NBU2EsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19BU1lOQ19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiUmVtb3RlVmFsaWRhdGVdJyxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCdrYlJlbW90ZVZhbGlkYXRlJykgcmVtb3RlVmFsaWRhdGU6IHN0cmluZztcbiAgICBASW5wdXQoJ3JlbW90ZU9iamVjdFBhcmFtJykgcmVtb3RlT2JqZWN0UGFyYW06IGFueTtcbiAgICBASW5wdXQoJ3JlbW90ZU9iamVjdFBhcmFtcycpIHJlbW90ZU9iamVjdFBhcmFtczogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbGlkYXRlID8gdGhpcy5yZW1vdGVWYWxpZGF0ZVZhbGlkYXRvcih0aGlzLnJlbW90ZVZhbGlkYXRlKShjb250cm9sKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IocmVtb3RlVVJMOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3RlT2JqZWN0UGFyYW1zW3RoaXMucmVtb3RlT2JqZWN0UGFyYW1dID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMua2JSZXF1ZXN0Lm1ha2VQb3N0UmVxdWVzdChyZW1vdGVVUkwsIHRoaXMucmVtb3RlT2JqZWN0UGFyYW1zKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbih2YWxpZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbGlkID8geyAncmVtb3RlVmFsaWRhdGUnOiBmYWxzZSB9IDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9O1xuICAgIH1cblxufSJdfQ==