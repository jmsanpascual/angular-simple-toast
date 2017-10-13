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
