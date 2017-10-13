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
