# Angular Simple Toast
A simple toast module for Angular 1
[DEMO](https://jmsanpascual.github.io/angular-simple-toast/)

## Getting Started
1. Go to your project directory using your command line tool then install the project using npm.

```shell
  npm install angular-simple-toast
```
2. Include angular.js and angular-simple-toast.js to your index page.

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="angular-simple-toast.js"></script>
```
3. Include the angular-simple-toast.css to your index page for the toast design.

```html
<link rel="stylesheet" type="text/css" href="angular-simple-toast.css">
```
4. Add the ngSimpleToast module to you application.

```javascript
angular.module('myApp', ['ngSimpleToast']);
```
5. You can now use the injectable service 'toast'.

```javascript
angular.module('myApp').controller(function (toast) {
  toast.info('This is a toast');
});
```
6. You can also set the default app-wide configuration for toast

```javascript
angular.module('myApp').config(function (toastProvider) {
  toastProvider.config({
    autoClose: true, // Defaults to true
    duration: 10000 // Defaults to 5000
  });
});
```

## Animations
1. If you want to add animations, just download angular-animate.

```shell
  npm install angular-animate
```
2. Include it to your index page's scripts.

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="angular-animate.js"></script>
<script type="text/javascript" src="angular-simple-toast.js"></script>
```
3. Then add it to your module, and animations will work out of the box.

```javascript
angular.module('myApp', ['ngAnimate', 'ngSimpleToast']);
```

## API Documentation

```javascript
// Configuration function for the config block
toastProvider.config(config);
// Configuration function after the config phase is finished
toast.config(config);
```
This sets the global configuration that the toast will use.
#### Parameters:
- config (`Object`)
  - config.autoClose (`Boolean`) Defaults to `true`, closes the toast automatically
  - config.duration (`Integer`) Defaults to `5000`, duration for closing the toast automatically
  - config.closeable (`Boolean`) Defaults to `false`, adds a close button to toast (Overrides autoClose, thus if set to true, toast will not close automatically)

```javascript
toast.make(type, message, closeable);
```
This method appends and shows the toast in the toast list.
#### Parameters:
- type (`String`) values: 'info', 'error', 'warning' and 'error'
- message (`String`)
- closeable (`Boolean`) Optional
#### Return:
- The toast object
> Behavior: This will dismiss the toast automatically if autoClose is true and closeable is false

```javascript
toast.info(message, closeable);
toast.success(message, closeable);
toast.warning(message, closeable);
toast.error(message, closeable);
```
These are helper methods that calls toast.make(type, message, closeable) internally.
#### Parameters:
- message (`String`)
- closeable (`Boolean`) Optional
#### Return:
- The toast object

```javascript
toast.dismiss(toastId);
```
This removes the toast with the specified id after the duration specified in the config.

```javascript
toast.retain(toastId);
```
This cancels the removal of the toast with the specified id. (Contradicts toast.dismiss())

```javascript
toast.clear();
```
This removes all the toast.

```javascript
toast.destroy();
```
This removes the toast-list directive and resets everything.


> A behavior to be noted. When a toast is hovered it will reset the duration of auto close, upon unhovering, the auto close will trigger again. This behavior ignores the closeable configuration.

## Inspirations and Motivations
- https://github.com/tameraydin/ngToast
- https://github.com/CodeSeven/toastr

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/jmsanpascual/angular-simple-toast/blob/master/LICENSE) file for details

## To Do
- [ ] Unit tests
- [ ] Add static icons to toast
- [ ] Support for changing toast position (top-left, bottom-right, etc.)
