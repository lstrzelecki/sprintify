import * as React from 'react';
import { Actions, withActions } from '@utils/bind';
import pure from '@utils/pure';

function AddStory({ actions }: Actions) {

  return (
    <div onClick={() => actions.addNewStory('New Story')}>
      <i className="fa fa-file-text" aria-hidden="true" />
    </div>
  );
}

export default pure(withActions(AddStory));