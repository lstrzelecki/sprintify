import * as React from 'react';

import Story from './Story';
import EditedStory from './EditedStory';

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';

interface StoriesProps {
  stories: State.Stories;
  edited?: State.StoryNumber;
  type: string;
}

function Stories({ stories, edited, type, actions }: StoriesProps & Actions) {

  return (
      <ul className="s-stories">
        {stories.map(story => story.num === edited ?
          <EditedStory key={story.num} story={story} /> :
          <Story key={story.num} type={type} story={story} />)
        }
        {edited && <div className="s-mask" onClick={() => actions.editStory(0)} />}
      </ul>
  );
}

export default withActions(Stories);