(function () {
    "use strict";

    var BG = chrome.extension.getBackgroundPage();
    var _$ = function (id) {
        return document.getElementById(id);
    };

    document.addEventListener('DOMContentLoaded', function () {
        _$('go_to_triton').addEventListener('click', function () {
            BG.goToTritron();
        }, false);

    }, false);
}).call(this);