(function () {
    'use strict';
    
    $(window).ready(function () {
        $('#go_to_triton').click(function () {
            chrome.runtime.sendMessage({action: 'goToTritron'});
        });
    });

}).call(this);