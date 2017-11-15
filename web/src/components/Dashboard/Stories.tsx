import * as React from 'react';
import pure from '../pure';

import Story from './Story';
import EditedStory from './EditedStory';

import * as FlipMove from 'react-flip-move';

const { Draggable, Droppable } = require('react-drag-and-drop');

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';

interface StoriesProps {
  stories: State.Stories;
  edited?: State.StoryNumber;
  onMoveBefore?: (story: number, relative: number) => void;
  onMoveAfter?: (story: number, relative: number) => void;
}

const noop = () => ({});

function Stories({ stories, edited, onMoveBefore = noop, onMoveAfter = noop, actions }: StoriesProps & Actions) {

  const StoryWithSlotsPure = pure(StoryWithSlots);

  return (
      <div style={{height: '100%'}}>
        <FlipMove duration={500} typeName="ul" className="s-stories" easing="ease-out">
          {
            stories.map((story, idx) =>
              story.num === edited ?
                <EditedStory key={`${story.num}`} story={story} /> :
                <StoryWithSlotsPure key={`${story.num}`} story={story}/>
            )
          }
        </FlipMove>
      </div>
  );

  function StoryWithSlots({ story }: { story: State.Story }) {
    return (
        <li style={{position: 'relative'}}>
        <Droppable types={['story']} className="s-slot s-slot--before" onDrop={(data: { story: string}) => onMoveBefore(Number(data.story), story.num)} />
          <Draggable type="story" data={story.num}>
              <Story story={story} />
          </Draggable>
          <Droppable types={['story']} className="s-slot s-slot--after" onDrop={(data: { story: string}) => onMoveAfter(Number(data.story), story.num)}/>
        </li>
    );
  }
}

export default pure(withActions(Stories));
