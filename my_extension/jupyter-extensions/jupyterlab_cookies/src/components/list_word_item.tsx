import { withStyles } from '@material-ui/core';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import * as csstips from 'csstips';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { Word, Table } from '../service/list_words';
//import { COLORS, css } from '../styles';

interface ListItemProps {
  name: Object,
  children: Object[],
}

interface DatasetProps {
  word: Word;
}

interface TableProps {
  table: Table;
}

const localStyles = stylesheet({
  item: {
    alignItems: 'center',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
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
});

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

// Updates for next commit
// function listItem(WrappedComponent) {
//   return class extends React.Component<ListItemProps, State> {
//     constructor(props: ListItemProps) {
//       super(props);
//       this.state = {
//         expanded: false,
//       };
//     }

//     handleExpand() {
//       const currentState = this.state.expanded;
//       this.setState({ expanded: !currentState})
//     }

//     render() {
//       const { name, children } = this.props;
//       const { expanded } = this.state;
//       const endTime = new Date();

//     return (
//       <div>
//         <li className={localStyles.item}>
//           <div 
//             className={localStyles.icon}
//             onClick={() => {this.handleExpand()}}
//           >
//             {this.getIconForWord(name)}
//           </div>
//           <div className={localStyles.details}>
//             <a className="{css.link}" href="#">
//               {name.name}
//             </a>
//             <span className={localStyles.wordTime}>
//               {endTime.toLocaleString()}
//             </span>
//           </div>
//           <div>
//             <a
//               className={localStyles.viewLink}
//               href="#"
//               title="View Word"
//             >
//               &nbsp;
//             </a>
//           </div>
//         </li>
//         {expanded && (
//           <div>
//             <ul className={localStyles.list}>
//               {tables.map(t => (
//                 <ListTableItem key={t.name} table={t}/> //TODO: enter table here
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   }

//   private getIconForWord(name: Object): JSX.Element {
//     if (this.state.expanded === false) {
//       return <BigArrowRight />;
//     } else {
//       return <ArrowDown />;
//     }
//   }
// }

export class ListDatasetItem extends React.Component<DatasetProps, State> {
  
  constructor(props: DatasetProps) {
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
    const { word } = this.props;
    const { expanded } = this.state;
    const endTime = new Date();
    const tables = word.tables;

    return (
      <div>
        <li className={localStyles.item}>
          <div 
            className={localStyles.icon}
            onClick={() => {this.handleExpand()}}
          >
            {this.getIconForWord(word)}
          </div>
          <div className={localStyles.details}>
            <a className="{css.link}" href="#">
              {word.word}
            </a>
            <span className={localStyles.wordTime}>
              {endTime.toLocaleString()}
            </span>
          </div>
          <div>
            <a
              className={localStyles.viewLink}
              href="#"
              title="View Word"
            >
              &nbsp;
            </a>
          </div>
        </li>
        {expanded && (
          <div>
            <ul className={localStyles.list}>
              {tables.map(t => (
                <ListTableItem key={t.name} table={t}/> //TODO: enter table here
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  private getIconForWord(word: Word): JSX.Element {
    if (this.state.expanded === false) {
      return <BigArrowRight />;
    } else {
      return <ArrowDown />;
    }
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
    const endTime = new Date();

    return (
      <div className={localStyles.childItem}>
        <div 
          className={localStyles.icon}
          onClick={() => {this.handleExpand()}}
        >
          {/* No icon */}
        </div>
        <div className={localStyles.details}>
          <a className="{css.link}" href="#">
            {table.name}
          </a>
          <span className={localStyles.wordTime}>
            {endTime.toLocaleString()}
          </span>
        </div>
        <div>
          <a
            className={localStyles.viewLink}
            href="#"
            title="View Word"
          >
            &nbsp;
          </a>
        </div>
      </div>
      
    );
  }
}
