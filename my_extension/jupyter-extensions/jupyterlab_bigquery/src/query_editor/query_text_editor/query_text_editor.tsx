import React from 'react';
import Editor from '@monaco-editor/react';

interface QueryTextEditorProps {}

interface QueryTextEditorState {
  code: string;
}

class QueryTextEditor extends React.Component<
  QueryTextEditorProps,
  QueryTextEditorState
> {
  constructor(props: QueryTextEditorProps) {
    super(props);
    this.state = {
      code: '// type your code...',
    };
  }

  render() {
    const { code } = this.state;

    return (
      <div>
        <Editor
          height="90vh" // By default, it fully fits with its parent
          theme={'light'}
          language={'sql'}
          value={code}
          options={{ lineNumbers: 'on' }}
        />
      </div>
    );
  }
}

export default QueryTextEditor;
