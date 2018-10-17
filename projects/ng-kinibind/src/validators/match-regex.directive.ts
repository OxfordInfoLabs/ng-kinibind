import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function matchRegexValidator(match: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const matched = match.test(control.value);
        return !matched ? {'matchRegex': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[kbMatchRegex]',
    providers: [{provide: NG_VALIDATORS, useExisting: MatchRegexDirective, multi: true}]
})
export class MatchRegexDirective implements Validator {
    @Input('kbMatchRegex') matchRegex: string;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.matchRegex ? matchRegexValidator(new RegExp(this.matchRegex, 'i'))(control)
            : null;
    }
}