
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
            vm.options = {
                autoClose: true,
                duration: 5000
            };
        };

        vm.optionChange = function (option) {
            toast.config(option);
        };

        vm.show = function (_toast) {
            toast[_toast.type](_toast.message, _toast.closeable);
        };

        vm.clear = function () {
            toast.clear();
        };

        vm.destroy = function () {
            toast.destroy();
        };
    }
})();
