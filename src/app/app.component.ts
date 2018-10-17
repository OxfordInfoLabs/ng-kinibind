import { Component } from '@angular/core';
import { KinibindModel } from 'ng-kinibind';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public bindModel: KinibindModel = new KinibindModel();

    constructor() {

    }



}
