
import { LOCATION_CHANGE } from 'react-router-redux';
import { Location } from 'history';

type LocationChangeAction = { type: typeof LOCATION_CHANGE, payload: Location };

export type Action =
  LocationChangeAction;
