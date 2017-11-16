import * as _ from 'lodash/fp';
import * as React from 'react';

import Stories from './Stories';
import { State } from '../../state';
import { Actions, withActions } from '../../actions/bind';
import pure from '../pure';

interface BacklogProps {
  sprint: State.Sprint;
  backlog: State.Backlog;
  milestones: (State.Milestone & State.Estimation)[];
  edited?: State.StoryNumber;
}

function SprintAndBacklog({ sprint, backlog, milestones, edited, actions }: BacklogProps & Actions) {

  const fromSprint = (num: number) => _.find({num}, sprint.stories) !== undefined;

  return (
    <div className="s-backlog">
      <Stories
        stories={[ ...sprint.stories, ...backlog ]}
        storyClass={(s) => fromSprint(s.num) ? 's-sprint-story' : ''}
        milestones={milestones}
        edited={edited}
        onMoveBefore={actions.moveBefore}
        onMoveAfter={actions.moveAfter}
      />
    </div>
  );
}

export default pure(withActions(SprintAndBacklog));