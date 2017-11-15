import * as React from 'react';

type SupportedInputs = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface HTMLInputSync {
  name: string;
  value: string;
  onChange(e: SupportedInputs): void;
}

interface SyncApi {
  // tslint:disable-next-line:no-any
  values: any;
  sync(prop: string): HTMLInputSync;
}

interface SyncApiConsumer {
  (sync: SyncApi): JSX.Element;
}

interface SyncProps {
  children: SyncApiConsumer;
  initial: {};
}

interface SyncState {
  state: {};
}

export default class Sync extends React.PureComponent<SyncProps, SyncState> {

    componentWillMount() {
      // asd
      this.setState({
        state: this.props.initial
      });
    }

    render() {
      return this.props.children({
        sync: this.sync.bind(this),
        values: this.state.state
      });
    }

    sync(prop: string) {
      return {
        name: prop,
        value: this.state.state[prop],
        onChange: (e: SupportedInputs) => this.setState({ state: {...this.state, [prop]: e.target.value }})
      };
    }
}