import * as React from 'react';
import pure from '../pure';

import { withActions, Actions } from '../../actions/bind';
import Lock from '../sync';

interface MilestoneProps {
  name: string;
}

function Milestone({ name }: MilestoneProps & Actions) {

  return (
    <Lock initial={{ edited: false, name }}>
      { api =>
        <div className={`s-milestone ${api.values.edited ? 's-milestone--edited' : ''}`}>
          <i className="fa fa-calendar-times-o s-milestone__icon" aria-hidden="true"/>
          { api.values.edited ?
            <input
              className="s-milestone__label s-milestone__label--edit"
              type="text"
              autoFocus={true}
              onFocus={e => e.currentTarget.select()}
              {...api.sync('name')}
            /> :
            <span className="s-milestone__label" onDoubleClick={() => api.change('edited', true)}>{api.values.name}</span>
          }
          {api.values.edited && <div className="s-mask" onClick={() => api.change('edited', false)} />}
          <span className="s-milestone__date">2017-12-15</span>
        </div>
      }
    </Lock>
  );
}

export default pure(withActions(Milestone));