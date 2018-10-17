import { AbstractControl, Validator, ValidatorFn } from '@angular/forms';
export declare function matchRegexValidator(match: RegExp): ValidatorFn;
export declare class MatchRegexDirective implements Validator {
    matchRegex: string;
    validate(control: AbstractControl): {
        [key: string]: any;
    };
}
