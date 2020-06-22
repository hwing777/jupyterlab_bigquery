import * as React from 'react';

interface Props {
  preview: any;
}

export class TablePreview extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.warn('Unexpected error', err);
    }
  }

  render() {
    const preview = this.props.preview;

    return (
      <div>
        {preview.fields.map((value, index) => {
          return <span key={index}>{value}</span>;
        })}
        {/* {preview.rows.map((value, index) => {
            return (
              <div key={index}>
                {value.map((value, index) => {
                  return <span key={index}>{value}</span>;
                })}
              </div>
            );
          })} */}
      </div>
    );
  }
}
