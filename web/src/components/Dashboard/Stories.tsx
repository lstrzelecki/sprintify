import * as _ from 'lodash/fp';
import * as React from 'react';
import pure from '../pure';

import Story from './Story';
import Milestone from './Milestone';
import EditedStory from './EditedStory';

import * as FlipMove from 'react-flip-move';

const { Draggable, Droppable } = require('react-drag-and-drop');

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';

interface StoriesProps {
  stories: State.Stories;
  edited?: State.StoryNumber;
  milestones: State.Milestone[];
  onMoveBefore?: (story: number, relative: number) => void;
  onMoveAfter?: (story: number, relative: number) => void;
}

const noop = () => ({});

function Stories({ stories, milestones, edited, onMoveBefore = noop, onMoveAfter = noop, actions }: StoriesProps & Actions) {

  const StoryWithSlotsPure = pure(StoryWithSlots);
  const DraggableMilestonePure = pure(DraggableMilestone);

  return (
      <div style={{height: '100%'}}>
        <FlipMove duration={500} typeName="ul" className="s-stories" easing="ease-out">
          {
            _.flatMap((story) => [
                story.num === edited ? <EditedStory key={`${story.num}`} story={story} /> : <StoryWithSlotsPure key={`${story.num}`} story={story}/>,
                <DraggableMilestonePure key={`${story.num}-milestone`} num={story.num} />
              ],      stories)
          }
        </FlipMove>
      </div>
  );

  function DraggableMilestone({num}: { num: number}) {
    const milestone = _.find({ after: num }, milestones);
    return milestone ? (
      <li style={{ position: 'relative' }}>
        <Draggable type="milestone" className="s-milestone__drag" data={milestone.name}>
          <Milestone name={milestone.name} />
        </Draggable>
      </li>) : <li/>;
  }

  function StoryWithSlots({ story }: { story: State.Story }) {

    const onDropAfter = (data: { story?: string, milestone?: string }) => {
      if (data.story) {
        onMoveAfter(Number(data.story), story.num);
      }
      if (data.milestone) {
        actions.moveMilestoneAfter(data.milestone, story.num);
      }
    };

    return (
        <li style={{position: 'relative'}}>
          <Droppable types={['story']} className="s-slot s-slot--before" onDrop={(data: { story: string}) => onMoveBefore(Number(data.story), story.num)} />
          <Draggable type="story" data={story.num}>
              <Story story={story} />
          </Draggable>
          <Droppable types={['story', 'milestone']} className="s-slot s-slot--after" onDrop={onDropAfter}/>
        </li>
    );
  }

}

export default pure(withActions(Stories));
