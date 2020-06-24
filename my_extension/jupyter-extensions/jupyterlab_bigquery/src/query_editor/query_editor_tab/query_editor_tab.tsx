import React from 'react';
import QueryTextEditor from '../query_text_editor/query_text_editor';

interface QueryEditorTabProps {
  isVisible: boolean;
}

interface QueryEditorTabState {}

class QueryEditorTab extends React.Component<
  QueryEditorTabProps,
  QueryEditorTabState
> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
    };
  }

  render() {
    return (
      <div>
        <QueryTextEditor />
      </div>
    );
  }
}

export default QueryEditorTab;
