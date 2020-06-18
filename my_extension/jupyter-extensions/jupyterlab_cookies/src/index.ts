// Ensure styles are loaded by webpack
import '../style/index.css';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {ListItemsWidget} from './components/list_tree_item_widget';
import {ListProjectsService} from './service/list_items';
import {IBigqueryFactory} from './tokens';
import {Clipboard} from '@jupyterlab/apputils';


async function activate(
  app: JupyterFrontEnd,
  factory: IBigqueryFactory,
) {
  const listProjectsService = new ListProjectsService();
  const listWidget = new ListItemsWidget(listProjectsService);
  listWidget.addClass('jp-CookiesIcon');
  app.shell.add(listWidget, 'left', {rank: 100});
  addCommands(app, factory);
}

namespace CommandIDs {
  export const copy = 'bigquery:copy'
}

function addCommands(
  app: JupyterFrontEnd,
  factory: IBigqueryFactory
){
  const { commands } = app;
  const {tracker} = factory;
  // const selctorContent = '.jp-gcs-DirListing-content';
  // const selectorItem = '.jp-gcs-DirListing-item[data-isdir]';
  const selectorNotDir = '.jp-gcs-DirListing-item[data-isdir="false"]';

  commands.addCommand(CommandIDs.copy, {
    execute: () => {
      const widget = tracker.currentWidget;
      if (!widget) {
        return;
      }

      // const localPath = widget.model.manager.services.contents.localPath(
      //   widget.selectedItems().next()!.path
      // );
      // Clipboard.copyToSystem(GCS_URI_PREFIX + localPath);
      Clipboard.copyToSystem('this works!');
    },
    iconClass: 'jp-MaterialIcon jp-CopyIcon',
    label: 'Copy ID',
    mnemonic: 0
  });

  app.contextMenu.addItem({
    command: CommandIDs.copy,
    selector: selectorNotDir,
    rank: 1,
  });
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
