import * as React from 'react';
import pure from '../pure';

import './style.css';

import { State } from '../../state';
import Settings from './Settings';
import Backlog from './Backlog';
import Sprint from './Sprint';
import AddStory from './AddStory';
import AddMilestone from './AddMilestone';

interface DashboardProps {
  backlog: State.Backlog;
  milestones: State.Milestone[];
  currentSprint: State.Sprint;
  edited?: State.StoryNumber;
}

function Dashboard({ backlog, milestones, currentSprint, edited}: DashboardProps) {
  return (
    <div>
      <Settings />
      <div className="s-board">
        <Sprint sprint={currentSprint} edited={edited} />
        <Backlog backlog={backlog} milestones={milestones} edited={edited} />
        <div className="s-actions">
          <AddStory />
          <AddMilestone />
        </div>
      </div>
    </div>
  );
}

export default pure(Dashboard);