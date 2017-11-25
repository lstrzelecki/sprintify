import * as _ from 'lodash/fp';
import * as React from 'react';

import Stories from './Stories';
import { State } from '../state';
import { Actions, withActions } from '@utils/bind';
import pure from '@utils/pure';

interface SprintAndBacklogProps {
  sprint: State.Sprint;
  backlog: State.Backlog;
  milestones: State.Marker[];
  edited?: State.StoryNumber;
}

function SprintAndBacklog({ sprint, backlog, milestones, edited, actions }: SprintAndBacklogProps & Actions) {

  const fromSprint = (num: number) => _.find({num}, sprint.stories) !== undefined;

  return (
    <div className="s-backlog">
      <Stories
        stories={[ ...sprint.stories, ...backlog ]}
        storyClass={(s) => fromSprint(s.num) ? 's-story--sprint' : 's-story--backlog'}
        milestones={milestones}
        edited={edited}
        onMoveBefore={actions.moveBefore}
        onMoveAfter={actions.moveAfter}
      />
    </div>
  );
}

export default pure(withActions(SprintAndBacklog));