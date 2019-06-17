import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NgKinibindModule } from '../ng-kinibind.module';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    template: `<button kbAction actionURL="https://jsonplaceholder.typicode.com/todos/1" 
                       (started)="started($event)">Take action</button>`
})
class TestActionComponent {
    public started(value) {
        return value;
    }
}

describe('Directive: Kinibind Action', () => {

    let component: TestActionComponent;
    let fixture: ComponentFixture<TestActionComponent>;
    let buttonEl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestActionComponent
            ],
            imports: [
                NgKinibindModule,
                RouterTestingModule
            ]
        });

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestActionComponent);
        component = fixture.componentInstance;
        buttonEl = fixture.nativeElement.querySelector('button');
    });

    it ('should call performAction when the button is clicked', async (() => {
        let startedSpy = spyOn(component, 'started');
        buttonEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(startedSpy).toHaveBeenCalledWith(true);
    }));
});
