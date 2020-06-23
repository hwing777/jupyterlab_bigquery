import * as React from 'react';

import { TableDetailsService } from './service/list_table_details';
import LoadingPanel from '../loading_panel';
import { Grid, Chip } from '@material-ui/core';
import { localStyles } from './dataset_details_panel';

interface Props {
  tableDetailsService: TableDetailsService;
  isVisible: boolean;
  table_id: string;
}

interface State {
  hasLoaded: boolean;
  isLoading: boolean;
  // TODO(cxjia): type these details
  details: any;
}

export default class TableDetailsPanel extends React.Component<Props, State> {
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
      const details = await this.props.tableDetailsService.listTableDetails(
        this.props.table_id
      );
      this.setState({ hasLoaded: true, details });
    } catch (err) {
      console.warn('Error retrieving table details', err);
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
          <header className={localStyles.header}>{details.name}</header>
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

            <div className={localStyles.title}>Table info</div>
            <div>
              <b>Table ID: </b>
              {details.id}
            </div>
            <div>
              <b>Table size: </b>
              {details.num_bytes} Bytes
            </div>
            <div>
              <b>Number of rows: </b>
              {details.num_rows}
            </div>
            <div>
              <b>Created: </b>
              {details.date_created}
            </div>
            <div>
              <b>Table expiration: </b>
              {details.expiration ? details.expiration : 'Never'}
            </div>
            <div>
              <b>Last modified: </b>
              {details.last_modified}
            </div>
            <div>
              <b>Data location: </b>
              {details.location ? details.location : 'None'}
            </div>
            <br />

            <div>
              <b>Schema: </b>
              {details.schema
                ? details.schema.map((value, index) => {
                    return (
                      <div key={index}>
                        {value.name}: {value.type}
                      </div>
                    );
                  })
                : 'None'}
            </div>
          </Grid>
        </div>
      );
    }
  }
}
