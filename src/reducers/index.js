import { combineReducers } from 'redux';

import events from './events';
import chart_data from './chart_data';

export default combineReducers({
  events,
  chart_data,
});
