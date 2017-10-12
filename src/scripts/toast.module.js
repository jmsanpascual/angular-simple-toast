'use strict';

var toastProvider = require('./toast.provider');
var toastListDirective = require('./toast-list.directive');
var toastListFactory = require('./toast-list.factory');

angular
    .module('ngSimpleToast', [])
    .provider('toast', toastProvider)
    .directive('toastList', toastListDirective)
    .factory('toastList', toastListFactory);
