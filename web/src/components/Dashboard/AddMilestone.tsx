import * as React from 'react';
import { Actions, withActions } from '../../actions/bind';
import pure from '../pure';

function AddStory({ actions }: Actions) {

  return (
    <div onClick={() => actions.addNewMilestone('New Milestone')}>
      <i className="fa fa-flag" aria-hidden="true" />
    </div>
  );
}

export default pure(withActions(AddStory));