"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setItem = exports.removeItem = exports.getItem = exports.clear = void 0;
function clear() {
    window.localStorage.clear();
}
exports.clear = clear;
function getItem(key) {
    return window.localStorage.getItem(key);
}
exports.getItem = getItem;
function removeItem(key) {
    window.localStorage.removeItem(key);
}
exports.removeItem = removeItem;
function setItem(key, value) {
    window.localStorage.setItem(key, value);
}
exports.setItem = setItem;
