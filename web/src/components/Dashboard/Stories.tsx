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
  storyClass?: (s: State.Story) => string;
  onMoveBefore?: (story: number, relative: number) => void;
  onMoveAfter?: (story: number, relative: number) => void;
}

const noop = () => ({});

function Stories({ stories, milestones, edited, storyClass = _.constant(''), onMoveBefore = noop, onMoveAfter = noop, actions }: StoriesProps & Actions) {

  const StoryWithSlotsPure = pure(StoryWithSlots);
  const DraggableMilestonePure = pure(DraggableMilestone);

  return (
      <div style={{height: '100%'}}>
        <FlipMove duration={500} typeName="ul" className="s-stories" easing="ease-out">
          {
            _.flatMap((story) => {
              const milestone = _.find({ after: story.num }, milestones);
              return [
                story.num === edited ? <EditedStory key={`${story.num}`} story={story} /> : <StoryWithSlotsPure key={`${story.num}`} story={story}/>,
                milestone && <DraggableMilestonePure key={`milestone-${milestone.name}`} milestone={milestone} />
              ];
            },        stories)
          }
        </FlipMove>
      </div>
  );

  function DraggableMilestone({milestone}: {milestone: State.Milestone}) {
      return (
        <li>
          <Draggable type="milestone" className="s-milestone__drag" data={milestone.name}>
            <Milestone {...milestone}  />
          </Draggable>
        </li>
      );
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
        <li className={storyClass(story)}>
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
