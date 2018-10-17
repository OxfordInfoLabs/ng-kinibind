/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
/**
 * @param {?} match
 * @return {?}
 */
export function matchRegexValidator(match) {
    return (control) => {
        /** @type {?} */
        const matched = match.test(control.value);
        return !matched ? { 'matchRegex': { value: control.value } } : null;
    };
}
export class MatchRegexDirective {
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.matchRegex ? matchRegexValidator(new RegExp(this.matchRegex, 'i'))(control)
            : null;
    }
}
MatchRegexDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kbMatchRegex]',
                providers: [{ provide: NG_VALIDATORS, useExisting: MatchRegexDirective, multi: true }]
            },] },
];
MatchRegexDirective.propDecorators = {
    matchRegex: [{ type: Input, args: ['kbMatchRegex',] }]
};
if (false) {
    /** @type {?} */
    MatchRegexDirective.prototype.matchRegex;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtcmVnZXguZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcta2luaWJpbmQvIiwic291cmNlcyI6WyJ2YWxpZGF0b3JzL21hdGNoLXJlZ2V4LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFtQixhQUFhLEVBQTBCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRWpELE1BQU0sOEJBQThCLEtBQWE7SUFDN0MsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBd0IsRUFBRTs7UUFDdEQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLFlBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ25FLENBQUM7Q0FDTDtBQU1ELE1BQU07Ozs7O0lBR0YsUUFBUSxDQUFDLE9BQXdCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDZDs7O1lBVkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ3ZGOzs7eUJBRUksS0FBSyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaFJlZ2V4VmFsaWRhdG9yKG1hdGNoOiBSZWdFeHApOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWQgPSBtYXRjaC50ZXN0KGNvbnRyb2wudmFsdWUpO1xuICAgICAgICByZXR1cm4gIW1hdGNoZWQgPyB7J21hdGNoUmVnZXgnOiB7dmFsdWU6IGNvbnRyb2wudmFsdWV9fSA6IG51bGw7XG4gICAgfTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba2JNYXRjaFJlZ2V4XScsXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBNYXRjaFJlZ2V4RGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1dXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoUmVnZXhEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgna2JNYXRjaFJlZ2V4JykgbWF0Y2hSZWdleDogc3RyaW5nO1xuXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaFJlZ2V4ID8gbWF0Y2hSZWdleFZhbGlkYXRvcihuZXcgUmVnRXhwKHRoaXMubWF0Y2hSZWdleCwgJ2knKSkoY29udHJvbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG59Il19