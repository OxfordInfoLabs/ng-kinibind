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
export class NgKinibindModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2luaWJpbmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJuZy1raW5pYmluZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQWlDM0UsTUFBTTs7O1lBL0JMLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLFdBQVc7b0JBQ1gscUJBQXFCO2lCQUN4QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YscUJBQXFCO29CQUNyQix1QkFBdUI7b0JBQ3ZCLHFCQUFxQjtvQkFDckIsOEJBQThCO29CQUM5QixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsMkJBQTJCO29CQUMzQix1QkFBdUI7aUJBQzFCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2Qiw4QkFBOEI7b0JBQzlCLHFCQUFxQjtvQkFDckIsbUJBQW1CO29CQUNuQiwyQkFBMkI7b0JBQzNCLHVCQUF1QjtpQkFDMUI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLHNCQUFzQjtpQkFDekI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgS2luaWJpbmRCaW5kRGlyZWN0aXZlIH0gZnJvbSAnLi9iaW5kL2tpbmliaW5kLWJpbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtpbmliaW5kRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXIva2luaWJpbmQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLaW5pYmluZEZpbHRlckVsZW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2ZpbHRlci1lbGVtZW50L2tpbmliaW5kLWZpbHRlci1lbGVtZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50SnNvbnBNb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBLaW5pYmluZFNhdmVEaXJlY3RpdmUgfSBmcm9tICcuL2JpbmQtc2F2ZS9raW5pYmluZC1zYXZlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtpbmliaW5kRm9ybURpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS9raW5pYmluZC1mb3JtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRjaFJlZ2V4RGlyZWN0aXZlIH0gZnJvbSAnLi92YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3ZhbGlkYXRvcnMvcmVtb3RlLXZhbGlkYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLaW5pYmluZEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vYWN0aW9uL2tpbmliaW5kLWFjdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2luaWJpbmRSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2tpbmliaW5kLXJlcXVlc3Quc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50SnNvbnBNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBLaW5pYmluZEJpbmREaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLaW5pYmluZFNhdmVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kRmlsdGVyRWxlbWVudERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRGb3JtRGlyZWN0aXZlLFxuICAgICAgICBNYXRjaFJlZ2V4RGlyZWN0aXZlLFxuICAgICAgICBOb2pzUmVtb3RlVmFsaWRhdGVEaXJlY3RpdmUsXG4gICAgICAgIEtpbmliaW5kQWN0aW9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEtpbmliaW5kQmluZERpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRTYXZlRGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2luaWJpbmRGaWx0ZXJFbGVtZW50RGlyZWN0aXZlLFxuICAgICAgICBLaW5pYmluZEZvcm1EaXJlY3RpdmUsXG4gICAgICAgIE1hdGNoUmVnZXhEaXJlY3RpdmUsXG4gICAgICAgIE5vanNSZW1vdGVWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgICAgICAgS2luaWJpbmRBY3Rpb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBLaW5pYmluZFJlcXVlc3RTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0tpbmliaW5kTW9kdWxlIHtcbn1cbiJdfQ==