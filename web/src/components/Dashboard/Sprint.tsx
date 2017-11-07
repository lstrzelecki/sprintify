import * as React from 'react';

import Stories from './Stories';
import { State } from '../../state';
import { Actions, withActions } from '../../actions/bind';

interface SprintProps {
  sprint: State.Sprint;
  edited?: State.StoryNumber;
}

function Sprint({ sprint, edited, actions }: SprintProps & Actions) {

  return (
    <div className="s-sprint">
      <span className="s-sprint__label">Current Sprint</span>
      <Stories
        type="assigned-story"
        stories={sprint.stories}
        edited={edited}
        onMoveBefore={actions.moveBefore}
        onMoveAfter={actions.moveAfter}
      />
    </div>
  );
}

export default withActions(Sprint);