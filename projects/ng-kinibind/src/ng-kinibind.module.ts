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

@NgModule({
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
})
export class NgKinibindModule {
}
