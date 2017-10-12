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
        var service = {
            config: config,
            make: make,
            info: info,
            success: success,
            warning: warning,
            error: error
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

            _autoDismissToast(_toast);
            return _toast;
        }

        function _autoDismissToast(_toast) {
            if (defaults.autoClose && !_toast.closeable) {
                $timeout(function () {
                    toastList.remove(_toast.id);
                }, defaults.duration);
            }
        }

        function info(message, closeable) {
            make('info', message, closeable);
        }

        function success(message, closeable) {
            make('success', message, closeable);
        }

        function warning(message, closeable) {
            make('warning', message, closeable);
        }

        function error (message, closeable) {
            make('error', message, closeable);
        }
    }
}

module.exports = toast;
