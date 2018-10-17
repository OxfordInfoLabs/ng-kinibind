import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgKinibindModule } from 'ng-kinibind';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgKinibindModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
