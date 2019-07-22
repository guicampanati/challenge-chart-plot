import _ from 'lodash';

import { DATA, CHART } from './types';
import { parse_chart } from './parse_chart';

export const set_event = (data = {}) => (dispatch, getState) => {
  // data event conditions
  if (data.type === DATA) {
    const state = getState().events;

    // ignore events after stop event
    if (!!state.stop.timestamp) return;

    // ignore data events outside span event range
    if (!state.span.begin || state.span.begin > data.timestamp) return;
    if (!state.span.end || state.span.end < data.timestamp) return;

    // pull out mandatory fields
    const fields = _.pull(Object.keys(state.start), 'type', 'timestamp');
    const data_keys = _.pull(Object.keys(data), 'type', 'timestamp');
    const field_values = _.flatten(fields.map(f => state.start[f]));

    // ignore data keys with fields that are not defined
    if (!_.isEqual(field_values.sort(), data_keys.sort())) return;
  }

  dispatch({
    type: data.type,
    data,
  });
};

export const set_chart = () => (dispatch, getState) => {
  const chart_data = parse_chart(getState().events);

  dispatch({
    type: CHART,
    data: chart_data,
  });
};
