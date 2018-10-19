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
        this.withCredentials = false;
        this.remoteParams = {};
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
            if (control.value) {
                /** @type {?} */
                var method = _this.method ? _this.method : (_this.remoteParams ? 'POST' : 'GET');
                /** @type {?} */
                var url = void 0;
                if (remoteURL.includes('?')) {
                    url = remoteURL + ("&" + _this.key + "=" + control.value);
                }
                else {
                    url = remoteURL + ("?" + _this.key + "=" + control.value);
                }
                return _this.kbRequest.makeRequest(method, url, {
                    withCredentials: _this.withCredentials,
                    params: _this.remoteParams
                }).toPromise()
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
        method: [{ type: Input, args: ['method',] }],
        key: [{ type: Input, args: ['key',] }],
        withCredentials: [{ type: Input, args: ['withCredentials',] }],
        remoteParams: [{ type: Input, args: ['remoteParams',] }]
    };
    return NojsRemoteValidateDirective;
}());
export { NojsRemoteValidateDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXZhbGlkYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWtpbmliaW5kLyIsInNvdXJjZXMiOlsidmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW1CLG1CQUFtQixFQUEwQixNQUFNLGdCQUFnQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztJQWN4RSxxQ0FBb0IsU0FBaUM7UUFBakMsY0FBUyxHQUFULFNBQVMsQ0FBd0I7K0JBSEEsS0FBSzs0QkFDZixFQUFFO0tBSTVDOzs7OztJQUVELDhDQUFROzs7O0lBQVIsVUFBUyxPQUF3QjtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkYsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNkOzs7OztJQUVPLDZEQUF1Qjs7OztjQUFDLFNBQWlCOztRQUM3QyxNQUFNLENBQUMsVUFBQyxPQUF3QjtZQUU1QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBRWhCLElBQU0sTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRWhGLElBQUksR0FBRyxVQUFDO2dCQUNSLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixHQUFHLEdBQUcsU0FBUyxJQUFHLE1BQUksS0FBSSxDQUFDLEdBQUcsU0FBSSxPQUFPLENBQUMsS0FBTyxDQUFBLENBQUM7aUJBQ3JEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEdBQUcsR0FBRyxTQUFTLElBQUcsTUFBSSxLQUFJLENBQUMsR0FBRyxTQUFJLE9BQU8sQ0FBQyxLQUFPLENBQUEsQ0FBQztpQkFDckQ7Z0JBRUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7b0JBQzNDLGVBQWUsRUFBRSxLQUFJLENBQUMsZUFBZTtvQkFDckMsTUFBTSxFQUFFLEtBQUksQ0FBQyxZQUFZO2lCQUM1QixDQUFDLENBQUMsU0FBUyxFQUFFO3FCQUNULElBQUksQ0FBQyxVQUFBLEtBQUs7b0JBQ1AsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ3RELENBQUMsQ0FBQzthQUNWO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEMsQ0FBQzs7O2dCQTNDVCxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDdkc7Ozs7Z0JBTlEsc0JBQXNCOzs7aUNBUTFCLEtBQUssU0FBQyxrQkFBa0I7eUJBQ3hCLEtBQUssU0FBQyxRQUFRO3NCQUNkLEtBQUssU0FBQyxLQUFLO2tDQUNYLEtBQUssU0FBQyxpQkFBaUI7K0JBQ3ZCLEtBQUssU0FBQyxjQUFjOztzQ0FkekI7O1NBU2EsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19BU1lOQ19WQUxJREFUT1JTLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tiUmVtb3RlVmFsaWRhdGVdJyxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCdrYlJlbW90ZVZhbGlkYXRlJykgcmVtb3RlVmFsaWRhdGU6IHN0cmluZztcbiAgICBASW5wdXQoJ21ldGhvZCcpIG1ldGhvZDogc3RyaW5nO1xuICAgIEBJbnB1dCgna2V5Jykga2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCd3aXRoQ3JlZGVudGlhbHMnKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoJ3JlbW90ZVBhcmFtcycpIHJlbW90ZVBhcmFtczogYW55ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtiUmVxdWVzdDogS2luaWJpbmRSZXF1ZXN0U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbGlkYXRlID8gdGhpcy5yZW1vdGVWYWxpZGF0ZVZhbGlkYXRvcih0aGlzLnJlbW90ZVZhbGlkYXRlKShjb250cm9sKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3RlVmFsaWRhdGVWYWxpZGF0b3IocmVtb3RlVVJMOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZCA/IHRoaXMubWV0aG9kIDogKHRoaXMucmVtb3RlUGFyYW1zID8gJ1BPU1QnIDogJ0dFVCcpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHVybDtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3RlVVJMLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVtb3RlVVJMICsgYCYke3RoaXMua2V5fT0ke2NvbnRyb2wudmFsdWV9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSByZW1vdGVVUkwgKyBgPyR7dGhpcy5rZXl9PSR7Y29udHJvbC52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtiUmVxdWVzdC5tYWtlUmVxdWVzdChtZXRob2QsIHVybCwge1xuICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucmVtb3RlUGFyYW1zXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWxpZCA/IHsgJ3JlbW90ZVZhbGlkYXRlJzogZmFsc2UgfSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iXX0=