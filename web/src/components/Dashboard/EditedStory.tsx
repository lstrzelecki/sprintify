import * as React from 'react';
import { State } from '../../state';
import pure from '../pure';
import Sync from '../sync';
import { Actions, withActions } from '../../actions/bind';

interface StoryProps {
  story: State.Story;
}

function EditedStory({ story, actions }: StoryProps & Actions) {

  return (
    <Sync initial={{title: story.title}}>
      { api =>
        <li>
          <div className={`s-story s-story--size-${story.size} s-story--edited`}>
            <textarea
              className="s-story__title s-story__title--edit"
              cols={12}
              autoFocus={true}
              onFocus={e => e.currentTarget.select()}
              {...api.sync('title')}
            />
            <div className="s-story__size">Size: {story.size}</div>
          </div>
          <div className="s-mask" onClick={() => actions.changeStoryTitle(story.num, api.values.title)} />
        </li>
      }
    </Sync>
  );
}

export default pure(withActions(EditedStory));