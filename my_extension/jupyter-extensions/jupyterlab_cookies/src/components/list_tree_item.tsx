import { withStyles } from '@material-ui/core';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import * as csstips from 'csstips';
import React, { useState } from 'react';
import { stylesheet } from 'typestyle';

import { Project, Dataset, Table } from '../service/list_items';
//import { COLORS, css } from '../styles';

const localStyles = stylesheet({
  item: {
    alignItems: 'center',
    listStyle: 'none',
    height: '40px',
    paddingRight: '8px',
    ...csstips.horizontal,
  },
  childItem: {
    alignItems: 'center',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    listStyle: 'none',
    height: '40px',
    paddingRight: '8px',
    paddingLeft: '30px',
    ...csstips.horizontal,
  },
  details: {
    alignItems: 'center',
    paddingLeft: '4px',
    ...csstips.horizontal,
    ...csstips.flex,
  },
  wordTime: {
    color: 'var(--jp-content-font-color2)',
    fontSize: '9px',
    textAlign: 'right',
    ...csstips.flex,
  },
  viewLink: {
    backgroundImage: 'var(--jp-icon-notebook)',
    backgroundRepeat: 'no-repeat',
    marginLeft: '5px',
    padding: '0 6px',
    textDecoration: 'none',
  },
  icon: {
    padding: '0 0 0 5px',
  },
  list: {
    margin: '0',
    overflowY: 'scroll',
    padding: '0',
    ...csstips.flex,
  },
  listIndent: {
    paddingLeft: '20px',
  }
});

interface ProjectProps {
  project: Project;
}

interface DatasetProps {
  dataset: Dataset;
}

interface TableProps {
  table: Table;
}

interface State {
  expanded: boolean;
}

const BigArrowRight = withStyles({
  root: {
    fontSize: '16px',
  },
})(ArrowRight);

const ArrowDown = withStyles({
  root: {
    fontSize: '16px',
  },
})(ArrowDropDown);


function ListItem(props) {

    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
      const currentState = expanded;
      setExpanded(!currentState)
    }

    const getIconForWord = (subfields) => {
      if (subfields) {
        if (expanded === false) {
          return <BigArrowRight />;
        } else {
          return <ArrowDown />;
        }
      }
    }

    return (
      <div>
        <li className={localStyles.item}>
          <div 
            className={localStyles.icon}
            onClick={() => handleExpand()}
          >
            {getIconForWord(props.subfields)}
          </div>
          <div className={localStyles.details}>
            <a className="{css.link}" href="#">
              {props.name}
            </a>
          </div>
        </li>
        {expanded && (
          <div>
            {props.children}
          </div>
        )}
      </div>
    );
}

export class ListProjectItem extends React.Component<ProjectProps, State> {

  constructor(props: ProjectProps) {
    super(props);
  }

  render() {
    const { project } = this.props;

    return (
      <ListItem 
        name = {project.id}
        subfields = {project.datasets}
      >
        <ul className={localStyles.list}>
          {project.datasets.map(d => (
            <ListDatasetItem key={d.id} dataset={d}/>
          ))}
        </ul>
      </ListItem>
    );
  }
}

export class ListDatasetItem extends React.Component<DatasetProps, State> {

  constructor(props: DatasetProps) {
    super(props);
  }

  render() {
    const { dataset } = this.props;

    return (
      <div className = {localStyles.listIndent}>
        <ListItem 
          name = {dataset.id}
          subfields = {dataset.tables}
        >
          <ul className={localStyles.list}>
            {dataset.tables.map(t => (
              <ListTableItem key={t.name} table={t}/>
            ))}
          </ul>
        </ListItem>
      </div>
    );
  }
}

export class ListTableItem extends React.Component<TableProps, State> {
  
  constructor(props: TableProps) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpand() {
    const currentState = this.state.expanded;
    this.setState({ expanded: !currentState})
  }

  render() {
    const { table } = this.props;

    return (
      <div className = {localStyles.listIndent}>
        <ListItem 
          name = {table.name}
          subfields = {null}
        />
      </div>
    );
  }
}
