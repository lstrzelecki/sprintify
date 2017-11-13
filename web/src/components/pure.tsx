import * as React from 'react';

export default function pure<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  class PureComponentWrap extends React.PureComponent<P> {
    render() {
      return <Component {...this.props} />;
    }
    shouldComponentUpdate(nextProps: Readonly<P>) {
      const thisHash = JSON.stringify(this.props);
      const nextHash = JSON.stringify(nextProps);

      const shouldUpdate = thisHash !== nextHash;

      if (shouldUpdate) {
        // tslint:disable-next-line:no-console
        console.log('comp', Component.name, thisHash, nextHash);
      }

      return shouldUpdate;
    }
  }
  return PureComponentWrap;
}