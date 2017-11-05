import * as React from 'react';
import { Actions, withActions } from '../../actions/bind';

function AddStory({ actions }: Actions) {

  return (
    <div className="s-add-story" onClick={() => actions.addNewStory('New story')}>
      <i className="fa fa-plus" aria-hidden="true" />
    </div>
  );
}

export default withActions(AddStory);