import * as React from 'react';

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';

const { Draggable } = require('react-drag-and-drop');

interface StoryProps {
  story: State.Story;
  type: string;
}

function Story({ story, actions, type }: StoryProps & Actions) {

  return (
    <Draggable type={type} data={story.num}>
      <li className={`s-story s-story--size-${story.size}`} onDoubleClick={() => actions.editStory(story.num)}>
        <div className="s-story__title">{story.title}</div>
        <div className="s-story__size">Size: {story.size}</div>
      </li>
    </Draggable>
  );
}

export default withActions(Story);