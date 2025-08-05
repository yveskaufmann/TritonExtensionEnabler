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

// Type definitions for external globals
declare const Mousetrap: any;
declare const Crux: any;
declare const NeptunesPride: any;
declare const Dropbox: any;

interface TPEnablerInterface {
  main(callback: () => void): void;
  createExecutionInstructions(statement: string | Function, returnAsURLString?: boolean): string;
  execute(statement: string | Function): void;
}

(function (): void {
    "use strict";

    /**
     * List of shorthand objects
     */
    const array: any[] = [];
    const slice = Array.prototype.slice;
    const root = window as any;
    const TPEnabler: TPEnablerInterface = root.TPEnabler = {} as TPEnablerInterface;

    /**
     * A main routine which executes a specified javascript function
     * in the execution context of the surrounding web page.
     *
     * @param callback The specified js function which should executed inside the surrounding web page.
     */
    TPEnabler.main = function (callback: () => void): void {
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
    TPEnabler.createExecutionInstructions = function (statement: string | Function, returnAsURLString?: boolean): string {
        let statementStr: string;
        if (typeof statement === 'function') {
            statementStr = "(" + statement.toString() + ").call();";
        } else {
            statementStr = statement;
        }

        if (returnAsURLString && !statementStr.match(/^javascript:/)) {
            statementStr = "javascript:" + statementStr;
        }

        return statementStr;
    };

    /**
     * Executes a javascript statement inside the execution context
     * of the surrounding page. Please Consider this function must
     * used inside the TPEnabler.main callback function.
     *
     * @param {string|function} statement The statement which should be executed.
     */
    TPEnabler.execute = function (statement: string | Function): void {
        const instructions = TPEnabler.createExecutionInstructions(statement, true);
        window.location.href = instructions;
    };

})();


(window as any).TPEnabler.main(function (): void {
    // Please avoid comments inside the instruction function
    (window as any).TPEnabler.execute(function (): void {
        Mousetrap.bind(['space'], function (): void {
            Crux.crux.trigger('start_ruler');
            Crux.crux.trigger('start_ruler');
        });

        Mousetrap.bind(['p'], function (): void {
            const canvas = $('canvas').get(0) as HTMLCanvasElement;
            const imageURL = canvas.toDataURL("image/jpeg");
            const fileName = [
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
                success: function (): void {},
                progress: function (progress: any): void {},
                cancel: function (): void {},
                error: function (errorMessage: string): void {}
            });
        });
    });
});