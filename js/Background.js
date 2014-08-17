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
 * Checks if a specified url leads to a triton web page.
 *
 * @param {string} url
 * @param {string} path
 * @returns {boolean} true if the specified page leads to a triton web page.
 */
function isTritronUrl(url, path) {
    "use strict";
    path = path || '';
    return url.indexOf(getTritonUrl() + path) === 0;
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
    chrome.tabs.getAllInWindow(undefined, function (tabs) {
        for (var i = 0, tab; (tab = tabs[i]) !== null; i++) {
			if ( tab.url && isTritronUrl( tab.url, path ) ) {
				chrome.tabs.update(tab.id, { active: true });
				return;
			}
		}

		chrome.tabs.create({
			url: getTritonUrl() + path,
			active: true
		});
	});
}