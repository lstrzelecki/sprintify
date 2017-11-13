import * as React from 'react';

import Stories from './Stories';

import { State } from '../../state';
import { Actions, withActions } from '../../actions/bind';
import pure from '../pure';

interface BacklogProps {
  backlog: State.Backlog;
  edited?: State.StoryNumber;
}

function Backlog({ backlog, edited, actions }: BacklogProps & Actions) {

  return (
    <div className="s-backlog">
      <Stories
        type="notassigned-story"
        stories={backlog}
        edited={edited}
        onMoveBefore={actions.moveBefore}
        onMoveAfter={actions.moveAfter}
      />
    </div>
  );
}

export default pure(withActions(Backlog));