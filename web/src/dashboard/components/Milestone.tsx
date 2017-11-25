import * as React from 'react';

import { withActions, Actions } from '@utils/bind';

import pure from '@utils/pure';
import Lock from '@utils/sync';

interface MilestoneProps {
  name: string;
  date?: string;
}

function Milestone({ name, date, actions }: MilestoneProps & Actions) {

  const onRenameComplete = (newName: string) => actions.renameMilestone(name, newName);

  return (
    <Lock initial={{ edited: false, name }}>
      { api =>
        <div className="s-marker">
          <div className={`s-milestone ${api.values.edited ? 's-milestone--edited' : ''}`} onDoubleClick={() => api.edit('name')}>
            <i className="fa fa-flag s-milestone__icon" aria-hidden="true"/>
            { api.values.edited ?
              <input
                className="s-milestone__label s-milestone__label--edit"
                type="text"
                onFocus={e => e.currentTarget.select()}
                {...api.sync('name')}
              /> :
              <span className="s-milestone__label">{api.values.name}</span>
            }
            <span className="s-milestone__line"/>
            <span className="s-milestone__date">{date}</span>
          </div>
          {api.values.edited && <div className="s-mask" onClick={() => {api.save(); onRenameComplete(api.values.name); }} />}
        </div>
      }
    </Lock>
  );
}

export default pure(withActions(Milestone));