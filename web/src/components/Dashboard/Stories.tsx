import * as _ from 'lodash/fp';
import * as React from 'react';
import pure from '../pure';

import Story from './Story';
import Milestone from './Milestone';
import Deadline from './Deadline';
import EditedStory from './EditedStory';

import * as FlipMove from 'react-flip-move';

const { Draggable, Droppable } = require('react-drag-and-drop');

import { State } from '../../state';
import { withActions, Actions } from '../../actions/bind';
import { matches } from '../../reducers/patch';

interface StoriesProps {
  stories: State.Stories;
  edited?: State.StoryNumber;
  milestones: State.Marker[];
  storyClass?: (s: State.Story) => string;
  onMoveBefore?: (story: number, relative: number) => void;
  onMoveAfter?: (story: number, relative: number) => void;
}

const noop = () => ({});

function Stories({ stories, milestones, edited, storyClass = _.constant(''), onMoveBefore = noop, onMoveAfter = noop, actions }: StoriesProps & Actions) {

  const StoryWithSlotsPure = pure(StoryWithSlots);
  const DraggableMilestonePure = pure(DraggableMilestone);
  const NonDraggableDeadlinePure = pure(NonDraggableDeadline);

  return (
      <div style={{height: '100%'}}>
        <FlipMove duration={500} typeName="ul" className="s-stories" easing="ease-out">
          {
            _.flatMap((story) => {
              return [
                <StoryWithSlotsPure key={`${story.num}`} story={story}/>,
                ...renderMarkers(story.num),
              ];
            },        stories)
          }
        </FlipMove>
      </div>
  );

  function renderMarkers(story: number) {
    const markers = _.filter(matches({ after: story }), milestones);
    return _.flatMap(renderMarker, markers);
  }

  function renderMarker(marker: State.Marker) {
    return [
      marker.type === 'milestone' && <DraggableMilestonePure key={`milestone-${marker.name}`} milestone={marker} />,
      marker.type === 'deadline' && <NonDraggableDeadlinePure key={`deadline-${marker.name}`} deadline={marker} />
    ];
  }

  function NonDraggableDeadline({ deadline }: { deadline: State.Deadline }) {
    return (
      <li style={{ padding: '0px 8px' }}>
        <div className="s-deadline__nodrag">
          <Deadline {...deadline} />
        </div>
      </li>
    );
  }

  function DraggableMilestone({milestone}: {milestone: State.Milestone}) {
      return (
        <li style={{padding: '0px 8px'}}>
          <Draggable
            type="milestone"
            className="s-milestone__drag"
            data={milestone.name}
            onDragStart={() => actions.dragInProgress(true)}
            onDragEnd={() => actions.dragInProgress(false)}
          >
            <Milestone {...milestone}  />
          </Draggable>
        </li>
      );
  }

  function StoryWithSlots({ story }: { story: State.Story }) {

    const onDropAfter = (data: { story?: string, milestone?: string }) => {
      actions.dragInProgress(false);
      if (data.story) {
        onMoveAfter(Number(data.story), story.num);
      }
      if (data.milestone) {
        actions.moveMilestoneAfter(data.milestone, story.num);
      }
    };
    const onDropBefore = (data: { story?: string }) => {
      actions.dragInProgress(false);
      if (data.story) {
        onMoveBefore(Number(data.story), story.num);
      }
    };

    if (story.num === edited) {
      return (
        <li className={storyClass(story)}>
          <EditedStory key={`${story.num}`} story={story} />
        </li>
      );
    }

    return (
        <li className={storyClass(story)}>
          <Droppable types={['story']} className="s-slot s-slot--before" onDrop={onDropBefore} />
          <Draggable
            type="story"
            data={story.num}
            onDragStart={() => actions.dragInProgress(true)}
            onDragEnd={() => actions.dragInProgress(false)}
          >
              <Story story={story} />
          </Draggable>
          <Droppable types={['story', 'milestone']} className="s-slot s-slot--after" onDrop={onDropAfter}/>
        </li>
    );
  }
}

export default pure(withActions(Stories));
