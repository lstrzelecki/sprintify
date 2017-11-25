import * as React from 'react';
import pure from '@utils/pure';

import { withActions, Actions } from '@utils/bind';
import Lock from '@utils/sync';

interface DeadlineProps {
  name: string;
  date: string;
}

function Deadline({ name, date, actions }: DeadlineProps & Actions) {

  const onChangeComplete = (newName: string, newDate: string) => {
    actions.renameDeadline(name, newName);
    actions.changeDeadline(name, newDate);
  };

  return (
    <Lock initial={{ edited: false, name, date }}>
      {api =>
        <div className="s-marker">
          <div className={`s-milestone ${api.values.edited ? 's-milestone--edited' : ''}`}>
            <i className="fa fa-calendar-times-o s-milestone__icon" aria-hidden="true" />
            {api.values.edited ?
              <input
                className="s-milestone__label s-milestone__label--edit"
                type="text"
                onFocus={e => e.currentTarget.select()}
                {...api.sync('name')}
              /> :
              <span className="s-milestone__label" onDoubleClick={() => api.edit('name')}>{api.values.name}</span>
            }
            <span className="s-milestone__line" />
            {api.values.edited ?
              <input
                className="s-milestone__date s-milestone__date--edit"
                type="text"
                onFocus={e => e.currentTarget.select()}
                {...api.sync('date')}
              /> :
              <span className="s-milestone__date" onDoubleClick={() => api.edit('date')}>{api.values.date}</span>
            }
          </div>
          {api.values.edited && <div className="s-mask" onClick={() => { api.save(); onChangeComplete(api.values.name, api.values.date); }} />}
        </div>
      }
    </Lock>
  );
}

export default pure(withActions(Deadline));