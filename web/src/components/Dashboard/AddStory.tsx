import * as React from 'react';
import { Actions, withActions } from '../../actions/bind';
import pure from '../pure';

function AddStory({ actions }: Actions) {

  return (
    <div className="s-add-story" onClick={() => actions.addNewStory('New story')}>
      <i className="fa fa-plus" aria-hidden="true" />
    </div>
  );
}

export default pure(withActions(AddStory));