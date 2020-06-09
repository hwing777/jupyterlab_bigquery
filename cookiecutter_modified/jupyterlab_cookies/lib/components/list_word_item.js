"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListWordItem = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const csstips = require("csstips");
const React = require("react");
const typestyle_1 = require("typestyle");
const localStyles = typestyle_1.stylesheet({
    item: Object.assign({ alignItems: 'center', borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)', listStyle: 'none', height: '40px', paddingRight: '8px' }, csstips.horizontal),
    details: Object.assign(Object.assign({ alignItems: 'center', paddingLeft: '4px' }, csstips.horizontal), csstips.flex),
    wordTime: Object.assign({ color: 'var(--jp-content-font-color2)', fontSize: '9px', textAlign: 'right' }, csstips.flex),
    viewLink: {
        backgroundImage: 'var(--jp-icon-notebook)',
        backgroundRepeat: 'no-repeat',
        marginLeft: '5px',
        padding: '0 6px',
        textDecoration: 'none',
    },
    icon: {
        padding: '0 0 0 5px',
    }
});
const GreenCheck = core_1.withStyles({
    root: {
        color: 'green',
        fontSize: '16px',
    },
})(icons_1.Check);
// tslint:disable-next-line:enforce-name-casing
const RedClose = core_1.withStyles({
    root: {
        color: 'red',
        fontSize: '16px',
    },
})(icons_1.Close);
// tslint:disable-next-line:enforce-name-casing
const GrayPending = core_1.withStyles({
    root: {
        color: 'base',
        fontSize: '16px',
    },
})(icons_1.Refresh);
class ListWordItem extends React.Component {
    render() {
        const { word } = this.props;
        const endTime = new Date();
        return (React.createElement("li", { className: localStyles.item },
            React.createElement("div", { className: localStyles.icon }, this.getIconForWord(word)),
            React.createElement("div", { className: localStyles.details },
                React.createElement("a", { className: "{css.link}", href: "#" }, word.word),
                React.createElement("span", { className: localStyles.wordTime }, endTime.toLocaleString())),
            React.createElement("div", null,
                React.createElement("a", { className: localStyles.viewLink, href: "#", title: "View Word" }, "\u00A0"))));
    }
    getIconForWord(word) {
        const regex_green = /^[A-K]/g;
        const regex_red = /^[S-Z]/g;
        if (word.word.match(regex_green)) {
            return React.createElement(GreenCheck, null);
        }
        else if (word.word.match(regex_red)) {
            return React.createElement(RedClose, null);
        }
        return React.createElement(GrayPending, null);
    }
}
exports.ListWordItem = ListWordItem;
