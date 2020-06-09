"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ensure styles are loaded by webpack
require("../style/index.css");
const list_words_widget_1 = require("./components/list_words_widget");
const list_words_1 = require("./service/list_words");
function activate(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const listWordsService = new list_words_1.ListWordsService();
        const listWidget = new list_words_widget_1.ListWordsWidget(listWordsService);
        listWidget.addClass('jp-CookiesIcon');
        app.shell.add(listWidget, 'left', { rank: 100 });
    });
}
/**
 * The JupyterLab plugin.
 */
const ListWordsPlugin = {
    id: 'cookies:cookies',
    requires: [],
    activate: activate,
    autoStart: true
};
/**
 * Export the plugin as default.
 */
exports.default = [
    ListWordsPlugin,
];
