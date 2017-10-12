
(function() {
    'use strict';

    angular
        .module('myApp', ['ngAnimate', 'ngSimpleToast'])
        .controller('MainController', MainController);

    MainController.$inject = ['toast'];

    function MainController(toast) {
        var vm = this;

        vm.$onInit = function () {
            vm.toast = {
                message: 'Hello World!',
                type: 'info',
                closeable: false
            };
        };

        vm.show = function (_toast) {
            toast[_toast.type](_toast.message, _toast.closeable);
        };
    }
})();
