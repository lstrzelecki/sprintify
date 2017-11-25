import * as React from 'react';
import { State } from '../state';
import pure from '@utils/pure';
import Sync from '@utils/sync';
import { Actions, withActions } from '@utils/bind';

interface StoryProps {
  story: State.Story;
}

function EditedStory({ story, actions }: StoryProps & Actions) {

  return (
    <Sync initial={{title: story.title, edited: 'title'}}>
      { api =>
        <div>
          <div className={`s-story s-story--size-${story.size} s-story--edited`}>
            <textarea
              className="s-story__title s-story__title--edit"
              cols={12}
              onFocus={e => e.currentTarget.select()}
              {...api.sync('title')}
            />
            <div className="s-story__size">Size: {story.size}</div>
          </div>
          <div className="s-mask" onClick={() => actions.renameStory(story.num, api.values.title)} />
        </div>
      }
    </Sync>
  );
}

export default pure(withActions(EditedStory));