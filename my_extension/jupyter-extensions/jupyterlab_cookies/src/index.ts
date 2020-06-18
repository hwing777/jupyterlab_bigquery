// Ensure styles are loaded by webpack
import '../style/index.css';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {ListItemsWidget} from './components/list_tree_item_widget';
import {ListProjectsService} from './service/list_items';


async function activate(
  app: JupyterFrontEnd,
) {
  const listProjectsService = new ListProjectsService();
  const listWidget = new ListItemsWidget(listProjectsService);
  listWidget.addClass('jp-CookiesIcon');
  app.shell.add(listWidget, 'left', {rank: 100});

}


/**
 * The JupyterLab plugin.
 */
const ListItemsPlugin: JupyterFrontEndPlugin<void> = {
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
  ListItemsPlugin,
];
