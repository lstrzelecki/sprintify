import { connect, Omit, Dispatch, ComponentClass } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatelessComponent } from 'react';

import * as actions from '../dashboard/actions';

export type Actions = {
  actions: typeof actions;
};

export function withActions<P extends Actions>(component: StatelessComponent<P>): ComponentClass<Omit<P, 'actions'>> {
  return connect(null, bind)(component);
  function bind<S>(dispatch: Dispatch<S>) {
    return ({ actions: bindActionCreators({ ...actions }, dispatch) });
  }
}