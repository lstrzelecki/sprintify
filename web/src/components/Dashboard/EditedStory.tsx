import * as React from 'react';

import { State } from '../../state';

interface StoryProps {
  story: State.Story;
}

export default function EditedStory({ story }: StoryProps) {

  return (
    <li className={`s-story s-story--size-${story.size} s-story--edited`}>
      <textarea className="s-story__title s-story__title--edit" value={story.title} cols={12}/>
      <div className="s-story__size">Size: {story.size}</div>
    </li>
  );
}