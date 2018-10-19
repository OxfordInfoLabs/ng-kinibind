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

### [kbAction]
___
Perform an action on a given HTML element. Typical use case would be to perform an AJAX request on click of a button.

##### Properties
* actionURL (string) - the URL that the request should be made against.
* method (string) - the method type used in the request
* actionParams (? object) - any parameters that should be sent with the request as POST params.

##### Events
* started - fires when the action begins
* completed - fires when the action has finished
* error - fires if there was an error making the request

##### Example

```html
<button kbAction actionURL="https://enpoint/users/1" method="DELETE" 
        (started)="isLoading = true" (completed)="reloadUsers()" (error)="userError = true"> 
        Delete User 1 
</button>
```


### kb-bind
___
Simple AJAX request directive, designed for rapid binding of simple AJAX requests in the view. Useful for rapid development or prototyping when simple structures need to be bound to the view.

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
<kb-bind source="https://enpoint/users" method="GET" [model]="bindModel"></kb-bind>
```

The result of the AJAX request will be passed into `bindModel`. Results can be accessed on the model as follows:

|Type|Member|
|:---:|:------:|
|Array|`bindModel.results`|
|Object|`bindModel.item`|
|String|`bindModel.value`|
|Number|`bindModel.value`|

##### Example

```html
<kb-bind source="https://enpoint/users" method="GET" [model]="bindModel">
    <dl *ngFor="let user of bindModel.results">
        <dt>{{user.name}}</dt>
        <dd>{{user.email}} <span class="label label-rounded label-primary">{{user.website}}</span></dd>
    </dl>
</kb-bind>
```


### [kbSave]
___
If changes have been made to `bindModel: KinibindModel` and you want these changes to persist, you can send them back to the server using `kbSave`

##### Properties
* model (KinibindModel) - the model which has the changes you want to send back to the server.
* store (string) - the server endpoint to send the model changes to. The full `bindModel.item` or `bindModel.results` will be sent as the payload back to the server.
* method (string) - request method. Defaults to POST
* savedRoute (? string) - if the http request returns successfully then the route provided will be navigated to.
* withCredentials (? boolean) - whether the http request should also set withCredentials (defaults to false)

##### Events
* onSave - fires once the save has returned successful.
* on Error - fires if an error is returned from the request

##### Example

```html
<button kbSave store="https://enpoint/users" method="POST" [model]="bindModel"
         savedRoute="/views/users" (onSave)="callMeOnSave()" (onError)="doSomething()">
        Save User
</button>
```

#### Filter
* _coming soon_
#### Filter Element
* _coming soon_


### [kbForm]
___

Simple sourcing of form data from an external source using URL string. Combined with saving of data to server via http request on form submission.

##### Properties
* source (string) - the url to fetch the data from
* sourceParams (? object) - POST params to send with the source for fetching data.
* sourceMethod (? string) - request method type (defaults to GET)
* model (KinibindModel) - the model to bind the data to and from
* store (string) - the url that the model data should be sent to
* storeMethod (?string) - request method type (defaults to POST)
* savedRoute (? string) - the route to navigate to after successful save
* dirtyOnly (? boolean) - only attempt a save if the model contains dirty fields (defaults to false)
* withCredentials (? boolean) - whether the http request should also set withCredentials (defaults to false)

##### Events
* onLoad - fires once the data has been fetched from the server
* onLoadError - fires if there was an error while fetching the data
* onSave - fires once data has been sent to the server
* onError - fires if there was an error while sending data to server

##### Example

```html
<form kbForm [model]="formModel" source="https://endpoint/address/1"
        store="https://endpoint/address/1" storeMethod="PUT"
        savedRoute="/views/addresses" (onSave)="reloadAddresses()">
 
      <div class="form-group">
        <label>ID</label>
        <input type="text" name="id" [(ngModel)]="formModel.item.id" required>
      </div>
     
      <div class="form-group">
        <label>Line 1</label>
        <input type="text" name="line1" [(ngModel)]="formModel.item.line1">
      </div>
     
      <div class="form-group">
        <label>City</label>
        <input type="text" name="city" [(ngModel)]="formModel.item.city">
      </div>
     
      <div class="form-group">
        <label>Postcode</label>
        <input type="text" name="postcode" [(ngModel)]="formModel.item.postcode">
      </div>
     
      <button type="submit">Save</button>
</form>
```

### Validators
___

Custom input field validators.

#### [kbMatchRegex]

Validate the field using a Regex string.

```html
<div class="form-group">
    <label>Website</label>
    <input type="text" name="website" [(ngModel)]="formModel.item.website" kbMatchRegex="^(http|https)://">
</div>
```

#### [kbRemoteValidate]

Validate the value of the input field against a remote http request.

##### Properties
* key (string) - the name of the key to assign the value of the field in the request param.
* method (? string) - request method type (defaults to GET if no post params supplied)
* withCredentials (? boolean) - whether the http request should also set withCredentials (defaults to false)
* remoteParams (? object) - additional post params to be sent with the request


```html
<div class="form-group">
    <label>Username</label>
    <input type="text" name="username" [(ngModel)]="formModel.item.username" 
            kbRemoteValidate="https://endpoint/usernameAvailable" key="username">
</div>
```
