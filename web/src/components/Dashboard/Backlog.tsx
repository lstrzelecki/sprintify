import * as React from 'react';

import Stories from './Stories';

import { State } from '../../state';
import { Actions, withActions } from '../../actions/bind';

interface BacklogProps {
  backlog: State.Backlog;
  edited?: State.StoryNumber;
}

const { Droppable } = require('react-drag-and-drop');

function Backlog({ backlog, edited, actions }: BacklogProps & Actions) {

  return (
    <Droppable types={['assigned-story']} onDrop={(data: any) => actions.removeFromSprint(Number(data['assigned-story']))}>
      <div className="s-backlog">
        <Stories type="notassigned-story" stories={backlog} edited={edited}/>
      </div>
    </Droppable>
  );
}

export default withActions(Backlog);