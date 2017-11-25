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
  change(prop: string, value: {}): void;
  edit(prop: string): void;
  save(): void;
}

interface SyncApiConsumer {
  (sync: SyncApi): JSX.Element;
}

interface SyncProps {
  children: SyncApiConsumer;
  initial: {};
}

interface SyncState {
  // tslint:disable-next-line:no-any
  state: any;
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
        values: this.state.state,
        change: this.change.bind(this),
        edit: this.edit.bind(this),
        save: this.save.bind(this),
      });
    }

    sync(prop: string) {
      return {
        name: prop,
        value: this.state.state[prop],
        autoFocus: this.state.state.edited === prop,
        onChange: (e: SupportedInputs) => this.setState({ state: {...this.state.state, [prop]: e.target.value }})
      };
    }

    change(prop: string, value: {}) {
      this.setState({ state: { ...this.state.state, [prop]: value } });
    }

    edit(prop: string) {
      this.setState({ state: { ...this.state.state, edited: prop } });
    }
    save() {
      this.setState({ state: { ...this.state.state, edited: false } });
    }
}