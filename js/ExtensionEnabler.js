/**
 * Extension Enabler for the Game Neptune's Pride 4.
 *
 * This file is a simple content script for a google chrome extension
 * which is is responsible to execute Neptune's Pride extensions
 * inside the execution context of the game page https://np4.ironhelmet.com/game/...
 *
 * The following extensions are already implemented:
 *
 * - assign the space bar as hot key for the reset of the ruler
 *
 * @author fxdapokalypse
 */
(function () {
    "use strict";

    /**
     * List of shorthand objects
     */
    const array = [];
    const slice = Array.prototype.slice;
    const root = this;
    const TPEnabler = root.TPEnabler = {};

    /**
     * A main routine which executes a specified javascript function
     * in the execution context of the surrounding web page.
     *
     * @param callback The specified js function which should executed inside the surrounding web page.
     */
    TPEnabler.main = function (callback) {
        $("body").append($("<script />", {
            type: 'text/javascript',
            html: TPEnabler.createExecutionInstructions(callback)
        }));

        $("body").append($("<script />", {
            type: 'text/javascript',
            src: "https://www.dropbox.com/static/api/2/dropins.js",
            id: "dropboxjs",
            'data-app-key': "1kc1ely28g2dlsi"
        }));
    };

    /**
     * Creates a execution string for a specified js instruction.
     *
     * @param {string|function} statement   The js instruction as string or as function object..
     * @param {boolean} returnAsURLString   The flag which determines statement should be returned as javascript url.
     * @returns {string}                    The javascript statement as string.
     */
    TPEnabler.createExecutionInstructions = function (statement, returnAsURLString) {
        if (typeof statement === 'function') {
            statement = "(" + statement.toString() + ").call();";
        }

        if (returnAsURLString && !statement.match(/^javascript:/)) {
            statement = "javascript:" + statement;
        }

        return statement;
    };

    /**
     * Executes a javascript statement inside the execution context
     * of the surrounding page. Please Consider this function must
     * used inside the TPEnabler.main callback function.
     *
     * @param {string|function} statement The statement which should be executed.
     */
    TPEnabler.execute = function (statement) {
        var instructions = TPEnabler.createExecutionInstructions(statement, true);
        window.location.href = instructions;
    };

}).call(this);


TPEnabler.main(function () {
    // Please avoid comments inside the instruction function
    TPEnabler.execute(function () {
        Mousetrap.bind(['space'], function () {
            Crux.crux.trigger('start_ruler');
            Crux.crux.trigger('start_ruler');
        });

        Mousetrap.bind(['p'], function () {
            var imageURL = $('canvas').get(0).toDataURL("image/jpeg");
            var fileName = [
                "Intel",
                NeptunesPride.gameConfig.name,
                NeptunesPride.account.alias,
                (new Date()).toLocaleString()
            ].join('_').replace(/[\s\.:]/g, '_') + ".jpg";

            Dropbox.save({
                files: [{
                    url: imageURL,
                    filename : fileName
                }],
                success: function () {},
                progress: function (progress) {},
                cancel: function () {},
                error: function (errorMessage) {}
            });
        });
    });
});



