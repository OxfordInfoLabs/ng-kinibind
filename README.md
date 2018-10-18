# ng-kinibind
Kinibind binders for use with the Angular framework.

## Usage

#### Install
```bash
npm install ng-kinibind
```
#### Import
```ts
import { NgKinibindModule } from 'ng-kinibind';

// In your App's module:
imports: [
    NgKinibindModule
]
```

### Components & Directives

#### Action
* _coming soon_

#### Bind
Simple AJAX request directive, designed to for rapid binding of simple AJAX requests in the view. Useful for rapid development or prototyping when simple structures need to be bound to the view.

##### Example
___

In your component.ts create an instance KinibindModel object.
```typescript
public bindModel: KinibindModel = new KinibindBindModel();
```

Pass this into the [model] property of the `kb-bind` directive.
```html
<kb-bind [model]="bindModel">
```

Set your AJAX URL and method type (defaults to GET)
```html
<kb-bind source="https://jsonplaceholder.typicode.com/users" method="GET" [model]="bindModel"></kb-bind>
```

The result of the AJAX request will be passed into `bindModel`. Results can be accessed on the model as follows:

|Type|Member|
|:---:|:------:|
|Array|`bindModel.results`|
|Object|`bindModel.item`|
|String|`bindModel.value`|
|Number|`bindModel.value`|

Final result

```html
<kb-bind source="https://jsonplaceholder.typicode.com/users" method="GET" [model]="bindModel">
    <dl *ngFor="let user of bindModel.results">
        <dt>{{user.name}}</dt>
        <dd>{{user.email}} <span class="label label-rounded label-primary">{{user.website}}</span></dd>
    </dl>
</kb-bind>
```


#### Bind Save
* _coming soon_
#### Filter
* _coming soon_
#### Filter Element
* _coming soon_
#### Forms
* _coming soon_
#### Validators
* _coming soon_
