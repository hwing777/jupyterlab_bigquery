// Ensure styles are loaded by webpack
import '../style/index.css';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {ListWordsWidget} from './components/list_tree_item_widget';
import {ListWordsService} from './service/list_items';


async function activate(
  app: JupyterFrontEnd,
) {
  const listWordsService = new ListWordsService();
  const listWidget = new ListWordsWidget(listWordsService);
  listWidget.addClass('jp-CookiesIcon');
  app.shell.add(listWidget, 'left', {rank: 100});

}


/**
 * The JupyterLab plugin.
 */
const ListWordsPlugin: JupyterFrontEndPlugin<void> = {
  id: 'cookies:cookies',
  requires: [
  ],
  activate: activate,
  autoStart: true
};


/**
 * Export the plugin as default.
 */
export default [
  ListWordsPlugin,
];
