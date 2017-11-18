import * as React from 'react';
import { Actions, withActions } from '../../actions/bind';
import pure from '../pure';

function AddDeadline({ actions }: Actions) {

  return (
    <div onClick={() => actions.addNewDeadline('Critical Deadline')}>
      <i className="fa fa-calendar-times-o" aria-hidden="true" />
    </div>
  );
}

export default pure(withActions(AddDeadline));