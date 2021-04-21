# ng-kinibind
ng-kinibind is designed to assist in rapid development and rapid prototyping when working with the Angular framework. ng-kinibind contains a number of different directives and components to make http request binding in the view quicker and easier. ng-kinibind achieves this by allowing you to specify the url in HTML attribute markup, automatically binding the results to a pre defined model. This makes the results available to use in your view without having to write any Javascript. Great when working with simple sets of results/lists.

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

### KinibindModel

ng-kinibind expects a model of type `KinibindModel` to be passed to the `[model]` attribute (where required). This ensures consistent behaviour when binding the results from an http request to an object.

```typescript
public bindModel: KinibindModel = new KinibindModel();
```

KinibindModel exposes the following members.

* data (any) - http request results are populated against this member
* totalCount (number) - in the case where `bindModel.data` is of type Array, this will contain the count of results

### Components & Directives

### [kbAction]
___
Perform an action on a given HTML element. Typical use case would be to perform an AJAX request on click of a button.

##### Properties
* actionURL (string) - the URL that the request should be made against.
* method (string) - the method type used in the request
* actionParams (? object) - any parameters that should be sent with the request as POST params.
* successRoute (? string) - the route to navigate to after the action has completed successfully. (Note: will not fire completed event if this is set)

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

##### Example

```html
<kb-bind source="https://enpoint/users" method="GET" [model]="bindModel" [withCredentials]="true"
        [reloadTrigger]="userUpdate" (onLoad)="isLoading = false" (onLoadError)="showError = true">
        
    <dl *ngFor="let user of bindModel.results">
        <dt>{{user.name}}</dt>
        <dd>{{user.email}} <span class="label label-rounded label-primary">{{user.website}}</span></dd>
    </dl>
    
</kb-bind>
```

The result of the http request will be passed into `bindModel`. Results of the request will be bound to `bindModel.data`. 

It is possible to initialise the value of `bindModel.data` upon construction of the model as follows...
```typescript
public bindModel: KinibindModel = new KinibindModel({test: data});
```

##### Paging results

If you need to page the results coming back from your http request due to large result sets, then you can also pass these into the model at construction. These values will be sent in the payload of the http request as {pageSize: 10, page: 1}
```typescript
public bindModel: KinibindModel = new KinibindModel({test: data}, 10, 1);
```

Further updates to page size and index can be achieved by calling setPageOptions on the model itself as follows...
```typescript
bindModel.setPageOptions(10, 2); 
```
This will then trigger a reload of the http request passing the new paging rules in the payload, and binding the returned values back to `bindModel.data`;

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
