import * as React from 'react';

import Stories from './Stories';
import { State } from '../../state';
import { Actions, withActions } from '../../actions/bind';

interface SprintProps {
  sprint: State.Sprint;
  edited?: State.StoryNumber;
}

const { Droppable } = require('react-drag-and-drop');

function Sprint({ sprint, edited, actions }: SprintProps & Actions) {

  return (
    <Droppable types={['notassigned-story']} onDrop={(data: any) => actions.addToSprint(Number(data['notassigned-story']))}>
      <div className="s-sprint">
        <span className="s-sprint__label">Current Sprint</span>
        <Stories type="assigned-story" stories={sprint.stories} edited={edited} />
      </div>
    </Droppable>
  );
}

export default withActions(Sprint);