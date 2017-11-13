import * as React from 'react';
import pure from '../pure';

function Settings() {

  return (
    <div className="s-navbar__margin">
      <section className="s-navbar">
        <div className="s-logo">
          <i className="fa fa-refresh" aria-hidden="true"/> Sprintify
        </div>
        <ul className="s-menu">
          <li><i className="fa fa-th" aria-hidden="true" /> Dashboard</li>
          <li><i className="fa fa-area-chart" aria-hidden="true" /> Statistics</li>
        </ul>
      </section>
    </div>
  );

}

export default pure(Settings);