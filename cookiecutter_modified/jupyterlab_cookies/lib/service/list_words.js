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
exports.ListWordsService = void 0;
const services_1 = require("@jupyterlab/services");
const coreutils_1 = require("@jupyterlab/coreutils");
class ListWordsService {
    listWords(num_items) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let serverSettings = services_1.ServerConnection.makeSettings();
                const requestUrl = coreutils_1.URLExt.join(serverSettings.baseUrl, 'cookies/v1/list');
                const body = { 'num_items': num_items };
                const requestInit = {
                    body: JSON.stringify(body),
                    method: "POST",
                };
                services_1.ServerConnection.makeRequest(requestUrl, requestInit, serverSettings).then((response) => {
                    response.json().then((content) => {
                        if (content.error) {
                            console.error(content.error);
                            reject(content.error);
                            return [];
                        }
                        resolve({
                            words: content.words.map((w) => {
                                return {
                                    id: w.id,
                                    word: w.name,
                                };
                            })
                        });
                    });
                });
            });
        });
    }
}
exports.ListWordsService = ListWordsService;
