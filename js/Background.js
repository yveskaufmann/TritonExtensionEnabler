/**
 * Getter function for the triton web page address.
 *
 * @returns {string} the URL to the triton web page.
 */
function getTritonUrl() {
    "use strict";
    return "http://triton.ironhelmet.com/";
}

/**
 * Opens a specified triton web page inside a
 * new tab. A new tab will only be created when necessary.
 *
 * @param path The path to to be opened  triton web page
 */
function goToTritron(path) {
    "use strict";
    path = path || '';
    chrome.tabs.query({'url' : getTritonUrl() + "*"}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.update(tabs[i].id, { active: true });

		}
        if(tabs.length > 0) return;
		chrome.tabs.create({
			url: getTritonUrl() + path,
			active: true
		});
	});
}

chrome.browserAction.onClicked.addListener(function callback() {
    goToTritron();
})