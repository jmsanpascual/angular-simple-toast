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
                ' ng-repeat="toast in $ctrl.toasts track by toast.id">' +
                    '<button type="button" class="toast-close" data-dismiss="toast" aria-label="Close"' +
                    ' ng-if="::toast.closeable"' +
                    ' ng-click="$ctrl.dismiss(toast.id)">' +
                        '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '{{ ::toast.content }}' +
                '</div>' +
            '</div>'
        );
    }
}

ToastListController.$inject = ['toastList'];

/* @ngInject */
function ToastListController(toastList) {
    var vm = this;

    vm.$onInit = function () {
        vm.toasts = toastList.all();
    };

    vm.dismiss = function (toastId) {
        toastList.remove(toastId);
    };
}

module.exports = toastListDirective;
