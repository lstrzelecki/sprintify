import * as React from 'react';
import { Actions, withActions } from '@utils/bind';
import pure from '@utils/pure';

const { Droppable } = require('react-drag-and-drop');

function Remove({ actions }: Actions) {

  const onDrop = (data: { story?: string; milestone?: string; deadline?: string }) => {
    if (data.story) {
      actions.removeStory(data.story);
    }
    if (data.milestone) {
      actions.removeMilestone(data.milestone);
    }

    if (data.deadline) {
      actions.removeDeadline(data.deadline);
    }
  };

  return (
    <Droppable types={['story', 'milestone', 'deadline']} onDrop={onDrop} className="s-fab s-remove">
      <i className="fa fa-trash-o s-remove" aria-hidden="true" />
    </Droppable>
  );
}

export default pure(withActions(Remove));
