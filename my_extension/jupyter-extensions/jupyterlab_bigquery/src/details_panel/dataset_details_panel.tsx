import * as React from 'react';

import { DatasetDetailsService } from './service/list_dataset_details';
import LoadingPanel from '../loading_panel';
import { Grid, Chip } from '@material-ui/core';
import * as csstips from 'csstips';
import { stylesheet } from 'typestyle';

interface Props {
  datasetDetailsService: DatasetDetailsService;
  isVisible: boolean;
  dataset_id: string;
}

interface State {
  hasLoaded: boolean;
  isLoading: boolean;
  // TODO(cxjia): type these details
  details: any;
}

export const localStyles = stylesheet({
  header: {
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    fontSize: '18px',
    // letterSpacing: '1px',
    margin: 0,
    padding: '8px 12px 8px 24px',
  },
  title: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  panel: {
    backgroundColor: 'white',
    height: '100%',
    ...csstips.vertical,
  },
  detailsBody: {
    margin: '24px',
    fontSize: '13px',
  },
  labelContainer: {
    display: 'flex',
    '& > *': {
      margin: '4px',
    },
  },
});

export default class DatasetDetailsPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasLoaded: false,
      isLoading: false,
      details: { details: {} },
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
      this.getDetails();
    }
  }

  private async getDetails() {
    try {
      this.setState({ isLoading: true });
      const details = await this.props.datasetDetailsService.listDatasetDetails(
        this.props.dataset_id
      );
      this.setState({ hasLoaded: true, details });
    } catch (err) {
      console.warn('Error retrieving dataset details', err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const details = this.state.details.details;
    if (this.state.isLoading) {
      return <LoadingPanel />;
    } else {
      return (
        <div className={localStyles.panel}>
          <header className={localStyles.header}>{details.id}</header>
          <Grid className={localStyles.detailsBody}>
            <div className={localStyles.title}>Description</div>
            <div>{details.description ? details.description : 'None'}</div>

            <div>
              <div className={localStyles.title}>Labels</div>
              {details.labels ? (
                <div className={localStyles.labelContainer}>
                  {details.labels.map((value, index) => {
                    return <Chip key={index} label={value} />;
                  })}
                </div>
              ) : (
                'None'
              )}
            </div>
            <br />

            <div className={localStyles.title}>Dataset info</div>
            <div>
              <b>Dataset ID: </b>
              {details.id}
            </div>
            <div>
              <b>Created: </b>
              {details.date_created}
            </div>
            <div>
              <b>Default table expiration: </b>
              {details.default_expiration
                ? details.default_expiration
                : 'Never'}
            </div>
            <div>
              <b>Last modified: </b>
              {details.last_modified}
            </div>
            <div>
              <b>Data location: </b>
              {details.location ? details.location : 'None'}
            </div>
          </Grid>
        </div>
      );
    }
  }
}
