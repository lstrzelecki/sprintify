import * as React from 'react';

import Stories from './Stories';
import { State } from '../../state';

interface SprintProps {
  sprint: State.Sprint;
  edited?: State.StoryNumber;
}

export default function Sprint({ sprint, edited }: SprintProps) {

  return (
    <div className="s-sprint">
      <span className="s-sprint__label">Current Sprint</span>
      <Stories stories={sprint.stories} edited={edited} />
    </div>
  );
}