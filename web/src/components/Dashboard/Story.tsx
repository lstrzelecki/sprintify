import * as React from 'react';

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';

interface StoryProps {
  story: State.Story;
}

function Story({ story, actions }: StoryProps & Actions) {

  return (
    <li className={`s-story s-story--size-${story.size}`} onDoubleClick={() => actions.editStory(story.num)}>
      <div className="s-story__title">{story.title}</div>
      <div className="s-story__size">Size: {story.size}</div>
    </li>
  );
}

export default withActions(Story);