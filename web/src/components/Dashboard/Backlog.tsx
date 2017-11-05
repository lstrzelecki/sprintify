import * as React from 'react';

import Stories from './Stories';

import { State } from '../../state';

interface BacklogProps {
  backlog: State.Backlog;
  edited?: State.StoryNumber;
}

export default function Backlog({ backlog, edited }: BacklogProps) {

  return (
    <div className="s-backlog">
      <Stories stories={backlog} edited={edited}/>
    </div>
  );
}