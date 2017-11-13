import * as React from 'react';
import pure from '../pure';

import './style.css';

import { State } from '../../state';
import Settings from './Settings';
import Backlog from './Backlog';
import Sprint from './Sprint';
import AddStory from './AddStory';

interface DashboardProps {
  backlog: State.Backlog;
  currentSprint: State.Sprint;
  edited?: State.StoryNumber;
}

function Dashboard({ backlog, currentSprint, edited}: DashboardProps) {
  return (
    <div>
      <Settings />
      <div className="s-board">
        <Sprint sprint={currentSprint} />
        <Backlog backlog={backlog} edited={edited} />
        <AddStory />
      </div>
    </div>
  );
}

export default pure(Dashboard);