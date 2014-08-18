(function () {
    "use strict";
    var BG = chrome.extension.getBackgroundPage();

    $(window).ready(function () {
        $('#go_to_triton').click(function () {
            BG.goToTritron();
        });
    });

}).call(this);