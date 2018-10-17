/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { KinibindRequestService } from '../shared/kinibind-request.service';
/**
 *
 * \@name NoJS Action
 * \@docType Directive
 * \@tag nojs-action
 * \@templateData attributeData
 *
 * \@description The NoJS Bind Directive allows for rapid binding of a JSON data source to a model. This should primarily be used for drawing lists of data, where the data does not change as the result of user input. However, this can be used in conjunction with nojsBindSave to send any model changes back to the server. If you are looking to implement Form behaviour, then use nojsForm.
 *
 *
 *
 */
var KinibindActionDirective = /** @class */ (function () {
    function KinibindActionDirective(kbRequest) {
        this.kbRequest = kbRequest;
        this.started = new EventEmitter();
        this.completed = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    KinibindActionDirective.prototype.clickEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        this.started.emit(true);
        /** @type {?} */
        var postParams = this.actionParams || {};
        this.kbRequest.makePostRequest(this.actionURL, postParams).toPromise()
            .then(function (result) {
            _this.completed.emit(result);
        })
            .catch(function (error) {
            _this.error.emit(error);
        });
    };
    /**
     * @return {?}
     */
    KinibindActionDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    KinibindActionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kbAction]'
                },] },
    ];
    /** @nocollapse */
    KinibindActionDirective.ctorParameters = function () { return [
        { type: KinibindRequestService }
    ]; };
    KinibindActionDirective.propDecorators = {
        actionURL: [{ type: Input, args: ['actionURL',] }],
        actionParams: [{ type: Input, args: ['actionParams',] }],
        started: [{ type: Output, args: ['started',] }],
        completed: [{ type: Output, args: ['completed',] }],
        error: [{ type: Output, args: ['error',] }],
        clickEvent: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return KinibindActionDirective;
}());
export { KinibindActionDirective };
if (false) {
    /** @type {?} */
    KinibindActionDirective.prototype.actionURL;
    /** @type {?} */
    KinibindActionDirective.prototype.actionParams;
    /** @type {?} */
    KinibindActionDirective.prototype.started;
    /** @type {?} */
    KinibindActionDirective.prototype.completed;
    /** @type {?} */
    KinibindActionDirective.prototype.error;
    /** @type {?} */
    KinibindActionDirective.prototype.kbRequest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2luaWJpbmQtYWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWtpbmliaW5kLyIsInNvdXJjZXMiOlsiYWN0aW9uL2tpbmliaW5kLWFjdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUMvRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUEwQ3hFLGlDQUFvQixTQUFpQztRQUFqQyxjQUFTLEdBQVQsU0FBUyxDQUF3Qjt1QkFwQkwsSUFBSSxZQUFZLEVBQU87eUJBQ25CLElBQUksWUFBWSxFQUFPO3FCQUMvQixJQUFJLFlBQVksRUFBTztLQW1CbEU7Ozs7O0lBaEJELDRDQUFVOzs7O0lBRFYsVUFDVyxLQUFLO1FBRGhCLGlCQWNDO1FBWkcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFDeEIsSUFBTSxVQUFVLEdBQVEsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUU7YUFDakUsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1IsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ1Y7Ozs7SUFLRCwwQ0FBUTs7O0lBQVI7S0FDQzs7Z0JBaENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtpQkFDekI7Ozs7Z0JBaEJRLHNCQUFzQjs7OzRCQW1CMUIsS0FBSyxTQUFDLFdBQVc7K0JBQ2pCLEtBQUssU0FBQyxjQUFjOzBCQUVwQixNQUFNLFNBQUMsU0FBUzs0QkFDaEIsTUFBTSxTQUFDLFdBQVc7d0JBQ2xCLE1BQU0sU0FBQyxPQUFPOzZCQUVkLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tDQTdCckM7O1NBb0JhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9raW5pYmluZC1yZXF1ZXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqXG4gKiBAbmFtZSBOb0pTIEFjdGlvblxuICogQGRvY1R5cGUgRGlyZWN0aXZlXG4gKiBAdGFnIG5vanMtYWN0aW9uXG4gKiBAdGVtcGxhdGVEYXRhIGF0dHJpYnV0ZURhdGFcbiAqXG4gKiBAZGVzY3JpcHRpb24gVGhlIE5vSlMgQmluZCBEaXJlY3RpdmUgYWxsb3dzIGZvciByYXBpZCBiaW5kaW5nIG9mIGEgSlNPTiBkYXRhIHNvdXJjZSB0byBhIG1vZGVsLiBUaGlzIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBmb3IgZHJhd2luZyBsaXN0cyBvZiBkYXRhLCB3aGVyZSB0aGUgZGF0YSBkb2VzIG5vdCBjaGFuZ2UgYXMgdGhlIHJlc3VsdCBvZiB1c2VyIGlucHV0LiBIb3dldmVyLCB0aGlzIGNhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggbm9qc0JpbmRTYXZlIHRvIHNlbmQgYW55IG1vZGVsIGNoYW5nZXMgYmFjayB0byB0aGUgc2VydmVyLiBJZiB5b3UgYXJlIGxvb2tpbmcgdG8gaW1wbGVtZW50IEZvcm0gYmVoYXZpb3VyLCB0aGVuIHVzZSBub2pzRm9ybS5cbiAqXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JBY3Rpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ2FjdGlvblVSTCcpIGFjdGlvblVSTDogc3RyaW5nO1xuICAgIEBJbnB1dCgnYWN0aW9uUGFyYW1zJykgYWN0aW9uUGFyYW1zOiBhbnk7XG5cbiAgICBAT3V0cHV0KCdzdGFydGVkJykgc3RhcnRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCdjb21wbGV0ZWQnKSBjb21wbGV0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgnZXJyb3InKSBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja0V2ZW50KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgY29uc3QgcG9zdFBhcmFtczogYW55ID0gdGhpcy5hY3Rpb25QYXJhbXMgfHwge307XG5cbiAgICAgICAgdGhpcy5rYlJlcXVlc3QubWFrZVBvc3RSZXF1ZXN0KHRoaXMuYWN0aW9uVVJMLCBwb3N0UGFyYW1zKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrYlJlcXVlc3Q6IEtpbmliaW5kUmVxdWVzdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG59XG4iXX0=