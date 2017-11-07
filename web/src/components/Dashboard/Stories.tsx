import * as React from 'react';

import Story from './Story';
import EditedStory from './EditedStory';

const { Draggable, Droppable } = require('react-drag-and-drop');

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';

interface StoriesProps {
  stories: State.Stories;
  edited?: State.StoryNumber;
  type: string;
  onMoveBefore?: (story: number, relative: number) => void;
  onMoveAfter?: (story: number, relative: number) => void;
}

const noop = () => ({});

function Stories({ stories, edited, type, onMoveBefore = noop, onMoveAfter = noop, actions }: StoriesProps & Actions) {

  return (

      <ul className="s-stories">
        {stories.map(story => story.num === edited ?
          <EditedStory key={story.num} story={story} /> :
          <StoryWithSlots key={story.num} story={story}/>)
        }
        {edited && <div className="s-mask" onClick={() => actions.editStory(0)} />}
      </ul>
  );

  function StoryWithSlots({ story }: { story: State.Story }) {
    return (
      <li style={{position: 'relative'}}>
        <Droppable types={[type]} className="s-slot s-slot--before" onDrop={(data: {}) => onMoveBefore(Number(data[type]), story.num)} />
        <Draggable type={type} data={story.num}>
          <Story story={story} />
        </Draggable>
        <Droppable types={[type]} className="s-slot s-slot--after" onDrop={(data: {}) => onMoveAfter(Number(data[type]), story.num)}/>
      </li>
    );
  }
}

export default withActions(Stories);