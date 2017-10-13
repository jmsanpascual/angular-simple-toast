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
