import * as React from 'react';
import { Actions, withActions } from '../../actions/bind';
import pure from '../pure';

function AddMilestone({ actions }: Actions) {

  return (
    <div onClick={() => actions.addNewMilestone('Significant Milestone')}>
      <i className="fa fa-flag" aria-hidden="true" />
    </div>
  );
}

export default pure(withActions(AddMilestone));