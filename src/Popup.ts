(function (): void {
    'use strict';
    
    $(window).ready(function (): void {
        $('#go_to_triton').click(function (): void {
            chrome.runtime.sendMessage({action: 'goToTritron'});
        });
    });

})();