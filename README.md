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
Perform an action on a given HTML element. Typical use case would be to perform an AJAX request on click of a button.

##### Example
___

##### Properties
* actionURL (string) - the URL that the request should be made against.
* method (string) - the method type used in the request
* actionParams (? object) - any parameters that should be sent with the request as POST params.

##### Events
* started - fires when the action begins
* completed - fires when the action has finished
* error - fires if there was an error making the request

###### Full example

```html
<button kbAction actionURL="/endpoint/users/1" method="DELETE" 
        (started)="isLoading = true" (completed)="reloadUsers()" (error)="userError = true"> 
        Delete User 1 
</button>
```


#### Bind
Simple AJAX request directive, designed for rapid binding of simple AJAX requests in the view. Useful for rapid development or prototyping when simple structures need to be bound to the view.

##### Example
___

##### Properties
* source (string) - the URL of the request
* method (string) - the method type used in the request
* model (KinibindModel) - the model to bind the results to
* sourceParams (? object) - any parameters that should be sent with the request as POST params.
* withCredentials (? boolean) - whether the http request should also set withCredentials (defaults to false)
* reloadTrigger (? Observable) - changes to this observable will cause a reload of the http request and fetch new data.

##### Events
* onLoad - fires if the request completes successfully
* onLoadError - fires if there was an error making the http request


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

###### Full example

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
