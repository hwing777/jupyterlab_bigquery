import { ReactWidget, UseSignal } from '@jupyterlab/apputils';
import { LinearProgress } from '@material-ui/core';
import { Signal } from '@phosphor/signaling';
import * as csstips from 'csstips';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { ListWordsService, Datasets } from '../service/list_words';
import { ListDatasetItem } from './list_word_item';

interface Props  {
  listWordsService: ListWordsService;
  isVisible: boolean;
}

interface State {
  hasLoaded: boolean;
  isLoading: boolean;
  datasets: Datasets;
}

const localStyles = stylesheet({
  header: {
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    fontWeight: 600,
    fontSize: 'var(--jp-ui-font-size0, 11px)',
    letterSpacing: '1px',
    margin: 0,
    padding: '8px 12px',
    textTransform: 'uppercase',
  },
  panel: {
    backgroundColor: 'white',
    //color: COLORS.base,
    height: '100%',
    //...BASE_FONT,
    ...csstips.vertical,
  },
  list: {
    margin: 0,
    overflowY: 'scroll',
    padding: 0,
    ...csstips.flex,
  },
});

export class ListWordsPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasLoaded: false,
      isLoading: false,
      datasets: { datasets: [] },
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.warn('Unexpected error', err);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const isFirstLoad =
      !(this.state.hasLoaded || prevProps.isVisible) && this.props.isVisible;
    if (isFirstLoad) {
      this.getWords();
    }
  }

  render() {
    const { isLoading, datasets } = this.state;
    return (
      <div className={localStyles.panel}>
        <header className={localStyles.header}>BigQuery in Notebooks</header>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <ul className={localStyles.list}>
            {datasets.datasets.map(d => (
              <ListDatasetItem key={d.id} dataset={d}/> //TODO: enter table here
            ))}
          </ul>
        )}
      </div>
    );
  }

  private async getWords() {
    try {
      this.setState({ isLoading: true });
      const datasets = await this.props.listWordsService.listWords(20);
      this.setState({ hasLoaded: true, datasets });
    } catch (err) {
      console.warn('Error retrieving words', err);
    } finally {
      this.setState({ isLoading: false });
    }
  }
}

/** Widget to be registered in the left-side panel. */
export class ListWordsWidget extends ReactWidget {
  id = 'listwords';
  private visibleSignal = new Signal<ListWordsWidget, boolean>(this);

  constructor(private readonly listWordsService: ListWordsService) {
    super();
    this.title.iconClass = 'jp-Icon jp-Icon-20 jp-CookiesIcon';
    this.title.caption = 'BigQuery In Notebooks';
  }

  onAfterHide() {
    this.visibleSignal.emit(false);
  }

  onAfterShow() {
    this.visibleSignal.emit(true);
  }

  render() {
    return (
      <UseSignal signal={this.visibleSignal}>
        {(_, isVisible) => (
          <ListWordsPanel
            isVisible={isVisible}
            listWordsService={this.listWordsService}
          />
        )}
      </UseSignal>
    );
  }
}
