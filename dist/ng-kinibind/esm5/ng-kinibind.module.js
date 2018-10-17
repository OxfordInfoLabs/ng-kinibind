/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KinibindBindDirective } from './bind/kinibind-bind.directive';
import { KinibindFilterComponent } from './filter/kinibind-filter.component';
import { KinibindFilterElementDirective } from './filter-element/kinibind-filter-element.directive';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { KinibindSaveDirective } from './bind-save/kinibind-save.directive';
import { FormsModule } from '@angular/forms';
import { KinibindFormDirective } from './form/kinibind-form.directive';
import { MatchRegexDirective } from './validators/match-regex.directive';
import { NojsRemoteValidateDirective } from './validators/remote-validate.directive';
import { KinibindActionDirective } from './action/kinibind-action.directive';
import { KinibindRequestService } from './shared/kinibind-request.service';
var NgKinibindModule = /** @class */ (function () {
    function NgKinibindModule() {
    }
    NgKinibindModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        FormsModule,
                        HttpClientJsonpModule
                    ],
                    declarations: [
                        KinibindBindDirective,
                        KinibindFilterComponent,
                        KinibindSaveDirective,
                        KinibindFilterElementDirective,
                        KinibindFormDirective,
                        MatchRegexDirective,
                        NojsRemoteValidateDirective,
                        KinibindActionDirective
                    ],
                    exports: [
                        KinibindBindDirective,
                        KinibindSaveDirective,
                        KinibindFilterComponent,
                        KinibindFilterElementDirective,
                        KinibindFormDirective,
                        MatchRegexDirective,
                        NojsRemoteValidateDirective,
                        KinibindActionDirective
                    ],
                    providers: [
                        KinibindRequestService
                    ]
                },] },
    ];
    return NgKinibindModule;
}());
export { NgKinibindModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJuZy1raW5pYmluZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Z0JBRTFFLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gscUJBQXFCO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjt3QkFDckIsOEJBQThCO3dCQUM5QixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3dCQUMzQix1QkFBdUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsdUJBQXVCO3dCQUN2Qiw4QkFBOEI7d0JBQzlCLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQiwyQkFBMkI7d0JBQzNCLHVCQUF1QjtxQkFDMUI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLHNCQUFzQjtxQkFDekI7aUJBQ0o7OzJCQTVDRDs7U0E2Q2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBLaW5pYmluZEJpbmREaXJlY3RpdmUgfSBmcm9tICcuL2JpbmQva2luaWJpbmQtYmluZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpbHRlci9raW5pYmluZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZmlsdGVyLWVsZW1lbnQva2luaWJpbmQtZmlsdGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEh0dHBDbGllbnRKc29ucE1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEtpbmliaW5kU2F2ZURpcmVjdGl2ZSB9IGZyb20gJy4vYmluZC1zYXZlL2tpbmliaW5kLXNhdmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgS2luaWJpbmRGb3JtRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtL2tpbmliaW5kLWZvcm0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdGNoUmVnZXhEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkYXRvcnMvbWF0Y2gtcmVnZXguZGlyZWN0aXZlJztcbmltcG9ydCB7IE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vdmFsaWRhdG9ycy9yZW1vdGUtdmFsaWRhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9hY3Rpb24va2luaWJpbmQtYWN0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQva2luaWJpbmQtcmVxdWVzdC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRKc29ucE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEtpbmliaW5kQmluZERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtpbmliaW5kU2F2ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZvcm1EaXJlY3RpdmUsXG4gICAgICAgIE1hdGNoUmVnZXhEaXJlY3RpdmUsXG4gICAgICAgIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgS2luaWJpbmRCaW5kRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZFNhdmVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRm9ybURpcmVjdGl2ZSxcbiAgICAgICAgTWF0Y2hSZWdleERpcmVjdGl2ZSxcbiAgICAgICAgTm9qc1JlbW90ZVZhbGlkYXRlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEtpbmliaW5kUmVxdWVzdFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nS2luaWJpbmRNb2R1bGUge1xufVxuIl19