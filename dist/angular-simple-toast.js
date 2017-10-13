(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* @ngInject */
function toastListDirective() {
    var directive = {
        restrict: 'E',
        template: templateFunc,
        scope: {},
        link: linkFunc,
        controller: ToastListController,
        controllerAs: '$ctrl',
        bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attr, ctrl) {

    }

    function templateFunc() {
        return (
            '<div class="toast-container">' +
                '<div class="toast toast-{{ ::toast.type }}"' +
                ' ng-repeat="toast in $ctrl.toasts track by toast.id"' +
                ' ng-mouseover="::$ctrl.retain(toast.id)"' +
                ' ng-mouseleave="::$ctrl.dismiss(toast.id)">' +
                    '<button type="button" class="toast-close" data-dismiss="toast" aria-label="Close"' +
                    ' ng-if="::toast.closeable"' +
                    ' ng-click="::$ctrl.remove(toast.id)">' +
                        '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '{{ ::toast.content }}' +
                '</div>' +
            '</div>'
        );
    }
}

ToastListController.$inject = ['toast', 'toastList'];

/* @ngInject */
function ToastListController(toast, toastList) {
    var vm = this;

    vm.$onInit = function () {
        vm.toasts = toastList.all();
    };

    vm.$onDestroy = function () {
        toastList.clear();
        toast.destroy();
    };

    vm.remove = function (toastId) {
        toastList.remove(toastId);
    };

    vm.retain = function (toastId) {
        toast.retain(toastId);
    };

    vm.dismiss = function (toastId) {
        toast.dismiss(toastId);
    };
}

module.exports = toastListDirective;

},{}],2:[function(require,module,exports){
'use strict';

ToastListFactory.$inject = [];

/* @ngInject */
function ToastListFactory() {
    var toasts = [];
    var service = {
        all: all,
        clear: clear,
        add: add,
        remove: remove,
        _generateId: _generateId,
        _getIndexById: _getIndexById
    };

    return service;

    function all() {
        return toasts;
    }

    function clear() {
        toasts.length = 0;
    }

    function add(toast) {
        var id = _generateId();
        while (_getIndexById(id) > -1) id = _generateId();

        toast.id = id;
        toasts.push(toast);
        return toast;
    }

    function _generateId() {
        return  Math.floor(Math.random() * 1000);
    }

    function remove(id) {
        var index = _getIndexById(id);
        var toast = toasts[index];

        if (index > -1) toasts.splice(index, 1);
        return toast;
    }

    function _getIndexById(id) {
        var len = toasts.length;
        for (var i = 0; i < len; i++) {
            if (toasts[i].id === id) {
                return i;
            }
        }

        return -1;
    }
}

module.exports = ToastListFactory;

},{}],3:[function(require,module,exports){
'use strict';

var toastProvider = require('./toast.provider');
var toastListDirective = require('./toast-list.directive');
var toastListFactory = require('./toast-list.factory');

angular
    .module('ngSimpleToast', [])
    .provider('toast', toastProvider)
    .directive('toastList', toastListDirective)
    .factory('toastList', toastListFactory);

},{"./toast-list.directive":1,"./toast-list.factory":2,"./toast.provider":4}],4:[function(require,module,exports){
'use strict';

toast.$inject = [];

/* @ngInject */
function toast() {
    var defaults = {
        closeable: false,
        autoClose: true,
        duration: 5000
    };
    var config = function (settings) {
        angular.merge(defaults, settings);
    };

    return {
        config: config,
        $get: ['$compile', '$document', '$rootScope', '$timeout', 'toastList', factory]
    };

    function factory($compile, $document, $rootScope, $timeout, toastList) {
        var toastListDirective = {};
        var toastsForDismissal = {};
        var service = {
            config: config,
            make: make,
            info: info,
            success: success,
            warning: warning,
            error: error,
            dismiss: dismiss,
            retain: retain,
            destroy: destroy,
            clear: toastList.clear,
        };

        return service;

        function make(type, message, closeable) {
            if (!toastListDirective.element) {
                toastListDirective.scope = $rootScope.$new(false);
                toastListDirective.element = $compile(
                    '<toast-list></toast-list>'
                )(toastListDirective.scope);

                var body = $document.find('body').eq(0);
                body.append(toastListDirective.element);
            }

            var _toast = toastList.add({
                content: message,
                closeable: closeable || defaults.closeable,
                type: type
            });

            if (defaults.autoClose && !_toast.closeable) dismiss(_toast.id);
            return _toast;
        }

        function dismiss(id) {
            toastsForDismissal[id] = $timeout(function () {
                toastList.remove(id);
            }, defaults.duration);
        }

        function retain(id) {
            var dismissTimeout = toastsForDismissal[id];
            if (dismissTimeout) $timeout.cancel(dismissTimeout);
        }

        function info(message, closeable) {
            return make('info', message, closeable);
        }

        function success(message, closeable) {
            return make('success', message, closeable);
        }

        function warning(message, closeable) {
            return make('warning', message, closeable);
        }

        function error (message, closeable) {
            return make('error', message, closeable);
        }

        function destroy() {
            // Cache the values then immediately clear the toastListDirective
            // to prevent infinite call stack because, this is called
            // in the .$onDestroy of toast-list directive
            var scope = toastListDirective.scope;
            var element = toastListDirective.element;
            toastListDirective = {};

            if (scope) scope.$destroy();
            if (element) element.remove();
        }
    }
}

module.exports = toast;

},{}]},{},[3]);
