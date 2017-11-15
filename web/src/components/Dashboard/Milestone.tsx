import * as React from 'react';
import pure from '../pure';

import { withActions, Actions } from '../../actions/bind';

interface MilestoneProps {
  name: string;
}

function Milestone({ name }: MilestoneProps & Actions) {

  return (
    <div className="s-milestone">
      <span className="s-milestone__label">{name}</span>
    </div>
  );
}

export default pure(withActions(Milestone));