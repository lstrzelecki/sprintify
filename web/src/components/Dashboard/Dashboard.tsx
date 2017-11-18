import * as React from 'react';
import pure from '../pure';

import './style.css';

import { State } from '../../state';
import estimateMilestones from '../../state/deadlines';
import Settings from './Settings';
// import Backlog from './Backlog';
// import Sprint from './Sprint';
import SprintAndBacklog from './SprintAndBacklog';
import AddStory from './AddStory';
import AddMilestone from './AddMilestone';
import AddDeadline from './AddDeadline';

interface DashboardProps {
  backlog: State.Backlog;
  milestones: State.Milestone[];
  deadlines: State.Deadline[];
  currentSprint: State.Sprint;
  edited?: State.StoryNumber;
}

function Dashboard({ backlog, milestones, deadlines, currentSprint, edited}: DashboardProps) {

  const markers = estimateMilestones(currentSprint, backlog, milestones, deadlines);

  return (
    <div>
      <Settings />
      <div className="s-board">
        {/* <Sprint sprint={currentSprint} edited={edited} /> */}
        {/* <Backlog backlog={backlog} milestones={milestones} edited={edited} /> */}
        <SprintAndBacklog sprint={currentSprint} backlog={backlog} milestones={markers} edited={edited} />
        <div className="s-actions">
          <AddStory />
          <AddMilestone />
          <AddDeadline />
          <div className="s-fab">
            <i className="fa fa-plus" />
          </div>
        </div>
      </div>
    </div>
  );

}

export default pure(Dashboard);