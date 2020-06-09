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
exports.ListWordsWidget = exports.ListWordsPanel = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const core_1 = require("@material-ui/core");
const signaling_1 = require("@phosphor/signaling");
const csstips = require("csstips");
const React = require("react");
const typestyle_1 = require("typestyle");
const list_word_item_1 = require("./list_word_item");
const localStyles = typestyle_1.stylesheet({
    header: {
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        fontWeight: 600,
        fontSize: 'var(--jp-ui-font-size0, 11px)',
        letterSpacing: '1px',
        margin: 0,
        padding: '8px 12px',
        textTransform: 'uppercase',
    },
    panel: Object.assign({ backgroundColor: 'white', 
        //color: COLORS.base,
        height: '100%' }, csstips.vertical),
    list: Object.assign({ margin: 0, overflowY: 'scroll', padding: 0 }, csstips.flex),
});
class ListWordsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            isLoading: false,
            words: { words: [] },
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                console.warn('Unexpected error', err);
            }
        });
    }
    componentDidUpdate(prevProps) {
        const isFirstLoad = !(this.state.hasLoaded || prevProps.isVisible) && this.props.isVisible;
        if (isFirstLoad) {
            this.getWords();
        }
    }
    render() {
        const { isLoading, words } = this.state;
        return (React.createElement("div", { className: localStyles.panel },
            React.createElement("header", { className: localStyles.header }, "Cookies Project"),
            isLoading ? (React.createElement(core_1.LinearProgress, null)) : (React.createElement("ul", { className: localStyles.list }, words.words.map(w => (React.createElement(list_word_item_1.ListWordItem, { key: w.id, word: w })))))));
    }
    getWords() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setState({ isLoading: true });
                const words = yield this.props.listWordsService.listWords(20);
                this.setState({ hasLoaded: true, words });
            }
            catch (err) {
                console.warn('Error retrieving words', err);
            }
            finally {
                this.setState({ isLoading: false });
            }
        });
    }
}
exports.ListWordsPanel = ListWordsPanel;
/** Widget to be registered in the left-side panel. */
class ListWordsWidget extends apputils_1.ReactWidget {
    constructor(listWordsService) {
        super();
        this.listWordsService = listWordsService;
        this.id = 'listwords';
        this.visibleSignal = new signaling_1.Signal(this);
        this.title.iconClass = 'jp-Icon jp-Icon-20 jp-CookiesIcon';
        this.title.caption = 'Cookies Project';
    }
    onAfterHide() {
        this.visibleSignal.emit(false);
    }
    onAfterShow() {
        this.visibleSignal.emit(true);
    }
    render() {
        return (React.createElement(apputils_1.UseSignal, { signal: this.visibleSignal }, (_, isVisible) => (React.createElement(ListWordsPanel, { isVisible: isVisible, listWordsService: this.listWordsService }))));
    }
}
exports.ListWordsWidget = ListWordsWidget;
