import * as React from 'react';
import { Actions, withActions } from '@utils/bind';
import pure from '@utils/pure';

function AddMilestone({ actions }: Actions) {

  return (
    <div onClick={() => actions.addNewMilestone('Significant Milestone')}>
      <i className="fa fa-flag" aria-hidden="true" />
    </div>
  );
}

export default pure(withActions(AddMilestone));